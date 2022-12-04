const COMMENTS_TO_SHOW = 5;

let commentsDescription;

const bigPictureElement = document.querySelector('.big-picture');
const imageSourceElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const photoDescriptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsElement = bigPictureElement.querySelector('.social__comments');

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
    commentsElement.children.length,
    commentsElement.children.length + amount,
  );

  const commentsFragment = document.createDocumentFragment();
  newCommentsDescription.forEach((comment) => commentsFragment.append(createComment(comment)));
  commentsElement.appendChild(commentsFragment);

  commentCountElement.firstChild.textContent = `${commentsElement.children.length  } из  `;

  if (commentsElement.children.length >= commentsDescription.length) {
    commentsLoaderElement.classList.add('hidden');
  }
}

const commentLoadClickHandler = () => {
  showNextComments(COMMENTS_TO_SHOW);
};

const closeOverlayPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeOverlayPicture();
};

function escapeKeyDownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeOverlayPicture();
  }
}

const openPictureFullScreen = (photoDescription) => {

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', escapeKeyDownHandler);

  imageSourceElement.src = photoDescription.url;
  likesCountElement.textContent = photoDescription.likes;

  photoDescriptionElement.textContent = photoDescription.description;

  commentCountElement.querySelector('span').textContent = photoDescription.comments.length;

  commentsElement.querySelectorAll('li').forEach((comment) => {
    comment.remove();
  });

  commentsDescription = photoDescription.comments;
  if (commentsDescription.length > 5) {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', commentLoadClickHandler);
  }
  showNextComments(COMMENTS_TO_SHOW);
};

export { openPictureFullScreen };
