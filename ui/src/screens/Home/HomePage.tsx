import React from 'react';
import { Button } from 'react-native-paper';
import { Screen, Text } from '../../components';
import { RootTabScreenProps } from '../../navigation';
import { GoogleAuth, NoAuth, SignOut } from '../../components';

export const HomePage = ({
  navigation,
}: RootTabScreenProps<'Home'>) => {
  return (
    <Screen>
      <Text>Home Page</Text>
      <GoogleAuth />
      <NoAuth />
      <SignOut />
      <Button
        onPress={() =>
          navigation.push('Barber', {
            id: 'quetzalcoatl',
          })
        }
      >
        Barber
      </Button>
    </Screen>
  );
};
