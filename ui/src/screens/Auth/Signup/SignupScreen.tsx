import React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import {
  RootRoutes,
  RootStackScreenProps,
} from '../../../navigation/types';
import { useAuth } from '../../../providers';

export const SignupScreen = ({
  navigation,
  route: { params: { next = RootRoutes.Main, ...rest } = {} },
}: RootStackScreenProps<RootRoutes.Signup>) => {
  const { user } = useAuth();

  return (
    <View>
      <TextInput value={user?.displayName ?? ''} />
    </View>
  );
};
