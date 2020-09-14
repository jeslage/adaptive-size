import styled from "styled-components";

const StyledCode = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .code__content {
    position: relative;
  }

  .code__copyButton {
    position: absolute;
    z-index: 1;
    top: 15px;
    right: 10px;
    color: #000;
    background: none;
    border: none;
    cursor: pointer;
    outline: 0;

    svg {
      width: 15px;
      height: auto;
      fill: #f4f4f4;
      margin-right: 5px;
    }
  }

  pre {
    margin: 0;
  }

  code[class*="language-"],
  pre[class*="language-"] {
    font-family: "Courier New", Courier, monospace;
    font-weight: 600;
    position: relative;
    direction: ltr;
    text-align: left;
    background: none;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    font-size: var(--fontSizes-m);
    background: var(--colors-black);
    tab-size: 4;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: var(--spacings-s);
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    color: #fff;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #7c7c7c;
  }

  .token.punctuation {
    color: #c5c8c6;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.keyword,
  .token.tag {
    color: #96cbfe;
  }

  .token.class-name {
    color: #ffffb6;
    text-decoration: underline;
  }

  .token.boolean,
  .token.constant {
    color: #99cc99;
  }

  .token.symbol,
  .token.deleted {
    color: #f92672;
  }

  .token.number {
    color: #ff73fd;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a8ff60;
  }

  .token.variable {
    color: #c6c5fe;
  }

  .token.operator {
    color: #ededed;
  }

  .token.entity {
    color: #ffffb6;
    cursor: help;
  }

  .token.url {
    color: #96cbfe;
  }

  .language-css .token.string,
  .style .token.string {
    color: #87c38a;
  }

  .token.atrule,
  .token.attr-value {
    color: #f9ee98;
  }

  .token.function {
    color: #dad085;
  }

  .token.regex {
    color: #e9c062;
  }

  .token.important {
    color: #fd971f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }
`;

export default StyledCode;
