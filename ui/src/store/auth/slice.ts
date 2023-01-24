import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

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
    logOut() {}, // used to trigger effect
    signedOut(state) {
      state.user = null;
    },
  },
});

export const { reducer: authReducer } = authSlice;

export const { logOut, signedIn, signedOut, setPushToken } =
  authSlice.actions;
