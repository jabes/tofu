const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  optimization: {
    minimize: true
  },
  plugins: [
    new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { map: { inline: false } }
    })
  ],
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader?modules=true', 'stylus-loader' ]
      }
    ]
  }
});