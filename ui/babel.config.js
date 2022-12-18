module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // https://docs.expo.dev/guides/environment-variables/#using-babel-to-inline-environment-variables-during-build-time
      'transform-inline-environment-variables',
      // https://docs.expo.dev/versions/latest/sdk/reanimated/#web-support
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};
