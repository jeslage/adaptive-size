import styled from "styled-components";

const StyledText = styled.div`
  padding: 40px 0;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--colors-white);
  color: var(--colors-darkest);

  .text__content {
    width: 100%;
  }

  .text__innerWidth {
    position: fixed;
    z-index: 1;
    bottom: var(--spacings-s);
    right: var(--spacings-s);
    border-radius: var(--spacings-s);
    padding: var(--spacings-xs) var(--spacings-s);
    background: var(--colors-dark);
    color: var(--colors-lightest);
    font-size: var(--fontSizes-l);
  }
`;

export default StyledText;
