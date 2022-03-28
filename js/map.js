import { generateCard } from './generation-card.js';

const COORDINATOR_PRESITION = 5;

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MAIN_PIN_MARKER = L.marker(
  {
    lat: 35.685,
    lng: 139.753,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

const ADDITIONAL_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setAddress = (addressField, latLng) => {
  addressField.setAttribute('value', `${latLng.lat.toFixed(COORDINATOR_PRESITION)}, ${latLng.lng.toFixed(COORDINATOR_PRESITION)}`);
};

const createMap = (elementId, afterLoadAction, addressField) => {
  const MAP = L.map(elementId);
  MAP.on('load', () => afterLoadAction());
  MAP.setView({
    lat: 35.685,
    lng: 139.753,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);

  MAIN_PIN_MARKER.addTo(MAP);

  setAddress(addressField, MAIN_PIN_MARKER.getLatLng());

  MAIN_PIN_MARKER.on('moveend', (evt) => {
    setAddress(addressField, evt.target.getLatLng());
  });

  return MAP;
};

const addSimularOffers = (map, offerInfos) => {
  offerInfos.forEach((offerInfo) => {
    const { lat, lng } = offerInfo.location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: ADDITIONAL_ICON,
      },
    );

    marker
      .addTo(map)
      .bindPopup(generateCard(offerInfo));
  });
};

export { createMap, addSimularOffers };
