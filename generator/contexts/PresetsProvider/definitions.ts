import { Settings } from "../../state";

export type Preset = {
  dateCreated: number;
  settings: Settings;
};

export interface PresetsContextProps {
  presets: Preset[];
  addPreset: () => void;
  removePreset: (timestamp: number) => void;
}
