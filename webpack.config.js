const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["./src/index.tsx"],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "components": path.resolve(__dirname, 'src/components/'),
      "store": path.resolve(__dirname, 'src/redux/')
    }
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.ts?$/,
      //   loader: 'ts-loader'
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      // {
      //   test: /[.]tsx?$/,
      //   exclude: /(node_modules)/,
      //   enforce: 'pre',
      //   loader: 'awesome-typescript-loader'
      // },
      // {
      //   test: /[.]tsx?$/,
      //   exclude: /(node_modules)/,
      //   loader: 'awesome-typescript-loader'
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};