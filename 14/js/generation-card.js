const SIMILAR_CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');

const TypeApartmentsValue = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const checkFieldData = (data) => data !== undefined && data.toString().length > 0;

const hideField = (field) => field.classList.add('hidden');

const renderTitle = (titleContent, title) => {
  titleContent.textContent = '';
  if (checkFieldData(title)) {
    titleContent.textContent = title;
  } else {
    hideField(titleContent);
  }
};

const renderAddress = (addressContent, address) => {
  addressContent.textContent = '';
  if (checkFieldData(address)) {
    addressContent.textContent = address;
  } else {
    hideField(addressContent);
  }
};

const renderPrice = (priceContent, price) => {
  priceContent.textContent = '';
  if (checkFieldData(price)) {
    priceContent.textContent = `${price} `;
    const priceUnit = document.createElement('span');
    priceUnit.textContent = '₽/ночь';
    priceContent.appendChild(priceUnit);
  } else {
    hideField(priceContent);
  }
};

const renderPopupType = (popupTypeContent, popupType) => {
  popupTypeContent.textContent = '';
  if (checkFieldData(popupType)) {
    popupTypeContent.textContent = popupType;
  } else {
    hideField(popupTypeContent);
  }
};

const renderCapacity = (capacityContent, rooms, guests) => {
  capacityContent.textContent = '';
  if (checkFieldData(rooms) && checkFieldData(guests)) {
    capacityContent.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    hideField(capacityContent);
  }
};

const renderTime = (timeContent, checkin, checkout) => {
  timeContent.textContent = '';
  if (checkFieldData(checkin) && checkFieldData(checkout)) {
    timeContent.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    hideField(timeContent);
  }
};

const createFeaturesLi = (feature) => {
  const featuresElement = document.createElement('li');
  featuresElement.classList.add('popup__feature', `popup__feature--${feature}`);
  return featuresElement;
};

const renderFeatures = (place, features) => {
  place.textContent = '';
  if (checkFieldData(features)) {
    features.forEach((feature) => place.appendChild(createFeaturesLi(feature)));
  } else {
    hideField(place);
  }
};

const renderDescription = (descriptionContent, description) => {
  descriptionContent.textContent = '';
  if (checkFieldData(description)) {
    descriptionContent.textContent = description;
  } else {
    hideField(descriptionContent);
  }
};

const createPhotoImg = (src) => {
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.classList.add('popup__photo');
  imgElement.width = 45;
  imgElement.height = 45;
  imgElement.alt = 'Фотография жилья';
  return imgElement;
};

const renderPhotos = (place, photos) => {
  place.textContent = '';
  if (checkFieldData(photos)) {
    photos.forEach((photoSrc) => place.appendChild(createPhotoImg(photoSrc)));
  } else {
    hideField(place);
  }
};

const renderAvatar = (avatarContent, avatar) => {
  avatarContent.src = '';
  if (checkFieldData(avatar)) {
    avatarContent.src = avatar;
  } else {
    hideField(avatarContent);
  }
};

const renderCard = (card, data) => {
  renderTitle(card.querySelector('.popup__title'), data.offer.title);
  renderAddress(card.querySelector('.popup__text--address'), data.offer.address);
  renderPrice(card.querySelector('.popup__text--price'), data.offer.price);
  renderPopupType(card.querySelector('.popup__type'), TypeApartmentsValue[data.offer.type]);
  renderCapacity(card.querySelector('.popup__text--capacity'), data.offer.rooms, data.offer.guests);
  renderTime(card.querySelector('.popup__text--time'), data.offer.checkin, data.offer.checkout);
  renderFeatures(card.querySelector('.popup__features'), data.offer.features);
  renderDescription(card.querySelector('.popup__description'), data.offer.description);
  renderPhotos(card.querySelector('.popup__photos'), data.offer.photos);
  renderAvatar(card.querySelector('.popup__avatar'), data.author.avatar);
};

const generateCard = (data) => {
  const card = SIMILAR_CARD_TEMPLATE.cloneNode(true);
  renderCard(card, data);
  return card;
};

export { generateCard };
