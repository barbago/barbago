import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import { Screen } from '../../components';
import { useSearch } from './services';
import { FilterControl } from './FilterControl';
import { Map } from './Map';
import { ResultModal } from './Results';

export const SearchPage = () => {
  const { query, vendors, setCoords } = useSearch();

  useEffect(() => {
    (async () => {
      // If I don't have the geolocation yet, zoom to the entire US until they enter a location or geolocation loads
      let { status } = await requestForegroundPermissionsAsync();
      let { coords } = await getCurrentPositionAsync({
        // using balanced accuracy means the location is loaded
        // almost immediately as soon as user allows it
        accuracy: LocationAccuracy.Balanced,
      });
      coords && setCoords(coords);
      setTimeout(
        () =>
          query({
            coordinates: coords,
          }),
        5000,
      );
    })();
  }, []);

  return (
    <Screen edges={['top']}>
      <View style={{ flex: 1 }}>
        <Map />
        <FilterControl />
        <ResultModal />
      </View>
    </Screen>
  );
};
