import { createRandomPhotosDescriptions } from './data.js';
import { renderPictures } from './render.js';
// make it init func
import { initImgUploader } from './img-upload.js';
import { initEffectsController } from './effects-controller.js';
import { initScaleController } from './scale-button-controller.js';

renderPictures(createRandomPhotosDescriptions());
initImgUploader();
initEffectsController();
initScaleController();
