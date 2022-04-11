import { disableFilters, enableFilters, resetFilters } from './map-filter.js';
import { resetMap } from './map.js';
import { disableForm, enableForm, resetForm } from './offer/form.js';

const disableOffer = () => {
  disableForm();
  disableFilters();
};

const enableOffer = (loadedSimilarOffers) => {
  enableForm();
  enableFilters(loadedSimilarOffers);
};

const resetOffer = (map, addressElement) => {
  resetForm();
  resetMap(map, addressElement);
  resetFilters();
};

export { disableOffer, enableOffer, resetOffer };
