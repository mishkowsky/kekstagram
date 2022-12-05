import { openPictureFullScreen } from './full-screen.js';

const pictureContainerElement = document.querySelector('.pictures.container');
const pictureTemplate = document.querySelector('#picture').content;
let firstRender = true;

const clearPictures = () => {
  pictureContainerElement.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderPicture = (description) => {
  const clone = pictureTemplate.cloneNode(true);
  clone.querySelector('.picture__img').src = description.url;
  clone.querySelector('.picture__likes').textContent = description.likes;
  clone.querySelector('.picture__comments').textContent = description.comments.length;
  return clone;
};

let lastListener;

const renderPictures = (photoDescriptions) => {
  clearPictures();
  const fragment = document.createDocumentFragment();
  photoDescriptions.forEach((photoDescription) => {
    fragment.append(renderPicture(photoDescription));
  });
  pictureContainerElement.append(fragment);

  const arr = Array.prototype.slice.call(pictureContainerElement.querySelectorAll('.picture'));

  function clickOnPictureHandler(evt) {
    const res = evt.target.closest('.picture');
    if (res !== null) {
      evt.preventDefault();
      const index = arr.indexOf(res);
      if (index !== -1) {
        openPictureFullScreen(photoDescriptions[index]);
      }
    }
  }
  if (!firstRender) {
    pictureContainerElement.removeEventListener('click', lastListener);
  }
  firstRender = false;
  lastListener = clickOnPictureHandler;
  pictureContainerElement.addEventListener('click', lastListener);
};

export { renderPictures };
