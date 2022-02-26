function getRandom(min, max) {
  if (max >= min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return undefined;
}

function getRandomPre(min, max, precision) {
  if (max >= min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(precision);
  }
  return undefined;
}

getRandom(1,5);

getRandomPre(7.1,7.5,2);
