import { useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import pascalcase from "pascalcase";

import { useUpdateState, Settings } from "../state";

const useImportExport = (settings?: Settings) => {
  const { updateAllSettings } = useUpdateState();
  const { addToast } = useToasts();

  const exportConfig = useCallback(async () => {
    if (!settings) return;

    const { project, breakpoints, steps, items, fonts } = settings;

    try {
      const json = await JSON.stringify({
        project,
        breakpoints,
        steps,
        items,
        fonts
      });

      var blob = new Blob([json], { type: "application/json" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        `${pascalcase(project.name)}_adaptive-size-config_${Date.now()}.json`
      );

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast("Exported config successfully", {
        appearance: "success",
        autoDismiss: true
      });
    } catch (err) {
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true
      });
    }
  }, []);

  const importConfig = (e) => {
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
              autoDismiss: true
            });
          }

          return addToast("Invalid Config File", {
            appearance: "error",
            autoDismiss: true
          });
        }
      };
    } catch (err) {
      addToast("Sorry, something went wrong", {
        appearance: "error",
        autoDismiss: true
      });
    }
  };

  return { importConfig, exportConfig };
};

export default useImportExport;
