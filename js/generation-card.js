const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typeApartments = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const checkFieldData = (data) => data !== undefined && data.toString().length > 0;

const unvisibleField = (field) => field.classList.add('hidden');

const renderTitle = (titleContent, title) => {
  titleContent.textContent = '';
  if (checkFieldData(title)) {
    titleContent.textContent = title;
  } else {
    unvisibleField(titleContent);
  }
};

const renderAddress = (addressContent, address) => {
  addressContent.textContent = '';
  if (checkFieldData(address)) {
    addressContent.textContent = address;
  } else {
    unvisibleField(addressContent);
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
    unvisibleField(priceContent);
  }
};

const renderPopupType = (popupTypeContent, popupType) => {
  popupTypeContent.textContent = '';
  if (checkFieldData(popupType)) {
    popupTypeContent.textContent = popupType;
  } else {
    unvisibleField(popupTypeContent);
  }
};

const renderCapacity = (capacityContent, rooms, guests) => {
  capacityContent.textContent = '';
  if (checkFieldData(rooms) && checkFieldData(guests)) {
    capacityContent.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    unvisibleField(capacityContent);
  }
};

const renderTime = (timeContent, checkin, checkout) => {
  timeContent.textContent = '';
  if (checkFieldData(checkin) && checkFieldData(checkout)) {
    timeContent.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    unvisibleField(timeContent);
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
    unvisibleField(place);
  }
};

const renderDescription = (descriptionContent, description) => {
  descriptionContent.textContent = '';
  if (checkFieldData(description)) {
    descriptionContent.textContent = description;
  } else {
    unvisibleField(descriptionContent);
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
    unvisibleField(place);
  }
};

const renderAvatar = (avatarContent, avatar) => {
  avatarContent.src = '';
  if (checkFieldData(avatar)) {
    avatarContent.src = avatar;
  } else {
    unvisibleField(avatarContent);
  }
};

const renderCard = (card, data) => {
  renderTitle(card.querySelector('.popup__title'), data.offer.title);
  renderAddress(card.querySelector('.popup__text--address'), data.offer.address);
  renderPrice(card.querySelector('.popup__text--price'), data.offer.price);
  renderPopupType(card.querySelector('.popup__type'), typeApartments[data.offer.type]);
  renderCapacity(card.querySelector('.popup__text--capacity'), data.offer.rooms, data.offer.guests);
  renderTime(card.querySelector('.popup__text--time'), data.offer.checkin, data.offer.checkout);
  renderFeatures(card.querySelector('.popup__features'), data.offer.features);
  renderDescription(card.querySelector('.popup__description'), data.offer.description);
  renderPhotos(card.querySelector('.popup__photos'), data.offer.photos);
  renderAvatar(card.querySelector('.popup__avatar'), data.author.avatar);
};

const generationCard = (data) => {
  const card = similarCardTemplate.cloneNode(true);
  renderCard(card, data);
  return card;
};

export { generationCard };
