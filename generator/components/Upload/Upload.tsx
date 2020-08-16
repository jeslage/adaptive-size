import React from "react";
import styled from "styled-components";

import Icon from "../Icon";

const StyledUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: none;
  text-transform: uppercase;
  margin: 1em 0;
  padding: 12px 20px;
  text-align: center;
  font-weight: bold;
  font-size: var(--fontSizes-s);
  cursor: pointer;
  border-radius: 30px;
  border: 1px solid var(--colors-lightest);
  color: var(--colors-lightest);
  transition: background 0.2s ease-in-out;

  svg {
    height: 15px;
    width: 15px;
    fill: var(--colors-lightest);
    margin-right: var(--spacings-s);
  }

  &:active,
  &:focus {
    color: var(--colors-lightest);
  }

  &:hover {
    background: var(--colors-black);
  }

  &[disabled] {
    opacity: 0.3;
  }

  input[type="file"] {
    display: none;
  }
`;

const Upload = ({ onChange, multiple = false, label = "Upload", accept }) => {
  return (
    <StyledUpload>
      <Icon type="upload" />
      <span>{label}</span>

      <input
        type="file"
        accept={accept}
        onChange={onChange}
        multiple={multiple}
      />
    </StyledUpload>
  );
};

export default Upload;
