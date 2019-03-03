/**
 *功能： 代码入口，找到依赖模块
 * 分单个或多个
 */

//  单个
module.exports = {
    entry: 'index.js',
  }
  // 多个[数组]
module.exports = {
    entry: ['index.js', 'vendor.js']
  }
  // 单个对象
module.exports = {
    entry: {
      index: 'index.js'
    }
  }
  // 对象形式多个
module.exports = {
  entry: {
    index: ['index', 'app.js'],
    vendor: 'vendor.js'
  }
}