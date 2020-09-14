import styled, { css } from "styled-components";
import { ButtonProps } from "./Button";

type StyledButtonProps = Pick<ButtonProps, "variant">;

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: none;
  text-transform: uppercase;
  margin: 0 0 var(--spacings-xs);
  padding: 12px 20px;
  text-align: center;
  font-weight: bold;
  font-size: var(--fontSizes-s);
  cursor: pointer;
  border-radius: var(--spacings-xs);
  width: 100%;
  border: 1px solid var(--colors-light);
  color: var(--colors-lightest);
  transition: background 0.2s ease-in-out;

  &:active,
  &:focus {
    color: var(--colors-lightest);
  }

  &:hover {
    background: var(--colors-black);
  }

  &[disabled] {
    opacity: 0.3;
  }

  svg {
    height: 15px;
    width: auto;
    fill: var(--colors-lightest);
  }

  .button__icon {
    margin-right: 10px;
  }

  ${(props) =>
    props.variant === "secondary" &&
    css`
      border: none;
      background: var(--colors-darkest);
    `}
`;

export default StyledButton;
