import React from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import useImportExport from "../../../hooks/useImportExport";

import {
  useStepsState,
  useProjectState,
  useBreakpointsState,
  useResetState,
  useFontsState,
  useItemsState
} from "../../../state";

import Input from "../../Input";
import { SidebarInner, SidebarContent } from "../Sidebar";
import IconButton from "../../IconButton";
import FontList from "../../FontList";
import Range from "../../Range";
import Counter from "../../Counter";
import Fieldset from "../../Fieldset";
import Button from "../../Button";
import Upload from "../../Upload";

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

  const { resetSettings } = useResetState();

  const { steps, updateSteps } = useStepsState();
  const { project, updateProject } = useProjectState();
  const { fonts } = useFontsState();
  const { items } = useItemsState();
  const {
    breakpoints,
    addBreakpoint,
    removeBreakpoint,
    updateBreakpoint
  } = useBreakpointsState();

  const { importConfig, exportConfig } = useImportExport({
    fonts,
    items,
    project,
    steps,
    breakpoints
  });

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
          <Upload
            label="Import"
            onChange={importConfig}
            multiple={false}
            accept="application/json"
          />

          <Button onClick={exportConfig} iconBefore="save">
            Export
          </Button>

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
            onChange={(val) => updateSteps(val)}
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
              onChange={(val) => updateBreakpoint(index, val)}
            />
          ))}

          {breakpoints.length < 5 && (
            <Button onClick={addBreakpoint}>Add breakpoint</Button>
          )}
        </Fieldset>

        <FontList />
      </SidebarInner>
    </SidebarContent>
  );
};

export default ProjectTab;
