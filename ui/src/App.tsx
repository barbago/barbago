import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';

import { useColorScheme, usePushNotifications } from './hooks';
import { Navigation } from './navigation/Navigation';
import { ContextProvider } from './providers';

export const App = () => {
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
