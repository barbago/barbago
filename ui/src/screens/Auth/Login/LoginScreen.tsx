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
import {
  RootRoutes,
  RootStackScreenProps,
} from '../../../navigation/types';
import { userApi } from '../../../store';

export const LoginScreen = ({
  navigation,
  route: { params: { next = RootRoutes.Main, ...rest } = {} },
}: RootStackScreenProps<RootRoutes.Login>) => {
  const [triggerIsNewUser] = userApi.useLazyIsNewUserQuery();
  const onAuthSuccess = async (user?: User) => {
    // if (!user) return navigation.replace(next!, { ...rest });
    // if (!user) return navigation.pop();
    const { data: isNewUser } = await triggerIsNewUser();
    console.log(isNewUser);
    if (!isNewUser) return navigation.replace(next!, { ...rest });
    return navigation.replace(RootRoutes.Signup, { next, ...rest });
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
