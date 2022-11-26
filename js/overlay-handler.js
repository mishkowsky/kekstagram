let element;
let extraAtionOnClose;

const closeOverlayElement = () => {
  if (extraAtionOnClose !== undefined) {
    extraAtionOnClose();
  }
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeOverlayElement();
};

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

function escapeKeyDownHandler(evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagInput && evt.target !== commentInput) {
    evt.preventDefault();
    closeOverlayElement();
  }
}

const openOverlayElement = (e, closeButton, actionOnClose) => {
  element = e;
  e.classList.remove('hidden');
  extraAtionOnClose = actionOnClose;
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escapeKeyDownHandler);
};

export { openOverlayElement, closeOverlayElement };
