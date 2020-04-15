const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// I used this for fixing CANNOT GET 
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/

module.exports = {
  // Babel-polyfill to enable async/await
  entry: ['babel-polyfill', './src/index.tsx'],
  resolve: {
    // Hopefully this is obvious
    extensions: ['.ts', '.tsx', '.js'],
    // Aliases for my files and stuff so I can just say components/something
    alias: {
      'components': path.resolve(__dirname, 'src/components/'),
      'store': path.resolve(__dirname, 'src/redux/'),
      'models': path.resolve(__dirname, 'src/models/'),
      'services': path.resolve(__dirname, 'src/services'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },
  // Where to put stuff when I run npm run build
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.min.js',
    // allows you to specify the base path for all the assets within your application
    publicPath: '/'
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
  // will redirect 404s to /index.html
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};