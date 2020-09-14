import React, { useState, useEffect } from "react";

import { encodeConfig, decodeConfig } from "../../helper";

import { PresetsContextProps, Preset } from "./definitions";
import { Settings } from "../../state";

const defaultPresetContext = {
  presets: [],
  addPreset: () => {},
  removePreset: () => {}
};

export const PresetsContext = React.createContext<PresetsContextProps>(
  defaultPresetContext
);

const PresetsProvider = ({ children }) => {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    const initialPresets = window.localStorage.getItem("presets");

    if (initialPresets) setPresets(decodeConfig(initialPresets));
  }, []);

  // Set cookies
  useEffect(() => {
    window.localStorage.setItem("presets", encodeConfig(presets));
  }, [presets]);

  const addPreset = (settings: Settings) => {
    setPresets((prev) => [
      {
        dateCreated: Date.now(),
        settings
      },
      ...prev
    ]);
  };

  const removePreset = (timestamp) => {
    setPresets((prev) => prev.filter((i) => i.dateCreated !== timestamp));
  };

  return (
    <PresetsContext.Provider
      value={{
        presets,
        addPreset,
        removePreset
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
};

export const PresetsConsumer = PresetsContext.Consumer;

export default PresetsProvider;
