import React from "react";
import pascalcase from "pascalcase";

import {
  useFontsState,
  useItemsState,
  useBreakpointsState,
  useStepsState
} from "../../../state";

import Code from "../../Code";
import { SidebarContent } from "../Sidebar";

const join = (item) => `[${item.join(", ")}]`;

const getJS = (item, fonts) => {
  const n = pascalcase(item.name);
  const s = join(item.sizes);
  const lh = join(item.lineHeights);
  const ls =
    item.letterSpacing && item.letterSpacing > 0
      ? `\n\tletter-spacing: ${item.letterSpacing}px;`
      : "";

  const ff = item.font
    ? `\n\tfont-family: '${
        fonts.find((i) => i.id === item.font).name
      }', sans-serif;`
    : "";

  const additional = `${ff}${ls}\n\n\t`;

  return `export const ${n} = styled.p\`${additional}\${adaptiveSize({\n\t\tsizes: ${s},\n\t\tlineHeights: ${lh},\n\t\t...globals\n\t})}\n\`;`;
};

const CodeTab = () => {
  const { fonts } = useFontsState();
  const { items } = useItemsState();
  const { breakpoints } = useBreakpointsState();
  const { steps } = useStepsState();

  const codeBlock = items.map((item) => getJS(item, fonts)).join("\n\n");
  const w = join(breakpoints);
  const imports = `import styled from "styled-components";\nimport adaptiveSize from "adaptive-size";\n\nconst globals = {\n\tsteps: ${steps},\n\tbreakpoints: ${w}\n}\n\n`;

  return (
    <SidebarContent>
      <Code language="javascript" code={`${imports}${codeBlock}`} />
    </SidebarContent>
  );
};

export default CodeTab;
