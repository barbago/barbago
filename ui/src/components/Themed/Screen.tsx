import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import {
  NativeSafeAreaViewProps as SafeAreaProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { auth } from '../../config';

import { useThemeColor } from '../../hooks';
import { MainRoutes, RootRoutes } from '../../navigation';
import { ActionMessage } from './ActionMessage';

export type ScreenProps = {
  /** Wrap children in a scrollview */
  scrolling?: boolean;
  /** Props for scrollview if enabled */
  scrollViewProps?: ScrollViewProps;
  lightColor?: string;
  darkColor?: string;
  /** Whether the screen requires authentication; Will redirect user to login if not logged in */
  needsAuth?: boolean;
} & SafeAreaProps;

export function Screen({
  style,
  lightColor,
  darkColor,
  children,
  scrolling = false,
  needsAuth = false,
  scrollViewProps,
  ...rest
}: ScreenProps) {
  const navigation = useNavigation();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  ) as string;

  const defaultStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor,
  };

  useEffect(() => {
    if (needsAuth && !auth.currentUser) {
      navigation.isFocused() && navigation.navigate(RootRoutes.Login);
    }
  }, [needsAuth, auth.currentUser]);

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[defaultStyle, style]}
      {...rest}
    >
      {needsAuth && !auth.currentUser ? (
        <MustLogin />
      ) : scrolling ? (
        <ScrollView {...scrollViewProps}>{children}</ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}

const MustLogin = () => {
  const navigation = useNavigation();

  const goHome = () =>
    navigation.navigate(RootRoutes.Main, {
      screen: MainRoutes.Home,
    });

  const goLogin = () => navigation.navigate(RootRoutes.Login);

  return (
    <ActionMessage
      message="Sorry, you must be logged in to use this page."
      actions={[
        { label: 'Go Home', handler: goHome },
        { label: 'Login', handler: goLogin },
      ]}
    />
  );
};
