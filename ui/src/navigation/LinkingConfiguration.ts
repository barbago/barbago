/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    initialRouteName: 'Root',
    screens: {
      Welcome: 'welcome',
      Barber: 'barber/:id',
      Chat: 'messages/:id',
      Root: {
        screens: {
          Home: 'home',
          Search: 'search',
          Messages: 'messages',
          SettingsStack: {
            initialRouteName: 'Settings',
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
};
