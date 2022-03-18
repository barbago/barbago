import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export const Map = () => {

  return (
    <MapContainer
      center={[41.0, -73.83]}
      zoom={10}
      minZoom={4}
      scrollWheelZoom={true}
      dragging={true}
      maxBoundsViscosity={1}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
        attribution="&copy; Stamen Maps"
      />
    </MapContainer>
  );
};
