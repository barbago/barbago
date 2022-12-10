import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React, { FC, PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './Auth.provider';
import { StoreProvider } from './Store.provider';
import { ThemeProvider } from './Theme.provider';
import { ToastProvider } from './Toast.provider';

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => (
  <StoreProvider>
    <AuthProvider>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <SafeAreaProvider>
              <ToastProvider>{children}</ToastProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </AuthProvider>
  </StoreProvider>
);

export * from './Auth.provider';
export * from './Toast.provider';
