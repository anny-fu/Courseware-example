/**
 * 功能：主页功能
 * 日期：2017/6/8
 **/
const imgCtrl = require("./common");
require('bootstrap/dist/css/bootstrap.css');
// 引用CSS
require('../style/index-1.less');
require('../style/index-2.less');

$(function () {
	// 显示图片操作
	imgCtrl.showImg();
	// 隐藏图片
	imgCtrl.hideImg();
});