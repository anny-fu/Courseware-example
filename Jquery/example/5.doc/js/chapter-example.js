/**
* 功能：章节练习功能
**/

/**** 页面加载完成后执行 ****/
$(function() {
	// 实例化表单验证函数对象
	var formValid = new Valid("userInfo");
	// 用户名验证
	formValid.blurValid("[name='userName']", "用户名的填写内容不能为空");
	// 昵称验证
	formValid.blurValid("[name='niceName']", "昵称的填写内容不能为空");
	// 密码验证
	formValid.blurValid("[name='userPwd']", "密码的填写内容不能为空");
	// 注册按钮验证
	signUpValid("userInfo","#submit-userInfo");
});

/**** 函数功能定义部分 ****/

/**
* 功能：数据验证
* 参数：
* 1、表单的name属性值（String）
**/
function Valid(formName) {
	var $form = $("form[name=" + formName + "]");
	/**
	* 功能：失去焦点后的数据验证
	* 参数：
	* 1、表单元素标识符（String）
	* 2、错误提示文本（String）
	**/
	this.blurValid = function(ident, erroMesg) {
		// 在当前表单元素内查找所有的表单元素，并绑定一个失焦事件
		$form.find(ident).on("blur", function() {
			var thisVal = $(this).val();
			// 内容为空的情况
			if(thisVal === "") {
				if($(this).prev().prev().is(".erroMesg")) {
				   return;
				}
				else {
					$(this).closest("div")
						.prepend("<p class='erroMesg'>" + erroMesg + "</p>");
					$(this).next("i.checked").remove();
				}
			}
			// 已经输入内容的情况
			else {
				$(this).prev().prev(".erroMesg").remove();
				if($(this).next().is("i.checked")) {
					return;
				} else {
					$(this).after("<i class='checked'></i>");
				}
			}
		});
	}
}

/**
* 功能：注册按钮验证事件
* 参数：
* 1、表单的name属性值（String）
* 2、注册按钮标识符（String）
**/
function signUpValid(formName,ident) {
	$(ident).on("click", function() {
		//$("form[name='" + formName + "']").find("input[required]").blur();
		// 或者写成
		$("form[name='" + formName + "']").find("input[required]").trigger("blur");
		// 获取错误信息的个数
		var erroLength = $(".erroMesg").length; 
		if(erroLength === 0) {
			location.assign("https://www.baidu.com");
			// 或
			//location.href = "https://www.baidu.com";
		}
		// 如果存在错误
		else {
			return;
		}
	});
}







