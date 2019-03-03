/* 
 *功能：参与打包整个过程，打包优化和压缩，配置编译时的变量
 *优点:及其灵活
 */
const webpack = require('webpack');

module.exports = {
  plugins: [
    //   打包过程中使用这个UglifyJsPluginjs文件去混淆和压缩代码
    new webpack.optimize.UglifyJsPlugin()
  ]
}

/*
 * 常用的插件
 */
/* 优化相关：
1.CommonsChunkPlugin === 提取相同代码  
2.UglifyJsWebpackPlugin === 混淆压缩代码
*/
/* 功能相关：
1.ExtractTextWebpackPlugin === 提取出css为单独的css文件  
2.HtmlWebpackPlugin === 生成HTML
3.HotModuleReplacementPlugin === 模块热更新插件
4.CopyWebpacPlugin === 拷贝打包第三方文件
*/