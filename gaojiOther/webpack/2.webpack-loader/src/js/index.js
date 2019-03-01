/**
 * 功能：主页功能
 * 日期：2017/6/8
 **/
var imgCtrl = require("./common");
require('bootstrap/dist/css/bootstrap.css');
// 引用CSS
require('../style/index-1.less');
require('../style/index-2.less');

// DOM加载的第四个阶段后执行
/* window.onload = function() {
	// 页面加载完成要做的事
} */
// DOM加载的第三个阶段后执行
$(function () {
	// 显示图片操作
	imgCtrl.showImg(150);
	// 隐藏图片
	imgCtrl.hideImg(150);
});