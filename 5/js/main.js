import { offerInfos } from './data.js';
import { generationCard } from './genCard.js';

const card = generationCard(offerInfos[0]);

const mapContent = document.querySelector('#map-canvas');

mapContent.appendChild(card);
