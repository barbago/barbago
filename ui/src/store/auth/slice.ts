import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { userApi } from '../api';
import { startAppListening } from '../listenerMiddleware';

const reducerName = `auth`;

export interface AuthState {
  pushToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  pushToken: null,
  user: null,
};

const authSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setPushToken(state, action: PayloadAction<string | null>) {
      state.pushToken = action.payload;
    },
    signedIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    signedOut(state) {
      state.user = null;
    },
  },
});

export const { reducer: authReducer } = authSlice;

export const { signedIn, signedOut, setPushToken } = authSlice.actions;

/** Effects */
// clear user data on login or logout
startAppListening({
  matcher: isAnyOf(signedIn, signedOut),
  effect: (_action, { dispatch }) => {
    dispatch(userApi.util.resetApiState());
  },
});

// put generate token and revoke token here?
// cant revoke token after signing out user,
// so would have to create a new action before
