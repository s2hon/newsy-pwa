import WebpackPwaManifest from 'webpack-pwa-manifest';

const path = require("path");

const config = {
  // Add webpack configuration code here
  mode: 'development',
  entry: {
    app: './assets/js/index.js',
    favorites: './assets/js/favorites.js',
    topic: './assets/js/topic.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/present-env']
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest ({
      fingerprints: false,
      inject: false,
      name: 'Newsy, Your News',
      short_name: 'Newsy',
      description: 'My awesome news dashboard!',
      background_color: '#f5f9fc',
      start_url: '/', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('assets', 'icons')
        }
      ]
    })
  ]
};

module.exports = config;
