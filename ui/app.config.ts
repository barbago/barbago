import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'Barbago Mobile',
  slug: config.slug ?? 'barbago-mobile',
  extra: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
});

// https://docs.expo.dev/guides/environment-variables/
// https://docs.expo.dev/workflow/configuration/
