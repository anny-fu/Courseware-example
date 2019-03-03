/**
 *功能:处理文件，转化为模块
 */
module.exports = {
  module: {
    rules: [{
      // 如果文件名以.css结尾的文件名就使用css-loader
      test: /\.css$/,
      use: 'css-loader'
    }]
  }
}

/* 
 *常用的loader
 */
//编译相关 : babel-loader,ts-loader
// 样式相关；style-loader,css-loader,less-loader,postcss-loader
// 文件相关：file-loader,url-loader