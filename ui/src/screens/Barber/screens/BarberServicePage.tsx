import React from 'react';

import { View, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberServicePage = ({
  navigation,
}: VendorTabScreenProps<'Services'>) => {
  return (
    <View>
      <Text>BarberServicePage</Text>
    </View>
  );
};
