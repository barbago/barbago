import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {
  EdgePadding,
  Marker,
  Region,
} from 'react-native-maps';
import ClusterMapView from 'react-native-map-clustering';

import { windowHeight, windowWidth } from '../../../config';
import { useColorScheme } from '../../../hooks';
import { isIOS } from '../../../utils';
import { useSearch } from '../services';
import { BlueMarker } from './BlueMarker';
import { VendorResponse } from '../../../types';

export const Map = () => {
  const { coords, selected, vendors, openVendor, setSelected } =
    useSearch();
  const theme = useColorScheme();
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<(Marker | null)[]>([]);

  const initialRegion: Region = {
    latitude: 35.7796,
    longitude: -78.6382,
    latitudeDelta: 16,
    longitudeDelta: 16,
  };

  const mapPadding: EdgePadding = {
    top: 100,
    right: 0,
    bottom: selected ? (isIOS() ? 440 : 390) : isIOS() ? 175 : 125,
    left: 0,
  };

  const edgePadding: EdgePadding = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const customMapStyle =
    theme === 'dark'
      ? require('./map-style-dark.json')
      : require('./map-style-light.json');

  const fitVendors = (vendors?: VendorResponse[]): void =>
    vendors &&
    mapRef.current?.fitToCoordinates(
      vendors.map((vendor) => ({
        latitude: vendor.latitude!,
        longitude: vendor.longitude!,
      })),
      { edgePadding },
    );

  useEffect(() => {
    // https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
    markerRefs.current = markerRefs?.current.slice(0, vendors?.length);
    // fitVendors(vendors);
  }, [vendors]);

  // useEffect(() => {
  //   fitVendors(vendors);
  // }, [selected]);

  useEffect(() => {
    if (mapRef.current && coords?.latitude && coords.longitude) {
      const { latitude, longitude } = coords;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  }, [mapRef, coords]);

  return (
    <ClusterMapView
      mapType="mutedStandard"
      initialRegion={initialRegion}
      moveOnMarkerPress={false}
      showsUserLocation={true}
      toolbarEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      showsPointsOfInterest={false}
      mapPadding={mapPadding}
      style={styles.map}
      customMapStyle={customMapStyle}
      ref={mapRef}
      clusterColor="#0077ff"
      onPress={(_) => {
        setSelected();
      }}
    >
      {vendors?.map(
        (vendor, index) =>
          vendor.latitude &&
          vendor.longitude && (
            <Marker
              key={index}
              ref={(el) => (markerRefs.current[index] = el)}
              coordinate={{
                latitude: vendor.latitude,
                longitude: vendor.longitude,
              }}
              title={vendor.name}
              description={vendor.location}
              onPress={(e) => {
                e.stopPropagation();
                setSelected(vendor);
                markerRefs.current[index]?.showCallout();
              }}
              onCalloutPress={(_) => openVendor(vendor)}
            >
              <BlueMarker />
            </Marker>
          ),
      )}
    </ClusterMapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: windowHeight,
  },
});

/**
 * https://docs.expo.dev/versions/latest/sdk/map-view/#deploying-google-maps-to-an-ios-standalone
 * https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/CustomTiles.js
 * https://github.com/react-native-maps/react-native-maps#customizing-the-map-style
 */
