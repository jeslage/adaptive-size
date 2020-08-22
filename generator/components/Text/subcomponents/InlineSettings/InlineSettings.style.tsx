import styled, { css } from "styled-components";

type Props = {
  isOpen: boolean;
  isEntered: boolean;
};

const StyledInlineSettings = styled.div<Props>`
  position: relative;
  border-radius: 0.75em;

  .inlineSettings__setting {
    position: absolute;
    top: 0;
    left: var(--spacings-m);
    z-index: 1;
    color: var(--colors-lightest);

    display: ${(props) => (props.isEntered ? "block" : "none")};
  }

  .inlineSettings__content {
    background: var(--colors-dark);
    border-radius: 0 var(--spacings-xs) var(--spacings-xs) var(--spacings-xs);
    padding: var(--spacings-s) var(--spacings-s) 0;
    max-height: 600px;
    overflow-y: scroll;
  }

  .inlineSettings__button {
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
    width: calc(var(--spacings-s) + 15px);
    height: calc(var(--spacings-s) + 15px);
    border-radius: var(--spacings-xs);
    margin: 0;
    padding: 0.5em;
    background: var(--colors-dark);

    ${(props) =>
      props.isOpen &&
      css`
        border-radius: var(--spacings-xs) var(--spacings-xs) 0 0;
      `}

    svg {
      width: 15px;
      height: 15px;
      fill: var(--colors-lightest);
    }
  }
`;

export default StyledInlineSettings;
