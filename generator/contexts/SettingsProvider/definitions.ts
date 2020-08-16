export type SettingsGlobals = {
  steps: number;
  breakpoints: number[];
};

export type SettingsProject = {
  text: string;
  name: string;
};

export type SettingsItem = {
  id: string;
  name: string;
  sizes: number[];
  lineHeights: number[];
  letterSpacing: number;
  font?: string;
};

export type SettingsFont = {
  id: string;
  name: string;
  extension: string;
  base: string;
};

export type Settings = {
  project: SettingsProject;
  fonts?: SettingsFont[];
  items: SettingsItem[];
} & SettingsGlobals;

export type SettingsContextProps = {
  project: SettingsProject;
  fonts?: SettingsFont[];
  steps: number;
  breakpoints: number[];
  items: SettingsItem[];
  updateProject: (obj: Partial<SettingsProject>) => void;
  updateGlobals: (obj: Partial<SettingsGlobals>) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, obj: Partial<SettingsItem>) => void;
  resetSettings: () => void;
  addBreakpoint: () => void;
  removeBreakpoint: (index: number) => void;
  updateAllSettings: (obj: Settings) => void;
  addFont: ({
    name,
    base,
    extension,
  }: Pick<SettingsFont, "base" | "extension" | "name">) => void;
  removeFont: (id: string) => void;
};

export type SettingsProviderProps = {
  queryConfig?: Partial<Settings>;
};

export type ReducerState = Settings;
export type ReducerPayload = { payload?: any; type: string };
