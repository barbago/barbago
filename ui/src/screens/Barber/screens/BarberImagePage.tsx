import React from 'react';

import { Screen, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberImagePage = ({
  navigation,
}: VendorTabScreenProps<'Images'>) => {
  return (
    <Screen>
      <Text>BarberImagePage</Text>
    </Screen>
  );
};
