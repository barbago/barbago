/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {
  addNotificationResponseReceivedListener,
  getLastNotificationResponseAsync,
  removeNotificationSubscription,
} from 'expo-notifications';

import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    initialRouteName: 'Main',
    screens: {
      Barber: 'barber/:id',
      Chat: 'messages/:id',
      Login: 'login',
      Signup: 'signup',
      Welcome: 'welcome',
      Main: {
        screens: {
          Home: 'home',
          Search: 'search',
          Messages: 'messages',
          SettingsStack: {
            screens: {
              Settings: 'settings',
              Account: 'account',
              'Contact Us': 'contact-us',
              Notifications: 'notifications',
              'Payment Details': 'payment-details',
              Preferences: 'preferences',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
  async getInitialURL() {
    let url = await Linking.getInitialURL();
    if (url) return url;

    const response = await getLastNotificationResponseAsync();
    url = response?.notification.request.content.data.url as string;
    if (typeof url === 'string') return url;
  },
  subscribe(listener) {
    const onReceiveUrl = ({ url }: { url: string }) => listener(url);
    Linking.addEventListener('url', onReceiveUrl);

    const subscription = addNotificationResponseReceivedListener(
      (response) => {
        const path = response.notification.request.content.data.path;
        if (path && typeof path === 'string') {
          const url = Linking.createURL(path);
          listener(url);
        }
      },
    );

    return () => {
      Linking.removeEventListener('url', onReceiveUrl);
      removeNotificationSubscription(subscription);
    };
  },
};
