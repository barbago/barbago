import React, { useEffect } from 'react';

import { RootStackScreenProps } from '../../navigation';
import { View, Text } from '../../components';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.id,
    });
  }, []);

  return (
    <View>
      <Text>This is the Barber Page! Neat stuff coming soon!</Text>
    </View>
  );
};
