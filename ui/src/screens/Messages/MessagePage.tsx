import { requestPermissionsAsync } from 'expo-notifications';
import React, { useEffect } from 'react';

import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { useAuth } from '../../providers';
import { ChatList } from './ChatList';
import { NotSignedIn } from './NotSignedIn';

export const MessagePage = ({
  navigation,
}: RootTabScreenProps<'Messages'>) => {
  const { user } = useAuth();

  useEffect(() => {
    (async () => await requestPermissionsAsync())();
  }, []);

  return (
    <Screen scrolling>
      {user ? (
        <ChatList user={user} navigation={navigation} />
      ) : (
        <NotSignedIn />
      )}
    </Screen>
  );
};
