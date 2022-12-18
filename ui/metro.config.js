const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// https://docs.expo.dev/guides/using-firebase/#configure-metro
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
