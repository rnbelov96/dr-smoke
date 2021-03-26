const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    libs: './src/ts/libs.ts',
    main: './src/index.ts',
    thanks: './src/ts/thanks.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|webp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      chunks: ['main', 'libs']
      // favicon: './src/img/icons/favicon.ico'
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/thanks.html'),
    //   filename: 'thanks.html',
    //   chunks: ['thanks']
    //   // favicon: './src/img/icons/favicon.ico'
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/error.html'),
    //   filename: 'error.html',
    //   chunks: ['thanks']
    //   // favicon: './src/img/icons/favicon.ico'
    // }),
  ],
}