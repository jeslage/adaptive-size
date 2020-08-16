import React, { FC } from "react";

import StyledInput from "./Input.style";
import { IconTypes } from "../Icon";
import Label from "../Label";

export interface InputProps {
  iconBefore?: IconTypes;
  label?: string;
  type?: string;
  value: string;
  description?: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
}

const Input: FC<InputProps> = ({
  label,
  description,
  iconBefore,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <StyledInput>
      {(label || iconBefore) && (
        <Label icon={iconBefore} label={label} description={description} />
      )}

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </StyledInput>
  );
};

export default Input;
