import styled from "styled-components";
import { SwitchProps } from "./Switch";

type StyledSwitchProps = Pick<SwitchProps, "isActive">;

const StyledSwitch = styled.div<StyledSwitchProps>`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacings-s);

  button {
    position: relative;
    outline: none;
    margin: 0;
    padding: 0;
    appearance: none;
    border: 1px solid var(--colors-lightest);
    width: 60px;
    height: 30px;
    border-radius: 30px;
    cursor: pointer;
    background-color: ${(props) =>
      props.isActive ? "transparent" : "transparent"};
    will-change: background-color;
    transition: background-color 0.2s ease-in-out;

    span {
      position: absolute;
      top: 4px;
      left: 4px;
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: var(--colors-lightest);
      transform: translateX(${(props) => (props.isActive ? "30px" : "0")});
      will-change: transform;
      transition: transform 0.2s ease-in-out;

      svg {
        fill: var(--colors-dark);
        fill-opacity: 0;
        stroke: var(--colors-dark);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }
  }
`;

export default StyledSwitch;
