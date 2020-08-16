import React, { useState, useContext, FC } from "react";

import { SettingsContext } from "../../../../contexts";

import Range from "../../../Range";
import Counter from "../../../Counter";

import StyledInlineSettings from "./InlineSettings.style";
import { SettingsItem } from "../../../../contexts/SettingsProvider/definitions";
import Icon from "../../../Icon";
import Select from "../../../Select";
import Fieldset from "../../../Fieldset";

export type InlineSettingsProps = {
  item: SettingsItem;
};

const InlineSettings: FC<InlineSettingsProps> = ({ item, children }) => {
  const [isEntered, setIsEntered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { updateItem, fonts, breakpoints } = useContext(SettingsContext);

  return (
    <StyledInlineSettings
      isOpen={isOpen}
      isEntered={isEntered}
      onMouseEnter={() => setIsEntered(true)}
      onMouseLeave={() => {
        setIsEntered(false);
        setIsOpen(false);
      }}
    >
      <div className="inlineSettings__setting">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="inlineSettings__button"
        >
          <Icon type="settings" />
        </button>

        {isOpen && (
          <div className="inlineSettings__content">
            <Select
              iconBefore="fontFamily"
              placeholder={
                fonts && fonts.length === 0
                  ? "Upload fonts first"
                  : "Select font"
              }
              initialValue={item.font || ""}
              name="font"
              disabled={fonts && fonts.length === 0}
              options={
                fonts && fonts.length > 0
                  ? fonts.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
              onChange={(val) => updateItem(item.id, { font: val })}
            />

            <Counter
              iconBefore="letterSpacing"
              value={item.letterSpacing}
              min={0}
              max={10}
              steps={1}
              onChange={(val) => {
                updateItem(item.id, {
                  letterSpacing: val,
                });
              }}
            />

            {breakpoints.map((element, index) => (
              <Fieldset label={`@ ${element}px`} key={index}>
                <Range
                  iconBefore="fontSize"
                  suffix="px"
                  value={item.sizes[index]}
                  min={1}
                  max={200}
                  steps={1}
                  onChange={(val) =>
                    updateItem(item.id, {
                      sizes: item.sizes.map((e, j) => {
                        if (j !== index) return e;
                        return val;
                      }),
                    })
                  }
                />

                <Counter
                  iconBefore="lineHeight"
                  value={item.lineHeights[index]}
                  min={0.1}
                  max={5}
                  steps={0.1}
                  onChange={(val) =>
                    updateItem(item.id, {
                      lineHeights: item.lineHeights.map((e, j) => {
                        if (j !== index) return e;
                        return Math.round(val * 10) / 10;
                      }),
                    })
                  }
                />
              </Fieldset>
            ))}
          </div>
        )}
      </div>

      {children}
    </StyledInlineSettings>
  );
};

export default InlineSettings;
