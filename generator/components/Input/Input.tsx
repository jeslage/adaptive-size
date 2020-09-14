import React, { FC } from "react";

import StyledInput from "./Input.style";
import { IconTypes } from "../Icon";
import Label from "../Label";

export interface InputProps {
  icon?: IconTypes;
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
  icon,
  type = "text",
  value,
  onChange
}) => {
  return (
    <StyledInput>
      {(label || icon) && (
        <label htmlFor={label?.replace(" ", "")}>
          <Label icon={icon} label={label} description={description} />
        </label>
      )}

      <input
        id={label ? label?.replace(" ", "") : undefined}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </StyledInput>
  );
};

export default Input;
