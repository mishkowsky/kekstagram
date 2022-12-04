const sliderOptions = {
  'NONE': {
    range: { min: 0, max: 1 },
    start: 0,
    step: 0.1,
    effect: '',
    effectUnitMeasure: '',
  },
  'CHROME': {
    range: { min: 0, max: 1 },
    start: 0,
    step: 0.1,
    effect: 'grayscale',
    effectUnitMeasure: '',
  },
  'SEPIA': {
    range: { min: 0, max: 1 },
    start: 0,
    step: 0.1,
    effect: 'sepia',
    effectUnitMeasure: '',
  },
  'MARVIN': {
    range: { min: 0, max: 100 },
    start: 0,
    step: 1,
    effect: 'invert',
    effectUnitMeasure: '%',
  },
  'PHOBOS': {
    range: { min: 0, max: 3 },
    start: 0,
    step: 0.1,
    effect: 'blur',
    effectUnitMeasure: 'px',
  },
  'HEAT': {
    range: { min: 1, max: 3 },
    start: 0,
    step: 0.1,
    effect: 'brightness',
    effectUnitMeasure: '',
  },
};

const getSliderOptions = (name) => sliderOptions[name];

export { getSliderOptions };
