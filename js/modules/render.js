import { openPictureFullScreen } from './full-screen.js';

const pictureContainerElement = document.querySelector('.pictures.container');
const pictureTemplate = document.querySelector('#picture').content;


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

const renderPictures = (photoDescriptions) => {
  clearPictures();
  const fragment = document.createDocumentFragment();
  photoDescriptions.forEach((photoDescription) => {
    fragment.append(renderPicture(photoDescription));
  });
  pictureContainerElement.append(fragment);
  pictureContainerElement.addEventListener('click', (evt) => {
    if (evt.target.parentNode.className === 'picture') {
      evt.preventDefault();
      const arr = Array.prototype.slice.call(pictureContainerElement.querySelectorAll('.picture'));
      const index = arr.indexOf(evt.target.parentNode);
      openPictureFullScreen(photoDescriptions[index]);
    }
  });

};

export { renderPictures };
