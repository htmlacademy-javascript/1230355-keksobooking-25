import { generateCard } from './generation-card.js';
import { filterByAll, getSelectedFeatures } from './map-filter.js';

const COORDINATE_PRESITION = 5;
const MAP_ZOOM = 13;
const DEFAULT_COORDINATES = {
  lat: 35.685,
  lng: 139.753
};
const SIMILAR_OFFERS_MAX_NUMBER = 10;

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  DEFAULT_COORDINATES,
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const similarOfferMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setAddress = (addressElement, location) => {
  addressElement.setAttribute('value', `${location.lat.toFixed(COORDINATE_PRESITION)}, ${location.lng.toFixed(COORDINATE_PRESITION)}`);
};

const createMap = (mapElementId, onLoad, addressElement) => {
  const MAP = L.map(mapElementId)
    .on('load', () => onLoad())
    .setView(DEFAULT_COORDINATES, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);

  mainMarker.addTo(MAP);

  setAddress(addressElement, mainMarker.getLatLng());

  mainMarker.on('moveend', (evt) => {
    setAddress(addressElement, evt.target.getLatLng());
  });

  return MAP;
};

const addSimilarOffers = (layer, offerInfos) => {
  layer.clearLayers();
  const selectedFeatures = getSelectedFeatures();

  offerInfos
    .filter((offerInfo) => filterByAll(offerInfo, selectedFeatures))
    .slice(0, SIMILAR_OFFERS_MAX_NUMBER)
    .forEach((offerInfo) => {
      const marker = L.marker(
        offerInfo.location,
        {
          icon: similarOfferMarkerIcon,
        },
      );

      marker
        .addTo(layer)
        .bindPopup(generateCard(offerInfo));
    });
};
const resetMainMarker = (addressElement) => {
  mainMarker.setLatLng(DEFAULT_COORDINATES);
  setAddress(addressElement, mainMarker.getLatLng());
};

const resetMap = (addressElement) => {
  resetMainMarker(addressElement);
};

export { createMap, addSimilarOffers, resetMap };
