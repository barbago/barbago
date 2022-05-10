import React from 'react';

import { Screen, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberServicePage = ({
  navigation,
}: VendorTabScreenProps<'Services'>) => {
  return (
    <Screen>
      <Text>BarberServicePage</Text>
    </Screen>
  );
};
