import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import {
  AppleAuth,
  FacebookAuth,
  GoogleAuth,
  Screen,
} from '../../components';
import { RootStackScreenProps } from '../../navigation';

export const LoginPage = ({
  navigation,
}: RootStackScreenProps<'Login'>) => {
  return (
    <Screen style={{ padding: 16 }}>
      <Title style={{ textAlign: 'center' }}>
        Continue with your Account
      </Title>
      <Text style={{ textAlign: 'center' }}>
        With just a few clicks, you can get started finding the best
        barbers all around you.
      </Text>
      <View style={{ bottom: 0 }}>
        <GoogleAuth />
        <FacebookAuth />
        <AppleAuth />
        <Button onPress={() => navigation.replace('Root')}>
          Continue without account
        </Button>
      </View>
    </Screen>
  );
};
