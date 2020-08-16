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
 * Returns adaptive css font-size string
 * @param  {object} options - Options object with sizes, lineHeights, breakpoints and steps key
 * @example adaptiveSize({ sizes: [14, 16], lineHeights: [1.4, 1.67], breakpoints: [320, 960], steps: 10 })
 * @returns {string} Resulting adaptive css font-size string
 */
export const adaptiveSize = (options: AdaptiveSizeOptions): AdaptiveSizeStyles => {
  const { sizes, breakpoints, steps, lineHeights } = options;

  const mediaQueries = {};

  for (let i = 1; i < sizes.length; i += 1) {
    const partialStep = (breakpoints[i] - breakpoints[i - 1]) / (steps || 8);

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
            lineHeight: parseFloat(
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
        fontSize: `${fontSize}`,
        ...lh
      };
    }
  }

  return {
    fontSize: px2rem(sizes[0]),
    ...(lineHeights ? { lineHeight: lineHeights[0] } : undefined),
    ...mediaQueries
  };
};

export default adaptiveSize;
