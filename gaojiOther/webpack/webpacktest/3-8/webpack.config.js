// var webpack = require('webpack');
// 调用系统的path路径方法
var path = require('path');
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 注意，加载link标签时，需要设置公共路径
    publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  //   1.加载style标签
  module: {
    rules: [{
        test: /\.css$/,
        use: extractLess.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
            }
          },
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]_[local]'
              }
            },
            {
              laoder: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          //  img的url路径进行编码
          {
            laoder: 'file-loader',
            options: {
              limit: 5000,
              publicPath: '',
              output: 'dist/', //指定到打包目录
              useRelativePath: true //指定输出文件路径
            }
          }
        ]
      }
    ]
  }
}