import { isAnyOf } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { userApi } from './api';
import { logOut, signedIn, signedOut } from './auth';
import { startAppListening } from './listenerMiddleware';
import { registerPushToken, revokePushToken } from './utils';

// clear user data on login or logout
startAppListening({
  matcher: isAnyOf(signedIn, signedOut),
  effect: (_action, { dispatch }) => {
    dispatch(userApi.util.resetApiState());
  },
});

// get user info when signed in
startAppListening({
  matcher: isAnyOf(signedIn),
  effect: (_action, { dispatch }) => {
    dispatch(userApi.endpoints.getUser.initiate());
  },
});

// add pushtoken when user data retrieved
startAppListening({
  matcher: userApi.endpoints.getUser.matchFulfilled,
  effect: async (_action, api) => {
    await registerPushToken(api.dispatch);
  },
});

// revoke push token before signing out
startAppListening({
  matcher: isAnyOf(logOut),
  effect: async (_action, api) => {
    await revokePushToken(api.getState, api.dispatch);
    await signOut(auth);
  },
});
