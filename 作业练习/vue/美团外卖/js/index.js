/**
* 功能：首页功能
**/

/**** 页面加载完成执行部分 ****/
$(function() {
	// 排序功能
	comprehensiveSort();
});

/**** 功能函数定义部分 ****/
/**
* 功能：排序功能
**/
function comprehensiveSort() {
	var $filterSort = $("ul.filterSort");
	/* 筛选列表组 */
	var $filerGroup = $filterSort.children("li.filterItem");
	$filerGroup.on("click", function() {
		$(this).addClass("checked").siblings(".checked").removeClass("checked");
		// 遮罩层
		$maskLayer = $("div.maskLayer");
		// 如果是综合排序
		if($(this).is("li:first")) {
			// 执行综合排序相关功能
			$(this).children("i.icon").toggleClass("checked");
			$("ul.comSort").slideToggle(300);
			if($maskLayer.length === 0) {
			   $("<div class='maskLayer'></div>").appendTo("body");
			} else {
				$maskLayer.remove();
			}
		}
		// 否则
		else {
			// 收起综合排序选择（无论是否展开）
			$("ul.comSort").slideUp(300);
			$filterSort.find("i.icon").removeClass("checked");
			$maskLayer.remove();
		}
	});
	/* 综合排序展开的列表点击 */
	$("ul.comSort").children("li").on("click", function() {
		var thisText = $(this).text();
		$filerGroup.eq(0).children("span").text(thisText);
		$(this).addClass("checked").siblings(".checked").removeClass("checked");
		$(this).parent().slideUp(300);
		$filerGroup.eq(0).children("i.icon").removeClass("checked");
		// 移除遮罩层
		$("div.maskLayer").remove();
	});
}