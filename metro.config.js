const {getDefaultConfig} = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
    ...config.resolver,
    assetExts: [...config.resolver.assetExts, 'db', 'ttf', 'png', 'jpg', 'jpeg', 'gif', 'webp','tflite'],
    sourceExts: [...config.resolver.sourceExts, 'svg', 'd.ts'],
};

module.exports = config;