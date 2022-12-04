import { shuffleArray } from '../utils/util.js';
import { getData } from './api.js';
import { openAlert } from './alert.js';
import { renderPictures } from './render.js';
import { debounce  } from '../utils/util.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filterContainer = document.querySelector('.img-filters');
const filterButtons = [...document.querySelectorAll('.img-filters__button')];

const filterByDefault = (photos) => photos;

const filterByRandom = (photos) => shuffleArray(photos).slice(0, NUMBER_OF_RANDOM_PHOTOS);

const filterByComments = (photos) => photos.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);

const initFilters = () => {
  filterContainer.classList.remove('img-filters--inactive');

  filterContainer.addEventListener('click', (evt) => {
    if (evt.target && evt.target.matches('.img-filters__button')) {
      filterButtons.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
      });

      evt.target.classList.add('img-filters__button--active');
    }
  });

  filterContainer.addEventListener('click', debounce(changeFilterHandler, RERENDER_DELAY));
};

function changeFilterHandler(evt) {
  let currentFilter;
  switch (evt.target.id) {
    case 'filter-default':
      currentFilter = filterByDefault;
      break;
    case 'filter-random':
      currentFilter = filterByRandom;
      break;
    case 'filter-discussed':
      currentFilter = filterByComments;
      break;
  }
  // TODO: is it ok to do request for data every time?
  getData(
    (posts) => {
      renderPictures(currentFilter(posts));
    },
    () => {
      openAlert('error', 'Не удалось загрузить данные', 'ОК');
    }
  );
}

export { initFilters, filterByDefault, filterByRandom, filterByComments };
