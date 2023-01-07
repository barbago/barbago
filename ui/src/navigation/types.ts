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
import { RootRoutes, MainRoutes, SettingsRoutes } from './enums';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


export type RootStackParamList = {
  [RootRoutes.Barber]: { id: string };
  [RootRoutes.Chat]: { id: string };
  [RootRoutes.Login]?: {
    next?: keyof RootStackParamList;
    [key: string]: any;
  };
  [RootRoutes.Signup]: {
    next?: keyof RootStackParamList;
    [key: string]: any;
  };
  [RootRoutes.Welcome]?: undefined;
  [RootRoutes.Main]:
    | NavigatorScreenParams<RootTabParamList>
    | undefined;
  [RootRoutes.NotFound]: undefined;
};

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, Screen>;


export type RootTabParamList = {
  [MainRoutes.Home]: undefined;
  // Attach filter, sort, coords, etc params here
  [MainRoutes.Search]: undefined;
  [MainRoutes.Messages]: undefined;
  [MainRoutes.SettingsStack]: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SettingsStackParamList = {
  [SettingsRoutes.Settings]: undefined;
  [SettingsRoutes.Contact]: undefined;
  [SettingsRoutes.Account]: undefined;
  [SettingsRoutes.Notifications]: undefined;
  [SettingsRoutes.Payment]: undefined;
  [SettingsRoutes.Preferences]: undefined;
};

export type SettingsStackScreenProps<
  Screen extends keyof SettingsStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, Screen>,
  BottomTabScreenProps<RootTabParamList>
>;
