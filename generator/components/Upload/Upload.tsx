import React from "react";
import styled, { css } from "styled-components";

import Icon from "../Icon";

type UploadProps = {
  variant?: "primary" | "outlined";
  label?: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
};

const StyledUpload = styled.label<Pick<UploadProps, "variant">>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: var(--colors-darkest);
  text-transform: uppercase;
  margin: 0 0 var(--spacings-xs);
  padding: 12px 20px;
  text-align: center;
  font-weight: bold;
  font-size: var(--fontSizes-s);
  cursor: pointer;
  border-radius: var(--spacings-xs);
  border: none;
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

  ${(props) =>
    props.variant === "outlined" &&
    css`
      border: 1px solid var(--colors-light);
      background: none;

      &:hover {
        border-color: var(--colors-light);
      }
    `}
`;

const Upload = ({
  onChange,
  multiple = false,
  label = "Upload",
  accept,
  variant
}: UploadProps) => {
  return (
    <StyledUpload variant={variant}>
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
