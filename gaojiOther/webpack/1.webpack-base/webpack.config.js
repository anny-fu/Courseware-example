// 请求node.js的path处理模块对象
const path = require('path');

module.exports = {
    // 配置“资源映射文件”
    devtool: 'source-map',
    // 指定入口文件
    entry: './src/js/index',
    // 输出配置
    output: {
        // 设置输出路径
        path: path.resolve(__dirname, 'dist/static/'),
        // 设置输出文件名
        filename: 'app.js'
    }
};