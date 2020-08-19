import styled, { css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

import adaptiveSize from "../../styles/adapativeSize";

type TextTypeProps = {
  name: string;
  breakpoints: number[];
  sizes: number[];
  lineHeights: number[];
  steps: number;
  font?: string;
  text: string;
  letterSpacing?: number;
  onChange?: (val: string) => void;
  onBlur?: (val: string) => void;
};

const StyledTextType = styled.div<{ hasPadding: boolean }>`
  padding: var(--spacings-s) 0;

  span {
    font-size: 10px;
    color: var(--colors-dark);
    display: block;
    white-space: nowrap;

    ${(props) =>
      props.hasPadding &&
      css`
        padding: 0 var(--spacings-m);
      `};

    b {
      text-transform: uppercase;
      letter-spacing: 0.02rem;
    }
  }
`;

type TypeProps = { as: "textarea" | "p" } & Omit<
  TextTypeProps,
  "name" | "font" | "text"
>;

const padding = (props: TypeProps) => {
  return props.as === "textarea"
    ? css`
        padding: 0 var(--spacings-m);
      `
    : undefined;
};

const border = (props: TypeProps) => {
  return props.as === "textarea"
    ? css`
        border-top: 1px solid var(--colors-lightest);
        border-bottom: 1px solid var(--colors-lightest);
      `
    : undefined;
};

const Type = styled.textarea<TypeProps>`
  margin: 0;
  white-space: nowrap;
  outline: none;
  width: 100%;
  resize: none;
  border: none;
  appearance: none;

  ${padding}
  ${border}

  ${(props) =>
    adaptiveSize({
      breakpoints: props.breakpoints,
      lineHeights: props.lineHeights,
      steps: props.steps,
      sizes: props.sizes
    })}
`;

const TextType = (props: TextTypeProps) => {
  const {
    name,
    text,
    breakpoints,
    sizes,
    lineHeights,
    steps,
    letterSpacing = 0,
    font,
    onChange,
    onBlur
  } = props;
  const typeRef = useRef<HTMLTextAreaElement>(null);
  const [current, setCurrent] = useState({ size: "0", lineHeight: "0" });

  const handleResize = throttle(() => {
    if (typeRef.current) {
      const px = window
        .getComputedStyle(typeRef.current, null)
        .getPropertyValue("font-size");
      const lh = window
        .getComputedStyle(typeRef.current, null)
        .getPropertyValue("line-height");

      const pxInt = Math.round(parseFloat(px.split("px")[0]) * 10) / 10;
      const lhInt = Math.round(parseFloat(lh.split("px")[0]) * 10) / 10;

      setCurrent({
        size: pxInt.toString(),
        lineHeight: (lhInt / pxInt).toFixed(2)
      });
    }
  }, [400]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [breakpoints, steps, sizes]);

  const style = {
    fontFamily: font ? `'${font}', sans-serif` : "sans-serif",
    letterSpacing: `${letterSpacing}px`
  };

  return (
    <StyledTextType hasPadding={Boolean(onChange)}>
      {onChange ? (
        <Type
          as="textarea"
          rows={1}
          ref={typeRef}
          style={style}
          breakpoints={breakpoints}
          sizes={sizes}
          lineHeights={lineHeights}
          steps={steps}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur && onBlur(e.target.value)}
        />
      ) : (
        <Type
          as="p"
          style={style}
          breakpoints={breakpoints}
          sizes={sizes}
          lineHeights={lineHeights}
          steps={steps}
        >
          {text}
        </Type>
      )}

      <span>
        <b>{name}</b> |{" "}
        {Boolean(onChange)
          ? `~${current.size}px | ~${current.lineHeight} | `
          : ""}
        {sizes.join(" – ")} | {lineHeights.join(" – ")}
        {letterSpacing && letterSpacing > 0 ? <>| {letterSpacing}</> : null}
      </span>
    </StyledTextType>
  );
};

export default TextType;
