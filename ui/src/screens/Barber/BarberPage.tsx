import React, { useEffect, useState } from 'react';
import { ToggleButton } from 'react-native-paper';

import { RootStackScreenProps } from '../../navigation';
import { View, Text } from '../../components';
import { CustomToggleButton } from './utils';
import { ScrollView } from 'react-native';

export const BarberPage = ({
  route,
  navigation,
}: RootStackScreenProps<'Barber'>) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    navigation.setOptions({
      title: route.params.id,
    });
  }, []);

  return (
    <View>
      <Text>This is the Barber Page! Neat stuff coming soon!</Text>
      <ToggleButton.Row
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <CustomToggleButton value="Info" icon="text" />
        <CustomToggleButton value="Services" icon="briefcase" />
        <CustomToggleButton value="Photos" icon="image-album" />
        <CustomToggleButton value="Reviews" icon="star" />
      </ToggleButton.Row>
    </View>
  );
};
