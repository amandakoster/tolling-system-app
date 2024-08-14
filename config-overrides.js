const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,  // Ignore 'fs' module in the browser
    "path": false // Ignore 'path' module in the browser
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.IgnorePlugin({
      resourceRegExp: /^fs$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^path$/,
    })
  ]);

  return config;
};
