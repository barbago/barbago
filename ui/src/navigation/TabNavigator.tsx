import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomePage, MessagePage, Search } from '../screens';
import { SettingsNavigator } from '../screens/Settings';
import {
  MainRoutes,
  RootRoutes,
  RootStackScreenProps,
  RootTabParamList,
} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function TabNavigator({
  navigation,
}: RootStackScreenProps<RootRoutes.Main>) {
  return (
    <Tab.Navigator
      initialRouteName={MainRoutes.Home}
      screenOptions={{ tabBarLabelPosition: 'below-icon' }}
    >
      <Tab.Screen
        name={MainRoutes.Home}
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.Search}
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-search"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.Messages}
        component={MessagePage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.SettingsStack}
        component={SettingsNavigator}
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cog"
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
