import React, { useEffect } from 'react';
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import { Screen } from '../../components';
import { Map } from './Map';
import { ResultModal } from './ResultModal';
import { useSearch } from './services';

export const SearchPage = () => {
  const { query, vendors } = useSearch();

  useEffect(() => {
    (async () => {
      // If I don't have the geolocation yet, zoom to the entire US until they enter a location or geolocation loads
      let { status } = await requestForegroundPermissionsAsync();
      let { coords } = await getCurrentPositionAsync({
        // using balanced accuracy means the location is loaded
        // almost immediately as soon as user allows it
        accuracy: LocationAccuracy.Balanced,
      });
      console.log(coords);
      // alert(`${coords.latitude}, ${coords.longitude}`);
      setTimeout(
        () =>
          query({
            coordinates: '',
          }),
        1000,
      );
    })();
  }, []);

  return (
    <Screen edges={['top']}>
      <Map />
      <ResultModal />
    </Screen>
  );
};
