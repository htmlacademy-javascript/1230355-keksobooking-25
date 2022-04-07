import { disableFilter, enableFilter } from './map-filter.js';
import { disableForm, enableForm } from './form.js';

const disableOffer = () => {
  disableForm();
  disableFilter();
};

const enableOffer = (loadedSimilarOffers) => {
  enableForm();
  enableFilter(loadedSimilarOffers);
};

export {disableOffer, enableOffer};
