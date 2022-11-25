import { openOverlayElement } from './overlay-handler.js';

const bigPicture = document.querySelector('.big-picture');
const imageSource = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const comments = bigPicture.querySelector('.social__comments');

const createComment = (comment) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(p);

  return li;
};

const openPictureFullScreen = (photoDescription) => {

  openOverlayElement(bigPicture, closeButton);

  imageSource.src = photoDescription.url;
  likes.textContent = photoDescription.likes;

  description.textContent = photoDescription.description;

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  comments.querySelectorAll('li').forEach((comment) => {
    comment.remove();
  });

  photoDescription.comments.forEach((comment) => {
    comments.appendChild(createComment(comment));
  });
};

export { openPictureFullScreen };
