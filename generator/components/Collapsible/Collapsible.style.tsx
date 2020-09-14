import styled from "styled-components";

const StyledCollapsible = styled.div`
  .collapsible__label {
    display: flex;
    align-items: center;
    color: var(--colors-lightest);
    position: relative;
    margin-bottom: var(--spacings-s);

    input {
      margin: 0;
      padding: 5px 0;
      align-items: center;
      font-size: var(--fontSizes-l);
      font-weight: bold;
      background: none;
      border: none;
      flex-grow: 2;
      color: var(--colors-lightest);
      border-bottom: 1px solid transparent;

      &:hover,
      &:focus {
        outline: none;
        border-color: var(--colors-lightest);
      }
    }

    p {
      flex-grow: 2;
      display: flex;
      margin: 0;
      padding: 5px 0;
      align-items: center;
      font-size: var(--fontSizes-l);
      font-weight: bold;
    }

    button {
      margin-left: 0.5rem;
    }
  }

  .collapsible__content {
    display: none;
    border-bottom: 1px solid var(--colors-light);
    margin-bottom: var(--spacings-s);

    &--visible {
      display: block;
    }
  }
`;

export default StyledCollapsible;
