import Constants from 'expo-constants';

// For new env vars: update .env, app.config.ts, and here
export const constants = Constants.expoConfig?.extra!;

export const {
  facebook: facebookConfig,
  firebase: firebaseConfig,
  google: googleConfig,
  api: apiConfig,
} = constants;

export const apiUrl: string = __DEV__
  ? apiConfig.devUrl
  : apiConfig.url;
