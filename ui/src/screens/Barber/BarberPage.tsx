import React, { useEffect } from 'react';
import { Screen } from '../../components';

import { RootStackScreenProps } from '../../navigation';
import { vendorApi } from '../../store';
import { ProfileHeader } from './components';
import { VendorContext } from './context';
import {
  BarberInfoPage,
  BarberReviewPage,
  BarberServicePage,
} from './screens';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  const { data: vendor, isError } = vendorApi.useFetchVendorByIdQuery(
    route.params.id,
  );

  useEffect(() => {
    navigation.setOptions({
      title: vendor?.name ?? 'Loading Vendor...',
    });
  }, [vendor]);

  useEffect(() => {
    isError && navigation.replace('NotFound');
  }, [isError]);

  return (
    <VendorContext.Provider value={{ vendor }}>
      {vendor && (
        <Screen scrolling>
          <ProfileHeader />
          <BarberInfoPage />
          <BarberServicePage />
          <BarberReviewPage />
        </Screen>
      )}
    </VendorContext.Provider>
  );
};
