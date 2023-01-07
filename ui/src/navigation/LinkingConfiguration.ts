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
import { RootRoutes, MainRoutes, SettingsRoutes } from './enums';

import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    initialRouteName: RootRoutes.Main,
    screens: {
      [RootRoutes.Barber]: 'barber/:id',
      [RootRoutes.Chat]: 'messages/:id',
      [RootRoutes.Login]: 'login',
      [RootRoutes.Signup]: 'signup',
      [RootRoutes.Welcome]: 'welcome',
      [RootRoutes.Main]: {
        screens: {
          [MainRoutes.Home]: 'home',
          [MainRoutes.Search]: 'search',
          [MainRoutes.Messages]: 'messages',
          [MainRoutes.SettingsStack]: {
            screens: {
              [SettingsRoutes.Settings]: 'settings',
              [SettingsRoutes.Account]: 'account',
              [SettingsRoutes.Contact]: 'contact-us',
              [SettingsRoutes.Notifications]: 'notifications',
              [SettingsRoutes.Payment]: 'payment-details',
              [SettingsRoutes.Preferences]: 'preferences',
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
    const urlListener = Linking.addEventListener('url', onReceiveUrl);

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
      urlListener.remove();
      removeNotificationSubscription(subscription);
    };
  },
};
