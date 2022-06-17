import React, { useContext } from 'react';
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

import { SearchContext } from '../context';
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

// const iconCreateFunction = (cluster: L.MarkerCluster): L.Icon<L.IconOptions> | L.DivIcon => {

// }

const eventHandlers: L.LeafletEventHandlerFnMap = {
  // when hovering on a marker,
  // open the popup and maybe modal
  // todo: when you click a marker,
  // open the modal just enough
  // and scroll to that barber
  // or put them at the top
  // also open a popup which can
  // go directly to the page
  click: (e) => {
    const vendor = e.target.options['data-vendor'] as VendorResponse;
    console.log(vendor);
  },
};

const VendorPopup = ({ vendor }: { vendor: VendorResponse }) => (
  <Popup className="vendor-popup">
    <b>{vendor.name}</b>
    <br />
    <small>{vendor.location}</small>
    <Pressable
      onPress={() => alert('Opening Vendor!')}
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
      zoom={6}
      minZoom={4}
      scrollWheelZoom={true}
      dragging={true}
      maxBoundsViscosity={1}
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
      eventHandlers={eventHandlers}
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
