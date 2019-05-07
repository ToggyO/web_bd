const path = require('path');

const antColors = {
  'primary-color': '#2EAC82;',
  'component-background': '#fff',
  'heading-1-size': '24px',
  'body-background': '#F0F4F3',
  'line-height-base': '28px',
  'input-height-base': '40px',
  'form-item-margin-bottom': '16px',
  'btn-height-base': '40px',
  'btn-primary-color': 'rgba(255,255,255,0.8)',

  'border-color-base': 'rgba(0,0,0,0.25)',
  'border-color-split': 'hsv(0, 0, 91%)',
  'box-shadow-base': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
};

exports.antColors = antColors;

exports.webpackCommon = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
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
          options: { limit: 10 * 1024, noquotes: true },
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
      '@ant-design/icons/lib/dist$': path.resolve(
        __dirname,
        './src/components/AntIcons/index.js',
      ),
    },
    extensions: ['.js', '.jsx', 'less'],
  },
};
