//src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
const getRandomIntFromRange = (min, max) => {
  if (min > max) {
    throw new Error('Invalid arguments: upper limit is below the lower limit');
  }
  if (min < 0) {
    throw new Error('Invalid arguments: range cannot be negative');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const checkLength = (value, maxLength) => String(value).length <= maxLength;

function between(x, min, max) {
  if (min < max) { return x >= min && x <= max; }
  else { return x >= max && x <= min; }
}

const hasDuplicates = (array) => (new Set(array)).size !== array.length;

export { getRandomIntFromRange, hasDuplicates, checkLength, between };
