import { offerInfos } from './data.js';
import { generationCard } from './genCard.js';
import { activeForm, deactiveForm } from './form.js';

deactiveForm();
const card = generationCard(offerInfos[0]);
const mapContent = document.querySelector('#map-canvas');
mapContent.appendChild(card);
// activeForm();
