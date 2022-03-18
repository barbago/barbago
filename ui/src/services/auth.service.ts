import { store } from '../store';

export const setToken = (idToken: string) => {
  store.dispatch({ type: 'token', action: { payload: idToken } });
};

export const getToken = (): string => {
  return store.getState().auth.token ?? '';
};

// https://barbago-fd2c8.firebaseapp.com/__/auth/handler
