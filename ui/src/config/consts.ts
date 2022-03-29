import Constants from 'expo-constants';

// For new env vars: update .env, app.config.ts, and here
export const constants = Constants?.manifest?.extra!;

export const {
  facebook: facebookConfig,
  firebase: firebaseConfig,
  google: googleConfig,
} = constants;

export const apiUrl = __DEV__
  ? 'http://localhost:5001/barbago-dev/us-central1/api'
  : 'https://dev.api.barbago.app';
