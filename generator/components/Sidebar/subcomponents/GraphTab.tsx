import React, { useContext } from "react";

import { XYPlot, XAxis, YAxis, LineSeries } from "react-vis";
import { SettingsContext } from "../../../contexts";
import { SidebarContent } from "../Sidebar";

const GraphTab = () => {
  const { items, breakpoints } = useContext(SettingsContext);

  const axisStyle = { fill: "#c9c9c9" };

  return (
    <SidebarContent>
      <XYPlot margin={40} width={320} height={320}>
        <XAxis title="Viewport" style={axisStyle} />
        <YAxis title="Size" style={axisStyle} />

        {items.map((item) => (
          <LineSeries
            key={item.id}
            data={item.sizes.map((s, i) => ({ x: breakpoints[i], y: s }))}
          />
        ))}
      </XYPlot>

      <XYPlot margin={40} width={320} height={320}>
        <XAxis title="Viewport" style={axisStyle} />
        <YAxis title="Line Height" style={axisStyle} />
        {items.map((item) => (
          <LineSeries
            key={item.id}
            data={item.lineHeights.map((s, i) => ({
              x: breakpoints[i],
              y: s,
            }))}
          />
        ))}
      </XYPlot>
    </SidebarContent>
  );
};

export default GraphTab;
