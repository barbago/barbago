import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {
  MapContainer,
  TileLayer,
  Marker,
  AttributionControl,
  Popup,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

import { useSearch } from '../services';
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
      zoomControl={false}
      closePopupOnClick={false}
    >
      <AttributionControl position="topright" prefix={false} />
      <ZoomControl position="topleft" />
      <TileLayer url={url} attribution={attribution} />
      <MapContent />
    </MapContainer>
  );
};

export const MapContent = () => {
  const map = useMap();
  const { coords, vendors, selected, setSelected, openVendor } =
    useSearch();

  const eventHandlers: L.LeafletEventHandlerFnMap = {
    click: ({ target, originalEvent }) => {
      setTimeout(() => target.openPopup());
      const vendor = target.options['data-vendor'] as VendorResponse;
      setSelected(vendor);
      originalEvent.preventDefault();
    },
  };

  const VendorPopup = ({ vendor }: { vendor: VendorResponse }) => (
    <Popup className="vendor-popup">
      <b>{vendor.name}</b>
      <br />
      <small>{vendor.location}</small>
      <Pressable
        onPress={() => openVendor(vendor)}
        style={styles.popupTarget}
      />
    </Popup>
  );

  const fitVendors = (
    options: L.FitBoundsOptions = {
      paddingTopLeft: [0, 150],
      paddingBottomRight: [0, 100],
    },
  ) => {
    const coords = vendors
      ?.filter((vendor) => vendor.latitude && vendor.longitude)
      .map((vendor) => [vendor.latitude!, vendor.longitude!]);
    const bounds =
      coords && L.latLngBounds(coords.map((c) => [c[0], c[1]]));
    bounds && map?.flyToBounds(bounds, options);
  };

  useEffect(() => {
    map?.addEventListener('click', (_) => {
      setSelected();
    });
    return () => {
      map?.removeEventListener('click');
    };
  }, [map]);

  // useEffect(() => {
  //   fitVendors();
  // }, [vendors]);

  // useEffect(() => {
  //   selected
  //     ? fitVendors({
  //         paddingTopLeft: [0, 125],
  //         paddingBottomRight: [0, 317],
  //       })
  //     : fitVendors();
  // }, [selected]);

  useEffect(() => {
    if (map && coords?.latitude && coords.longitude) {
      console.log(coords);
      const { latitude: lat, longitude: lng } = coords;
      map.flyTo({ lat, lng }, 11);
    }
  }, [map, coords]);

  return (
    <MarkerClusterGroup
      showCoverageOnHover={false}
      onClick={(e: any) => console.log(e)}
    >
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
  );
};

const styles = StyleSheet.create({
  popupTarget: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
