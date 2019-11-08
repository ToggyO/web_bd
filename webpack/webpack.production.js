const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { paths } = require('../bin');

const common = require('./webpack.common.js');

module.exports = merge(common.webpackCommon, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        terserOptions: { output: { comments: false } },
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html',
      favicon: paths.appFavicon,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new CopyWebpackPlugin([{ from: paths.appAssets, to: paths.appBuildAssets }]),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },

          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: common.antColors,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
});
