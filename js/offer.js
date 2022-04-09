import { disableFilter, enableFilter, resetFilters } from './map-filter.js';
import { resetMap } from './map.js';
import { disableForm, enableForm, resetForm } from './offer/form.js';

const disableOffer = () => {
  disableForm();
  disableFilter();
};

const enableOffer = (loadedSimilarOffers) => {
  enableForm();
  enableFilter(loadedSimilarOffers);
};

const resetOffer = (map, addressElement) => {
  resetForm();
  resetMap(map, addressElement);
  resetFilters();
};

export { disableOffer, enableOffer, resetOffer };