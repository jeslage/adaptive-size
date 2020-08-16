import React from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

import {
  useBreakpointsState,
  useFontsState,
  useItemsState,
  useResetState
} from "../../../state";

import Counter from "../../Counter";
import Range from "../../Range";
import Collapsible from "../../Collapsible";
import Button from "../../Button";
import IconButton from "../../IconButton";
import { SidebarContent, SidebarInner } from "../Sidebar";
import Select from "../../Select";
import Fieldset from "../../Fieldset";

const StyledSettingsBar = styled.div`
  display: flex;

  button {
    margin: 10px 0;

    &:nth-of-type(1) {
      margin-right: 5px;
    }

    &:nth-of-type(2) {
      margin-left: 5px;
    }
  }
`;

const SettingsBar = () => {
  const { addToast } = useToasts();

  const { addItem } = useItemsState();
  const { resetSettings } = useResetState();

  const reset = () => {
    addToast("Settings resetted", {
      appearance: "success",
      autoDismiss: true
    });
    resetSettings();
  };

  return (
    <StyledSettingsBar>
      <Button onClick={addItem} iconBefore="fontFamily">
        Add text type
      </Button>

      <IconButton
        onClick={reset}
        icon="remove"
        label="Reset settings"
        variant="outlined"
        size="large"
      />
    </StyledSettingsBar>
  );
};

const SettingsTab = () => {
  const { fonts } = useFontsState();
  const { items, removeItem, updateItem } = useItemsState();
  const { breakpoints } = useBreakpointsState();

  return (
    <SidebarContent bar={<SettingsBar />}>
      <SidebarInner>
        {items.map((item, index) => (
          <Collapsible
            key={index}
            label={item.name}
            onChange={(val) => updateItem(item.id, { name: val })}
            onRemove={items.length > 1 ? () => removeItem(item.id) : undefined}
          >
            <Select
              iconBefore="fontFamily"
              placeholder={
                fonts && fonts.length === 0
                  ? "Upload fonts first"
                  : "Select font"
              }
              disabled={fonts && fonts.length === 0}
              initialValue={item.font || ""}
              name="font"
              options={
                fonts && fonts.length > 0
                  ? fonts.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))
                  : []
              }
              onChange={(val) => updateItem(item.id, { font: val })}
            />

            <Counter
              iconBefore="letterSpacing"
              value={item.letterSpacing}
              min={0}
              max={10}
              steps={1}
              onChange={(val) => {
                updateItem(item.id, {
                  letterSpacing: val
                });
              }}
            />

            {breakpoints.map((element, index) => (
              <Fieldset label={`${item.name} @ ${element}px`} key={index}>
                <Range
                  iconBefore="fontSize"
                  suffix="px"
                  value={item.sizes[index]}
                  min={1}
                  max={200}
                  steps={1}
                  onChange={(val) =>
                    updateItem(item.id, {
                      sizes: item.sizes.map((e, j) => {
                        if (j !== index) return e;
                        return val;
                      })
                    })
                  }
                />

                <Counter
                  key={index}
                  iconBefore="lineHeight"
                  value={item.lineHeights[index]}
                  min={0.1}
                  max={5}
                  steps={0.05}
                  onChange={(val) =>
                    updateItem(item.id, {
                      lineHeights: item.lineHeights.map((e, j) => {
                        if (j !== index) return e;

                        return val;
                      })
                    })
                  }
                />
              </Fieldset>
            ))}
          </Collapsible>
        ))}
      </SidebarInner>
    </SidebarContent>
  );
};

export default SettingsTab;
