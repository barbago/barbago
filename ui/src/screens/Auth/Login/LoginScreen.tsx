import { User } from 'firebase/auth';
import React from 'react';
import { View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import {
  AppleAuth,
  FacebookAuth,
  GoogleAuth,
  NoAuth,
  Screen,
} from '../../../components';
import { RootStackScreenProps } from '../../../navigation';
import { userApi } from '../../../store';

export const LoginScreen = ({
  navigation,
  route: { params: { next = 'Main', ...rest } = {} },
}: RootStackScreenProps<'Login'>) => {
  const [getUser] = userApi.useLazyGetUserQuery();
  const onAuthSuccess = async (user?: User) => {
    if (!user) return navigation.replace(next!, { ...rest });
    const { data: record } = await getUser();
    if (record) return navigation.replace(next!, { ...rest });
    return navigation.replace('Signup', { next, ...rest });
  };
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
