import { disableOffer, enableOffer, resetOffer } from './offer.js';
import { resetBtn, setOfferFormSubmit } from './offer/form.js';
import { createMap, addSimilarOffers } from './map.js';
import { successPopup, errorPopup } from './user-modal.js';
import { fetchSimilarOffers } from './api.js';
import { renderErrorFullScreen } from './error-template.js';
import { debounce } from './debounce.js';
import { disableFilter, enableFilter, setFilterChange } from './map-filter.js';

const addressElement = document.querySelector('#address');

let loadedSimilarOffers = false;

disableOffer();
const map = createMap('map-canvas', () => enableOffer(loadedSimilarOffers), addressElement);
const similarMarkerLayer = L.layerGroup().addTo(map);

fetchSimilarOffers(
  (data) => {
    addSimilarOffers(similarMarkerLayer, data);
    loadedSimilarOffers = true;
    setFilterChange(debounce(
      () => addSimilarOffers(similarMarkerLayer, data)));
    enableFilter(loadedSimilarOffers);
  },
  () => {
    renderErrorFullScreen('Ошибка загрузки данных с сервера');
    loadedSimilarOffers = false;
    disableFilter();
  }
);

resetBtn.addEventListener('click', () => resetOffer(map, addressElement));

setOfferFormSubmit(
  () => {
    resetOffer(map, addressElement);
    successPopup();
  }, errorPopup);
