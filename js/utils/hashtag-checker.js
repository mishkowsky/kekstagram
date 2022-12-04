import { hasDuplicates } from './util.js';

const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;
const MAX_HASHTAG_NUMBERS = 5;
const isCorrectHashtag = (value) => regexHashtag.test(value);

const checkHashtag = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');
  let hashtagIsCorrect = false;
  let hashtagErrorMessage = '';
  if (!hashtags.every(isCorrectHashtag)) {
    hashtagErrorMessage = 'Неверный формат хэштега';
  } else if (hashtags.length > MAX_HASHTAG_NUMBERS) {
    hashtagErrorMessage = 'Слишком много хэштегов';
  } else if (hasDuplicates(hashtags)) {
    hashtagErrorMessage = 'Хэштеги должны быть уникальными';
  } else {
    hashtagIsCorrect = true;
  }
  return { hashtagIsCorrect: hashtagIsCorrect, hashtagErrorMessage: hashtagErrorMessage };
};

export { checkHashtag };
