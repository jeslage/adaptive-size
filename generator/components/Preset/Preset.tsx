import React, { FC } from "react";

import StyledPreset from "./Preset.style";

import PresetOptions from "./subcomponents/PresetOptions";

import { IconTypes } from "../Icon";

const getDate = (dateCreated) => {
  const date = new Date(dateCreated);

  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth();

  return `${day}.${month < 9 ? `0${month + 1}` : month + 1}.${year}`;
};

export type PresetOptionsType = {
  label: string;
  callback: () => void;
  icon: IconTypes;
};

export interface PresetProps {
  name?: string;
  dateCreated?: number;
  onClick?: () => void;
  options?: PresetOptionsType[];
  additionalOptions?: Array<{
    label: string;
    callback: () => void;
  }>;

  className?: string;
}

const Preset: FC<PresetProps> = ({
  dateCreated,
  onClick,
  options,
  additionalOptions,
  className,
  name,
  children,
}) => {
  return (
    <StyledPreset className={className}>
      <div className="preset__card">
        <div className="preset__content">
          {onClick ? (
            <button
              className="preset__button"
              onClick={onClick}
              aria-label="Update settings"
            >
              {children}
            </button>
          ) : (
            <div className="preset__button">{children}</div>
          )}
          <div className="preset__meta">
            <span className="preset__meta-text">
              {name || ""}
              {dateCreated && (
                <>
                  <br />
                  {getDate(dateCreated)}
                </>
              )}
            </span>

            <PresetOptions
              options={options}
              additionalOptions={additionalOptions}
              className="preset__options"
            />
          </div>
        </div>
      </div>
    </StyledPreset>
  );
};

export default Preset;
