import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { RootStackParamList } from './types';
import { BarberPage, NotFoundScreen, WelcomeSwiper } from '../screens';
import { TabNavigator } from './TabNavigator';
import { useAuth } from '../hooks';

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
        <Stack.Screen name="Welcome" component={WelcomeSwiper} />
      )}
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen name="Barber" component={BarberPage} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
      {/* Think I might add a LoginPage here */}
      {/* https://reactnavigation.org/docs/nesting-navigators/#best-practices-when-nesting */}
    </Stack.Navigator>
  );
}
