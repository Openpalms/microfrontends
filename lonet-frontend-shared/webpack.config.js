const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const deps = require("./package.json").dependencies;

const isProd = process.argv[process.argv.indexOf('--mode') + 1] === 'production';
const publicPath = isProd ? 'https://lonet-frontend-shared.website.yandexcloud.net' : 'http://localhost:2999/';

module.exports = () => ({
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 2999,
    historyApiFallback: true,
    hot: 'only',
  },
  output: {
    publicPath,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shared",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './constants': './src/constants',
        './apollo': './src/apollo',
        './navigation': './src/navigation',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "@apollo/client": {
          singleton: true,
          requiredVersion: deps["@apollo/client"],
        },
        "graphql": {
          singleton: true,
          requiredVersion: deps["graphql"],
        },
        "js-cookie": {
          singleton: true,
          requiredVersion: deps["js-cookie"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
});
