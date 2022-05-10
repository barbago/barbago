import React from 'react';
import { Screen, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberReviewPage = ({
  navigation,
}: VendorTabScreenProps<'Reviews'>) => {
  return (
    <Screen>
      <Text>BarberReviewPage</Text>
    </Screen>
  );
};
