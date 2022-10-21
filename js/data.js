
import {getRandomIntFromRange} from './util.js';

const NAMES = [
  'Лев',
  'Виктория',
  'Вера',
  'Анна',
  'Дмитрий',
  'Дарья',
  'Александр',
  'Анастасия',
  'Мария',
  'Елизавета',
];

const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Мотивация на понедельник? Я мотивирован 7 дней в неделю.',
  'Лучшая тренировка – это бег на короткие дистанции. От холодильника к дивану, например.',
  'Все мы рождаемся немного странными, некоторые просто не меняются.',
  'Похоже у меня аллергия на утро. 🤧',
  'Бегаю ли я по утрам? Нет, потому что боюсь, что не смогу остановиться и убегу из страны.',
  'Я перевел телефон в режим самолёта, но он так и не взлетел. 🛬',
  'Привет, тут должна быть забавная или умная цитата. Надеюсь, тебе понравилась!',
  'Табличка сарказм',
  'Если бы я была посмешнее, то и подпись была интересная.',
  'Когда я начинаю следовать своим мечтам, то иду спать. 😴'
];

const PHOTOS_DESCRIPTION_COUNT = 25;
const URL_COUNT = 25;
const MAX_AMOUNT_OF_COMMENTS = 5;
const photosIds = Array(PHOTOS_DESCRIPTION_COUNT).fill(false);
const urlIds = Array(URL_COUNT).fill(false);
const commentsIds = Array(MAX_AMOUNT_OF_COMMENTS * PHOTOS_DESCRIPTION_COUNT).fill(false);

const getNextId = (array) => {
  let i = 0;
  while (i < array.length && array[i]) { i++; }
  if (i >= array.length) { throw new Error('No more IDs available'); }
  array[i] = true;
  return i + 1;
};

const createComment = () => ({
  id: getNextId(commentsIds),
  avatar: `img/avatar-${getRandomIntFromRange(1, 6)}.svg`,
  message: SENTENCES[Math.floor(Math.random()*SENTENCES.length)],
  name: NAMES[Math.floor(Math.random()*NAMES.length)],
});

const createPhotoDescription = () => ({
  id: getNextId(photosIds),
  url: `photos/${getNextId(urlIds)}.jpg`,
  description: DESCRIPTIONS[Math.floor(Math.random()*DESCRIPTIONS.length)],
  likes: getRandomIntFromRange(15, 200),
  comments: Array.from({length: getRandomIntFromRange(1, MAX_AMOUNT_OF_COMMENTS)}, createComment),
  avatar: `img/avatar-${getRandomIntFromRange(1, 6)}.svg`,
});

const createRandomPhotosDescriptions = () => Array.from({length: PHOTOS_DESCRIPTION_COUNT}, createPhotoDescription);

export {createRandomPhotosDescriptions};
