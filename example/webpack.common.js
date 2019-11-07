const Path = require('path');
const Webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, 'src/index.jsx')
  },
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new Webpack.ProvidePlugin({
      '_tofu': Path.resolve(__dirname, 'src/assets/scripts/tofu.js')
    }),
  ],
  resolve: {
    modules: [__dirname, 'src/components', 'node_modules'],
    alias: {
      '~': Path.resolve(__dirname, 'src')
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.raw\.js$/,
        use: ['raw-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: false,
            babelrc: true
          }
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  }
};