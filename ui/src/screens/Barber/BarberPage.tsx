import React, { useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';

import { RootStackScreenProps } from '../../navigation';
import { ProfileCarousel } from './components';
import { VendorTabs } from './VendorTabNavigator';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  const urls = useMemo(
    () => [
      'https://source.unsplash.com/featured?chair,barber',
      'https://source.unsplash.com/featured?haircut,barber',
      'https://source.unsplash.com/featured?shave,haircut',
      'https://source.unsplash.com/featured?shave',
    ],
    [], // eventually set barber here idk
  );

  useEffect(() => {
    navigation.setOptions({
      title: route.params.id,
    });
  }, []);

  return (
    <ScrollView stickyHeaderIndices={[0, 1]}>
      <ProfileCarousel urls={urls} />
      <VendorTabs />
    </ScrollView>
  );
};
