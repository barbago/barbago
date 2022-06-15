import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { RootStackScreenProps } from '../../navigation';
import { vendorApi } from '../../store';
import { ProfileHeader } from './components';
import { VendorContext } from './context';
import { VendorTabs } from './VendorTabNavigator';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  const { data: barber, isError } = vendorApi.useFetchVendorByIdQuery(
    route.params.id,
  );

  useEffect(() => {
    navigation.setOptions({
      title: barber?.name ?? 'Loading Vendor...',
    });
  }, [barber]);

  useEffect(() => {
    isError && navigation.replace('NotFound');
  }, [isError]);

  return (
    <VendorContext.Provider value={barber}>
      {barber && (
        <ScrollView stickyHeaderIndices={[1]}>
          <ProfileHeader />
          <VendorTabs />
        </ScrollView>
      )}
    </VendorContext.Provider>
  );
};
