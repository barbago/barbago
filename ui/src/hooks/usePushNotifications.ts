import { Subscription } from 'expo-modules-core';
import {
  addNotificationReceivedListener,
  AndroidImportance,
  Notification,
  removeNotificationSubscription,
  setNotificationChannelAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

setNotificationHandler({
  handleNotification: async (notification) => ({
    shouldPlaySound: !!notification.request.content.sound,
    shouldSetBadge: !!notification.request.content.badge,
    // todo: display alerts inside the app instead
    shouldShowAlert: true,
  }),
});

// https://dev.to/haydenbleasel/implementing-push-notifications-with-expo-and-firebase-cloud-functions-4knn#overview
export const usePushNotifications = (
  onNotification?: (event: Notification) => void,
) => {
  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();

  useEffect(() => {
    notificationListener.current = addNotificationReceivedListener(
      (event) => {
        setNotification(event);
        onNotification?.(event);
      },
    );

    if (Platform.OS === 'android') {
      setNotificationChannelAsync('default', {
        name: 'default',
        importance: AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#ff23af7c',
      });
    }

    return () => {
      if (notificationListener.current)
        removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return { notification };
};
