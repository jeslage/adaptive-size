import React, { FC, useEffect, useRef } from "react";
import * as clipboard from "clipboard-polyfill";
import { useToasts } from "react-toast-notifications";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-scss";

import Icon from "../Icon";
import StyledCode from "./Code.style";

export interface CodeProps {
  language?: "javascript" | "css" | "scss";
  code: string;
}

const Code: FC<CodeProps> = ({ language = "css", code }) => {
  const { addToast } = useToasts();

  const codeBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const copyCode = () => {
    addToast("Copied Successfully", {
      appearance: "success",
      autoDismiss: true
    });

    if (codeBox.current) {
      clipboard.writeText(codeBox.current.innerText);
    }
  };

  return (
    <StyledCode>
      <div className="code__content">
        <button
          type="button"
          onClick={copyCode}
          className="code__copyButton"
          aria-label="Copy"
          title="Copy"
        >
          <Icon type="copy" />
        </button>
        <pre>
          <code className={`language-${language}`} ref={codeBox}>
            {code}
          </code>
        </pre>
      </div>
    </StyledCode>
  );
};

export default Code;
