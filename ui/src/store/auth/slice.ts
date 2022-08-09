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
  async (credential: AuthCredential, { dispatch }) => {
    try {
      const user = (await signInWithCredential(auth, credential))?.user;
      dispatch(signedIn(user));
      return user;
    } catch (err) {
      dispatch(signInFailed(err));
      return null;
    }
  },
);

export const signedIn = createAsyncThunk(
  `${reducerName}/signedIn`,
  async (user: User) => {
    console.log('Successfully signed in!', user);
    return user;
  },
);

export const signInFailed = createAsyncThunk<void, any>(
  `${reducerName}/signInFailed`,
  (err) => console.error('Failed to sign in', err),
);

export const signOut = createAsyncThunk(
  `${reducerName}/signOut`,
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      // todo: make a call to remove the
      // device's pushtoken from user profile
      await fbSignOut(auth);
      dispatch(signedOut());
    } catch (err) {
      dispatch(signOutFailed(err));
    }
  },
);

export const signedOut = createAsyncThunk(
  `${reducerName}/signedOut`,
  async () => {
    console.log('Successfully signed out!');
  },
);

export const signOutFailed = createAsyncThunk(
  `${reducerName}/signOutFailed`,
  async (err: any) => {
    console.error('Failed to sign out', err);
  },
);

export interface AuthState {
  token: string | null;
  pushToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  pushToken: null,
  user: null,
};

const authSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setPushToken(state, action: PayloadAction<string | null>) {
      state.pushToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload ?? null;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.pushToken = null;
      state.user = null;
      state.token = null;
    });
  },
});

export const { reducer: authReducer } = authSlice;

export const { setToken, setPushToken } = authSlice.actions;
