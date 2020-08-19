import styled from "styled-components";

const StyledPreset = styled.div`
  margin: 20px 0;
  flex-wrap: wrap;
  display: flex;
  border-radius: 3px;
  overflow: hidden;
  justify-content: flex-end;

  .preset__card {
    display: block;
    width: 100%;
    border-radius: var(--spacings-xs);
  }

  .preset__button {
    padding: 10px 20px;
    border: 0;
    margin: 0;
    text-align: left;
    background: transparent;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: var(--colors-black);
    border-bottom: 1px solid var(--colors-dark);
  }

  button.preset__button {
    cursor: pointer;
    appearance: none;

    &:active,
    &:focus {
      background: var(--colors-lightest);
      color: var(--colors-black);
    }
  }
  .preset__content {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    margin: 0;
    font-size: inherit;
    background-color: var(--colors-white);
    display: flex;
    flex-direction: column;
  }

  .preset__meta {
    display: flex;
    align-items: center;
    padding: 10px 20px 10px;
  }

  .preset__meta-text {
    flex-grow: 2;
    color: var(--colors-black);
    text-transform: uppercase;
    font-family: Helvetica, Arial, sans-serif;
    font-size: var(--fontSizes-s);
  }

  .preset__options {
    justify-content: flex-end;
  }
`;

export default StyledPreset;
