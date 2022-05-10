import React, { useEffect } from 'react';

import { RootStackScreenProps } from '../../navigation';
import { Screen, Text } from '../../components';
import { VendorTabs } from './VendorTabNavigator';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.id,
    });
  }, []);

  return (
    <>
      <Text>Hello there!</Text>
      <VendorTabs />
    </>
  );
};
