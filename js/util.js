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

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArrayFromDataSet = (dataSet) => {
  const arr = Array.from(dataSet);
  const result = new Array(getRandomPositiveInteger(0, arr.length - 1));
  for (let i = 0; i < result.length; i++) {
    result[i] = arr.splice(getRandomPositiveInteger(0, arr.length - 1), 1);
  }
  return result;
};

export {getRandom};
export {getRandomPre};
export {getRandomArrayElement};
export {getRandomArrayFromDataSet};
