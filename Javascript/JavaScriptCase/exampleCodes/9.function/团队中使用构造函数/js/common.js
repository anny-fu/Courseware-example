/**
* 功能：公共JS
* 维护人：大白、中白、小白
* 最后修改时间：2017-10-31 11:27:53
**/
function Main() {
	// 存储this指向
	var thisFn = this;
	/**
	* 功能：弹出框
	**/
	this.popupBox = function(text) {
		// 弹出框核心功能（用alert临时替代）
		alert(text);
	}
	/**
	* 功能：数量选择操作
	* 参数：
	* 1、当前数量选择器的CSS选择器（String）
	* 2、库存量（Number）
	**/
	this.countor = function(container, stock) {
		// 当前容器内的计数器文本框
		var $showCount = $(container).children("input");
		
		// 减少1
		$(container).children(".reduce").on("click", function() {
			var thisVal = parseInt($showCount.val());
			if(--thisVal >= 0) {
				// 重设为文本框的值
				$showCount.val(thisVal);
			}
			else {
				// 禁用该按钮
				$(this).addClass("disabled").prop("disabled",true);
				// 调用主构造函数下的弹出框方法
				thisFn.popupBox("不能再少了");
				return;
			}
			
			// 根据条件启动“增加”按钮
			enabled.call(this);
		});
		// 增加1
		$(container).children(".plus").on("click", function() {
			var thisVal = parseInt($showCount.val());
			if(++thisVal <= stock) {
				// 重设为文本框的值
				$showCount.val(thisVal);
			}
			else {
				// 禁用该按钮
				$(this).addClass("disabled").prop("disabled",true);
				// 调用主构造函数下的弹出框方法
				thisFn.popupBox("商品已经没有更多的库存");
				return;
			}
			// 根据条件启动“减少”按钮
			enabled.call(this);
		});
		
		/* 增加和减少按钮的禁用状态解除 */
		function enabled() {
			// 如果库存量不为零的时候
			if(stock !== 0) {
				$(this).siblings(".plus, .reduce").removeClass("disabled").prop("disabled",false);
			} else {
				return;
			}
		}
	}
}