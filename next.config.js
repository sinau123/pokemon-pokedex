const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

module.exports = {
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};
