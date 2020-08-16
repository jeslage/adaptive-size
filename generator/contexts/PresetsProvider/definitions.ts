import { Settings } from "../SettingsProvider/definitions";

export type Preset = {
  dateCreated: number;
  settings: Settings;
};

export interface PresetsContextProps {
  presets: Preset[];
  addPreset: () => void;
  removePreset: (timestamp: number) => void;
}
