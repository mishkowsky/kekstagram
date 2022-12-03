import { between } from './util.js';

const scaleValueElement = document.querySelector('.scale__control--value');
const scaleDecreaseButton = document.querySelector('.scale__control--smaller');
const scaleIncreaseButton = document.querySelector('.scale__control--bigger');
const photoPreviewElement = document.querySelector('.img-upload__preview img');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_STEP = 25;

const setScaleOnImg = (scale) => {
  scaleValueElement.value = `${scale}%`;
  photoPreviewElement.style.transform = `scale(${scale / 100})`;
};

const changeScale = (delta) => {
  const newScale = parseFloat(scaleValueElement.value) + delta;
  if (between(newScale, MIN_SCALE_VALUE, MAX_SCALE_VALUE)) {
    setScaleOnImg(newScale);
  }
};

const decreaseScaleClickHandler = () => {
  changeScale(-DEFAULT_SCALE_STEP);
};

const increaseScaleClickHandler = () => {
  changeScale(DEFAULT_SCALE_STEP);
};

const resetScaleController = () => setScaleOnImg(100);

const initScaleController = () => {
  scaleDecreaseButton.addEventListener('click', decreaseScaleClickHandler);
  scaleIncreaseButton.addEventListener('click', increaseScaleClickHandler);
};

export { resetScaleController, initScaleController };
