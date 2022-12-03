let element;
let extraAtionOnClose;
let closeCondition;

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

function escapeKeyDownHandler(evt) {
  if (closeCondition(evt)) {
    evt.preventDefault();
    closeOverlayElement();
  }
}

const openOverlayElement = (e, closeButton, closeCond, actionOnClose) => {
  element = e;
  e.classList.remove('hidden');
  closeCondition = closeCond;
  extraAtionOnClose = actionOnClose;
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escapeKeyDownHandler);
};

export { openOverlayElement };
