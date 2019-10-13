const path = require('path');

const webpack = require('webpack');

const { NODE_ENV, API_DOMAIN, API_VERSION, isPROD, isDEV, paths } = require('../bin');

const antColors = {
  white: '#fff',
  black: '#000',
  'primary-color': '#2EAC82;',
  'text-color': 'fade(@black, 65%)',
  'input-placeholder-color': 'hsv(0, 0, 75%)',
  'text-color-secondary': 'fade(@black, 45%)',
  'heading-color': 'fade(@black, 85%)',
  'component-background': '#fff',
  'body-background': '#F0F4F3',
  'input-height-base': '40px',
  'form-item-margin-bottom': '16px',
  'btn-height-base': '40px',
  'btn-primary-color': 'rgba(255,255,255,0.8)',
  'border-color-base': 'rgba(0,0,0,0.25)',
  'border-color-split': 'hsv(0, 0, 91%)',
  'box-shadow-base': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  'label-color': 'fade(#000, 65%);',
  'table-row-hover-bg': 'none',
};

exports.antColors = antColors;

exports.webpackCommon = {
  entry: {
    app: paths.appIndexJs,
  },
  output: {
    filename: `[name]-[hash]${isPROD ? '.min' : ''}.js`,
    path: paths.appBuild,
    publicPath: '/',
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        isPROD: JSON.stringify(isPROD),
        isDEV: JSON.stringify(isDEV),
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_DOMAIN: JSON.stringify(API_DOMAIN),
        API_VERSION: JSON.stringify(API_VERSION),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },

      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: antColors,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: { limit: 40 * 1024, noquotes: true },
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve('src/components/AntIcons'),
      '@assets': paths.resolveApp('src/assets/'),
      '@components': paths.resolveApp('src/components'),
      '@config': paths.resolveApp('src/config'),
      '@ducks': paths.resolveApp('src/ducks'),
      '@routes': paths.resolveApp('src/routes'),
      '@scenes': paths.resolveApp('src/scenes'),
      '@services': paths.resolveApp('src/services'),
      '@utils': paths.resolveApp('src/utils'),
    },
    extensions: ['.js', '.jsx', 'less'],
  },
};
