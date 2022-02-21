function getRandom(min, max) {
  if (max < min) {
    return undefined;
  }
  else if (max === min) {
    return min;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPre(min, max, precision) {
  if (max < min) {
    return undefined;
  }
  else if (max === min) {
    return min;
  }
  return (Math.random() * (max - min) + min).toFixed(precision);
}

getRandom(1,5);

getRandomPre(7.1,7.5,2);
