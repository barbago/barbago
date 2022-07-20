import Constants from 'expo-constants';

// For new env vars: update .env, app.config.ts, and here
export const constants = Constants?.manifest?.extra!;
console.log(constants);
export const {
  facebook: facebookConfig,
  firebase: firebaseConfig,
  google: googleConfig,
  api: apiConfig,
  api: { url: apiUrl },
} = constants;

// todo: maybe add dev and live api url env vars
// export const apiUrl = __DEV__ ? apiConfig.devUrl : apiConfig.url
