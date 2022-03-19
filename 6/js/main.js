import { offerInfos } from './data.js';
//import { activeForm, deactiveForm } from './form.js';
import { generationCard } from './generation-card.js';

//deactiveForm();
const card = generationCard(offerInfos[0]);
const mapContent = document.querySelector('#map-canvas');
mapContent.appendChild(card);
//activeForm();
