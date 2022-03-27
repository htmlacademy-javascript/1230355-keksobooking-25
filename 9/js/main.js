import { offerInfos } from './data.js';
import { activeForm, deactiveForm } from './form.js';
import { createMap, addSimularOffers } from './map.js';

deactiveForm();
const addressField = document.querySelector('#address');
const map = createMap('map-canvas', activeForm, addressField);
addSimularOffers(map, offerInfos);
