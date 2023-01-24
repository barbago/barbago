import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import { useColorScheme, usePushNotifications } from './hooks';
import { Navigation } from './navigation/Navigation';
import { ContextProvider } from './providers';

export const App = () => {
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  ]);

  return (
    <ErrorBoundary onError={(err) => alert(err)}>
      <ContextProvider>
        <AppContainer />
        <StatusBar />
      </ContextProvider>
    </ErrorBoundary>
  );
};

const AppContainer = () => {
  const colorScheme = useColorScheme();
  usePushNotifications();

  return <Navigation colorScheme={colorScheme} />;
};
