import React, { FC } from "react";

import StyledButton from "./Button.style";

import Icon, { IconTypes } from "../Icon";

export interface ButtonProps {
  icon?: IconTypes;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
}

const Button: FC<ButtonProps> = ({
  children,
  icon,
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
    {icon && (
      <span className="button__icon">
        <Icon type={icon} />
      </span>
    )}
    {children}
  </StyledButton>
);

export default Button;
