import React from "react";
import styled from "styled-components";

import { getFontExtension } from "../../helper";

import Upload from "../Upload";
import IconButton from "../IconButton";
import Fieldset from "../Fieldset";
import { useFontsState } from "../../state";

const StyledFontList = styled(Fieldset)`
  margin-top: var(--spacings-m);
  width: 100%;

  .fontList__remove {
    display: none;
    position: absolute;
    top: 50%;
    right: var(--spacings-s);
    transform: translateY(-50%);
  }

  .fontList__list {
    display: flex;
    flex-direction: column;
  }

  .fontList__font {
    position: relative;
    background: var(--colors-white);
    color: var(--colors-black);
    border-radius: var(--spacings-xs);
    margin: var(--spacings-s) 0;
    padding: var(--spacings-s);
    width: 100%;

    &:hover .fontList__remove {
      display: block;
    }

    span {
      margin: 0;
      padding: 0;
      font-size: 25px;
    }
  }
`;

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
      <Upload onChange={handleFileUpload} accept=".woff" label="Upload font" />
    </StyledFontList>
  );
};

export default FontList;
