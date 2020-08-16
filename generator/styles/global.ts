import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --colors-white: #fff;
    --colors-black: #080808;
    --colors-darkest: #181818;
    --colors-dark: #202020;
    --colors-light: #808080;
    --colors-lightest: #c9c9c9;
    --spacings-xxs: 4px;
    --spacings-xs: 8px;
    --spacings-s: 16px;
    --spacings-m: 20px;
    --spacings-l: 40px;
    --spacings-xl: 60px;
    --fontSizes-s: 10px;
    --fontSizes-m: 12px;
    --fontSizes-l: 14px;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;
    margin: 0;
    padding: 0;
    background: var(--colors-dark);
    color: var(--colors-lightest);
  }

  small {
    font-size: var(--fontSizes-s);
  }

  html,
  body,
  div,
  article,
  section,
  main,
  footer,
  header,
  form,
  fieldset,
  legend,
  pre,
  code,
  p,
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  textarea,
  input[type='email'],
  input[type='number'],
  input[type='password'],
  input[type='tel'],
  input[type='text'],
  input[type='url'] {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
