const bigPicture = document.querySelector('.big-picture');
const imageSource = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const comments = bigPicture.querySelector('.social__comments');

const closeFullScreen = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

};

const buttonClickHandler = (evt) => {
  evt.preventDefault();
  closeFullScreen();
};

const buttonKeyDownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullScreen();
  }
};

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

  document.body.classList.add('modal-open');
  imageSource.src = photoDescription.url;
  bigPicture.classList.remove('hidden');
  likes.textContent = photoDescription.likes;

  description.textContent = photoDescription.description;

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  closeButton.addEventListener('click', buttonClickHandler);
  document.addEventListener('keydown', buttonKeyDownHandler);

  comments.querySelectorAll('li').forEach((comment) => {
    comment.remove();
  });

  photoDescription.comments.forEach((comment) => {
    comments.appendChild(createComment(comment));
  });
};

export { openPictureFullScreen };
