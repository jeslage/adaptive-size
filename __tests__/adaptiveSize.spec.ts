import { adaptiveSize } from "../packages/adaptive-size/src/index";

test("should return object", () => {
  expect(
    adaptiveSize({
      breakpoints: [800, 1200, 1400],
      sizes: [20, 45, 60],
      lineHeights: [1.5, 1.6, 1.5],
      steps: 4
    })
  ).toStrictEqual({
    fontSize: "1.2500rem",
    lineHeight: 1.5,
    "@media (min-width: 56.2500rem)": {
      fontSize: "1.6406rem",
      lineHeight: 1.52
    },
    "@media (min-width: 62.5000rem)": {
      fontSize: "2.0313rem",
      lineHeight: 1.55
    },
    "@media (min-width: 68.7500rem)": {
      fontSize: "2.4219rem",
      lineHeight: 1.58
    },
    "@media (min-width: 75.0000rem)": {
      fontSize: "2.8125rem",
      lineHeight: 1.6
    },
    "@media (min-width: 78.1250rem)": {
      fontSize: "3.0469rem",
      lineHeight: 1.58
    },
    "@media (min-width: 81.2500rem)": {
      fontSize: "3.2813rem",
      lineHeight: 1.55
    },
    "@media (min-width: 84.3750rem)": {
      fontSize: "3.5156rem",
      lineHeight: 1.52
    },
    "@media (min-width: 87.5000rem)": { fontSize: "3.7500rem", lineHeight: 1.5 }
  });
});

test("should use default steps and no line-height", () => {
  expect(
    adaptiveSize({
      breakpoints: [800, 1200, 1400],
      sizes: [20, 45, 60]
    })
  ).toStrictEqual({
    fontSize: "1.2500rem",
    "@media (min-width: 53.1250rem)": { fontSize: "1.4453rem" },
    "@media (min-width: 56.2500rem)": { fontSize: "1.6406rem" },
    "@media (min-width: 59.3750rem)": { fontSize: "1.8359rem" },
    "@media (min-width: 62.5000rem)": { fontSize: "2.0313rem" },
    "@media (min-width: 65.6250rem)": { fontSize: "2.2266rem" },
    "@media (min-width: 68.7500rem)": { fontSize: "2.4219rem" },
    "@media (min-width: 71.8750rem)": { fontSize: "2.6172rem" },
    "@media (min-width: 75.0000rem)": { fontSize: "2.8125rem" },
    "@media (min-width: 76.5625rem)": { fontSize: "2.9297rem" },
    "@media (min-width: 78.1250rem)": { fontSize: "3.0469rem" },
    "@media (min-width: 79.6875rem)": { fontSize: "3.1641rem" },
    "@media (min-width: 81.2500rem)": { fontSize: "3.2813rem" },
    "@media (min-width: 82.8125rem)": { fontSize: "3.3984rem" },
    "@media (min-width: 84.3750rem)": { fontSize: "3.5156rem" },
    "@media (min-width: 85.9375rem)": { fontSize: "3.6328rem" },
    "@media (min-width: 87.5000rem)": { fontSize: "3.7500rem" }
  });
});
