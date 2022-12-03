import { getSliderOptions } from './util.js';

const sliderContainerElement = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const photoPreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const defaultEffectElement = document.querySelector('.effects__radio#effect-none');

let currentEffect = '';
let effectUnitMeasure = '';

const DEFAULT_START_VALUE = 100;

const updateSliderOptions = (options, startValue, display) => {
  currentEffect = options.effect;
  effectUnitMeasure = options.effectUnitMeasure;

  sliderElement.noUiSlider.updateOptions(options);

  sliderElement.noUiSlider.set(startValue);
  sliderContainerElement.style.display = display;
};

const setEffect = (effect) => {
  photoPreviewElement.classList = '';
  let display;
  if (effect !== 'none') {
    display = 'block';
    photoPreviewElement.classList.add(`effects__preview--${effect}`);
  } else {
    display = 'none';
    photoPreviewElement.style.filter = '';
    defaultEffectElement.checked = true;
  }
  updateSliderOptions(getSliderOptions(effect.toUpperCase()), DEFAULT_START_VALUE, display);
};

const initEffectsController = () => {
  noUiSlider.create(sliderElement, {
    connect: 'lower',
    range: getSliderOptions('NONE').range,
    start: getSliderOptions('NONE').start,
    step:  getSliderOptions('NONE').step,
  });

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    photoPreviewElement.style.filter = `${currentEffect}(${unencoded[handle]}${effectUnitMeasure})`;
    effectLevelValueElement.setAttribute('value', unencoded[handle]);
  });

  effectsListElement.addEventListener('change', (evt) => {
    setEffect(`${evt.target.value}`);
  });
};

const resetEffect = () => setEffect('none');

export { initEffectsController, resetEffect };
