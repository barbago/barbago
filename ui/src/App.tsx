import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

import { useColorScheme, usePushNotifications } from './hooks';
import { Navigation } from './navigation';
import { ContextProvider } from './providers';
import { userApi } from './store';

export const App = () => {
  LogBox.ignoreLogs([
    /^Setting a timer for a long period of time/,
    /^AsyncStorage has been extracted from react-native/,
    /^source.uri should not be an empty string$/,
  ]);

  return (
    <ContextProvider>
      <AppContainer />
      <StatusBar />
    </ContextProvider>
  );
};

const AppContainer = () => {
  const colorScheme = useColorScheme();
  usePushNotifications();

  userApi.useGetUserQuery();

  return <Navigation colorScheme={colorScheme} />;
};
