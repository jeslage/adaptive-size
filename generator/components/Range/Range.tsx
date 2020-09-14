import React, { FC, useState, useEffect } from "react";

import { IconTypes } from "../Icon";

import StyledRange from "./Range.style";
import Label from "../Label";
import IconButton from "../IconButton";

export interface RangeProps {
  icon?: IconTypes;
  value?: number;
  label?: string;
  description?: string;
  onChange?: (value: number) => void;
  doubleClickValue?: number;
  min?: number;
  max?: number;
  steps?: number;
  suffix?: string;
  onRemove?: () => void;
}

const Range: FC<RangeProps> = ({
  icon,
  value = 50,
  label,
  description,
  onChange,
  doubleClickValue,
  onRemove,
  min = 0,
  max = 100,
  steps = 1,
  suffix
}) => {
  const [val, setVal] = useState(value);

  const updateValue = (value) => {
    setVal(parseFloat(value));
  };

  useEffect(() => {
    const update = () => {
      if (onChange) return onChange(val);
    };
    let id = setTimeout(update, 300);
    return () => clearTimeout(id);
  }, [val]);

  useEffect(() => {
    if (value !== val) {
      setVal(value);
    }
  }, [value]);

  const handleChange = (event) => {
    const { value, validity } = event.target;

    if (validity.valid) {
      if (value > max) {
        updateValue(max);
      } else if (value < min) {
        updateValue(min);
      } else if (value !== "") {
        updateValue(value);
      } else {
        updateValue(0);
      }
    }
  };

  const handleKeyDown = (event) => {
    const {
      key,
      target: { value }
    } = event;

    const number = parseFloat(value);

    if (key === "ArrowUp" || key === "ArrowRight") {
      updateValue(number + 1 <= max ? number + 1 : max);
    } else if (key === "ArrowDown" || key === "ArrowLeft") {
      updateValue(number - 1 >= min ? number - 1 : min);
    }
  };

  return (
    <StyledRange>
      <label>
        {(label || icon) && (
          <Label label={label} icon={icon} description={description} />
        )}

        <span className="range__input">
          <input
            type="number"
            pattern="[0-9.]*"
            value={val}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {suffix}
        </span>

        <input
          type="range"
          step={steps}
          min={min}
          max={max}
          value={val}
          onDoubleClick={() => {
            if (doubleClickValue && typeof doubleClickValue === "number") {
              updateValue(doubleClickValue);
            }
          }}
          onChange={(e) => updateValue(e.target.value)}
        />
      </label>

      {onRemove && (
        <IconButton icon="remove" label="Remove" onClick={onRemove} />
      )}
    </StyledRange>
  );
};

export default Range;
