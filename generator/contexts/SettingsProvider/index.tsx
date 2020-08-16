import React, { useEffect, FC, useReducer } from "react";

import { encodeConfig, decodeConfig } from "../../helper";
import {
  SettingsContextProps,
  SettingsProviderProps,
  SettingsGlobals,
  Settings,
  SettingsItem,
  SettingsFont,
  SettingsProject
} from "./definitions";

import { reducer } from "./reducer";

export const defaultConfig: Settings = {
  project: {
    name: "My Project",
    text:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.The five boxing wizards jump quickly. How quickly daft jumping zebras vex. Quick zephyrs blow, vexing daft Jim. Sphinx of black quartz, judge my vow."
  },
  fonts: [],
  breakpoints: [375, 1440],
  steps: 12,
  items: [
    {
      id: "YYzLC",
      name: "Headline",
      sizes: [20, 40],
      lineHeights: [1, 1.5],
      letterSpacing: 0,
      font: undefined
    },
    {
      id: "AGPEs",
      name: "Copy",
      sizes: [12, 24],
      lineHeights: [1, 1.5],
      letterSpacing: 0,
      font: undefined
    }
  ]
};

const defaultContextProps: SettingsContextProps = {
  project: defaultConfig.project,
  fonts: defaultConfig.fonts,
  steps: defaultConfig.steps,
  breakpoints: defaultConfig.breakpoints,
  items: defaultConfig.items,
  updateGlobals: () => null,
  resetSettings: () => null,
  updateItem: () => null,
  addItem: () => null,
  removeItem: () => null,
  updateProject: () => null,
  updateAllSettings: () => null,
  addFont: () => null,
  removeFont: () => null,
  addBreakpoint: () => null,
  removeBreakpoint: () => null
};

export const SettingsContext = React.createContext<SettingsContextProps>(
  defaultContextProps
);

const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [{ breakpoints, steps, fonts, items, project }, dispatch] = useReducer(
    reducer,
    {
      ...defaultConfig
    }
  );

  useEffect(() => {
    const currentConfig = window.localStorage.getItem("currentConfig");

    if (currentConfig) {
      dispatch({
        type: "UPDATE_SETTINGS",
        payload: decodeConfig(currentConfig)
      });
    }
  }, []);

  // Update route query params based on settings
  useEffect(() => {
    const replaceLocalStorage = () => {
      window.localStorage.setItem(
        "currentConfig",
        encodeConfig({ fonts, breakpoints, steps, items })
      );
    };

    let id = setTimeout(replaceLocalStorage, 400);
    return () => clearTimeout(id);
  }, [breakpoints, steps, fonts, items]);

  // Update globals
  const updateGlobals = (obj: Partial<SettingsGlobals>) => {
    return dispatch({
      type: "UPDATE_GLOBALS",
      payload: obj
    });
  };

  const updateProject = (obj: Partial<SettingsProject>) => {
    return dispatch({
      type: "UPDATE_DATA",
      payload: { key: "project", data: obj }
    });
  };

  // Update item
  const updateItem = (id: string, obj: Partial<SettingsItem>) => {
    return dispatch({ type: "UPDATE_ITEM", payload: { id, item: obj } });
  };

  const addItem = () => dispatch({ type: "ADD_ITEM" });

  const addBreakpoint = () => dispatch({ type: "ADD_GLOBAL_BREAKPOINT" });

  const removeBreakpoint = (index: number) => {
    dispatch({ type: "REMOVE_GLOBAL_BREAKPOINT", payload: { index } });
  };

  const removeItem = (id: string) => {
    return dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const addFont = (font: Pick<SettingsFont, "name" | "extension" | "base">) => {
    return dispatch({ type: "ADD_FONT", payload: { font } });
  };

  const removeFont = (id: string) => {
    return dispatch({ type: "REMOVE_FONT", payload: { id } });
  };

  const updateAllSettings = (obj: Settings) => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: obj
    });
  };

  // Reset text settings
  const resetSettings = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: defaultConfig
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        project,
        breakpoints,
        steps,
        items,
        updateGlobals,
        addItem,
        addBreakpoint,
        removeBreakpoint,
        removeItem,
        updateItem,
        updateProject,
        updateAllSettings,
        resetSettings,
        removeFont,
        addFont,
        fonts
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsProvider;
