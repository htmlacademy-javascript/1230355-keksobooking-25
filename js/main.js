import { disableOffer, enableOffer, resetOffer } from './offer.js';
import { resetBtnElement, setOfferFormSubmit } from './offer/form.js';
import { createMap, addSimilarOffers } from './map.js';
import { showSuccessPopup, showErrorPopup } from './user-modal.js';
import { fetchSimilarOffers } from './api.js';
import { renderErrorFullScreen } from './error-template.js';
import { debounce } from './debounce.js';
import { disableFilters, enableFilters, setFilterChange } from './map-filter.js';

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
    enableFilters(loadedSimilarOffers);
  },
  () => {
    renderErrorFullScreen('Ошибка загрузки данных с сервера');
    loadedSimilarOffers = false;
    disableFilters();
  }
);

resetBtnElement.addEventListener('click', () => resetOffer(map, addressElement));

setOfferFormSubmit(
  () => {
    resetOffer(map, addressElement);
    showSuccessPopup();
  }, showErrorPopup);
