import React from "react";

import useImportExport from "../../hooks/useImportExport";

import Upload from "../Upload";

const ImportConfig = () => {
  const { importConfig } = useImportExport();

  return (
    <Upload
      label="Import"
      onChange={importConfig}
      multiple={false}
      accept="application/json"
    />
  );
};

export default ImportConfig;
