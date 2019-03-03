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
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },
  //   1.加载style标签
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }]
  }
  //    2.加载link标签,不常用,每更新一次就生成一个文件
  /*   module: {
      rules: [{
        test: /\.css$/,
        use: [
          { loader: 'style-loader/url' },
          { loader: 'file-loader' }
        ]
      }]
    } */
}