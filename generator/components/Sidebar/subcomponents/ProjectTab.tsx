import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import { SettingsContext } from "../../../contexts";

import Input from "../../Input";
import ExportConfig from "../../ExportConfig";
import ImportConfig from "../../ImportConfig";
import { SidebarInner, SidebarContent } from "../Sidebar";
import IconButton from "../../IconButton";
import FontList from "../../FontList";
import Range from "../../Range";
import Counter from "../../Counter";
import Fieldset from "../../Fieldset";
import Button from "../../Button";

const ProjectBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 1em;

  button {
    margin: 1em 0;
  }
`;

const ProjectTab = () => {
  const { addToast } = useToasts();
  const {
    project,
    updateProject,
    resetSettings,
    updateGlobals,
    steps,
    breakpoints,
    addBreakpoint,
    removeBreakpoint
  } = useContext(SettingsContext);

  const reset = () => {
    addToast("Settings resetted", {
      appearance: "success",
      autoDismiss: true
    });
    resetSettings();
  };

  return (
    <SidebarContent
      bar={
        <ProjectBar>
          <ImportConfig />
          <ExportConfig />
          <IconButton
            onClick={reset}
            icon="remove"
            label="Reset settings"
            variant="outlined"
            size="large"
          />
        </ProjectBar>
      }
    >
      <SidebarInner>
        <Input
          value={project.name}
          label="Name"
          onChange={(val) => updateProject({ name: val })}
        />

        <Fieldset label="Globals">
          <Counter
            iconBefore="numberOfParagraphs"
            label="Steps"
            description="Amount of steps between min and max breakpoint"
            value={steps}
            min={2}
            max={20}
            steps={1}
            onChange={(val) => updateGlobals({ steps: val })}
          />

          {breakpoints.map((i, index) => (
            <Range
              key={index}
              suffix="px"
              value={i}
              min={350}
              max={4400}
              steps={5}
              label={`Breakpoint ${index + 1}`}
              onRemove={
                breakpoints.length > 2
                  ? () => removeBreakpoint(index)
                  : undefined
              }
              onChange={(val) =>
                updateGlobals({
                  breakpoints: breakpoints.map((e, j) => {
                    if (j !== index) return e;
                    return val;
                  })
                })
              }
            />
          ))}

          <Button onClick={addBreakpoint}>Add breakpoint</Button>
        </Fieldset>

        <FontList />
      </SidebarInner>
    </SidebarContent>
  );
};

export default ProjectTab;
