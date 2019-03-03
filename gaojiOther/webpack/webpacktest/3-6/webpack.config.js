var webpack = require('webpack');
var path = require('path');
module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    'pageA': './src/pageA.js',
    'pageB': './src/pageB.js',
    'vendor': ['jquery']
  },
  output: {
    //   __dirname当前运行的dir路径
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      // 指定提前pageA和B的公共代码
      chunks: ['pageA', 'pageB']
    }),
    // 3.配置names
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vender', 'manifest'],
      minChunks: Infinity
    })
    /*    // 1.同时打包了两个同名vender文件，但是一个只包含webpack,一个包含jquery
       new webpack.optimize.CommonsChunkPlugin({
         name: 'vender',
         minChunks: Infinity
       }), */
    /*     // 2.为jquery打包后文件名不同名
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          minChunks: Infinity
        }) */
  ]
}