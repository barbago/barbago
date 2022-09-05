import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import {
  AppleAuth,
  FacebookAuth,
  GoogleAuth,
  NoAuth,
  Screen,
} from '../../components';
import { RootStackScreenProps } from '../../navigation';

export const LoginPage = ({
  navigation,
}: RootStackScreenProps<'Login'>) => {
  const onAuthSuccess = () => navigation.replace('Root');

  return (
    <Screen style={{ padding: 16 }}>
      <Title style={{ textAlign: 'center', fontSize: 25 }}>
        Continue with your Account
      </Title>
      <Text style={{ textAlign: 'center' }}>
        With just a few clicks, you can get started finding the best
        barbers all around you.
      </Text>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View style={{ marginVertical: 8 }}>
          <GoogleAuth onAuthSuccess={onAuthSuccess} />
          <FacebookAuth onAuthSuccess={onAuthSuccess} />
          <AppleAuth onAuthSuccess={onAuthSuccess} />
        </View>
        <NoAuth onAuthSuccess={onAuthSuccess} />
      </View>
    </Screen>
  );
};
