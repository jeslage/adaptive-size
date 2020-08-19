import styled from "styled-components";

const StyledTabs = styled.div`
  height: 100%;

  .tabs__list {
    display: flex;
    position: relative;
    list-style-type: none;
    overflow-x: scroll;
    flex-wrap: nowrap;
    white-space: nowrap;
    margin: 0;
    background: var(--colors-darkest);
    border-bottom: 1px solid var(--colors-black);
    padding: var(--spacings-xs) var(--spacings-s);
    border-radius: 0;

    li {
      flex-shrink: 0;
      margin: 0;
    }

    a {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: var(--spacings-xs);
      color: var(--colors-lightest);
      border-bottom: 2px solid transparent;
      text-decoration: none;
      padding: 8px 10px;
      height: 25px;
      align-items: center;
      justify-content: center;
      border-radius: var(--spacings-xs);
      background: var(--colors-black);
      font-weight: bold;
      font-size: 9px;
      text-transform: uppercase;

      svg {
        width: 15px;
        height: 15px;
        fill: var(--colors-lightest);
      }

      &:hover {
        color: var(--colors-light);
      }

      &:focus {
        outline: none;
      }
    }

    li:last-of-type a {
      margin-right: 0;
    }
  }

  .tabs__content {
    overflow-y: auto;
    height: calc(100% - 42px);
  }
`;

export default StyledTabs;
