/**
 * 功能：首页功能
 * 日期：2017/11/27
 **/

// normalize样式初始化
require('normalize-css');
// 字体图标
require('font-icon');

// 载入所需样式
require('../styles/main.less');

// 定义标题栏
const titleArr = ["买得多多", "商品购买", "购物车", "个人中心"];

/**** 页面加载完成后执行 ****/
$(function () {
	// 实例化路由对象
	const router = new Path();
	// 调用设置页面导航功能
	router.setNav();
});

/**** 函数功能定义部分 ****/

/**
 * 功能：路由处理
 * 参数：
 **/
function Path() {
	/* 设置页面导航 */
	this.setNav = function () {
		const $footNavBtn = $("#footerNav li");
		// 导航点击事件
		$footNavBtn.on("click", function () {
			// 获取索引值
			const thisIndex = $(this).index();
			// 设置标题栏
			$("#headerTitle").text(titleArr[thisIndex]);
			
			// 获取link-to属性值
			const linkURL = $(this).attr("link-to");
			// 设置哈希值
			location.hash = linkURL;
			window.onhashchange = function () {
				// 获取当前的哈希值
				let hashVal = location.hash.slice(1);
				$("#footerNav li[link-to=" + hashVal + "]").trigger("click");
			};
			
			// 获取内容容器
			const $content = $("#content");
			axios.get("static/doc/" + linkURL + ".html").then(function (res) {
				$content.html(res.data);
			});
			// 切换导航选中效果
			$(this).addClass("active").siblings(".active").removeClass("active");
		});
		// 触发首页导航点击事件（默认加载显示首页）
		$footNavBtn.first().trigger("click");
	}
}


