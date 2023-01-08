import { requestPermissionsAsync } from 'expo-notifications';
import React, { useEffect } from 'react';

import { ActionMessage, Screen } from '../../components';
import {
  MainRoutes,
  RootRoutes,
  RootTabScreenProps,
} from '../../navigation';
import { useAuth } from '../../providers';
import { isMobile } from '../../utils';
import { ChatList } from './ChatList';

export const MessagePage = ({
  navigation,
}: RootTabScreenProps<MainRoutes.Messages>) => {
  const { user } = useAuth();

  const goLogin = () => navigation.navigate(RootRoutes.Login);

  useEffect(() => {
    (async () => isMobile() && (await requestPermissionsAsync()))();
  }, []);

  return (
    <Screen scrolling>
      {user ? (
        <ChatList user={user} navigation={navigation} />
      ) : (
        <ActionMessage
          message="You are not logged in! Log in to view your messages!"
          actions={[{ label: 'Log in', handler: goLogin }]}
        />
      )}
    </Screen>
  );
};
