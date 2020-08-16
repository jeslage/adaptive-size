import React, { FC } from "react";

import StyledIconButton from "./IconButton.style";

import Icon, { IconTypes } from "../Icon";

export interface IconButtonProps {
  icon: IconTypes;
  label: string;
  variant?: "primary" | "secondary" | "outlined";
  size?: "small" | "large";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const IconButton: FC<IconButtonProps> = ({
  children,
  icon,
  variant = "primary",
  size = "small",
  disabled = false,
  onClick,
  className,
  label,
  ...props
}) => (
  <StyledIconButton
    type="button"
    variant={variant}
    className={className}
    onClick={onClick}
    disabled={disabled}
    aria-disabled={disabled}
    title={label}
    aria-label={label}
    size={size}
    {...props}
  >
    <span>
      <Icon type={icon} />
    </span>
  </StyledIconButton>
);

export default IconButton;
