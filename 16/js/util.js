const getRandomInteger = (min, max) => {
  if (max >= min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return undefined;
};

const getRandomFloat = (min, max, precision) => {
  if (max >= min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(precision);
  }
  return undefined;
};

const getRandomPositiveInteger = (a, b) => {
  const LOWER = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const UPPER = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;
  return Math.floor(RESULT);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArrayFromDataSet = (dataSet) => {
  const ARR = Array.from(dataSet);
  const RESULT = new Array(getRandomPositiveInteger(0, ARR.length - 1));
  for (let i = 0; i < RESULT.length; i++) {
    RESULT[i] = ARR.splice(getRandomPositiveInteger(0, ARR.length - 1), 1);
  }
  return RESULT;
};

export { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayFromDataSet };
