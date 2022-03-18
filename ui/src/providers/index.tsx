import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './Auth.provider';
import { StoreProvider } from './Store.provider';
import { ThemeProvider } from './Theme.provider';

export const ContextProvider: React.FC = ({ children }) => (
  <StoreProvider>
    <AuthProvider>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <SafeAreaProvider>{children}</SafeAreaProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </AuthProvider>
  </StoreProvider>
);

export * from './Auth.provider';
