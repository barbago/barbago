import React from 'react';

import { Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

import { TabScreen } from '../components/';

export const BarberInfoPage = ({
  navigation,
}: VendorTabScreenProps<'Info'>) => {
  return (
    <TabScreen>
      <Text>BarberInfoPage</Text>
    </TabScreen>
  );
};
