import { requestPermissionsAsync } from 'expo-notifications';
import React, { useEffect } from 'react';

import { Screen } from '../../components';
import { MainRoutes, RootTabScreenProps } from '../../navigation';
import { useAuth } from '../../providers';
import { isMobile } from '../../utils';
import { ChatList } from './ChatList';

export const MessagePage = ({
  navigation,
}: RootTabScreenProps<MainRoutes.Messages>) => {
  const { user } = useAuth();

  useEffect(() => {
    (async () => isMobile() && (await requestPermissionsAsync()))();
  }, []);

  return (
    <Screen scrolling needsAuth>
      <ChatList user={user!} navigation={navigation} />
    </Screen>
  );
};
