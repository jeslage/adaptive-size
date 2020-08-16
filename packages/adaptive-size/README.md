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
    size: [20, 45, 60],
    // Screen widths to interpolate between
    width: [800, 1200, 1400],
    // Line heights
    lineHeight?: [1.5, 1.6, 1.5],
    // Number of breakpoints between steps
    breakpoints?: 4,
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

## Custom css property

By default `adaptive-size` uses `font-size` as the css property. But you can also change the property by adding a `property` key to your config object.

**Example**

```js
import adaptiveSize from 'adaptive-size';

const Headline = styled.h1`
  ${adaptiveSize({
    size: [20, 45, 60],
    width: [800, 1200, 1400],
    property: 'margin-left'
  })}
`;
```

## Options

### `size`

`number[]` | required

Array of sizes in px to interpolate between.

### `width`

`number[]` | required

Array of screen widths in px.

### `lineHeight`

`number[]` | required

Array of line-height values, e.g. 1.4.

### `breakpoints`

`number` | optional | default: 8

Number of breakpoints between the given screen widths which will be rendered to the css string.

### `property`

`string` | optional | default: "font-size"

Add optional css property if you want to use adaptive size for another property than font-size.
