/* eslint-disable no-unused-vars */
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

const TYPE_APARTMENTS = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMELINE = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

const getRandomArrayFromDataSet = (dataSet) => {
  const arr = Array.from(dataSet);
  const result = new Array(getRandomPositiveInteger(0, arr.length - 1));
  for (let i = 0; i < result.length; i++) {
    result[i] = arr.splice(getRandomPositiveInteger(0, arr.length - 1), 1);
  }
  return result;
};

// eslint-disable-next-line no-unused-vars
const createAuthor = (number) => ({
  avatar: `img/avatars/user${number}.png`
});

// eslint-disable-next-line no-unused-vars
const createOffer = (lat) => ({
  title: 'Заголовок предложения',
  address: `${lat}, ${lat}`,
  price: getRandom(1, Infinity),
  type: getRandomArrayElement(TYPE_APARTMENTS),
  rooms: getRandom(1, Infinity),
  guests: getRandom(1, Infinity),
  checkin: getRandomArrayElement(TIMELINE),
  checkout: getRandomArrayElement(TIMELINE),
  features: getRandomArrayFromDataSet(FEATURES), //mассив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
  description: 'строка — описание помещения. Придумайте самостоятельно',
  photos: getRandomArrayFromDataSet(PHOTOS), //массив строк — массив случайной длины из значений:
});

// eslint-disable-next-line no-unused-vars
const createLocation = () => ({
  lat: getRandomPre(35.65, 35.7, 5),
  lng: getRandomPre(139.7, 139.8, 5)
});

const createOfferInfo = (number) => ({
  author: createAuthor(number),
  location: createLocation(),
  offer: createOffer(location.lat),
});

const offerInfos = Array.from({length: SIMILAR_ADVERTISEMENTS_COUNT}, (value, index) => createOfferInfo((index + 1).toString().padStart(2, '0')));
console.log(offerInfos);
