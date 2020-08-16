import styled, { css } from "styled-components";
import { IconButtonProps } from "./IconButton";

type StyledIconButtonProps = Pick<IconButtonProps, "variant" | "size">;

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: block;
  outline: none;
  background: none;
  text-transform: uppercase;
  padding: 0px;
  margin: 0;
  text-align: center;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 30px;
  border: 1px solid var(--colors-darkest);
  color: var(--colors-lightest);
  background: var(--colors-darkest);
  transition: all 0.2s ease-in-out;
  max-width: 44px;
  max-height: 44px;

  &:active,
  &:focus {
    color: var(--colors-darkest);
  }

  &:hover {
    border-color: var(--colors-black);
    background: var(--colors-black);
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;

    ${(props) =>
      props.size === "large" &&
      css`
        height: 42px;
        width: 42px;
      `}
  }

  svg {
    height: 15px;
    width: 15px;
    fill: var(--colors-lightest);
  }

  ${(props) =>
    props.variant === "secondary" &&
    css`
      border: 1px solid var(--colors-dark);
      background: var(--colors-dark);
    `}

  ${(props) =>
    props.variant === "outlined" &&
    css`
      border-color: var(--colors-lightest);
      background: none;

      &:hover {
        border-color: var(--colors-lightest);
      }
    `}
`;

export default StyledIconButton;
