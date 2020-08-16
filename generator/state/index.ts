import { atom, useRecoilState, useResetRecoilState } from "recoil";
import { customAlphabet } from "nanoid";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);

export type Project = {
  text: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
  sizes: number[];
  lineHeights: number[];
  letterSpacing: number;
  font?: string;
};

export type Font = {
  id: string;
  name: string;
  extension: string;
  base: string;
};

export type Settings = {
  project: Project;
  fonts: Font[];
  items: Item[];
  steps: number;
  breakpoints: number[];
};

export const defaultConfig: Settings = {
  project: {
    name: "My Project",
    text:
      "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.The five boxing wizards jump quickly. How quickly daft jumping zebras vex. Quick zephyrs blow, vexing daft Jim. Sphinx of black quartz, judge my vow."
  },
  fonts: [],
  breakpoints: [375, 1440],
  steps: 12,
  items: [
    {
      id: "YYzLC",
      name: "Headline",
      sizes: [20, 40],
      lineHeights: [1, 1.5],
      letterSpacing: 0,
      font: undefined
    },
    {
      id: "AGPEs",
      name: "Copy",
      sizes: [12, 24],
      lineHeights: [1, 1.5],
      letterSpacing: 0,
      font: undefined
    }
  ]
};

export const projectState = atom<Project>({
  key: "project",
  default: defaultConfig.project
});

export const fontsState = atom<Font[]>({
  key: "fonts",
  default: defaultConfig.fonts
});

export const breakpointsState = atom<number[]>({
  key: "breakpoints",
  default: defaultConfig.breakpoints
});

export const stepsState = atom<number>({
  key: "steps",
  default: defaultConfig.steps
});

export const itemsState = atom<Item[]>({
  key: "items",
  default: defaultConfig.items
});

export const useBreakpointsState = () => {
  const [breakpoints, setBreakpoints] = useRecoilState(breakpointsState);

  const addBreakpoint = () => {
    setBreakpoints((prev) => {
      const length = prev.length;
      return [...prev, prev[length - 1] + 500];
    });
  };

  const removeBreakpoint = (id: number) => {
    setBreakpoints((prev) => prev.filter((_, index) => index !== id));
  };

  const updateBreakpoint = (id: number, value: number) => {
    setBreakpoints((prev) => prev.map((e, j) => (j !== id ? e : value)));
  };

  return { breakpoints, addBreakpoint, removeBreakpoint, updateBreakpoint };
};

export const useItemsState = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [fonts] = useRecoilState(itemsState);

  const addItem = () => {
    const id = nanoid();

    return setItems((prev) => [
      ...prev,
      {
        id: id,
        name: id,
        sizes: [12, 24],
        lineHeights: [1, 1.5],
        letterSpacing: 0,
        font: fonts && fonts.length > 0 ? fonts[0].id : undefined
      }
    ]);
  };

  const removeItem = (id: string) => {
    return setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, obj: Partial<Item>) => {
    return setItems((prev) =>
      prev.map((item) => (item.id !== id ? item : { ...item, ...obj }))
    );
  };

  return { items, addItem, removeItem, updateItem };
};

export const useProjectState = () => {
  const [project, setProject] = useRecoilState(projectState);

  const updateProject = (obj: Partial<Project>) => {
    return setProject((prev) => ({ ...prev, ...obj }));
  };

  return { project, updateProject };
};

export const useStepsState = () => {
  const [steps, setSteps] = useRecoilState(stepsState);
  return { steps, updateSteps: setSteps };
};

export const useFontsState = () => {
  const [fonts, setFonts] = useRecoilState(fontsState);
  const [items, setItems] = useRecoilState(itemsState);

  const addFont = (newFont) => {
    const item = {
      id: nanoid(),
      ...newFont
    };

    return setFonts((p) => [...p, item]);
  };

  const removeFont = (id: string) => {
    // Remove font from item, if used
    setItems(items.map((i) => (i.font === id ? { ...i, font: undefined } : i)));

    return setFonts((prev) => prev.filter((i) => i.id !== id));
  };

  return { fonts, addFont, removeFont };
};

export const useResetState = () => {
  const resetFonts = useResetRecoilState(fontsState);
  const resetItems = useResetRecoilState(itemsState);
  const resetProject = useResetRecoilState(projectState);
  const resetBreakpoints = useResetRecoilState(breakpointsState);
  const resetSteps = useResetRecoilState(stepsState);

  return {
    resetSettings: () => {
      resetFonts();
      resetItems();
      resetBreakpoints();
      resetProject();
      resetSteps();
    }
  };
};

export const useUpdateState = () => {
  const [fonts, setFonts] = useRecoilState(fontsState);
  const [items, setItems] = useRecoilState(itemsState);
  const [breakpoints, setBreakpoints] = useRecoilState(breakpointsState);
  const [steps, setSteps] = useRecoilState(stepsState);
  const [project, setProject] = useRecoilState(projectState);

  return {
    settings: { fonts, items, breakpoints, steps, project },
    updateAllSettings: (obj: Settings) => {
      if (!obj) return;

      setFonts(obj.fonts || []);
      setBreakpoints(obj.breakpoints || []);
      setItems(obj.items || []);
      setSteps(obj.steps);
      setProject(obj.project);
    }
  };
};
