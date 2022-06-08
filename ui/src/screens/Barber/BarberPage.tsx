import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { RootStackScreenProps } from '../../navigation';
import { ProfileHeader } from './components';
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
    <ScrollView stickyHeaderIndices={[1]}>
      <ProfileHeader />
      <VendorTabs />
    </ScrollView>
  );
};
