import { shuffleArray } from '../utils/util.js';
import { getData } from './api.js';
import { openAlert } from './alert.js';
import { renderPictures } from './render.js';
import { debounce  } from '../utils/util.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filterFormElement = document.querySelector('.img-filters__form');
const filterContainerElement = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const filterByDefault = (photos) => photos;

const filterByRandom = (photos) => shuffleArray(photos).slice(0, NUMBER_OF_RANDOM_PHOTOS);

const filterByComments = (photos) => photos.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);

const changeFilterHandler = (filterType) => {

  let currentFilter;
  switch (filterType) {
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
  getData(
    (posts) => {
      renderPictures(currentFilter(posts));
    },
    () => {
      openAlert('error', 'Не удалось загрузить данные', 'ОК');
    }
  );
};

const initFilters = () => {

  filterContainerElement.classList.remove('img-filters--inactive');

  filterFormElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      filterButtons.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
      });
      evt.target.classList.add('img-filters__button--active');
      debounce(changeFilterHandler(evt.target.id), RERENDER_DELAY);
    }
  });
};

export { initFilters, filterByDefault, filterByRandom, filterByComments };
