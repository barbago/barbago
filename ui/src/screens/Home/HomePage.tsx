import React from 'react';
import { Screen, Text } from '../../components';
import { RootTabScreenProps } from '../../navigation';
import { GoogleAuth, NoAuth, SignOut } from '../../components';
import { Button } from 'react-native-paper';
import { userApi } from '../../store';

export const HomePage = ({
  navigation,
}: RootTabScreenProps<'Home'>) => {
  const { data: user } = userApi.useGetUserQuery();

  return (
    <Screen scrolling>
      <Text>Home Page</Text>
      <GoogleAuth />
      <NoAuth />
      <SignOut />
      <Button onPress={() => console.log(user)}>USER</Button>
      <Text>{JSON.stringify(user)}</Text>
    </Screen>
  );
};
