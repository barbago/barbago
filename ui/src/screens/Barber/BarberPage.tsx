import React, { useEffect } from 'react';
import { Screen } from '../../components';

import { RootStackScreenProps } from '../../navigation';
import { vendorApi } from '../../store';
import { ProfileHeader } from './components';
import { VendorContext } from './context';
import { ReviewSection } from './ReviewSection';

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
          {/* Other Sections Here */}
          <ReviewSection />
        </Screen>
      )}
    </VendorContext.Provider>
  );
};
