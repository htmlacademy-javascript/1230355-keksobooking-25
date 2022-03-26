import { generationCard } from './generation-card.js';

const COORDINATOR_PRESITION = 5;

const setAddress = (addressField, latLng) => {
  addressField.setAttribute('value', `${latLng.lat.toFixed(COORDINATOR_PRESITION)}, ${latLng.lng.toFixed(COORDINATOR_PRESITION)}`);
};

const createMap = (elementId, afterLoadAction, addressField) => {
  const map = L.map(elementId);
  map.on('load', () => afterLoadAction());
  map.setView({
    lat: 35.685,
    lng: 139.753,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.685,
      lng: 139.753,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  setAddress(addressField, mainPinMarker.getLatLng());

  mainPinMarker.on('moveend', (evt) => {
    setAddress(addressField, evt.target.getLatLng());
  });

  return map;
};

const addSimularOffers = (map, offerInfos) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  offerInfos.forEach((offerInfo) => {
    const { lat, lng } = offerInfo.location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(generationCard(offerInfo));
  });
};

export { createMap, addSimularOffers };
