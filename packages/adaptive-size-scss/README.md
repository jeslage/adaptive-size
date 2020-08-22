# Adaptive Size SCSS

A small scss mixin to get an adaptive font-size css string. It will interpolate between the given sizes and screen widths.

```scss
@import "adaptive-size-scss";

$as-globals: (
  breakpoints: 800 1200 1400,
  steps: 8
);

h4 {
  @include adaptive-size(
    (
      sizes: 20 45 60,
      lineHeights: 1.5 1.6 1.5
    )
  );
}
```

The above example will return the following css.

```css
h4 {
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
