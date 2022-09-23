//src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function randomFromRange(min, max) {
  if (min > max) { return NaN; }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function checkLenght(string, maxLength) {
  return string.length <= maxLength;
}

randomFromRange(1, 10);
checkLenght('some string', 10);
