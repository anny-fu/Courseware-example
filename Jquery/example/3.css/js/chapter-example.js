/**
 * 功能：章节练习
 * 日期：2017/9/22
 **/

/****************************************************/
/* 页面加载完成后执行部分 */
/****************************************************/
$(function () {
	// 内容懒加载
	lazyLoad();
	// 页面载入时，将滚动条置顶（在所有JS执行完成后执行）
	setTimeout(function () {
		$(document).scrollTop(0);
	},0);
});

/****************************************************/
/* 功能函数定义部分 */
/****************************************************/
/**
 * 功能：内容懒加载
 **/
function lazyLoad() {
	const $win = $(window);
	// 获取所有懒加载元素
	const $lazyElement = $("article > section"),
		lazyElement_length = $lazyElement.length;
	// 获取当前窗口高度
	const winHeight = $win.height();
	$(document).scroll(function () {
		// 获取滚动条距离顶部距离
		const sroTopVal = $(this).scrollTop();
		// 循环判断各个元素是否出现在窗口内
		for(let i = 0; i < lazyElement_length; i++) {
			// 获取当前元素距离文档顶部的偏移值
			const $currentBlock =  $lazyElement.eq(i),
				offsetVal = $currentBlock.offset().top;
			//元素距离顶部位置< 滚动条距离 +(一屏的高度-100)
			//(winHeight - 100)这个结果越大，说明元素出现越早
			if(offsetVal < sroTopVal + (winHeight - 100)) {
				$currentBlock.children(".offsetBlock").addClass("show");
			}
		}
	});
}


