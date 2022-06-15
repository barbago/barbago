import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import {
  NativeSafeAreaViewProps as SafeAreaProps,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { useThemeColor } from '../../hooks';

type ScrollProps = {
  scrolling?: boolean;
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ScreenProps = ScrollProps & ThemeProps & SafeAreaProps;

export function Screen({
  style,
  lightColor,
  darkColor,
  children,
  scrolling = false,
  ...rest
}: ScreenProps) {
  console.log(style);
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

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[defaultStyle, style]}
      {...rest}
    >
      {scrolling ? (
        <ScrollView>{children}</ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
