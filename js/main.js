import { renderPictures } from './modules/render.js';
import { initUploadForm } from './modules/upload-form.js';
import { initEffectsHandler } from './modules/effects-handler.js';
import { initScaleHandler } from './modules/scale-handler.js';
import { getData } from './modules/api.js';
import { openAlert } from './modules/alert.js';
import { initFilters } from './modules/filters.js';

getData(
  (posts) => {
    renderPictures(posts);
    initFilters();
  },
  () => {
    openAlert('error', 'Не удалось загрузить данные', 'ОК');
  }
);

initUploadForm();
initEffectsHandler();
initScaleHandler();
