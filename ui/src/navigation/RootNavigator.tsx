import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { RootStackParamList } from './types';
import {
  BarberPage,
  Chat,
  LoginPage,
  NotFoundScreen,
  WelcomePage,
} from '../screens';
import { TabNavigator } from './TabNavigator';
import { useAuth } from '../providers';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user && (
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen name="Barber" component={BarberPage} />
      <Stack.Screen name="Chat" component={Chat} />
      {/* https://reactnavigation.org/docs/nesting-navigators/#best-practices-when-nesting
      https://reactnavigation.org/docs/preventing-going-back/ */}
    </Stack.Navigator>
  );
}
