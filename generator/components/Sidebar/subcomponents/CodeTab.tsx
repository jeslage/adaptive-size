import React from "react";

import {
  useFontsState,
  useItemsState,
  useBreakpointsState,
  useStepsState
} from "../../../state";

import Code from "../../Code";
import getJS from "../../Code/helper/javascript";
import getSCSS from "../../Code/helper/scss";

import { SidebarContent } from "../Sidebar";
import { Tabs } from "../../Tabs";
import Tab from "../../Tabs/Tab";

const CodeTab = () => {
  const { fonts } = useFontsState();
  const { items } = useItemsState();
  const { breakpoints } = useBreakpointsState();
  const { steps } = useStepsState();

  return (
    <SidebarContent>
      <Tabs>
        <Tab title="CSS in JS">
          <Code
            language="javascript"
            code={getJS(items, fonts, steps, breakpoints)}
          />
        </Tab>

        <Tab title="SCSS">
          <Code
            language="scss"
            code={getSCSS(items, fonts, steps, breakpoints)}
          />
        </Tab>
      </Tabs>
    </SidebarContent>
  );
};

export default CodeTab;
