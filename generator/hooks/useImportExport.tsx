import { useToasts } from "react-toast-notifications";
import pascalcase from "pascalcase";

import { useUpdateState, Settings } from "../state";

const useImportExport = (settings?: Settings) => {
  const { updateAllSettings } = useUpdateState();
  const { addToast } = useToasts();

  const exportConfig = async () => {
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
  };

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

  const exportSketchConfig = async () => {
    if (!settings) return;

    const { project, breakpoints, items } = settings;

    const buildSketchTypes = () => {
      const arr: any[] = [];

      items.forEach((item) => {
        breakpoints.forEach((breakpoint, index) => {
          arr.push({
            name: `${item.name} @ ${breakpoint}px`,
            font: null,
            size: item.sizes[index],
            color: { red: 0, green: 0, blue: 0, alpha: 1 },
            alignment: 0,
            spacing: item.letterSpacing,
            lineHeight: item.sizes[index] * item.lineHeights[index],
            paragraphSpacing: 0,
            textTransform: 0,
            strikethrough: null,
            underline: null
          });
        });
      });

      console.log(arr);

      return { styles: arr };
    };

    try {
      const json = await JSON.stringify(buildSketchTypes());

      var blob = new Blob([json], { type: "application/json" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        `${pascalcase(project.name)}_text-types_${Date.now()}.json`
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
  };
  return { importConfig, exportConfig, exportSketchConfig };
};

export default useImportExport;
