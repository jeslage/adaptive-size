import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import Head from "next/head";
import pascalcase from "pascalcase";

import { PresetsContext, SettingsContext } from "../../contexts";
import { defaultConfig } from "../../contexts/SettingsProvider";
import { Settings } from "../../contexts/SettingsProvider/definitions";

import Button from "../Button";
import Preset from "../Preset";

import StyledPresetList from "./PresetList.style";
import { decodeConfig, getFontStyle } from "../../helper";
import TextType from "../TextType";

const PresetList = () => {
  const { addToast } = useToasts();
  const { updateAllSettings } = useContext(SettingsContext);
  const { addPreset, removePreset, presets } = useContext(PresetsContext);

  const handleExport = async (item: Settings) => {
    try {
      const json = await JSON.stringify(item);
      var blob = new Blob([json], { type: "application/json" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        `${pascalcase(
          item.project.name
        )}_adaptive-size-config_${Date.now()}.json`
      );

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast("Exported config successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <StyledPresetList>
      <div className="presetList__presets">
        {presets.length > 0 ? (
          presets.map((preset) => {
            const decodedSettings: {
              dateCreated: number;
              settings: Settings;
            } = typeof preset === "string" ? decodeConfig(preset) : preset;

            const {
              dateCreated,
              settings: { items, fonts, breakpoints, steps, project },
            } = decodedSettings;

            const fontNumber = fonts?.length || 0;
            const fontLabel = fontNumber === 1 ? "Font" : "Fonts";

            return (
              <React.Fragment key={dateCreated}>
                <Head>
                  {fonts?.map((font) => (
                    <style
                      key={font.id}
                      dangerouslySetInnerHTML={{ __html: getFontStyle(font) }}
                    />
                  ))}
                </Head>

                <Preset
                  name={`${project.name} – ${fontNumber} ${fontLabel}`}
                  dateCreated={dateCreated}
                  onClick={() => {
                    addToast("Settings updated", {
                      appearance: "success",
                      autoDismiss: true,
                    });

                    updateAllSettings(preset.settings);
                  }}
                  options={[
                    {
                      label: "Export config",
                      icon: "save",
                      callback: () => {
                        handleExport(decodedSettings.settings);
                      },
                    },
                    {
                      label: "Remove preset",
                      icon: "remove",
                      callback: () => {
                        addToast("Preset removed successfully", {
                          appearance: "success",
                          autoDismiss: true,
                        });
                        removePreset(dateCreated);
                      },
                    },
                  ]}
                >
                  {items &&
                    items.map((item) => (
                      <TextType
                        key={item.id}
                        breakpoints={breakpoints}
                        steps={steps}
                        {...item}
                        text={project.text || defaultConfig.project.text}
                      />
                    ))}
                </Preset>
              </React.Fragment>
            );
          })
        ) : (
          <Button onClick={() => addPreset()} iconBefore="plus">
            Add your first preset
          </Button>
        )}
      </div>

      {presets.length > 0 ? (
        <div className="presetList__bar">
          <Button onClick={() => addPreset()} iconBefore="plus">
            Add another preset
          </Button>
        </div>
      ) : (
        ""
      )}
    </StyledPresetList>
  );
};

export default PresetList;
