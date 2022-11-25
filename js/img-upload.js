import { openOverlayElement } from './overlay-handler.js';
import { checkLength, hasDuplicates } from './util.js';

let hashtagIsCorrect = true;
let commentIsCorrect = true;

const photoInput = document.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

const resetInputForm = () => {
  photoInput.value = '';
};

const openOverlayEditForm = () => {
  openOverlayElement(editForm, closeButton, resetInputForm);
};

photoInput.addEventListener('change', () => {
  openOverlayEditForm();
});

const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, true);

const controlSubmit = () => {
  if (hashtagIsCorrect && commentIsCorrect) {
    submitButton.removeAttribute('disabled', 'true');
  } else {
    submitButton.setAttribute('disabled', 'true');
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

pristine.addValidator(
  hashtagInput,
  chackHashtag,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentInput,
  checkComment,
  `Превышен лимит на ${MAX_COMMENT_LENGTH} символов`
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
