const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["./src/index.tsx"],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "components": path.resolve(__dirname, 'src/components/'),
      "store": path.resolve(__dirname, 'src/redux/'),
      "models": path.resolve(__dirname, 'src/models/'),
      "utils": path.resolve(__dirname, 'src/utils')
    }
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};