import { signOut, User } from 'firebase/auth';
import React, { createContext, FC, useContext } from 'react';
import { auth } from '../config';
import { useAppDispatch, useAppSelector } from '../store';

export interface AuthContextState {
  user: User | null;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(undefined!);

export const useAuth = () =>
  useContext(AuthContext) ?? console.error('AuthContext not found!');

export const AuthProvider: FC = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const value: AuthContextState = {
    user,
    signOut: () => signOut(auth),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
