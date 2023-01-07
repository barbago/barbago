import React from 'react';
import { Button } from 'react-native-paper';
import { Screen, Text } from '../../components';
import {
  MainRoutes,
  RootRoutes,
  RootTabScreenProps,
} from '../../navigation';
import { GoogleAuth, NoAuth, SignOut } from '../../components';

export const HomePage = ({
  navigation,
}: RootTabScreenProps<MainRoutes.Home>) => {
  return (
    <Screen scrolling>
      <Text>Home Page</Text>
      <GoogleAuth />
      <NoAuth />
      <SignOut />
      <Button onPress={() => navigation.navigate(RootRoutes.Welcome)}>
        Welcome
      </Button>
      <Button
        onPress={() =>
          navigation.navigate(RootRoutes.Login, {
            next: RootRoutes.Main,
          })
        }
      >
        Login
      </Button>
    </Screen>
  );
};
