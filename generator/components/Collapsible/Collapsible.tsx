import { useState, FC } from "react";
import styled from "styled-components";

import IconButton from "../IconButton";

const StyledCollapsible = styled.div`
  .collapsible__label {
    display: flex;
    align-items: center;
    color: var(--colors-lightest);
    position: relative;
    margin-bottom: var(--spacings-s);

    input {
      margin: 0;
      padding: 5px 0;
      align-items: center;
      font-size: var(--fontSizes-l);
      font-weight: bold;
      background: none;
      border: none;
      flex-grow: 2;
      color: var(--colors-lightest);
      border-bottom: 1px solid transparent;

      &:hover,
      &:focus {
        outline: none;
        border-color: var(--colors-lightest);
      }
    }

    p {
      flex-grow: 2;
      display: flex;
      margin: 0;
      padding: 5px 0;
      align-items: center;
      font-size: var(--fontSizes-l);
      font-weight: bold;
    }

    button {
      margin-left: 0.5rem;
    }
  }

  .collapsible__content {
    display: none;
    border-bottom: 1px solid var(--colors-light);
    margin-bottom: var(--spacings-s);

    &--visible {
      display: block;
    }
  }
`;

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
