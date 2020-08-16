import styled from "styled-components";

const StyledCounter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacings-s);

  .counter {
    display: flex;
    align-items: center;
  }

  input {
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    display: inline-block;
    max-width: 60px;
    font-size: var(--fontSizes-m);
    padding: 5px 10px 4px;
    font-family: inherit;
    text-align: center;
    color: inherit;
    background: none;

    &:focus {
      border-color: var(--colors-lightest);
    }
  }
`;

export default StyledCounter;
