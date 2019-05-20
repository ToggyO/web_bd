const path = require('path');

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
};

exports.antColors = antColors;

exports.webpackCommon = {
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
      assets: path.resolve(__dirname, 'assets/'),
      src: path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/components'),
      data: path.resolve(__dirname, 'src/data'),
      services: path.resolve(__dirname, 'src/services/'),
      paths: path.resolve(__dirname, 'src/routes/paths.js'),
      'validation-rules': path.resolve(__dirname, 'src/services/validation-rules.js'),
    },
    extensions: ['.js', '.jsx', 'less'],
  },
};
