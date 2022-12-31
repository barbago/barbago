import { ExpoConfig, ConfigContext } from 'expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name!,
  slug: config.slug!,
  currentFullName: `@julianheckerdev/${config.slug!}`,
  originalFullName: `@julianheckerdev/${config.slug!}`,
  android: {
    ...config.android,
    config: {
      ...config.android?.config,
      googleMaps: {
        ...config.android?.config?.googleMaps,
        apiKey: process.env.GOOGLE_ANDROID_MAPS_API_KEY,
      },
    },
  },
  ios: {
    ...config.ios,
    config: {
      ...config.ios?.config,
      googleMapsApiKey: process.env.GOOGLE_IOS_MAPS_API_KEY,
    },
  },
});

// https://docs.expo.dev/guides/environment-variables/
// https://docs.expo.dev/workflow/configuration/
