import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
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

  ...PaperDefaultTheme,
  ...NavDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavDefaultTheme.colors,
    primary: '#ff0000',
    accent: '#1A1A1A',
  },
};

export const Colors = {
  light,
  dark,
};
