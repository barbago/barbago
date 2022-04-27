import React, { useEffect } from 'react';
import { View, Text } from '../../../components';
import { VendorTabScreenProps } from '../../../navigation';

export const BarberReviewPage = ({
  navigation,
}: VendorTabScreenProps<'Reviews'>) => {
  useEffect(() => {
    console.log(navigation);
  }, []);

  return (
    <View>
      <Text>BarberReviewPage</Text>
    </View>
  );
};
