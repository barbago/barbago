import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { EdgePadding, Marker, Region } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import { windowHeight, windowWidth } from '../../../config';
import { useColorScheme } from '../../../hooks';
import { isIOS } from '../../../utils';
import { useSearch } from '../SearchPage';
import { BlueMarker } from './BlueMarker';

export const Map = () => {
  const [map, setMap] = useState<MapView | null>(null);
  const { vendors, openVendor, setSelected } = useSearch();
  const theme = useColorScheme();

  const initialRegion: Region = {
    latitude: 35.7796,
    longitude: -78.6382,
    latitudeDelta: 16,
    longitudeDelta: 16,
  };

  const mapPadding: EdgePadding = {
    top: 0,
    right: 0,
    bottom: isIOS() ? 175 : 0,
    left: 0,
  };

  const customMapStyle =
    theme === 'dark'
      ? require('./map-style-dark.json')
      : require('./map-style-light.json');

  return (
    <MapView
      mapType="mutedStandard"
      initialRegion={initialRegion}
      mapPadding={mapPadding}
      style={styles.map}
      customMapStyle={customMapStyle}
      ref={(map) => setMap(map)}
      clusterColor="#0077ff"
      onPress={(e) => {
        // e.preventDefault()
        setSelected();
      }}
    >
      {vendors?.map(
        (vendor, index) =>
          vendor.latitude &&
          vendor.longitude && (
            <Marker
              key={index}
              coordinate={{
                latitude: vendor.latitude,
                longitude: vendor.longitude,
              }}
              title={vendor.name}
              description={vendor.location}
              onPress={(e) => {
                e.stopPropagation();
                setSelected(vendor);
              }}
              onCalloutPress={(_) => openVendor(vendor)}
            >
              <BlueMarker />
            </Marker>
          ),
      )}
    </MapView>
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
