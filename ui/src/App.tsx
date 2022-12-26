import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { init } from 'sentry-expo';

import { version } from '../package.json';
import { firebaseConfig, sentryConfig } from './config';
import { useColorScheme, usePushNotifications } from './hooks';
import { Navigation } from './navigation';
import { ContextProvider } from './providers';
import { userApi } from './store';

init({
  dsn: sentryConfig.dsn,
  release: version,
  environment: firebaseConfig.projectId,
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
});

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
