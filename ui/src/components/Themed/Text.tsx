import React from 'react';
import { Text as DefaultText } from 'react-native';

import { useThemeColor } from '../../hooks';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text',
  ) as string;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
