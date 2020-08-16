import React, { useState, useEffect, useContext } from "react";

import { encodeConfig, decodeConfig } from "../../helper";
import { SettingsContext } from "../SettingsProvider";

import { PresetsContextProps, Preset } from "./definitions";

const defaultPresetContext = {
  presets: [],
  addPreset: () => {},
  removePreset: () => {},
};

export const PresetsContext = React.createContext<PresetsContextProps>(
  defaultPresetContext
);

const PresetsProvider = ({ children }) => {
  const [presets, setPresets] = useState<Preset[]>([]);

  const { breakpoints, steps, fonts, items, project } = useContext(
    SettingsContext
  );

  useEffect(() => {
    const initialPresets = window.localStorage.getItem("presets");

    if (initialPresets) {
      setPresets(decodeConfig(initialPresets));
    }
  }, []);

  // Set cookies
  useEffect(() => {
    window.localStorage.setItem("presets", encodeConfig(presets));
  }, [presets]);

  const addPreset = () => {
    const obj = {
      dateCreated: Date.now(),
      settings: { fonts, breakpoints, steps, items, project },
    };

    setPresets((prev) => [obj, ...prev]);
  };

  const removePreset = (timestamp) => {
    const newPresets = presets.filter(
      (preset) => preset.dateCreated !== timestamp
    );

    setPresets(newPresets);
  };

  return (
    <PresetsContext.Provider
      value={{
        presets,
        addPreset,
        removePreset,
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
};

export const PresetsConsumer = PresetsContext.Consumer;

export default PresetsProvider;
