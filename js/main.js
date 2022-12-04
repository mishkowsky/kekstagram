import { renderPictures } from './modules/render.js';
import { initUploadForm } from './modules/upload-form.js';
import { initEffectsHandler } from './modules/effects-handler.js';
import { initScaleHandler } from './modules/scale-handler.js';
import { getData } from './modules/api.js';
import { openAlert } from './modules/alert.js';

getData(
  (posts) => {
    renderPictures(posts);
  },
  () => {
    openAlert('error', 'Не удалось загрузить данные', 'ОК');
  }
);

initUploadForm();
initEffectsHandler();
initScaleHandler();
