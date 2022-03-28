import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayFromDataSet} from './util.js';

const TYPE_APARTMENTS = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMELINES = [
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

const COORDINATOR_PRESITION = 5;

const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const LocationRange = {
  LAT_MIN: 35.65,
  LAT_MAX: 35.7,
  LNG_MIN: 139.7,
  LNG_MAX: 139.8,
};

const createAuthor = (number) => ({ avatar: `img/avatars/user${number.toString().padStart(2, '0')}.png` });

const createOffer = (number, lat, lng) => ({
  title: `Заголовок предложения №${number}`,
  address: `${lat}, ${lng}`,
  price: getRandomInteger(1, 100000),
  type: getRandomArrayElement(TYPE_APARTMENTS),
  rooms: getRandomInteger(1, 10),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(TIMELINES),
  checkout: getRandomArrayElement(TIMELINES),
  features: getRandomArrayFromDataSet(FEATURES),
  description: `строка — описание помещения №${number}`,
  photos: getRandomArrayFromDataSet(PHOTOS),
});

const createLocation = (lat, lng) => ({lat, lng});

const createOfferInfo = (number) => {
  const LAT = getRandomFloat(LocationRange.LAT_MIN, LocationRange.LAT_MAX, COORDINATOR_PRESITION);
  const LNG = getRandomFloat(LocationRange.LNG_MIN, LocationRange.LNG_MAX, COORDINATOR_PRESITION);
  return {
    author: createAuthor(number),
    offer: createOffer(number, LAT, LNG),
    location: createLocation(LAT, LNG),
  };
};

const OFFER_INFOS = Array.from({length: SIMILAR_ADVERTISEMENTS_COUNT}, (value, index) => createOfferInfo(index + 1));

export {OFFER_INFOS};
