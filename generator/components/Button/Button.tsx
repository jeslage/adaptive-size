import React, { FC } from "react";

import StyledButton from "./Button.style";

import Icon, { IconTypes } from "../Icon";

export interface ButtonProps {
  iconBefore?: IconTypes;
  iconAfter?: IconTypes;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
}

const Button: FC<ButtonProps> = ({
  children,
  iconBefore,
  iconAfter,
  variant = "primary",
  disabled = false,
  onClick,
  className,
  title,
  type = "button",
  ...props
}) => (
  <StyledButton
    type={type}
    className={className}
    onClick={onClick}
    disabled={disabled}
    variant={variant}
    title={title}
    {...props}
  >
    {iconBefore && (
      <span className="button__icon-before">
        <Icon type={iconBefore} />
      </span>
    )}
    {children}
    {iconAfter && (
      <span className="button__icon-after">
        <Icon type={iconAfter} />
      </span>
    )}
  </StyledButton>
);

export default Button;
