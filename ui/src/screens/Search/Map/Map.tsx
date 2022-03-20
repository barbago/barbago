import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { EdgePadding, Region } from 'react-native-maps';
import { windowHeight, windowWidth } from '../../../config';
import { useColorScheme } from '../../../hooks';
import { isIOS } from '../../../utils';

export const Map = () => {
  const theme = useColorScheme();

  const initialRegion: Region = {
    latitude: 41,
    longitude: -73.83,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  const mapPadding: EdgePadding = {
    top: 0,
    right: 0,
    bottom: isIOS() ? 175 : 125,
    left: 0,
  };

  const customMapStyle =
    theme === 'dark'
      ? require('./map-style-dark.json')
      : require('./map-style-light.json');

  return (
    <MapView
      initialRegion={initialRegion}
      mapPadding={mapPadding}
      style={styles.map}
      customMapStyle={customMapStyle}
    ></MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: windowHeight
  },
});

/**
 * https://docs.expo.dev/versions/latest/sdk/map-view/#deploying-google-maps-to-an-ios-standalone
 * https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/CustomTiles.js
 * https://github.com/react-native-maps/react-native-maps#customizing-the-map-style
 */
