import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token?: string;
  user?: any;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(
      state: AuthState,
      action: PayloadAction<{ token: string }>,
    ) {
      action.payload.token;
      state.user = !null;
    },
    signOut(state: AuthState) {
      state.user = null;
    },
  },
});

export const { reducer: authReducer } = authSlice;

export const { signOut, signIn } = authSlice.actions;
