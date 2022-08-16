import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';

import { useColorScheme } from './hooks';
import { Navigation } from './navigation';
import { ContextProvider } from './providers';
import { userApi } from './store';

export const App = () => {
  LogBox.ignoreLogs([
    /^Setting a timer for a long period of time/,
    /^AsyncStorage has been extracted from react-native/,
    /^source.uri should not be an empty string$/,
  ]);

  useEffect(() => {
    const subscriptions = [
      addNotificationReceivedListener((notif) => console.log(notif)),
      addNotificationResponseReceivedListener((res) =>
        console.log(res),
      ),
    ];

    return subscriptions.forEach((subscription) =>
      subscription.remove(),
    );
  }, []);

  return (
    <ContextProvider>
      <AppContainer />
      <StatusBar />
    </ContextProvider>
  );
};

const AppContainer = () => {
  const colorScheme = useColorScheme();

  userApi.useGetUserQuery();

  return <Navigation colorScheme={colorScheme} />;
};
