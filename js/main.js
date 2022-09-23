function randomFromRange(min, max) {
  if (min > max) { return NaN; }
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function checkLenght(string, maxLength) {
  return string.length <= maxLength;
}
