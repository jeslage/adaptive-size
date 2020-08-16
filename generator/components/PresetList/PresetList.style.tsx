import styled from "styled-components";

const StyledPresetList = styled.div`
  height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;

  .presetList__presets {
    flex-grow: 2;
    overflow-y: auto;
    padding: 0.5em 1em;
  }

  .presetList__bar {
    flex-shrink: 0;
    position: sticky;
    display: flex;
    bottom: 0;
    background: var(--colors-darkest);
    border-top: 1px solid var(--colors-black);
    padding: 0 1.5em;

    button {
      width: 100%;
    }
  }
`;

export default StyledPresetList;
