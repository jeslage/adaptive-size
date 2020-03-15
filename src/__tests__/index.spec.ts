import 'jest';
import { adaptiveSize } from '../index';

test('should return string', () => {
  expect(
    adaptiveSize({
      width: [800, 1200, 1400],
      size: [20, 45, 60],
      lineHeight: [1.5, 1.6, 1.5],
      breakpoints: 4
    })
  ).toBe(
    'font-size: 1.2500rem; line-height: 1.5; @media (min-width: 56.2500rem) { font-size: 1.6406rem; line-height: 1.52; }@media (min-width: 62.5000rem) { font-size: 2.0313rem; line-height: 1.55; }@media (min-width: 68.7500rem) { font-size: 2.4219rem; line-height: 1.58; }@media (min-width: 75.0000rem) { font-size: 2.8125rem; line-height: 1.60; }@media (min-width: 78.1250rem) { font-size: 3.0469rem; line-height: 1.58; }@media (min-width: 81.2500rem) { font-size: 3.2813rem; line-height: 1.55; }@media (min-width: 84.3750rem) { font-size: 3.5156rem; line-height: 1.52; }@media (min-width: 87.5000rem) { font-size: 3.7500rem; line-height: 1.50; }'
  );
});

test('should use custom css property', () => {
  expect(
    adaptiveSize({
      width: [800, 1200, 1400],
      size: [20, 45, 60],
      lineHeight: [1.5, 1.6, 1.5],
      breakpoints: 4,
      property: 'margin-top'
    })
  ).toBe(
    'margin-top: 1.2500rem; line-height: 1.5; @media (min-width: 56.2500rem) { margin-top: 1.6406rem; line-height: 1.52; }@media (min-width: 62.5000rem) { margin-top: 2.0313rem; line-height: 1.55; }@media (min-width: 68.7500rem) { margin-top: 2.4219rem; line-height: 1.58; }@media (min-width: 75.0000rem) { margin-top: 2.8125rem; line-height: 1.60; }@media (min-width: 78.1250rem) { margin-top: 3.0469rem; line-height: 1.58; }@media (min-width: 81.2500rem) { margin-top: 3.2813rem; line-height: 1.55; }@media (min-width: 84.3750rem) { margin-top: 3.5156rem; line-height: 1.52; }@media (min-width: 87.5000rem) { margin-top: 3.7500rem; line-height: 1.50; }'
  );
});

test('should use default breakpoints and no line-height', () => {
  expect(
    adaptiveSize({
      width: [800, 1200, 1400],
      size: [20, 45, 60]
    })
  ).toBe(
    'font-size: 1.2500rem;  @media (min-width: 53.1250rem) { font-size: 1.4453rem;  }@media (min-width: 56.2500rem) { font-size: 1.6406rem;  }@media (min-width: 59.3750rem) { font-size: 1.8359rem;  }@media (min-width: 62.5000rem) { font-size: 2.0313rem;  }@media (min-width: 65.6250rem) { font-size: 2.2266rem;  }@media (min-width: 68.7500rem) { font-size: 2.4219rem;  }@media (min-width: 71.8750rem) { font-size: 2.6172rem;  }@media (min-width: 75.0000rem) { font-size: 2.8125rem;  }@media (min-width: 76.5625rem) { font-size: 2.9297rem;  }@media (min-width: 78.1250rem) { font-size: 3.0469rem;  }@media (min-width: 79.6875rem) { font-size: 3.1641rem;  }@media (min-width: 81.2500rem) { font-size: 3.2813rem;  }@media (min-width: 82.8125rem) { font-size: 3.3984rem;  }@media (min-width: 84.3750rem) { font-size: 3.5156rem;  }@media (min-width: 85.9375rem) { font-size: 3.6328rem;  }@media (min-width: 87.5000rem) { font-size: 3.7500rem;  }'
  );
});
