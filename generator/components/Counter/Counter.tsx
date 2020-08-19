import React, { FC } from "react";

import StyledCounter from "./Counter.style";

import { IconTypes } from "../Icon";
import IconButton from "../IconButton";
import Label from "../Label";

export interface CounterProps {
  iconBefore?: IconTypes;
  label?: string;
  onChange?: (val: number) => void;
  value: number;
  description?: string;
  min?: number;
  max?: number;
  steps?: number;
  suffix?: string | undefined;
}

const Counter: FC<CounterProps> = ({
  label,
  description,
  value,
  min = 0,
  max = 100,
  steps = 1,
  onChange,
  suffix,
  iconBefore
}) => {
  const updateValue = (val: number) => {
    if (onChange) onChange(Math.round(val * 100) / 100);
  };

  const handleChange = (event: { target: HTMLInputElement }) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      if (value !== "") {
        updateValue(parseFloat(value));
      } else {
        updateValue(0);
      }
    }
  };

  const handleBlur = (event: { target: HTMLInputElement }) => {
    const { value } = event.target;
    const numberValue: number | string = parseFloat(value);

    if (numberValue > max) {
      updateValue(max);
    } else if (numberValue < min) {
      updateValue(min);
    }
  };

  return (
    <StyledCounter>
      {(label || iconBefore) && (
        <Label icon={iconBefore} label={label} description={description} />
      )}

      <div className="counter">
        <IconButton
          onClick={() => updateValue(value - steps)}
          disabled={value === min}
          label="Decrease"
          icon="minus"
        />

        <span className="counter__input">
          <input
            type="text"
            pattern="[0-9.]*"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {suffix}
        </span>

        <IconButton
          onClick={() => updateValue(value + steps)}
          disabled={value === max}
          label="Increase"
          icon="plus"
        />
      </div>
    </StyledCounter>
  );
};

export default Counter;
