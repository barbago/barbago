import {
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import React from 'react';

import { RootTabParamList } from './types';
import { HomePage, MessagePage, SearchPage } from '../screens';
import { useAuth } from '../hooks';
import { SettingsNavigator } from './SettingsNavigator';
import { RootStackScreenProps } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function TabNavigator({
  navigation,
}: RootStackScreenProps<'Root'>) {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarLabelPosition: 'below-icon' }}
    >
      <Tab.Screen
        name="Home"
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
        name="Search"
        component={SearchPage}
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
        name="Messages"
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
        name="SettingsStack"
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
