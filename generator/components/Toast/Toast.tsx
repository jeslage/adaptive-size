import React, { FC } from "react";
import styled from "styled-components";
import { ToastProps } from "react-toast-notifications";

import Icon from "../Icon";

const StyledToast = styled.div`
  width: 340px;
  background: var(--colors-black);
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.2);
  color: var(--colors-lightest);
  border-radius: var(--spacings-xs);
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: var(--fontSizes-s);
  margin: var(--spacings-m);
  position: relative;
  z-index: 999;
  overflow: hidden;

  .toast__icon {
    padding: var(--spacings-m) var(--spacings-s);
    display: flex;
    justify-content: center;
    background: var(--colors-lightest);
  }

  span {
    margin: 0;
    padding: var(--spacings-m) var(--spacings-s);
  }

  svg {
    width: var(--spacings-s);
    height: var(--spacings-s);
    fill: var(--colors-dark);
  }
`;

const Toast: FC<ToastProps> = ({ appearance, children }) => (
  <StyledToast>
    <div className="toast__icon">
      <Icon type={appearance === "error" ? "check" : "check"} />
    </div>
    <span>{children}</span>
  </StyledToast>
);

export default Toast;
