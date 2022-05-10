import React from 'react';

import { Screen, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberInfoPage = ({
  navigation,
}: VendorTabScreenProps<'Info'>) => {
  return (
    <Screen>
      <Text>BarberInfoPage</Text>
    </Screen>
  );
};
