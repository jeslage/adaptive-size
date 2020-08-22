import styled from "styled-components";

const StyledTextarea = styled.label`
  display: block;
  margin: 1.5em 0;

  .textarea__meta {
    display: flex;
    align-items: center;

    .textarea__characters {
      flex-grow: 2;
    }
  }

  textarea {
    width: 100%;
    border: none;
    appearance: none;
    resize: none;
    background: none;
    padding: 5px;
    border-radius: var(--spacings-xs);
    border: 1px solid var(--colors-lightest);
    color: var(--colors-lightest);
    margin-top: var(--spacings-s);
    font-size: var(--fontSizes-l);
    font-family: inherit;
  }

  button {
    margin: 0;
    padding: 0;
    outline: none;
    background: none;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;

    svg {
      width: 15px;
      height: 15px;
      fill: var(--colors-lightest);
    }
  }
`;

export default StyledTextarea;
