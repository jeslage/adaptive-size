import pascalcase from "pascalcase";

import { Item, Font } from "../../../state";

const join = (item) => `[${item.join(", ")}]`;

const getJSTextType = (item: Item, font?: Font) => {
  const { name, sizes, lineHeights, letterSpacing } = item;

  const n = pascalcase(name);
  const s = join(sizes);
  const lh = join(lineHeights);
  const ls = letterSpacing > 0 ? `letter-spacing: ${letterSpacing}px;\n\t` : "";

  const ff = font ? `font-family: '${font.name}', sans-serif;\n\t` : "";

  const additional = `${ff}${ls}`;

  return `export const ${n} = styled.p\`\n\t${additional}\${adaptiveSize({\n\t\tsizes: ${s},\n\t\tlineHeights: ${lh},\n\t\t...globals\n\t})}\n\`;`;
};

const getJS = (
  items: Item[],
  fonts: Font[],
  steps: number,
  breakpoints: number[]
) => {
  const codeBlock = items
    .map((item) =>
      getJSTextType(
        item,
        fonts.find((i) => i.id === item.font)
      )
    )
    .join("\n\n");

  const w = join(breakpoints);

  const imports = `import styled from "styled-components";\nimport adaptiveSize from "adaptive-size";\n\nconst globals = {\n\tsteps: ${steps},\n\tbreakpoints: ${w}\n}\n\n`;

  return `${imports}${codeBlock}`;
};

export default getJS;
