const breakpoints = {
  s: 375,
  m: 768,
  l: 940,
  xl: 1280
};

/**
 * Simple CSS MediaQuery. Expects a breakpoint (string or number) and min or max string (default min).
 * @param {string} mediaQuery - Identifier for the breakpoint in the configuration file
 * @param {string} minMax - Default: min. String for the media-query type
 * @returns {string} Media query definition
 * @example ${mq('m', 'max')} { css styles go here };
 */
export const mq = (
  mediaQuery: keyof typeof breakpoints,
  minMax: "min" | "max" = "min"
) => `@media (${minMax}-width: ${px2rem(breakpoints[mediaQuery])})`;

export const px2rem = (px: number) => `${px / 16}rem`;
