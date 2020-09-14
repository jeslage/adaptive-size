import React from "react";

import { useFontsState } from "../../state";

import { getFontExtension } from "../../helper";

import Upload from "../Upload";
import IconButton from "../IconButton";

import StyledFontList from "./FontList.style";

const FontList = () => {
  const { fonts, addFont, removeFont } = useFontsState();

  const handleFileUpload = (e: any) => {
    [...e.target.files].forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (item) => {
        if (item.target?.result) {
          addFont({
            ...getFontExtension(file.name),
            base: item.target.result.toString()
          });
        }
      };
    });
  };

  return (
    <StyledFontList label="Fonts">
      {fonts && (
        <div className="fontList__list">
          {fonts.map((font) => (
            <div className="fontList__font" key={font.id}>
              <span
                style={{
                  fontFamily: `'${font.id}', sans-serif`
                }}
              >
                {font.name}
              </span>

              <IconButton
                className="fontList__remove"
                onClick={() => removeFont(font.id)}
                label="Remove"
                icon="remove"
              />
            </div>
          ))}
        </div>
      )}

      <Upload
        onChange={handleFileUpload}
        accept=".woff, .woff2"
        label="Upload font"
      />
    </StyledFontList>
  );
};

export default FontList;
