import React from 'react';
import { Screen, Text } from '../../components';
import { RootTabScreenProps } from '../../navigation';
import { GoogleAuth, NoAuth, SignOut } from '../../components';

export const HomePage = ({
  navigation,
}: RootTabScreenProps<'Home'>) => {
  return (
    <Screen scrolling>
      <Text>Home Page</Text>
      <GoogleAuth />
      <NoAuth />
      <SignOut />
    </Screen>
  );
};
