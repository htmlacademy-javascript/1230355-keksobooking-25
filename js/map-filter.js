const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');
const housingFeaturesCheckBoxes = housingFeaturesElement.querySelectorAll('.map__checkbox');
const housingMapFilters = document.querySelector('.map__filters');
const housingMapFilterSelects = housingMapFilters.querySelectorAll('select');
const housingMapFiltersFieldset = housingMapFilters.querySelector('#housing-features');

export const disableFilter = () => {
  housingMapFilters.classList.add('map__filters--disabled');
  housingMapFilterSelects.forEach((el) => el.setAttribute('disabled', ''));
  housingMapFiltersFieldset.setAttribute('disabled', '');
};

export const enableFilter = (loadedSimilarOffers) => {
  if (loadedSimilarOffers) {
    housingMapFilters.classList.remove('map__filters--disabled');
    housingMapFilterSelects.forEach((el) => el.removeAttribute('disabled'));
    housingMapFiltersFieldset.removeAttribute('disabled');
  }
};

export const resetFilters = () => {
  housingMapFilterSelects.forEach((el) => {
    el.value = 'any';
  });
  const features = housingMapFiltersFieldset.querySelectorAll('[name="features"]');
  features.forEach((el) => {
    el.checked = false;
  });
};

export const setFilterChange = (action) => {
  [...housingMapFilters.children].forEach((filterElement) => filterElement.addEventListener('change', () => action()));
};

export const filterByType = (currentType) => housingTypeElement.value === 'any' || currentType === housingTypeElement.value;

export const filterByPrice = (currentPrice) => {
  switch (housingPriceElement.value) {
    case 'any':
      return true;
    case 'middle':
      return currentPrice >= 10000 && currentPrice <= 50000;
    case 'low':
      return currentPrice < 10000;
    case 'high':
      return currentPrice > 50000;
  }
};

export const filterByRooms = (currentRooms) => {
  switch (housingRoomsElement.value) {
    case 'any':
      return true;
    case '1':
      return currentRooms === 1;
    case '2':
      return currentRooms === 2;
    case '3':
      return currentRooms === 3;
  }
};

export const filterByGuests = (currentGuests) => {
  switch (housingGuestsElement.value) {
    case 'any':
      return true;
    case '2':
      return currentGuests === 2;
    case '1':
      return currentGuests === 1;
    case '0':
      return currentGuests === 0;
  }
};

export const filterByFeatures = (currentFeatures, selectedFeatures) => {
  if (selectedFeatures.length === 0) {
    return true;
  }
  if (currentFeatures === undefined) {
    return false;
  }

  return selectedFeatures.every((feature) => currentFeatures.includes(feature));
};

export const getSelectedFeatures = () => {
  const selectedFeatures = [];
  housingFeaturesCheckBoxes.forEach((housingFeaterCheckBox) => {
    if (housingFeaterCheckBox.checked) {
      selectedFeatures.push(housingFeaterCheckBox.value);
    }
  });
  return selectedFeatures;
};

export const filterByAll = (offerInfo, selectedFeatures) =>
  filterByType(offerInfo.offer.type) && filterByPrice(offerInfo.offer.price) &&
  filterByRooms(offerInfo.offer.rooms) && filterByGuests(offerInfo.offer.guests) &&
  filterByFeatures(offerInfo.offer.features, selectedFeatures);
