import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  AuthCredential,
  signInWithCredential,
  signOut as fbSignOut,
  User,
} from 'firebase/auth';
import { auth } from '../../config';
import { RootState } from '../store';

const reducerName = `auth`;

export const signIn = createAsyncThunk(
  `${reducerName}/signIn`,
  async (credential: AuthCredential) => {
    const user = (await signInWithCredential(auth, credential))?.user;
    return user;
    // indirectly dispatches because of onAuthStateChanged
    // so no need to dispatch another action
  },
);

export const signOut = createAsyncThunk(
  `${reducerName}/signOut`,
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    // todo: make a call to remove the
    // device's pushtoken from user profile
    await fbSignOut(auth);
  },
);

export const authFailed = createAsyncThunk(
  `${reducerName}/failed`,
  async (err: any) => {
    console.error('Authentication Failed!', err);
  },
);

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
    signedIn(state, action) {
      state.user = action.payload;
    },
    signedOut(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(signedIn.fulfilled, (state, action) => {
    //   state.user = action.payload ?? null;
    // });
    // builder.addCase(signOut.fulfilled, (state) => {
    //   state.pushToken = null;
    //   state.user = null;
    //   state.token = null;
    // });
  },
});

export const { reducer: authReducer } = authSlice;

export const { setPushToken, signedIn, signedOut } = authSlice.actions;
