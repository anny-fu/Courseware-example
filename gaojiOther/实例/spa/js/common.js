/**
 * 功能：公共JS文件
 * 日期：2017-11-23
 **/

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/


/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
$(function () {
	// 实例化Path函数
	var path = new Path();
	// 调用初始化方法
	path.init();
	path = null;
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
function Path() {
	var $navBtn = $("nav li[data-id]");
	/**
	* 功能：路由处理
	**/
	this.router = function () {
		
		$navBtn.on("click", function () {
			// 获取名称
			var pageName = $(this).attr("data-id");
			// 内容显示区域
			var $app = $("#app");
			switch (pageName) {
				case "home":
					$.get("doc/home.html").then(function (doc) {
						$app.html(doc);
					});
					break;
				case "role":
					$.get("doc/role.html").then(function (doc) {
						$app.html(doc);
					});
					break;
				case "info":
					$.get("doc/info.html").then(function (doc) {
						$app.html(doc);
					});
					break;
				default:
					$.get("doc/home.html").then(function (doc) {
						$app.html(doc);
					});
			}
		});
		$navBtn.eq(0).trigger("click");
	};
	/**
	 * 功能：导航按钮选中效果
	 **/
	this.active = function () {
		$navBtn.on("click", function () {
			$(this).addClass("active").siblings(".active").removeClass("active");
		})
	};
	this.init = function () {
		this.router();
		this.active();
	}
}
