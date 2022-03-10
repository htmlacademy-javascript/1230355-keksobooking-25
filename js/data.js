import {getRandom} from './util.js';
import {getRandomPre} from './util.js';
import {getRandomArrayElement, getRandomArrayFromDataSet} from './util.js';
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

const LOCATION_RANGE = {
  latMin: 35.65,
  latMax: 35.7,
  lngMin: 139.7,
  lngMax: 139.8,
};

const COORDINATOR_PRESITION = 5;

const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const createAuthor = (number) => ({ avatar: `img/avatars/user${number.toString().padStart(2, '0')}.png` });

const createOffer = (number, lat, lng) => ({
  title: `Заголовок предложения №${number}`,
  address: `${lat}, ${lng}`,
  price: getRandom(1, 100000),
  type: getRandomArrayElement(TYPE_APARTMENTS),
  rooms: getRandom(1, 10),
  guests: getRandom(1, 10),
  checkin: getRandomArrayElement(TIMELINE),
  checkout: getRandomArrayElement(TIMELINE),
  features: getRandomArrayFromDataSet(FEATURES),
  description: `строка — описание помещения №${number}`,
  photos: getRandomArrayFromDataSet(PHOTOS),
});

const createLocation = (lat, lng) => ({
  lat: lat,
  lng: lng
});

const createOfferInfo = (number) => {
  const lat = getRandomPre(LOCATION_RANGE.latMin, LOCATION_RANGE.latMax, COORDINATOR_PRESITION);
  const lng = getRandomPre(LOCATION_RANGE.lngMin, LOCATION_RANGE.lngMax, COORDINATOR_PRESITION);
  return {
    author: createAuthor(number),
    offer: createOffer(number, lat, lng),
    location: createLocation(lat, lng),
  };
};

const offerInfos = Array.from({length: SIMILAR_ADVERTISEMENTS_COUNT}, (value, index) => createOfferInfo(index + 1));

export {offerInfos};
