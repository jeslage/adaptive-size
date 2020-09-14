import React from "react";

import { useUpdateState } from "../../../state";

import Code from "../../Code";

import getJS from "../../Code/helper/javascript";
import getSCSS from "../../Code/helper/scss";

import { SidebarContent } from "../Sidebar";
import { Tabs } from "../../Tabs";
import Tab from "../../Tabs/Tab";

const CodeTab = () => {
  const { settings } = useUpdateState();
  const { fonts, items, breakpoints, steps } = settings;

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
