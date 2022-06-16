import React, { useContext } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  AttributionControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { SearchContext } from '../context';
import { useColorScheme } from '../../../hooks';
import { VendorResponse } from '../../../types';

const attribution =
  'Map tiles by <a href="https://carto.com/basemaps/" rel="noreferrer noopener">Carto</a>, under CC BY 3.0.';

const icon = L.icon({
  iconUrl: require('../../../assets/images/marker.svg'),
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -40],
});

const eventHandlers: L.LeafletEventHandlerFnMap = {
  // when you click a marker,
  // open the modal just enough
  // and scroll to that barber
  // or put them at the top
  click: (e) => {
    const vendor = e.target.options['data-vendor'] as VendorResponse;
    console.log(vendor);
  },
};

export const Map = () => {
  const { vendors } = useContext(SearchContext);
  const theme = useColorScheme();

  let url =
    theme === 'dark'
      ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

  return (
    <MapContainer
      center={[35.7796, -78.6382]}
      zoom={10}
      minZoom={4}
      scrollWheelZoom={true}
      dragging={true}
      maxBoundsViscosity={1}
      style={{ height: '100%', width: '100%' }}
    >
      <AttributionControl position="topright" prefix={false} />
      <TileLayer url={url} attribution={attribution} />
      {vendors?.map((vendor, index) => {
        return (
          vendor.latitude &&
          vendor.longitude && (
            <Marker
              data-vendor={vendor}
              position={[vendor.latitude, vendor.longitude]}
              eventHandlers={eventHandlers}
              icon={icon}
              key={index}
            />
          )
        );
      })}
    </MapContainer>
  );
};
