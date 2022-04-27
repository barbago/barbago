import React, { useEffect } from 'react';

import { RootStackScreenProps } from '../../navigation';
import { View as CustomView, Text } from '../../components';
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
    <CustomView>
      <Text>This is the Barber Page! Neat stuff coming soon!</Text>
      <VendorTabs />
    </CustomView>
  );
};
