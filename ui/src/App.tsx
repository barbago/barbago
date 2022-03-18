import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { useCachedResources, useColorScheme } from './hooks';
import { Navigation } from './navigation';
import { ContextProvider } from './providers';

export function App() {
  const resourcesLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (!resourcesLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ContextProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </ContextProvider>
    );
  }
}
