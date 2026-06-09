const path = require('path');

// ESM consumer build: triggers strict bare-specifier resolution.
// On React 16/17 (which lack a package.json `exports` map), this surfaces
// the `react/jsx-runtime` resolver failure that affects libraries whose
// published ESM imports `react/jsx-runtime` directly (e.g. @radix-ui/react-slot).
module.exports = (dirname) => ({
  mode: 'production',
  entry: path.join(dirname, 'src/index.tsx'),
  experiments: { outputModule: true },
  output: {
    path: path.join(dirname, 'dist'),
    filename: 'bundle.mjs',
    module: true,
    library: { type: 'module' },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // Pin module resolution to this fixture's node_modules so webpack does not
    // fall through to the library's hoisted node_modules at the repo root,
    // which would let the wrong React (e.g. 19) satisfy `react/jsx-runtime`
    // and mask the failure mode the matrix is meant to catch.
    modules: [path.join(dirname, 'node_modules')],
  },
});
