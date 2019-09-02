const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch', 
    "webpack-dev-server/client?http://0.0.0.0:80", 
    './src/index.js', 
    './src/style.css'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, 
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ], 
  devServer: {
    host: '0.0.0.0',
    port: 80, 
    contentBase: './dist', 
    hot: true, 
    disableHostCheck: true
  }
};
