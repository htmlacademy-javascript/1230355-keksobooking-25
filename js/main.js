import { disableForm, enableForm, setUserFormSubmit } from './form.js';
import { createMap, addSimilarOffers } from './map.js';
import { successPopup, errorPopup } from './user-modal.js';
import { fetchSimilarOffers } from './api.js';
import { renderErrorFullScreen } from './error-template.js';
import './avatar.js';

disableForm();
const addressField = document.querySelector('#address');
const map = createMap('map-canvas', enableForm, addressField);
const OFFERS_COUNT = 10;
fetchSimilarOffers(
  (offerInfos) => addSimilarOffers(map, offerInfos.slice(0, OFFERS_COUNT)),
  () => renderErrorFullScreen('Ошибка загрузки данных с сервера')
);

setUserFormSubmit(successPopup, errorPopup);
