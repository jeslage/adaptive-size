import styled from "styled-components";

const StyledRange = styled.div`
  margin-bottom: var(--spacings-s);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  label {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .range__input {
    margin-right: 10px;
    font-size: var(--fontSizes-m);
  }

  input[type="number"] {
    border: none;
    appearance: none;
    border-bottom: 1px solid transparent;
    outline: none;
    display: inline-block;
    max-width: 40px;
    font-size: inherit;
    padding: 5px 2px 4px;
    font-family: inherit;
    text-align: right;
    color: inherit;
    background: none;

    &:focus {
      border-color: var(--colors-light);
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="range"] {
    appearance: none;
    margin: 0;
    background: none;
    width: 120px;
    transition: all 0.2s ease-in-out;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: var(--colors-darkest);
    border-radius: var(--spacings-xs);
    transition: all 0.2s ease-in-out;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: var(--colors-darkest);
    border-radius: var(--spacings-xs);
    transition: all 0.2s ease-in-out;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: var(--colors-darkest);
    border-radius: var(--spacings-xs);
    transition: all 0.2s ease-in-out;
  }

  input[type="range"]::-webkit-slider-runnable-track:hover {
    background: var(--colors-black);
  }

  input[type="range"]::-moz-range-track:hover {
    background: var(--colors-black);
  }

  input[type="range"]::-ms-track:hover {
    background: var(--colors-black);
  }

  input[type="range"]::-ms-thumb {
    height: 20px;
    width: 20px;
    border-radius: var(--spacings-xs);
    background: var(--colors-light);
    cursor: pointer;
    appearance: none;
    margin-top: -6px;
  }

  input[type="range"]::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: var(--spacings-xs);
    background: var(--colors-light);
    cursor: pointer;
    appearance: none;
    margin-top: -6px;
  }

  input[type="range"]::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: var(--spacings-xs);
    background: var(--colors-light);
    cursor: pointer;
    appearance: none;
    margin-top: -6px;
  }
`;

export default StyledRange;
