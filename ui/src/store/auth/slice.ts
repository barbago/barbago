import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  AuthCredential,
  signInWithCredential,
  User,
} from 'firebase/auth';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config';
import { userApi } from '../api';
import { startAppListening } from '../listenerMiddleware';

const reducerName = `auth`;

// todo: refactor this back to auth provider
export const signIn = createAsyncThunk(
  `${reducerName}/signIn`,
  async (credential: AuthCredential) => {
    const user = (await signInWithCredential(auth, credential))?.user;
    return user;
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

// remove push token on logout
startAppListening({
  actionCreator: signedOut,
  effect: async (_action, { getOriginalState }) => {
    const { user, pushToken } = getOriginalState().auth;
    if (!user || !pushToken) return;
    // FirebaseError: Missing or insufficient permissions
    // we're signing out first, then triggering this effect
    // unauthenticated users can't edit the doc users/uid
    // solve by moving firebase signout here? big refactor?
    // create a signout thunk again and run this first?
    const res = await updateDoc(doc(db, 'users', user.uid), {
      pushTokens: arrayRemove(pushToken),
    });
    console.log(res);
  },
});
