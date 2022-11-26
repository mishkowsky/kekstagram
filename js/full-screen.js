import { openOverlayElement } from './overlay-handler.js';

const COMMENTS_TO_SHOW = 5;

let commentsDescription;

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

function showNextComments(amount) {
  const newCommentsDescription = commentsDescription.slice(
    comments.children.length,
    comments.children.length + amount,
  );

  const commentsFragment = document.createDocumentFragment();
  newCommentsDescription.forEach((comment) => commentsFragment.append(createComment(comment)));
  comments.appendChild(commentsFragment);

  commentCount.firstChild.textContent = `${comments.children.length  } из  `;

  if (comments.children.length >= commentsDescription.length) {
    commentsLoader.classList.add('hidden');
  }
}

const commentLoadClickHandler = () => {
  showNextComments(COMMENTS_TO_SHOW);
};

const openPictureFullScreen = (photoDescription) => {

  openOverlayElement(bigPicture, closeButton);

  imageSource.src = photoDescription.url;
  likes.textContent = photoDescription.likes;

  description.textContent = photoDescription.description;

  commentCount.querySelector('span').textContent = photoDescription.comments.length;

  comments.querySelectorAll('li').forEach((comment) => {
    comment.remove();
  });

  commentsDescription = photoDescription.comments;
  if (commentsDescription.length > 5) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', commentLoadClickHandler);
  }
  showNextComments(COMMENTS_TO_SHOW);
};

export { openPictureFullScreen };
