import { useState, FC } from "react";

import IconButton from "../IconButton";

import StyledCollapsible from "./Collapsible.style";

export interface CollapsibleProps {
  label?: string;
  initialOpen?: boolean;
  onRemove?: () => void;
  onChange?: (value: string) => void;
}

const Collapsible: FC<CollapsibleProps> = ({
  label,
  onChange,
  initialOpen = false,
  children,
  onRemove
}) => {
  const [visible, setVisible] = useState(!label || initialOpen);

  return (
    <StyledCollapsible>
      <div className="collapsible__label">
        {onChange && (
          <input
            type="text"
            placeholder="Enter a name"
            value={label}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {label && !onChange && <p>{label}</p>}

        {onRemove && (
          <IconButton icon="remove" label="Remove" onClick={onRemove} />
        )}
        <IconButton
          icon={visible ? "minus" : "plus"}
          label="Open"
          onClick={() => setVisible((prev) => !prev)}
        />
      </div>

      <div
        className={`collapsible__content ${
          visible ? "collapsible__content--visible" : ""
        }`}
      >
        {children}
      </div>
    </StyledCollapsible>
  );
};
export default Collapsible;
