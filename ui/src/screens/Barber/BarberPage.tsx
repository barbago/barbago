import React, { useEffect } from 'react';
import { Screen } from '../../components';

import { RootRoutes, RootStackScreenProps } from '../../navigation';
import { Toast } from '../../providers';
import { vendorApi } from '../../store';
import { ProfileHeader } from './components';
import { VendorContext } from './context';
import { Reviews } from './Reviews';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<RootRoutes.Barber>) => {
  const vendorLink = route.params.id;

  const { data: vendor, isError } =
    vendorApi.useFetchVendorByLinkQuery(vendorLink);

  useEffect(() => {
    navigation.setOptions({
      title: vendor?.name ?? 'Loading Vendor...',
    });
  }, [vendor]);

  useEffect(() => {
    isError && navigation.replace(RootRoutes.NotFound);
  }, [isError]);

  return (
    <VendorContext.Provider value={{ vendor, vendorLink }}>
      {vendor && (
        <Screen scrolling>
          <ProfileHeader />
          {/* Other Sections Here */}
          <Reviews />
        </Screen>
      )}
      <Toast />
    </VendorContext.Provider>
  );
};
