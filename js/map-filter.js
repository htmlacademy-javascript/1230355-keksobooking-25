const PriceThreshold = {
  LOW: 10000,
  HIGH: 50000
};
const housingMapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = housingMapFiltersElement.querySelector('#housing-type');
const housingPriceElement = housingMapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = housingMapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = housingMapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElement = housingMapFiltersElement.querySelector('#housing-features');
const featuresElements = housingFeaturesElement.querySelectorAll('.map__checkbox');
const housingMapFilterSelectElements = housingMapFiltersElement.querySelectorAll('select');
const housingMapFilterFieldsetElement = housingMapFiltersElement.querySelector('#housing-features');

export const disableFilters = () => {
  housingMapFiltersElement.classList.add('map__filters--disabled');
  housingMapFilterSelectElements.forEach((el) => el.setAttribute('disabled', ''));
  housingMapFilterFieldsetElement.setAttribute('disabled', '');
};

export const enableFilters = (loadedSimilarOffers) => {
  if (loadedSimilarOffers) {
    housingMapFiltersElement.classList.remove('map__filters--disabled');
    housingMapFilterSelectElements.forEach((el) => el.removeAttribute('disabled'));
    housingMapFilterFieldsetElement.removeAttribute('disabled');
  }
};

export const resetFilters = () => {
  housingMapFilterSelectElements.forEach((el) => {
    el.value = 'any';
  });
  featuresElements.forEach((el) => {
    el.checked = false;
  });
  const evt = new Event('change');
  housingTypeElement.dispatchEvent(evt);
};

export const setFilterChange = (action) => {
  [...housingMapFiltersElement.children].forEach((filterElement) => filterElement.addEventListener('change', () => action()));
};

export const filterByType = (currentType) => housingTypeElement.value === 'any' || currentType === housingTypeElement.value;

export const filterByPrice = (currentPrice) => {
  switch (housingPriceElement.value) {
    case 'any':
      return true;
    case 'middle':
      return currentPrice >= PriceThreshold.LOW && currentPrice <= PriceThreshold.HIGH;
    case 'low':
      return currentPrice < PriceThreshold.LOW;
    case 'high':
      return currentPrice > PriceThreshold.HIGH;
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
  featuresElements.forEach((housingFeaterCheckBox) => {
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
