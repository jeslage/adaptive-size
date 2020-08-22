import styled, { css } from "styled-components";
import { mq } from "../../styles";
export const StyledSidebarContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .sidebar__panel {
    flex-grow: 2;
    overflow-y: auto;
  }

  .sidebar__bar {
    flex-shrink: 0;
    background: var(--colors-darkest);
    border-top: 1px solid var(--colors-black);
    padding: 0 var(--spacings-s);
  }
`;

export const StyledSidebar = styled.aside<{ isHidden: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  z-index: 999;

  ${mq("m")} {
    position: relative;
  }

  .sidebar__toggle {
    position: relative;
    appearance: none;
    outline: none;
    border: none;
    background: var(--colors-black);
    margin: 0;
    height: 100vh;
    padding: 6px;
    cursor: pointer;

    &:before {
      height: 150px;
      width: 5px;
      content: "";
      display: block;
      background: var(--colors-light);
      border-radius: 6px;
    }
  }

  .sidebar__wrapper {
    height: 100vh;
    width: 330px;
    background: var(--colors-dark);
    border-left: 1px solid var(--colors-black);

    ${(props) =>
      props.isHidden &&
      css`
        display: none;
      `}
  }
`;

export default StyledSidebar;
