import styled from "styled-components";

const StyledRadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacings-s);

  .radioGroup__icon {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 0 0 0 10px;
    border-radius: var(--spacings-xs);
    opacity: 0.5;

    svg {
      width: 20px;
      height: auto;
      fill: var(--colors-lightest);
    }
  }

  .radioGroup__radio {
    cursor: pointer;

    input {
      display: none;
    }

    input:checked + .radioGroup__icon {
      opacity: 1;
    }
  }
`;

export default StyledRadioGroup;
