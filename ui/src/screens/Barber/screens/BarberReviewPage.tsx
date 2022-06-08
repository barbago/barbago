import React from 'react';
import { Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

import { TabScreen } from '../components';

export const BarberReviewPage = ({
  navigation,
}: VendorTabScreenProps<'Reviews'>) => {
  return (
    <TabScreen>
      <Text>BarberReviewPage</Text>
    </TabScreen>
  );
};
