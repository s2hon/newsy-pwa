const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  // Add webpack configuration code here
  mode: "development",
  entry: {
    app: "./assets/js/index.js",
    favorites: "./assets/js/favorites.js",
    topic: "./assets/js/topic.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/present-env"]
          }
        }
      }
    ]
  },
  // plugins: [
  //   new 
  // ]
};

module.exports = config;
