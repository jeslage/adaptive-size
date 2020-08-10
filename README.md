# Adaptive Size

[![codecov](https://codecov.io/gh/jeslage/adaptive-size/branch/master/graph/badge.svg?token=TJJFPD677O)](https://codecov.io/gh/jeslage/adaptive-size)
[![CircleCI](https://circleci.com/gh/jeslage/adaptive-size.svg?style=shield)](https://circleci.com/gh/jeslage/adaptive-size)

A small javascript helper to get an adaptive font-size css string. It will interpolate between the given sizes and screen widths.

```bash
yarn add adaptive-size

npm install adaptive-size
```

## Usage

```js
import styled from 'styled-components';
import adaptiveSize from 'adaptive-size';

const Headline = styled.h1`
  ${adaptiveSize({
    // Sizes in px to interpolate between
    sizes: [20, 45, 60],
    // Breakpoints to interpolate between
    breakpoints: [800, 1200, 1400],
    // Line heights
    lineHeights?: [1.5, 1.6, 1.5],
    // Steps between each breakpoint
    breakpoints?: 12,
  })}
`;
```

The above example will return the following css.

```css
.sc-bZQynM {
  font-size: 1.25rem;
  line-height: 1.5;
  @media (min-width: 56.25rem) {
    font-size: 1.6406rem;
    line-height: 1.52;
  }
  @media (min-width: 62.5rem) {
    font-size: 2.0313rem;
    line-height: 1.55;
  }
  @media (min-width: 68.75rem) {
    font-size: 2.4219rem;
    line-height: 1.58;
  }
  @media (min-width: 75rem) {
    font-size: 2.8125rem;
    line-height: 1.6;
  }
  @media (min-width: 78.125rem) {
    font-size: 3.0469rem;
    line-height: 1.58;
  }
  @media (min-width: 81.25rem) {
    font-size: 3.2813rem;
    line-height: 1.55;
  }
  @media (min-width: 84.375rem) {
    font-size: 3.5156rem;
    line-height: 1.52;
  }
  @media (min-width: 87.5rem) {
    font-size: 3.75rem;
    line-height: 1.5;
  }
}
```

## Options

### `sizes`

`number[]` | required

Array of sizes in px to interpolate between.

### `breakpoints`

`number[]` | required

Array of screen widths in px.

### `lineHeights`

`number[]` | required

Array of line-height values, e.g. 1.4.

### `steps`

`number` | optional | default: 8

Steps between the given screen widths which will be rendered to the css string.
