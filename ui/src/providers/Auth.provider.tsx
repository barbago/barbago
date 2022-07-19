import {
  AppleAuthenticationScope,
  signInAsync,
} from 'expo-apple-authentication';
import AppLoading from 'expo-app-loading';
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';
import { FirebaseError } from 'firebase/app';
import {
  AuthCredential,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  onIdTokenChanged,
  signInAnonymously,
  signInWithCredential,
  signOut as firebaseSignout,
  User,
} from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '../config';
import { setToken, store } from '../store';

const handleFirebaseError = (error: FirebaseError) => {
  // todo: fix this mess
  let { message } = error;

  switch (error.code) {
    case 'auth/account-exists-with-different-credential':
      message = 'Account exists with different credential! ';
      break;
    case 'auth/invalid-credential':
      message = 'Invalid credentials. Try again!';
      break;
    case 'auth/invalid-email':
      message = 'Email is invalid. Please use a valid email.';
      break;
    case 'auth/user-disabled':
      message =
        'Your account has been disabled! Please contact support.';
      break;
    case 'auth/user-not-found':
      message = 'User does not exist. Create an account!';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password. Try again!';
      break;
    default:
      console.error(error);
  }
  alert(message);
  // https://github.com/jeanverster/react-native-styled-toast
};

const signInCredential = async (credential: AuthCredential) => {
  try {
    await signInWithCredential(auth, credential);
  } catch (err: any) {
    if (err instanceof FirebaseError) handleFirebaseError(err);
    else console.error(err);
  }
};

const signInAnonymous = async () => {
  await signInAnonymously(auth);
};

const signInApple = async () => {
  const nonce = Math.random().toString(36).substring(2, 10);
  const hashedNonce = await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    nonce,
  );
  const appleCredential = await signInAsync({
    requestedScopes: [
      AppleAuthenticationScope.FULL_NAME,
      AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });
  const { identityToken } = appleCredential;
  const provider = new OAuthProvider('apple.com');
  const oAuthCredential = provider.credential({
    idToken: identityToken!,
    rawNonce: nonce,
  });
  await signInCredential(oAuthCredential);
};

// const signInEmail = async (email: string, password: string) => {
//   try {
//     const credential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );
//     const user = credential.user;
//     return user;
//   } catch (err: any) {
//     console.error('Sign in with email failed!');
//     throw err;
//   }
// };

const signInFacebook = async (access_token: string) => {
  const credential = FacebookAuthProvider.credential(access_token);
  return await signInCredential(credential);
};

const signInGoogle = async (id_token: string) => {
  const credential = GoogleAuthProvider.credential(id_token);
  return await signInCredential(credential);
};

const signOut = async () => {
  await firebaseSignout(auth);
};

export enum Role {
  ADMIN = 'ADMIN',
  BARBER = 'BARBER',
  CLIENT = 'CLIENT',
}

export interface IAuthContext {
  signInApple: () => Promise<void>;
  signInAnonymous: () => Promise<void>;
  // signInEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: (id_token: string) => Promise<void>;
  signInFacebook: (access_token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isBarber: boolean;
  isClient: boolean;
  user: User | null;
  roles: Role[];
}

export const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasRole = (...testRoles: Role[]): boolean =>
    roles.some((v) => testRoles.includes(v));

  const isAdmin = hasRole(Role.ADMIN);
  const isBarber = hasRole(Role.ADMIN, Role.BARBER);
  const isClient = hasRole(Role.ADMIN, Role.BARBER, Role.CLIENT);

  const value: IAuthContext = {
    signInAnonymous,
    signInApple,
    // signInEmail,
    signInFacebook,
    signInGoogle,
    signOut,
    isAdmin,
    isBarber,
    isClient,
    user,
    roles,
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onIdTokenChanged(
      auth,
      async (user) => {
        const tokenResult = await user?.getIdTokenResult();

        const roles = (tokenResult?.claims?.roles as Role[]) ?? [];

        store.dispatch(setToken(tokenResult?.token ?? null));

        setUser(user);
        setRoles(roles);
        setIsLoading(false);
      },
      (err) => console.error(err),
    );
    return unsubscribe;
  }, []);

  if (isLoading) return <AppLoading />;
  else
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw Error('Cannot useAuthService outside a provider');
  return authContext;
};

/*
TODO

link anonymous accounts with proper account
https://firebase.google.com/docs/auth/web/anonymous-auth#web-version-9_5

implement proper login/signup with email

active apple developer account 
https://medium.com/nerd-for-tech/apple-google-authentication-in-expo-apps-using-firebase-997125440032#b10b

handle sign in errors
https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#error-codes_10

if (err instanceof FirebaseError) {
  
}

*/
