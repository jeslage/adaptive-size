import { ReducerState, ReducerPayload } from "./definitions";
import { customAlphabet } from "nanoid";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);

export const reducer = (
  state: ReducerState,
  { type, payload }: ReducerPayload
): ReducerState => {
  switch (type) {
    case "ADD_ITEM":
      const id = nanoid();
      return {
        ...state,
        items: [
          ...state.items,
          {
            id,
            name: id,
            sizes: [12, 24],
            lineHeights: [1, 1.5],
            letterSpacing: 0,
            font:
              state.fonts && state.fonts.length > 0
                ? state.fonts[0].id
                : undefined,
          },
        ],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload.id),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id !== payload.id ? item : { ...item, ...payload.item }
        ),
      };

    case "ADD_GLOBAL_BREAKPOINT":
      const length = state.breakpoints.length;

      return {
        ...state,
        breakpoints: [
          ...state.breakpoints,
          state.breakpoints[length - 1] + 500,
        ],
        items: state.items.map((item) => ({
          ...item,
          sizes: [...item.sizes, item.sizes[length - 1]],
          lineHeights: [...item.lineHeights, item.lineHeights[length - 1]],
        })),
      };

    case "REMOVE_GLOBAL_BREAKPOINT":
      return {
        ...state,
        breakpoints: state.breakpoints.filter(
          (_, index) => index !== payload.index
        ),
        items: state.items.map((item) => ({
          ...item,
          sizes: item.sizes.filter((_, index) => index !== payload.index),
          lineHeights: item.lineHeights.filter(
            (_, index) => index !== payload.index
          ),
        })),
      };

    case "UPDATE_GLOBALS":
      return {
        ...state,
        ...payload,
      };

    case "UPDATE_DATA":
      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          ...payload.data,
        },
      };

    case "UPDATE_SETTINGS":
      return {
        ...state,
        ...payload,
      };

    case "ADD_FONT":
      const fontId = nanoid();

      return {
        ...state,
        fonts: [
          ...(state.fonts || []),
          {
            id: fontId,
            ...payload.font,
          },
        ],
      };

    case "REMOVE_FONT":
      return {
        ...state,
        fonts: (state.fonts || []).filter((item) => item.id !== payload.id),
        items: state.items.map((item) => {
          if (item.font === payload.id) {
            return {
              ...item,
              font: undefined,
            };
          }

          return item;
        }),
      };
    default:
      return state;
  }
};
