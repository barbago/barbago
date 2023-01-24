import {
  AuthCredential,
  signInWithCredential,
  User,
} from 'firebase/auth';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from 'react';
import { auth } from '../config';
import { logOut, useAppDispatch, useAppSelector } from '../store';

export interface AuthContextState {
  user: User | null;
  signIn: (credential: AuthCredential) => Promise<User>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(undefined!);

export const useAuth = () =>
  useContext(AuthContext) ?? console.error('AuthContext not found!');

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const signIn = async (credential: AuthCredential) => {
    await signOut();
    const user = (await signInWithCredential(auth, credential))?.user;
    return user;
  };

  const signOut = async () => {
    // sign out logic handled in logOut effect
    dispatch(logOut);
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
