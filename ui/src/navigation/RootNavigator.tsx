import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { useAuth } from '../providers';
import {
  BarberPage,
  Chat,
  LoginScreen,
  NotFoundScreen,
  SignupScreen,
  WelcomePage,
} from '../screens';
import { RootRoutes, RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';

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
          name={RootRoutes.Welcome}
          component={WelcomePage}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name={RootRoutes.Main}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name={RootRoutes.Login} component={LoginScreen} />
        <Stack.Screen
          name={RootRoutes.Signup}
          component={SignupScreen}
        />
      </Stack.Group>
      <Stack.Screen
        name={RootRoutes.NotFound}
        component={NotFoundScreen}
        options={{ title: 'Sorry...' }}
      />
      <Stack.Screen name={RootRoutes.Barber} component={BarberPage} />
      <Stack.Screen name={RootRoutes.Chat} component={Chat} />
      {/* https://reactnavigation.org/docs/nesting-navigators/#best-practices-when-nesting
      https://reactnavigation.org/docs/preventing-going-back/ */}
    </Stack.Navigator>
  );
}
