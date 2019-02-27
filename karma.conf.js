module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      { pattern: 'test-context.js', watched: true }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test-context.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true
    }
  });
};
