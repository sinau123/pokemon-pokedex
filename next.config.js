const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

module.exports = {
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 60 * 60 * 24 * 30, //30 day,
  },
};
