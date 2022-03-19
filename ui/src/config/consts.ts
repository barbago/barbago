import Constants from 'expo-constants';

// For new env vars: update .env, app.config.ts, and here
console.log(Constants?.manifest?.extra);

export const {
  facebook: facebookConfig,
  firebase: firebaseConfig,
  google: googleConfig,
} = Constants?.manifest?.extra!;
