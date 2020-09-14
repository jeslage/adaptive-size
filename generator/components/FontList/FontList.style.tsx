import styled from "styled-components";

import Fieldset from "../Fieldset";

const StyledFontList = styled(Fieldset)`
  margin: var(--spacings-s) 0 var(--spacings-xs);
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
    margin: 0 0 var(--spacings-xs);
    padding: var(--spacings-s);
    width: 100%;

    &:hover .fontList__remove {
      display: block;
    }

    span {
      margin: 0;
      padding: 0;
      font-size: 25px;
      word-break: break-all;
    }
  }
`;

export default StyledFontList;
