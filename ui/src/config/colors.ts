import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
} from '@react-navigation/native';
import {
  MD2DarkTheme as PaperDarkTheme,
  MD2LightTheme as PaperLightTheme,
} from 'react-native-paper';

const tintColorLight = '#ff0000';
const tintColorDark = '#ff0000';

export const dark = {
  text: '#fff',
  background: '#111',
  tint: tintColorDark,
  tabIconDefault: '#ccc',
  tabIconSelected: '#fff',

  ...PaperDarkTheme,
  ...NavDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavDarkTheme.colors,
    primary: '#ff0000',
    accent: '#FAFAFA',
  },
};

export const light = {
  text: '#000',
  background: '#fff',
  tint: tintColorLight,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorLight,

  ...PaperLightTheme,
  ...NavLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavLightTheme.colors,
    primary: '#ff0000',
    accent: '#1a1a1a',
  },
};

export const colors = {
  light,
  dark,
};
