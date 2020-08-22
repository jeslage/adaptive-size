import { Item, Font } from "../../../state";

const getTextType = (item: Item, font?: Font) => {
  const { name, sizes, lineHeights, letterSpacing } = item;
  const n = name.replace(" ", "-").toLowerCase();

  const ff = font?.name ? `\n\tfont-family: '${font?.name}', sans-serif;` : "";
  const ls = letterSpacing > 0 ? `\n\tletter-spacing: ${letterSpacing}px;` : "";

  const fs = sizes.join(" ");
  const lh = lineHeights.join(" ");

  const as = `@include adaptive-size((\n\t\tsizes: ${fs},\n\t\tlineHeights: ${lh}\n\t))`;

  return `.${n} {${ff}${ls}\n\t${as};\n}`;
};

const getSCSS = (
  items: Item[],
  fonts: Font[],
  steps: number,
  breakpoints: number[]
) => {
  const imports = `@import "adaptive-size-scss";\n\n`;

  const bp = breakpoints.join(" ");
  const globals = `$as-globals: (\n\tbreakpoints: ${bp},\n\tsteps: ${steps}\n);\n\n`;

  const codeBlock = items.map((item) => {
    const font = fonts.find((i) => i.id === item.font);
    return getTextType(item, font);
  });

  return `${imports}${globals}${codeBlock.join("\n\n")}`;
};

export default getSCSS;
