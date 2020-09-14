import React, { useState, useEffect, FC } from "react";

import { IconTypes } from "../Icon";

import StyledSelect from "./Select.style";
import Label from "../Label";

type Option = {
  value: string;
  label: string;
  [key: string]: any;
};

export interface SelectProps {
  options: Option[];
  icon?: IconTypes;
  initialValue: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  description?: string;
  name: string;
  onChange?: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  options,
  icon,
  description,
  initialValue,
  label,
  placeholder,
  name,
  disabled,
  onChange
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);

  const handleChange = (event) => {
    const { value } = event.target;

    setCurrentValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  return (
    <StyledSelect>
      <label>
        {(label || icon) && (
          <Label label={label} icon={icon} description={description} />
        )}

        <select
          defaultValue={currentValue}
          onChange={handleChange}
          name={name}
          disabled={disabled}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>

        <div className="select__icon" />
      </label>
    </StyledSelect>
  );
};

export default Select;
