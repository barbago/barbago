import { ExpoConfig, ConfigContext } from 'expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name!,
  slug: config.slug!,
  currentFullName: '@julianheckerdev/barbago-mobile',
  originalFullName: '@julianheckerdev/barbago-mobile',
});

// https://docs.expo.dev/guides/environment-variables/
// https://docs.expo.dev/workflow/configuration/
