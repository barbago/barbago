import React from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  DarkTheme,
} from 'react-native-paper';
import { dark, light } from '../config';

import { useColorScheme } from '../hooks';

export const ThemeProvider: React.FC = ({ children }) => {
  const scheme = useColorScheme();

  // https://buttercms.com/blog/implement-dark-mode-react-native
  return (
    <PaperProvider theme={scheme === 'dark' ? dark : light}>
      {children}
    </PaperProvider>
  );
};
