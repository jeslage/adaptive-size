import React, { FC, useState, useEffect } from "react";

import Icon from "../Icon";
import StyledTextarea from "./Textarea.style";
import Label from "../Label";

export interface TextareaProps {
  label?: string;
  value: string;
  max?: number;
  onChange: (value: string) => void;
  onRemove?: () => void;
}

const Textarea: FC<TextareaProps> = ({
  label,
  value,
  onChange,
  onRemove,
  max,
}) => {
  const [val, setVal] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;

    if (max && newVal.length > max) {
      return null;
    }

    setVal(e.target.value);
  };

  useEffect(() => {
    const update = () => {
      if (onChange) return onChange(val);
    };
    let id = setTimeout(update, 800);
    return () => clearTimeout(id);
  }, [val]);

  useEffect(() => {
    if (value !== val) {
      setVal(value);
    }
  }, [value]);

  return (
    <StyledTextarea>
      {label && <Label label={label} />}

      <textarea rows={5} value={val} onChange={handleChange} />

      <div className="textarea__meta">
        <span className="textarea__characters">
          <small>
            {val.length} {max ? `/ ${max} ` : ""}
            {val.length === 1 ? "character" : "characters"}
          </small>
        </span>
        {onRemove && (
          <button onClick={() => onRemove()}>
            <Icon type="remove" />
          </button>
        )}
      </div>
    </StyledTextarea>
  );
};

export default Textarea;
