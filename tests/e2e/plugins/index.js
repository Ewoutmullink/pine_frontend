const webpack = require("webpack");
const path = require('path');

module.exports = (on, config) => {
  const vueConfig = require('@vue/cli-service/webpack.config.js');
  const webpackConfig = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  };
  const mergedConfig = Object.assign({}, vueConfig, webpackConfig);

  on('file:preprocessor', require('@cypress/webpack-preprocessor')(mergedConfig));

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}

