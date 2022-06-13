import React, { useEffect, useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { RootStackScreenProps } from '../../navigation';
import { vendorApi } from '../../store';
import {
  ProfileButtons,
  ProfileCaption,
  ProfileCarousel,
} from './components';
import { VendorTabs } from './VendorTabNavigator';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  const { data: barber } = vendorApi.useFetchVendorByIdQuery('1');

  const urls = useMemo(
    () => [
      'https://source.unsplash.com/featured?chair,barber',
      'https://source.unsplash.com/featured?haircut,barber',
      'https://source.unsplash.com/featured?shave,haircut',
      'https://source.unsplash.com/featured?shave',
    ],
    [barber], // eventually set barber here idk
  );

  useEffect(() => {
    navigation.setOptions({
      title: barber?.name ?? 'Loading Vendor...',
    });
  }, [barber]);

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <View>
        <ProfileCarousel urls={urls} />
        <ProfileCaption />
        <ProfileButtons />
      </View>
      <VendorTabs />
    </ScrollView>
  );
};

// https://ipwho.is/0.0.0.0?fields=country,city,latitude,longitude,postal
