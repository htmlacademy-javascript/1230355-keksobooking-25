import { OFFER_INFOS } from './data.js';
import { disableForm, enableForm } from './form.js';
import { createMap, addSimularOffers } from './map.js';

disableForm();
const addressField = document.querySelector('#address');
const map = createMap('map-canvas', enableForm, addressField);
addSimularOffers(map, OFFER_INFOS);
