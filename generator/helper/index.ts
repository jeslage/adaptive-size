import { Font } from "../state";

export const getFontExtension = (filename: string) => {
  const match = filename.split(".");

  return match.length > 1
    ? { name: match[0], extension: match[1] }
    : { name: match[0], extension: "woff" };
};

export const encodeConfig = (obj) => {
  return btoa(
    encodeURIComponent(JSON.stringify(obj)).replace(
      /%([0-9A-F]{2})/g,
      //@ts-ignore
      (_, p1) => String.fromCharCode("0x" + p1)
    )
  );
};

export const decodeConfig = (obj) => {
  return JSON.parse(
    decodeURIComponent(
      atob(obj)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
  );
};

export const getFontStyle = (font?: Font) => {
  return font
    ? `@font-face { font-family: '${font.id}'; src: url(${font.base}) format('${font.extension}'); font-weight: normal; font-style: normal; }`
    : "";
};

export const convertArrayToObject = (array: any[], key: string) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};
