import AppLoading from 'expo-app-loading';
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  getExpoPushTokenAsync,
  requestPermissionsAsync,
} from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { useCachedResources, useColorScheme } from './hooks';
import { Navigation } from './navigation';
import { ContextProvider } from './providers';
import { isMobile } from './utils';

export function App() {
  const resourcesLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const subscriptions = [
      addNotificationReceivedListener((notif) => console.log(notif)),
      addNotificationResponseReceivedListener((res) =>
        console.log(res),
      ),
    ];
    (async () => {
      await requestPermissionsAsync();
      const token = isMobile() && (await getExpoPushTokenAsync()).data;

      token && console.log(token);
    })();

    return subscriptions.forEach((subscription) =>
      subscription.remove(),
    );
  }, []);

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
