import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";

import { SettingsContext } from "../../contexts";
import { Settings } from "../../contexts/SettingsProvider/definitions";

import Upload from "../Upload";

const ImportConfig = () => {
  const { addToast } = useToasts();

  const { updateAllSettings } = useContext(SettingsContext);

  const handleImport = (e) => {
    const file = e.target.files[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (item) => {
        if (item.target?.result) {
          const jsonConfig: Settings = JSON.parse(
            atob(item.target.result.toString().split(";base64,")[1])
          );

          if (
            jsonConfig.breakpoints &&
            jsonConfig.steps &&
            jsonConfig.fonts &&
            jsonConfig.items
          ) {
            updateAllSettings(jsonConfig);

            return addToast("Imported config successfully", {
              appearance: "success",
              autoDismiss: true,
            });
          }

          return addToast("Invalid Config File", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      };
    } catch (err) {
      addToast("Sorry, something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Upload
      label="Import"
      onChange={handleImport}
      multiple={false}
      accept="application/json"
    />
  );
};

export default ImportConfig;
