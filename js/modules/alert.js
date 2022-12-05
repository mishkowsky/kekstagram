const openAlert = (type, message, buttonText) => {
  const alertTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alertElement = alertTemplate.cloneNode(true);
  alertElement.style.zIndex = '3';

  const closeAlertButton = alertElement.querySelector(`.${type}__button`);

  if (message) {
    alertElement.querySelector(`.${type}__title`).textContent = message;
    closeAlertButton.textContent = buttonText;
  }

  function escCloseKeyHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      alertClose(evt);
    }
  }

  function onOutCloseClickHandler(evt) {
    if (evt.target.matches('section')) {
      alertClose(evt);
    }
  }

  function alertClose(evt) {
    alertElement.remove();
    evt.preventDefault();
    document.removeEventListener('click', onOutCloseClickHandler);
    document.removeEventListener('keydown', escCloseKeyHandler);
  }

  document.body.append(alertElement);
  closeAlertButton.addEventListener('click', alertClose);
  document.addEventListener('click', onOutCloseClickHandler);
  document.addEventListener('keydown', escCloseKeyHandler);
};

export { openAlert };
