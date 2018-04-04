/**
* 功能：键盘切换图片显示
**/
/**** 页面加载完成后执行 ****/
$(function() {
	// 键盘控制图片显示切换
	tabImageShow();
});

/**** 功能函数定义部分 ****/
/**
* 功能：键盘控制图片显示切换
**/
function tabImageShow() {
	$(document).keydown(function(e) {
		var $banner = $(".banner");
		var $imgList = $banner.children("img");
		// “←”是37，“→”是39
		if(e.which === 37) {
			var lastImg = $(".banner img").last().clone();
			$imgList.last().remove();
			$banner.prepend(lastImg);
		}
		if(e.which === 39) {
			$imgList.eq(0).appendTo(".banner");
		}
	});
}