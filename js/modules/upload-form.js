import { resetEffect } from './effects-handler.js';
import { resetScaleHandler } from './scale-handler.js';
import { checkLength } from '../utils/util.js';
import { sendData } from './api.js';
import { openAlert } from './alert.js';
import { checkHashtag } from '../utils/hashtag-checker.js';

const ALLOWED_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
const MAX_COMMENT_LENGTH = 140;

let hashtagIsCorrect = true;
let commentIsCorrect = true;

const photoInputElement = document.querySelector('#upload-file');
const editFormElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('#upload-cancel');
const photoElement = document.querySelector('.img-upload__preview img');
const photoEffectsElement = document.querySelectorAll('.effects__preview');
const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

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
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

let hashtagErrorMessage = '';
const getHashtagErrorMessage = function () { return hashtagErrorMessage; };

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setPhoto = (photo) => {
  photoElement.src = photo;
  photoEffectsElement.forEach((preview) => {
    preview.style.backgroundImage = `url('${photo}')`;
  });
};

const resetInputForm = () => {
  photoInputElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  setPhoto('img/upload-default-image.jpg');
  pristine.validate();
  unblockSubmitButton();
  resetEffect();
  resetScaleHandler();
};

const closeOverlayForm = () => {
  editFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
  resetInputForm();
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeOverlayForm();
};

function escapeKeyDownHandler(evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagInputElement && evt.target !== commentInputElement) {
    evt.preventDefault();
    closeOverlayForm();
  }
}

const initUploadForm = () => {

  photoInputElement.addEventListener('change', () => {

    const photo = photoInputElement.files[0];

    if (ALLOWED_TYPES.some((type) => photo.name.toLowerCase().endsWith(type))) {
      setPhoto(URL.createObjectURL(photo));
    }

    editFormElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButtonElement.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', escapeKeyDownHandler);

  });

  pristine.addValidator(
    hashtagInputElement,
    (value) => {
      const result = checkHashtag(value);
      hashtagErrorMessage = result.hashtagErrorMessage;
      hashtagIsCorrect = result.hashtagIsCorrect;
      controlSubmit();
      return hashtagIsCorrect;
    },
    getHashtagErrorMessage
  );

  pristine.addValidator(
    commentInputElement,
    (value) => {
      commentIsCorrect = checkLength(value, MAX_COMMENT_LENGTH);
      controlSubmit();
      return commentIsCorrect;
    },
    `Превышен лимит на ${MAX_COMMENT_LENGTH} символов`
  );

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(
      () => {
        closeOverlayForm();
        openAlert('success');
      },
      () => {
        openAlert('error');
        unblockSubmitButton();
      },
      new FormData(formElement),
    );
  });

};

export { initUploadForm };
