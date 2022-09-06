import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackScreenProps } from '../../../navigation';

export const SignupScreen = ({
  navigation,
  route: { params: { next = 'Main', ...rest } = {} },
}: RootStackScreenProps<'Signup'>) => {
  return (
    <View>
      <Text>Signup</Text>
    </View>
  );
};
