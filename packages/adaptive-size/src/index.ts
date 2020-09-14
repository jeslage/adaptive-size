export interface AdaptiveSizeOptions {
  sizes: number[];
  breakpoints: number[];
  lineHeights?: number[];
  steps?: number;
}

type BreakpointItem = {
  fontSize: string;
  lineHeight?: number;
};

type AdaptiveSizeKeys = 'fontSize' | 'lineHeight' | string;

export type AdaptiveSizeStyles = {
  [key in AdaptiveSizeKeys]: string | number | BreakpointItem;
};

type AdaptiveSizeProperties = {
  size: AdaptiveSizeKeys;
  lineHeight: AdaptiveSizeKeys;
};

const defaultProperties: AdaptiveSizeProperties = {
  size: 'fontSize',
  lineHeight: 'lineHeight'
};

const interpolate = (
  width: number,
  from: number,
  to: number,
  min: number,
  max: number
): number => {
  return min + (max - min) * ((width - from) / (to - from));
};

/**
 * Transform px value to rem value.
 * @param {number} px - PX value as a integer. e.g. 12
 * @returns {string} - PX value in REM
 * @example ${px2rem(25)}
 */
export const px2rem = (px: number): string => `${(px / 16).toFixed(4)}rem`;

/**
 * Returns adaptive font-size as object
 * @param  {object} options - Options object with sizes, lineHeights, breakpoints and steps key
 * @example adaptiveSize({ sizes: [14, 16], lineHeights: [1.4, 1.67], breakpoints: [320, 960], steps: 10 })
 * @returns {string} Resulting adaptive css font-size string
 */
export const adaptiveSize = (
  options: AdaptiveSizeOptions,
  properties = defaultProperties
): AdaptiveSizeStyles => {
  const { sizes, breakpoints, steps, lineHeights } = options;

  const mediaQueries = {};

  for (let i = 1; i < sizes.length; i += 1) {
    const partialStep =
      (breakpoints[i] - breakpoints[i - 1]) / ((steps || 8) * (sizes.length - 1));

    const startIndex = i === 1 ? breakpoints[i - 1] + partialStep : breakpoints[i - 1];
    const endIndex =
      i === sizes.length - 1 ? breakpoints[i] : breakpoints[i] - partialStep;

    for (let j = startIndex; parseFloat(j.toFixed(0)) <= endIndex; j += partialStep) {
      const value = interpolate(
        j,
        breakpoints[i - 1],
        breakpoints[i],
        sizes[i - 1],
        sizes[i]
      );

      const lh = lineHeights
        ? {
            [properties.lineHeight]: parseFloat(
              interpolate(
                j,
                breakpoints[i - 1],
                breakpoints[i],
                lineHeights[i - 1],
                lineHeights[i]
              ).toFixed(2)
            )
          }
        : undefined;

      const mq = px2rem(j);
      const fontSize = px2rem(value);

      mediaQueries[`@media (min-width: ${mq})`] = {
        [properties.size]: `${fontSize}`,
        ...lh
      };
    }
  }

  return {
    [properties.size]: px2rem(sizes[0]),
    ...(lineHeights ? { [properties.lineHeight]: lineHeights[0] } : undefined),
    ...mediaQueries
  };
};

/**
 * Returns adaptive font-size css variables
 * @param {string} key - Key of the variable
 * @param  {object} options - Options object with sizes, lineHeights, breakpoints and steps key
 * @example adaptiveSizeCssVariables("headline", { sizes: [14, 16], lineHeights: [1.4, 1.67], breakpoints: [320, 960], steps: 10 })
 * @returns {string} Resulting adaptive css font-size variables
 */
export const adaptiveSizeCssVariables = (key: string, options: AdaptiveSizeOptions) => {
  return adaptiveSize(options, {
    size: `--${key}-font-size`,
    lineHeight: `--${key}-line-height`
  });
};

export default adaptiveSize;
