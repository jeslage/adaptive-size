export interface Config {
  size: number[];
  lineHeight: number[];
  width: [number, number];
  breakpoints?: number;
  property?: string;
}

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
 * @param  {object} config - Config object with size, lineHeight, width and breakpoints key
 * @example adaptiveSize({ width: [14, 16], lineHeight: [1.4, 1.67], width: [320, 960], breakpoints: 10 })
 * @returns {string} Resulting adaptive css font-size string
 */
export const adaptiveSize = (config: Config): string => {
  const { size, width, breakpoints, lineHeight } = config;

  const cssProp = config && config.property ? config.property : 'font-size';

  let mediaQueries = ``;

  for (let i = 1; i < size.length; i += 1) {
    const steps = (width[i] - width[i - 1]) / (breakpoints || 8);

    const startIndex = i === 1 ? width[i - 1] + steps : width[i - 1];
    const endIndex = i === size.length - 1 ? width[i] : width[i] - steps;

    for (let j = startIndex; parseFloat(j.toFixed(0)) <= endIndex; j += steps) {
      const value = interpolate(j, width[i - 1], width[i], size[i - 1], size[i]);

      const lh = lineHeight
        ? `line-height: ${interpolate(
            j,
            width[i - 1],
            width[i],
            lineHeight[i - 1],
            lineHeight[i]
          ).toFixed(2)};`
        : '';

      const mq = px2rem(j);
      const fontSize = px2rem(value);

      mediaQueries += `@media (min-width: ${mq}) { ${cssProp}: ${fontSize}; ${lh} }`;
    }
  }

  return `${cssProp}: ${px2rem(size[0])}; ${
    lineHeight ? `line-height: ${lineHeight[0]};` : ''
  } ${mediaQueries}`;
};

export default adaptiveSize;
