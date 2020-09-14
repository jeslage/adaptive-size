import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import Head from "next/head";

import { useUpdateState, defaultConfig, Settings } from "../../state";
import { decodeConfig, getFontStyle } from "../../helper";
import { PresetsContext } from "../../contexts";

import useImportExport from "../../hooks/useImportExport";

import Button from "../Button";
import Preset from "../Preset";
import TextType from "../TextType";

import StyledPresetList from "./PresetList.style";

const PresetList = () => {
  const { addToast } = useToasts();

  const { settings, updateAllSettings } = useUpdateState();
  const { addPreset, removePreset, presets } = useContext(PresetsContext);

  const { exportConfig } = useImportExport();

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
              settings: { items, fonts, breakpoints, steps, project }
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
                      autoDismiss: true
                    });

                    updateAllSettings(preset.settings);
                  }}
                  options={[
                    {
                      label: "Export config",
                      icon: "save",
                      callback: () => {
                        exportConfig(decodedSettings.settings);
                      }
                    },
                    {
                      label: "Remove preset",
                      icon: "remove",
                      callback: () => {
                        addToast("Preset removed successfully", {
                          appearance: "success",
                          autoDismiss: true
                        });
                        removePreset(dateCreated);
                      }
                    }
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
          <Button onClick={() => addPreset(settings)} icon="plus">
            Add your first preset
          </Button>
        )}
      </div>

      {presets.length > 0 ? (
        <div className="presetList__bar">
          <Button onClick={() => addPreset(settings)} icon="plus">
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
