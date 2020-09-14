import React, { FC, ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { PresetsProvider } from "../../contexts";

import PresetList from "../PresetList";
import Tab from "../Tabs/Tab";

import CodeTab from "./subcomponents/CodeTab";
import SettingsTab from "./subcomponents/SettingsTab";
import ProjectTab from "./subcomponents/ProjectTab";
import LoadingIndicator from "../LoadingIndicator";

import StyledSidebar, { StyledSidebarContent } from "./Sidebar.style";

const Tabs = dynamic(() => import("../Tabs/Tabs"), {
  ssr: false,
  loading: () => <LoadingIndicator />
});

export const SidebarInner = styled.div`
  padding: var(--spacings-s);
`;

type SidebarContent = {
  children: ReactNode;
  hideBar?: boolean;
  bar?: ReactNode;
};

export const SidebarContent = ({
  children,
  hideBar = false,
  bar
}: SidebarContent) => (
  <StyledSidebarContent>
    <div className="sidebar__panel">{children}</div>
    {!hideBar && bar && <div className="sidebar__bar">{bar}</div>}
  </StyledSidebarContent>
);

export interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [hidden, setHidden] = useState(false);

  const items = [
    { label: "Types", key: "textTypes", content: <SettingsTab /> },
    { label: "Project", key: "project", content: <ProjectTab /> },
    {
      label: "Presets",
      key: "presets",
      content: (
        <PresetsProvider>
          <PresetList />
        </PresetsProvider>
      )
    },
    { label: "Code", key: "code", content: <CodeTab /> }
  ];

  return (
    <StyledSidebar className={className} isHidden={hidden}>
      <div className="sidebar__wrapper">
        <Tabs>
          {items.map((item) => (
            <Tab key={item.key} title={item.label}>
              {item.content}
            </Tab>
          ))}
        </Tabs>
      </div>

      <button
        className="sidebar__toggle"
        onClick={() => setHidden((prev) => !prev)}
        title={hidden ? "Open" : "Close"}
      />
    </StyledSidebar>
  );
};

export default Sidebar;
