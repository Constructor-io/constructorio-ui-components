const path = require('path');

module.exports = (dirname) => ({
  mode: 'production',
  entry: path.join(dirname, 'src/index.tsx'),
  output: {
    path: path.join(dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: true },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});
