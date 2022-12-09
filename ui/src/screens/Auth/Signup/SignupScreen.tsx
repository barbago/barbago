import React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { RootStackScreenProps } from '../../../navigation';
import { useAuth } from '../../../providers';

export const SignupScreen = ({
  navigation,
  route: { params: { next = 'Main', ...rest } = {} },
}: RootStackScreenProps<'Signup'>) => {
  const { user } = useAuth();

  return <View>
    <TextInput value={user?.displayName} />
  </View>;
};
