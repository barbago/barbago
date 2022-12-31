import { ExpoConfig, ConfigContext } from 'expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name!,
  slug: config.slug!,
  currentFullName: `@julianheckerdev/${config.slug!}`,
  originalFullName: `@julianheckerdev/${config.slug!}`,
});

// https://docs.expo.dev/guides/environment-variables/
// https://docs.expo.dev/workflow/configuration/
