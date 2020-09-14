import { FC } from "react";
import IconButton from "../../../IconButton";
import StyledPresetOptions from "./PresetOptions.style";
import { IconTypes } from "../../../Icon";

export interface PresetOptionsProps {
  options?: Array<{
    label: string;
    callback: () => void;
    icon: IconTypes;
  }>;
  className?: string;
}

const PresetOptions: FC<PresetOptionsProps> = ({ options, className }) => {
  return (
    <StyledPresetOptions className={className}>
      {options &&
        options.length > 0 &&
        options.map((item) => (
          <IconButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={item.callback}
          />
        ))}
    </StyledPresetOptions>
  );
};

export default PresetOptions;
