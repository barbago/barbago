import {
  getExpoPushTokenAsync,
  requestPermissionsAsync,
} from 'expo-notifications';
import {
  AuthCredential,
  signInWithCredential,
  signOut as fbSignOut,
  User,
} from 'firebase/auth';
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from 'firebase/firestore';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from 'react';
import { auth, db } from '../config';
import { setPushToken, useAppDispatch, useAppSelector } from '../store';
import { isMobile } from '../utils';

export interface AuthContextState {
  user: User | null;
  signIn: (credential: AuthCredential) => Promise<User>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(undefined!);

export const useAuth = () =>
  useContext(AuthContext) ?? console.error('AuthContext not found!');

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user, pushToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const signIn = async (credential: AuthCredential) => {
    await signOut();
    const user = (await signInWithCredential(auth, credential))?.user;
    await registerPushToken(user);
    return user;
  };

  const registerPushToken = async (usr: User | null = user) => {
    await requestPermissionsAsync();
    if (!usr) return;

    const token = isMobile()
      ? (await getExpoPushTokenAsync()).data
      : undefined;

    if (token) {
      await updateDoc(doc(db, 'users', usr.uid), {
        pushTokens: arrayUnion(token),
      });
      dispatch(setPushToken(token));
    }
  };

  const revokePushToken = async (token: string | null = pushToken) => {
    if (!user || !token) return;
    await updateDoc(doc(db, 'users', user.uid), {
      pushTokens: arrayRemove(token),
    });
    return token;
  };

  const signOut = async () => {
    await revokePushToken();
    await fbSignOut(auth);
  };

  const value: AuthContextState = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
