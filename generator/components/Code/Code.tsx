import React, { FC, useEffect, useRef, useState } from "react";
import * as clipboard from "clipboard-polyfill";
import { useToasts } from "react-toast-notifications";
import Prism from "prismjs";

import Icon from "../Icon";
import StyledCode from "./Code.style";

const loadLanguage = async (language: "javascript" | "css") => {
  if (language === "javascript") {
    await import(
      /* webpackChunkName: "code-js" */ "prismjs/components/prism-javascript"
    );
  } else if (language === "css") {
    await import(
      /* webpackChunkName: "code-css" */ "prismjs/components/prism-css"
    );
  }
};

export interface CodeProps {
  language?: "javascript" | "css";
  code: string;
}

const Code: FC<CodeProps> = ({ language = "css", code }) => {
  const { addToast } = useToasts();

  const [init, setInit] = useState(false);
  const codeBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!init) {
      loadLanguage(language);
      setInit(true);
    }
    Prism.highlightAll();
  }, []);

  useEffect(() => Prism.highlightAll(), [code]);

  const copyCode = () => {
    addToast("Copied Successfully", {
      appearance: "success",
      autoDismiss: true,
    });

    if (codeBox.current) {
      clipboard.writeText(codeBox.current.innerText);
    }
  };

  return (
    <StyledCode init={init}>
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
