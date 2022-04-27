import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  RootTabScreenProps,
  SettingsStackParamList,
} from '../../navigation/types';
import {
  AccountInfoPage,
  ContactPage,
  NotificationsPage,
  PaymentInfoPage,
  PreferencesPage,
  SettingsPage,
} from '..';
import { useAuth } from '../../hooks';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsNavigator({
  navigation,
}: RootTabScreenProps<'SettingsStack'>) {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{ headerShown: false, title: 'Settings' }}
      />
      <Stack.Screen name="Contact Us" component={ContactPage} />

      <Stack.Screen
        name="Account"
        component={AccountInfoPage}
        options={{ title: 'Personal Information' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsPage}
      />
      <Stack.Screen
        name="Payment Details"
        component={PaymentInfoPage}
      />
      <Stack.Screen name="Preferences" component={PreferencesPage} />
    </Stack.Navigator>
  );
}
