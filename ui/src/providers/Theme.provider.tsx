import React, { FC, PropsWithChildren } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { dark, light } from '../config';

import { useColorScheme } from '../hooks';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const scheme = useColorScheme();

  // https://buttercms.com/blog/implement-dark-mode-react-native
  return (
    <PaperProvider theme={scheme === 'dark' ? dark : light}>
      {children}
    </PaperProvider>
  );
};
