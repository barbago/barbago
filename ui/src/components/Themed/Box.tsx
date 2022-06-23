import React from 'react';
import { View as DefaultView } from 'react-native';

import { useThemeColor } from '../../hooks';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type BoxProps = ThemeProps & DefaultView['props'];

export function Box(props: BoxProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
