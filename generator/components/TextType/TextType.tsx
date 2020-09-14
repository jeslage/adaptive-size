import React, { useEffect } from "react";

import useComputedStyle from "../../hooks/useComputedStyle";

import StyledTextType, { Type } from "./TextType.style";

export type TextTypeProps = {
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

  const { ref, current, update } = useComputedStyle();

  useEffect(() => {
    update();
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
          ref={ref}
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
