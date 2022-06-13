import React, { useEffect } from 'react';
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { vendorApi } from '../../store';
import { Map } from './Map';
import { ResultModal } from './ResultModal';

export const SearchPage = ({
  navigation,
}: RootTabScreenProps<'Search'>) => {
  const { data: vendors } = vendorApi.useVendorSearchQuery({});

  useEffect(() => {
    (async () => {
      // extract to some top level on the app
      let { status } = await requestForegroundPermissionsAsync();
      let { coords } = await getCurrentPositionAsync();
      console.log(coords);
      alert(`${coords.latitude}, ${coords.longitude}`);
    })();
  }, []);

  return (
    <Screen edges={['top']} scrolling={false}>
      <Map />
      <ResultModal vendors={vendors ?? []} />
    </Screen>
  );
};
