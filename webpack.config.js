const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.(png|svg|jpg|gif|wav)$/,
        use: ['file-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]_[hash:base64:8]'
              }
            }
          },
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '-',
      template: path.resolve(__dirname, './src/index.html')
    })
  ]
};
