import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackScreenProps } from '../../../navigation';

export const SignupScreen = ({
  navigation,
  route: { params: { next, ...rest } = {} },
}: RootStackScreenProps<'Signup'>) => {
  return (
    <View>
      <Text>Signup</Text>
    </View>
  );
};
