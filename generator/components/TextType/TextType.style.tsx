import styled, { css } from "styled-components";
import adaptiveSize from "../../styles/adapativeSize";

import { TextTypeProps } from "./TextType";

type TypeProps = { as: "textarea" | "p" } & Omit<
  TextTypeProps,
  "name" | "font" | "text"
>;

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

export const Type = styled.textarea<TypeProps>`
  margin: 0;
  white-space: nowrap;
  outline: none;
  width: 100%;
  resize: none;
  border: none;
  appearance: none;

  ${padding}
  ${border}

  ${(props) => {
    return adaptiveSize({
      breakpoints: props.breakpoints,
      lineHeights: props.lineHeights,
      steps: props.steps,
      sizes: props.sizes
    });
  }}
`;

export default StyledTextType;
