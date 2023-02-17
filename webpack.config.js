const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, argv) => {
    const isProduction = argv && argv.mode === 'production';
    const config = isProduction
        ? {
              entry: './src/index.ts',
              output: {
                  path: path.resolve(__dirname, 'dist'),
                  filename: 'timepad-di.js',
                  library: 'timepadDI',
                  libraryTarget: 'umd',
              },
              resolve: {
                  modules: [path.resolve(__dirname, './src'), 'node_modules'],
                  extensions: ['.ts', '.tsx', '.js', '.jsx'],
              },
              devServer: {
                  historyApiFallback: true,
                  disableHostCheck: true,
              },
              module: {
                  rules: [
                      {
                          test: /\.tsx?$/,
                          exclude: /node_modules/,
                          loader: 'ts-loader',
                      },
                  ],
              },
          }
        : {
              entry: './src/index.tsx',
              module: {
                  rules: [
                      {
                          test: /\.tsx?$/,
                          use: 'ts-loader',
                          exclude: /node_modules/,
                      },
                  ],
              },
              target: 'web',
              resolve: {
                  extensions: ['.tsx', '.ts', '.js'],
              },
              output: {
                  filename: 'bundle.js',
                  path: path.resolve(__dirname, 'dist'),
              },
              plugins: [
                  new HtmlWebpackPlugin({
                      template: path.join(__dirname, 'src', 'index.html'),
                  }),
              ],
          };
    return config;
};
