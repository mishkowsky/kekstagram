import { createRandomPhotosDescriptions } from './data.js';
import { renderPictures } from './render.js';
import './img-upload.js';

renderPictures(createRandomPhotosDescriptions());
