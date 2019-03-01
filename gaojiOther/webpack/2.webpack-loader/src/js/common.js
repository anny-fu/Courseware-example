/**
 * 功能：公共功能
 * 日期：
 **/
window.$ = require("jquery");

/**
 * 功能：图片操作类
 **/
function ImageCtrl() {
	// 显示图片
	this.showImg = function (speed) {
		speed = speed === undefined ? 300:speed;
		$(".showImg").on('click', function () {
			$('.img-girl').slideDown(speed);
		});
	};
	// 隐藏图片
	this.hideImg = function (speed) {
		speed = speed === undefined ? 300:speed;
		$(".hideImg").on('click', function () {
			$('.img-girl').slideUp(speed);
		});
	};
}
// 实例化并导出为一个模块（module）
module.exports = new ImageCtrl();


