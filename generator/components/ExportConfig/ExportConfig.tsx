import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import pascalcase from "pascalcase";

import { SettingsContext } from "../../contexts";

import Button from "../Button";

const ExportConfig = () => {
  const { addToast } = useToasts();

  const { breakpoints, steps, items, fonts, project } = useContext(
    SettingsContext
  );

  const handleExport = async () => {
    try {
      const json = await JSON.stringify({
        project,
        breakpoints,
        steps,
        items,
        fonts,
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
        autoDismiss: true,
      });
    } catch (err) {
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Button onClick={handleExport} iconBefore="save">
      Export
    </Button>
  );
};

export default ExportConfig;
