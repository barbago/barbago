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
  const { data: barber, isLoading } =
    vendorApi.useFetchVendorByIdQuery(route.params.id);

  const urls = useMemo(() => barber?.images, [barber]);

  useEffect(() => {
    navigation.setOptions({
      title: barber?.name ?? 'Loading Vendor...',
    });
  }, [barber]);

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <View>
        {!isLoading && (
          <>
            <ProfileCarousel urls={urls!} />
            <ProfileCaption title={barber?.name!} />
            <ProfileButtons />
          </>
        )}
      </View>
      <VendorTabs />
    </ScrollView>
  );
};

// https://ipwho.is/0.0.0.0?fields=country,city,latitude,longitude,postal
