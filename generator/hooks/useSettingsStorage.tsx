import { useEffect } from "react";
import { decodeConfig, encodeConfig } from "../helper";

import { useUpdateState } from "../state";

const useSettingsStorage = () => {
  const { settings, updateAllSettings } = useUpdateState();

  useEffect(() => {
    const currentConfig = window.localStorage.getItem("currentConfig");

    if (currentConfig) {
      updateAllSettings(decodeConfig(currentConfig));
    }
  }, []);

  useEffect(() => {
    const replaceLocalStorage = () => {
      window.localStorage.setItem("currentConfig", encodeConfig(settings));
    };

    let id = setTimeout(replaceLocalStorage, 400);
    return () => clearTimeout(id);
  }, [settings]);
};

export default useSettingsStorage;
