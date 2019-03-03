/**
 * 功能：打包成的文件(bundle)
 * 一个或者多个
 * 自定义规则
 */
module.exports = {
  entry: 'index.js',
  //单个
  output: {
    filename: 'index.min.js'
  },
}

module.exports = {
  entry: {
    index: 'index.js',
    vendor: 'vendor.js'
  },
  //多个
  output: {
    //   自定义规则形式，[name]对应js文件的name;[hash:5]md5的版本号
    filename: '[name].min.[hash:5].js'
  },
}