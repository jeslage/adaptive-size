import { Settings } from "../../state";

export type Preset = {
  dateCreated: number;
  settings: Settings;
};

export interface PresetsContextProps {
  presets: Preset[];
  addPreset: (settings: Settings) => void;
  removePreset: (timestamp: number) => void;
}
