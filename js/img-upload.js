import { resetEffect } from './effects-controller.js';
import { openOverlayElement } from './overlay-handler.js';
import { resetScaleController } from './scale-button-controller.js';
import { checkLength, hasDuplicates } from './util.js';

let hashtagIsCorrect = true;
let commentIsCorrect = true;

const photoInputElement = document.querySelector('#upload-file');
const editFormElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('#upload-cancel');

const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENT_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const resetInputForm = () => {
  photoInputElement.value = '';
};

const closeCondition = (evt) => evt.key === 'Escape' && evt.target !== hashtagInputElement && evt.target !== commentInputElement;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

const controlSubmit = () => {
  if (hashtagIsCorrect && commentIsCorrect) {
    submitButtonElement.removeAttribute('disabled', 'true');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
};

const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;

const isCorrectHashtag = (value) => regexHashtag.test(value);

let hashtagErrorMessage = '';
const getHashtagErrorMessage = function() { return hashtagErrorMessage; };

const chackHashtag = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');
  hashtagIsCorrect = false;
  if (!hashtags.every(isCorrectHashtag)) {
    hashtagErrorMessage = 'Неверный формат хэштега';
  } else if (hashtags.length > MAX_HASHTAG_NUMBERS) {
    hashtagErrorMessage = 'Слишком много хэштегов';
  } else if (hasDuplicates(hashtags)) {
    hashtagErrorMessage = 'Хэштеги должны быть уникальными';
  } else {
    hashtagIsCorrect = true;
  }
  controlSubmit();
  return hashtagIsCorrect;
};

const checkComment = (value) => {
  commentIsCorrect = checkLength(value, MAX_COMMENT_LENGTH);
  controlSubmit();
  return commentIsCorrect;
};

const initImgUploader = () => {
  photoInputElement.addEventListener('change', () => {
    openOverlayElement(editFormElement, closeButtonElement, closeCondition, resetInputForm);
    resetEffect();
    resetScaleController();
  });

  pristine.addValidator(
    hashtagInputElement,
    chackHashtag,
    getHashtagErrorMessage
  );

  pristine.addValidator(
    commentInputElement,
    checkComment,
    `Превышен лимит на ${MAX_COMMENT_LENGTH} символов`
  );

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};


export { initImgUploader };
