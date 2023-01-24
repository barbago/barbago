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
import { RootRoutes, RootStackScreenProps } from '../../../navigation';
import { userApi } from '../../../store';

export const LoginScreen = ({
  navigation,
  route,
}: RootStackScreenProps<RootRoutes.Login>) => {
  const [triggerIsNewUser] = userApi.useLazyIsNewUserQuery();
  const onAuthSuccess = async (user?: User) => {
    if (!user) return navigation.pop();
    const { data: isNewUser } = await triggerIsNewUser();
    if (!isNewUser) return navigation.pop();
    return navigation.replace(RootRoutes.Signup);
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
          <GoogleAuth nextFunc={onAuthSuccess} />
          <FacebookAuth nextFunc={onAuthSuccess} />
          <AppleAuth nextFunc={onAuthSuccess} />
        </View>
        <NoAuth nextFunc={onAuthSuccess} />
      </View>
    </Screen>
  );
};
