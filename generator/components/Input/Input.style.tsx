import styled from "styled-components";

const StyledTextarea = styled.label`
  display: flex;
  margin-bottom: var(--spacings-s);

  input {
    width: 100%;
    border: none;
    appearance: none;
    resize: none;
    background: none;
    padding: 5px 0;
    border-radius: 0;
    border: none;
    color: var(--colors-lightest);
    margin-left: 1.5rem;
    font-size: var(--fontSizes-l);
    border-bottom: 1px solid transparent;
    text-align: right;

    &:hover {
      border-color: var(--colors-light);
    }
  }
`;

export default StyledTextarea;
