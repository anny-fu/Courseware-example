/**
 * 功能：入口文件
 * 日期：2018-1-10
 */
// 样式文件导入
require('../css/style.scss');

// JS文件导入
const common = require('./common');

window.onload = function() {
    common.loadImage('albumUl');
}