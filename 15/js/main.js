import { disableOffer, enableOffer } from './offer.js';
import { setUserFormSubmit } from './form.js';
import { createMap, addSimilarOffers } from './map.js';
import { successPopup, errorPopup } from './user-modal.js';
import { fetchSimilarOffers } from './api.js';
import { renderErrorFullScreen } from './error-template.js';
import { debounce } from './debounce.js';
import './avatar.js';
import { disableFilter, enableFilter, setFilterChange } from './map-filter.js';

let loadedSimilarOffers = false;

disableOffer();
const addressField = document.querySelector('#address');
const map = createMap('map-canvas', () => enableOffer(loadedSimilarOffers), addressField);
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

setUserFormSubmit(successPopup, errorPopup);
