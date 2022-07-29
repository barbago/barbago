import { View } from 'react-native';
import React from 'react';

import { Text } from '../../components';

export const NotSignedIn = () => {
  return (
    <View>
      <Text>You are not signed in!</Text>
      <Text>Sign in to connect with barbers</Text>
    </View>
  );
};
