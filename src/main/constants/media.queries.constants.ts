export const MEDIA_QUERIES = {
  small: "(min-width: 400px)",
  medium: "(min-width: 700px)",
  large: "(min-width: 1000px)",
};

export const sliderBreakpoints = {
  [MEDIA_QUERIES.small]: {
    slides: { perView: 2, spacing: 20 },
  },
  [MEDIA_QUERIES.medium]: {
    slides: { perView: 3, spacing: 30 },
  },
  [MEDIA_QUERIES.large]: {
    slides: { perView: 4, spacing: 30 },
  },
};
