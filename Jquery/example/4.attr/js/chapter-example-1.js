/**
* 功能：章节练习一功能
**/

/**** 页面内容加载完成后执行 ****/
$(function() {
	// 初始化表格功能
	var tbCtrl = table.init();
	// 全选操作
	tbCtrl.allCkd();
	// 子复选框选择操作
	tbCtrl.childCkd();
	// 删除当前行
	tbCtrl.deleRow();
});

/**** 功能函数及方法定义部分 ****/
function Table() {
	// 所有子选择框
	var $childCkb = $("#goodsInfo tbody input[type='checkbox']");
	// 获取全部选择框的个数
	var allCount = $childCkb.length;
	
	/**
	* 功能：全选操作
	**/
	function allChecked() {
		$("input[name='allCkb']").on("click", function() {
			// 获取被选中选择框的个数
			var ckdCount = $childCkb.filter(":checked").length;
			// 选中状态
			var isCkd = $(this).prop("checked");
			if(isCkd) {
				$childCkb.prop("checked", true);
		    }
			else {
				$childCkb.prop("checked", false);
			}
			// 如果处于半选状态
			if(allCount !== ckdCount && ckdCount !== 0) {
			    $(this)[0].indeterminate = false;
				$(this).prop("checked", true);
				$childCkb.prop("checked", true);
		    }
		});
	}
	
	/**
	* 功能：表体的复选框操作
	**/
	function childCheckbox() {
		$childCkb.on("click", function() {
			// 获取被选中选择框的个数
			var ckdCount = $childCkb.filter(":checked").length;
			// 获取全选选择框
			var $allCkb = $("#goodsInfo thead input[type='checkbox']");
			// 全不选的时候
			if(ckdCount === 0) {
				$allCkb.prop("checked", false);
				$allCkb[0].indeterminate = false;
			}
			// 全部选中的时候
			else if(allCount === ckdCount) {
				$allCkb.prop("checked", true);
				$allCkb[0].indeterminate = false;
			}
			// 部分被选中的时候
			else {
				$allCkb[0].indeterminate = true;
			}
		});
	}
	
	/**
	* 功能：删除当前行
	**/
	function deleCurrentRow() {
		$("#goodsInfo  [name=deleData]").on("click", function() {
			$(this).closest("tr").addClass("watingDele");
			// 调用弹出框函数
			PopupBox({
				confirm: function() {
					//console.log(this);
					$("tr.watingDele").remove();
					$(this).closest("component").fadeOut(600, function() {
						$(this).remove();
					});
				},
				cancel: function() {
					$("tr.watingDele").removeClass("watingDele");
					$(this).closest("component").fadeOut(600, function() {
						$(this).remove();
					});
				},
			});
		});
	}
	
	/* 初始化方法集 */
	this.init = function() {
		return {
			allCkd: allChecked,
			childCkd: childCheckbox,
			deleRow: deleCurrentRow
		}
	}
}
// 实例化Table对象
var table = new Table();

/**
* 功能：自定义对话框
* 参数：
* param.confirm：确认按钮功能（Function）
* param.cancel：取消按钮功能（Function）
**/
function PopupBox(param) {
	// 创建填出框内容
	$("body").append(`
		<component>
			<div class="maskLayer"></div>
			<div class="popupBox">
				<div class="popupBox-content">确定删除本条数据？</div>
				<div class="popupBox-ctrl">
					<button class="popupBox-btn-confirm" type="button">确认</button>
					<button class="popupBox-btn-cancel" type="button">取消</button>
				</div>
			</div>
		</component>
	`);
	// 确认操作
	$(".popupBox-btn-confirm").on("click", function() {
		param.confirm.bind(this)();
	});
	// 取消操作
	$(".popupBox-btn-cancel").on("click", function() {
		param.cancel.bind(this)();
	});
}

