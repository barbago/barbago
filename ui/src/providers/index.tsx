import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { signInAnonymously } from 'firebase/auth';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from '../config';
import { signOut, store } from '../store';

import { StoreProvider } from './Store.provider';
import { ThemeProvider } from './Theme.provider';
import { ToastProvider } from './Toast.provider';

export const ContextProvider: React.FC = ({ children }) => (
  <StoreProvider>
    <ActionSheetProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <SafeAreaProvider>
            <ToastProvider>{children}</ToastProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ActionSheetProvider>
  </StoreProvider>
);

export * from './Toast.provider';

export const useAuth = () => ({
  signOut: () => store.dispatch(signOut()),
  user: auth?.currentUser,
  signInAnonymous: () => signInAnonymously(auth),
});
