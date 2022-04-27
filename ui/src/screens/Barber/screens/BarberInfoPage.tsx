import React from 'react';

import { View, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberInfoPage = ({
  navigation,
}: VendorTabScreenProps<'Info'>) => {
  return (
    <View>
      <Text>BarberInfoPage</Text>
    </View>
  );
};
