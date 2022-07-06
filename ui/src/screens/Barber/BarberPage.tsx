import React, { useEffect } from 'react';
import { Screen } from '../../components';

import { RootStackScreenProps } from '../../navigation';
import { vendorApi } from '../../store';
import { ProfileHeader } from './components';
import { VendorContext } from './context';
import { Reviews } from './Reviews';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  const vendorUid = route.params.id;

  const { data: vendor, isError } =
    vendorApi.useFetchVendorByIdQuery(vendorUid);

  useEffect(() => {
    navigation.setOptions({
      title: vendor?.name ?? 'Loading Vendor...',
    });
  }, [vendor]);

  useEffect(() => {
    isError && navigation.replace('NotFound');
  }, [isError]);

  return (
    <VendorContext.Provider value={{ vendor, vendorUid }}>
      {vendor && (
        <Screen scrolling>
          <ProfileHeader />
          {/* Other Sections Here */}
          <Reviews />
        </Screen>
      )}
    </VendorContext.Provider>
  );
};
