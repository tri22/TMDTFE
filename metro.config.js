// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Thêm cấu hình cho allowRequireContext:
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
  unstable_allowRequireContext: true, // ✅ thêm dòng này
};

// Giữ nguyên phần xử lý svg
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = config;
