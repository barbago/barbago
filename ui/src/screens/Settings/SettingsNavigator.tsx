import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MainRoutes,
  RootTabScreenProps,
  SettingsRoutes,
  SettingsStackParamList,
} from '../../navigation';
import {
  AccountInfoPage,
  ContactPage,
  NotificationsPage,
  PaymentInfoPage,
  PreferencesPage,
  SettingsPage,
} from './screens';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsNavigator({
  navigation,
}: RootTabScreenProps<MainRoutes.SettingsStack>) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SettingsRoutes.Settings}
        component={SettingsPage}
        options={{ headerShown: false, title: 'Settings' }}
      />
      <Stack.Screen
        name={SettingsRoutes.Contact}
        component={ContactPage}
      />

      <Stack.Screen
        name={SettingsRoutes.Account}
        component={AccountInfoPage}
        options={{ title: 'Personal Information' }}
      />
      <Stack.Screen
        name={SettingsRoutes.Notifications}
        component={NotificationsPage}
      />
      <Stack.Screen
        name={SettingsRoutes.Payment}
        component={PaymentInfoPage}
      />
      <Stack.Screen
        name={SettingsRoutes.Preferences}
        component={PreferencesPage}
      />
    </Stack.Navigator>
  );
}
