module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-worklets-core/plugin'],
      [
        'module-resolver',
        {
          alias: {
            '@Components': './src/components',
            '@Screens': './src/screens',
            '@Assets': './assets',
            '@Data': './src/data',
            '@Navigator': './src/Navigator',
          },
        },
      ],
    ],
  };
};