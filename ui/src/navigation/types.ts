/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Barber: { id: string };
  Chat: { id: string };
  Login: undefined;
  Welcome?: undefined;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  // Attach filter, sort, coords, etc params here
  Search: undefined;
  Messages: undefined;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SettingsStackParamList = {
  Settings: undefined;
  'Contact Us': undefined;
  Account: undefined;
  Notifications: undefined;
  'Payment Details': undefined;
  Preferences: undefined;
};

export type SettingsStackScreenProps<
  Screen extends keyof SettingsStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, Screen>,
  BottomTabScreenProps<RootTabParamList>
>;
