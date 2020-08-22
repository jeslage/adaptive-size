import React, { ReactNode } from "react";
import styled from "styled-components";

export interface TabProps {
  index?: number;
  selected?: boolean;
  title: string;
  children?: ReactNode;
}

const StyledTab = styled.div`
  display: block;
  height: 100%;
  /* overflow-y: scroll; */

  &[aria-hidden="true"] {
    display: none;
  }
`;

const Tab = ({ children, index, selected }: TabProps) =>
  selected ? (
    <StyledTab
      id={`tabpanel_${index}`}
      role="tabpanel"
      aria-labelledby={`tab_${index}`}
      aria-hidden={!selected}
    >
      {children}
    </StyledTab>
  ) : null;

export default Tab;
