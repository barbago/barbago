import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';

import { useColorScheme, usePushNotifications } from './hooks';
import { Navigation } from './navigation';
import { ContextProvider } from './providers';
import { userApi } from './store';

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

  userApi.useGetUserQuery();

  return <Navigation colorScheme={colorScheme} />;
};
