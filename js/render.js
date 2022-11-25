import { openPictureFullScreen } from './full-screen.js';

const pictureContainer = document.querySelector('.pictures.container');
const pictureTemplate = document.querySelector('#picture').content;

const renderPicture = (description, fragment) => {
  const clone = pictureTemplate.cloneNode(true);
  clone.querySelector('.picture__img').src = description.url;
  clone.querySelector('.picture__likes').textContent = description.likes;
  clone.querySelector('.picture__comments').textContent = description.comments.length;
  fragment.append(clone);
};

const renderPictures = (photoDescriptions) => {
  const fragment = document.createDocumentFragment();
  photoDescriptions.forEach((photoDescription) => {
    renderPicture(photoDescription, fragment);
  });
  pictureContainer.append(fragment);
  pictureContainer.addEventListener('click', (evt) => {
    if (evt.target.parentNode.className === 'picture') {
      evt.preventDefault();
      const arr = Array.prototype.slice.call(pictureContainer.querySelectorAll('.picture'));
      const index = arr.indexOf(evt.target.parentNode);
      openPictureFullScreen(photoDescriptions[index]);
    }
  });
};

export { renderPictures };
