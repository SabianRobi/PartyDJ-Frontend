// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const config = {
//   entry: [
//     './src/index.tsx'
//   ],
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].[contenthash].js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts(x)?$/,
//         loader: 'ts-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
//       filename: 'index.html',
//     })
//   ],
//   devServer: {
//     'static': {
//       directory: './dist'
//     }
//   },
//   resolve: {
//     extensions: [
//       '.tsx',
//       '.ts',
//       '.js'
//     ],
//     alias: {
//         '#': path.resolve(__dirname, 'src')
//     }
//   },
//   optimization: {
//     runtimeChunk: 'single',
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all'
//         }
//       }
//     }
//   }
// };

// module.exports = (env, argv) => {
//   if (argv.hot) {
//     // Cannot use 'contenthash' when hot reloading is enabled.
//     config.output.filename = '[name].[hash].js';
//   }

//   return config;
// };

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '#': path.resolve(__dirname, 'src'),
    },
  },
};