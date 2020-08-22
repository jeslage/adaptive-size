import React from "react";
import styled from "styled-components";

import useImportExport from "../../../hooks/useImportExport";

import {
  useStepsState,
  useProjectState,
  useBreakpointsState,
  useFontsState,
  useItemsState
} from "../../../state";

import Input from "../../Input";
import { SidebarInner, SidebarContent } from "../Sidebar";
import FontList from "../../FontList";
import Range from "../../Range";
import Counter from "../../Counter";
import Fieldset from "../../Fieldset";
import Button from "../../Button";
import Upload from "../../Upload";

const ProjectBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--spacings-s);
  padding-top: var(--spacings-xs);
`;

const ProjectTab = () => {
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

  const { importConfig, exportConfig, exportSketchConfig } = useImportExport({
    fonts,
    items,
    project,
    steps,
    breakpoints
  });

  return (
    <SidebarContent
      bar={
        <ProjectBar>
          <Upload
            variant="outlined"
            label="Import"
            onChange={importConfig}
            multiple={false}
            accept="application/json"
          />

          <Button onClick={exportConfig} iconBefore="save">
            Export
          </Button>
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
            <Button
              onClick={addBreakpoint}
              iconBefore="textWidth"
              variant="secondary"
            >
              Add breakpoint
            </Button>
          )}
        </Fieldset>

        <FontList />

        <Fieldset label="Sketch">
          <Button
            onClick={exportSketchConfig}
            iconBefore="save"
            variant="secondary"
          >
            Export Sketch Config
          </Button>

          <small style={{ textAlign: "center" }}>
            Can be imported to Sketch via{" "}
            <a
              href="https://github.com/nilshoenson/shared-text-styles"
              target="_blank"
            >
              Shared Text Styles
            </a>{" "}
            Plugin
          </small>
        </Fieldset>
      </SidebarInner>
    </SidebarContent>
  );
};

export default ProjectTab;
