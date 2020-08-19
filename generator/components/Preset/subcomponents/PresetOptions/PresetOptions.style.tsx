import styled from "styled-components";

const StyledPresetOptions = styled.div`
  position: relative;
  display: flex;

  button {
    margin-left: 0.5rem;
  }

  .presetOptions__additional-toggle  {
    svg {
      transform: rotate(90deg);
    }
  }

  .presetOptions__list {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: calc(100% + 10px);
    margin-top: 5px;
    width: 150px;
    right: 0;
    background: var(--colors-darkest);
    color: var(--colors-lightest);
    z-index: 999;
    border-radius: var(--spacings-xs);
    border: 1px solid var(--colors-dark);
    overflow: hidden;

    button {
      display: block;
      flex-shrink: 0;
      width: 100%;
      outline: none;
      border: none;
      background: none;
      cursor: pointer;
      padding: 15px;
      text-align: left;
      color: inherit;
      font-weight: bold;
      margin: 0;
      border-bottom: 1px solid var(--colors-darkest);

      &:last-of-type {
        border-bottom: none;
      }

      &:hover {
        background: var(--colors-black);
      }
    }
  }
`;

export default StyledPresetOptions;
