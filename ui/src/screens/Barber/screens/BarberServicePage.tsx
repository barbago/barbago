import React from 'react';

import { Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

import { TabScreen } from '../components';

export const BarberServicePage = ({
  navigation,
}: VendorTabScreenProps<'Services'>) => {
  return (
    <TabScreen>
      <Text>BarberServicePage</Text>
    </TabScreen>
  );
};
