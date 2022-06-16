import React, { useEffect } from 'react';
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { vendorApi } from '../../store';
import { Map } from './Map';
import { ResultModal } from './ResultModal';
import { SearchContext } from './context';

export const SearchPage = ({
  navigation,
}: RootTabScreenProps<'Search'>) => {
  const { data: vendors } = vendorApi.useVendorSearchQuery({});

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
      alert(`${coords.latitude}, ${coords.longitude}`);
    })();
  }, []);

  return (
    <SearchContext.Provider value={{ vendors }}>
      <Screen edges={['top']}>
        <Map />
        <ResultModal />
      </Screen>
    </SearchContext.Provider>
  );
};
