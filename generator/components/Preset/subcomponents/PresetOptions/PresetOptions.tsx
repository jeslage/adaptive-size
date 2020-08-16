import { FC, useState } from "react";
import IconButton from "../../../IconButton";
import StyledPresetOptions from "./PresetOptions.style";
import { IconTypes } from "../../../Icon";

export interface PresetOptionsProps {
  options?: Array<{
    label: string;
    callback: () => void;
    icon: IconTypes;
  }>;
  additionalOptions?: Array<{
    label: string;
    callback: () => void;
  }>;
  className?: string;
}

const PresetOptions: FC<PresetOptionsProps> = ({
  options,
  additionalOptions,
  className
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <StyledPresetOptions className={className}>
      {options &&
        options.length > 0 &&
        options.map(item => (
          <IconButton
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={item.callback}
          />
        ))}

      {additionalOptions && additionalOptions.length > 0 ? (
        <>
          <IconButton
            icon="dots"
            label="Additional Options"
            onClick={() => setVisible(prev => !prev)}
            className="presetOptions__additional-toggle"
          />
          {visible && (
            <div
              className="presetOptions__list"
              onMouseLeave={() => setVisible(false)}
            >
              {additionalOptions.map(item => (
                <button key={item.label} type="button" onClick={item.callback}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </StyledPresetOptions>
  );
};

export default PresetOptions;
