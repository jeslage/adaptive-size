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
    // Optional line heights
    lineHeights: [1.5, 1.6, 1.5],
    // Breakpoints to interpolate between
    breakpoints: [800, 1200, 1400],
    // Optional number of steps between each breakpoint, default is 8
    steps: 4
  })}
`;
```

<details>
  <summary>CSS Output</summary>

```css
.sc-bZQynM {
  font-size: 1.25rem;
  line-height: 1.5;
}

@media (min-width: 56.25rem) {
  .sc-bZQynM {
    font-size: 1.6406rem;
    line-height: 1.52;
  }
}

@media (min-width: 62.5rem) {
  .sc-bZQynM {
    font-size: 2.0313rem;
    line-height: 1.55;
  }
}

@media (min-width: 68.75rem) {
  .sc-bZQynM {
    font-size: 2.4219rem;
    line-height: 1.58;
  }
}

@media (min-width: 75rem) {
  .sc-bZQynM {
    font-size: 2.8125rem;
    line-height: 1.6;
  }
}

@media (min-width: 78.125rem) {
  .sc-bZQynM {
    font-size: 3.0469rem;
    line-height: 1.58;
  }
}

@media (min-width: 81.25rem) {
  .sc-bZQynM {
    font-size: 3.2813rem;
    line-height: 1.55;
  }
}

@media (min-width: 84.375rem) {
  .sc-bZQynM {
    font-size: 3.5156rem;
    line-height: 1.52;
  }
}

@media (min-width: 87.5rem) {
  .sc-bZQynM {
    font-size: 3.75rem;
    line-height: 1.5;
  }
}
```

</details>

## CSS Variables

`adaptive-size` also supports CSS Variables. Therefore import the `adaptiveSizeCssVariables` method from the package.

**Example**

```js
import { adaptiveSizeCssVariables } from 'adaptive-size';

const Globals = createGlobalStyle`
  :root {
    ${adaptiveSizeCssVariables('headline', {
      sizes: [20, 45, 60],
      lineHeights: [1.5, 1.6, 1.5],
      breakpoints: [800, 1200, 1400],
      steps: 4
    })}
`;
```

<details>
  <summary>CSS Output</summary>

```css
:root {
  --headline-font-size: 1.25rem;
  --headline-line-height: 1.5;
}

@media (min-width: 56.25rem) {
  :root {
    --headline-font-size: 1.6406rem;
    --headline-line-height: 1.52;
  }
}

@media (min-width: 62.5rem) {
  :root {
    --headline-font-size: 2.0313rem;
    --headline-line-height: 1.55;
  }
}

@media (min-width: 68.75rem) {
  :root {
    --headline-font-size: 2.4219rem;
    --headline-line-height: 1.58;
  }
}

@media (min-width: 75rem) {
  :root {
    --headline-font-size: 2.8125rem;
    --headline-line-height: 1.6;
  }
}

@media (min-width: 78.125rem) {
  :root {
    --headline-font-size: 3.0469rem;
    --headline-line-height: 1.58;
  }
}

@media (min-width: 81.25rem) {
  :root {
    --headline-font-size: 3.2813rem;
    --headline-line-height: 1.55;
  }
}

@media (min-width: 84.375rem) {
  :root {
    --headline-font-size: 3.5156rem;
    --headline-line-height: 1.52;
  }
}

@media (min-width: 87.5rem) {
  :root {
    --headline-font-size: 3.75rem;
    --headline-line-height: 1.5;
  }
}
```

</details>

## Custom CSS properties

By default `adaptive-size` uses `font-size` as the css property for the `sizes` array and `line-height` as the css property for the `lineHeights` array. But you can also change the properties by adding a `properties` object to your config object.

**Example**

```js
import adaptiveSize from 'adaptive-size';

const Box = styled.div`
  ${adaptiveSize(
    {
      sizes: [20, 45, 60],
      lineHeights: [1.5, 1.6, 1.5],
      breakpoints: [800, 1200, 1400],
      steps: 4
    },
    {
      size: 'width',
      lineHeight: 'height'
    }
  )}
`;
```

<details>
  <summary>CSS Output</summary>

```css
.sc-bZQynM {
  width: 1.25rem;
  height: 1.5;
}

@media (min-width: 56.25rem) {
  .sc-bZQynM {
    width: 1.6406rem;
    height: 1.52;
  }
}

@media (min-width: 62.5rem) {
  .sc-bZQynM {
    width: 2.0313rem;
    height: 1.55;
  }
}

@media (min-width: 68.75rem) {
  .sc-bZQynM {
    width: 2.4219rem;
    height: 1.58;
  }
}

@media (min-width: 75rem) {
  .sc-bZQynM {
    width: 2.8125rem;
    height: 1.6;
  }
}

@media (min-width: 78.125rem) {
  .sc-bZQynM {
    width: 3.0469rem;
    height: 1.58;
  }
}

@media (min-width: 81.25rem) {
  .sc-bZQynM {
    width: 3.2813rem;
    height: 1.55;
  }
}

@media (min-width: 84.375rem) {
  .sc-bZQynM {
    width: 3.5156rem;
    height: 1.52;
  }
}

@media (min-width: 87.5rem) {
  .sc-bZQynM {
    width: 3.75rem;
    height: 1.5;
  }
}
```

</details>

## Options

### `sizes`

`number[]` | required

Array of sizes in px to interpolate between.

### `lineHeights`

`number[]` | optional

Array of line-height values, e.g. 1.4.

### `breakpoints`

`number[]` | required

Array of breakpoints in px.

### `steps`

`number` | optional | default: 8

Number of steps between each breakpoints which will be rendered to the css string.
