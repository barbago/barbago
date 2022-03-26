import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Screen, Text } from '../../components';
import { RootTabScreenProps } from '../../navigation';
import { GoogleAuth, NoAuth, SignOut } from '../../components';
import { useLazyGetUsersQuery } from '../../store/api/user.api';
import { api } from '../../store/api';

export const HomePage = ({
  navigation,
}: RootTabScreenProps<'Home'>) => {
  const [trigger, users] = useLazyGetUsersQuery();

  useEffect(() => {
    console.log(users);
  }, [api, users]);

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
      <Button onPress={() => trigger()}>ACTIVATE THE QUERY</Button>
    </Screen>
  );
};
