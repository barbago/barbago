import React from 'react';
import { Pressable } from 'react-native';
import {
  MapContainer,
  TileLayer,
  Marker,
  AttributionControl,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

import { useSearch } from '../SearchPage';
import { useColorScheme } from '../../../hooks';
import { VendorResponse } from '../../../types';
import './Map.web.css';

const attribution =
  'Map tiles by <a href="https://carto.com/basemaps/" rel="noreferrer noopener">Carto</a>, under CC BY 3.0.';

const icon = L.icon({
  iconUrl: require('../../../assets/images/marker.svg'),
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -40],
});

export const Map = () => {
  const { vendors, setSelected, openVendor } = useSearch();
  const theme = useColorScheme();

  let url =
    theme === 'dark'
      ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

  const eventHandlers: L.LeafletEventHandlerFnMap = {
    click: ({ target, originalEvent }) => {
      originalEvent.preventDefault();
      const vendor = target.options['data-vendor'] as VendorResponse;
      setSelected(vendor);
    },
    mouseover: ({ target }) => {
      target.openPopup();
    },
  };

  const VendorPopup = ({ vendor }: { vendor: VendorResponse }) => (
    <Popup className="vendor-popup">
      <b>{vendor.name}</b>
      <br />
      <small>{vendor.location}</small>
      <Pressable
        onPress={() => setSelected(vendor)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </Popup>
  );

  return (
    <MapContainer
      center={[35.7796, -78.6382]}
      zoom={6}
      minZoom={4}
      scrollWheelZoom={true}
      dragging={true}
      maxBoundsViscosity={1}
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
    >
      <AttributionControl position="topright" prefix={false} />
      <TileLayer url={url} attribution={attribution} />
      <MarkerClusterGroup showCoverageOnHover={false}>
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
              >
                <VendorPopup vendor={vendor} />
              </Marker>
            )
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
