/**
 * 数据验证
 */
// 表单输入内容，验证状态
var email = document.getElementById('email'),emailStatus = false,
nicename = document.getElementById('nicename'),nicenameStatus = false,
pwd = document.getElementById('pwd'),pwdStatus = false,
repwd = document.getElementById('repwd'),repwdStatus = false,
tel = document.getElementById('tel'),telStatus = false,
birthday = document.getElementById('birthday'),birthdayStatus = false,
profession = document.getElementById('profession'),professionStatus = false,
	// 两次密码的一致性
	uniformity = false;

/**
 * 各项数据失去焦点验证
 */
	// 邮箱(失去焦点)
	email.onblur = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/^\w+@[a-z0-9]+\.([a-z]){1,3}$/;
		emailStatus = blurHandle(this,RegExp,'请填写邮箱！');
	}

	// 邮箱(键盘松开)
	email.onkeyup = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/^\w+@[a-z0-9]+\.([a-z]){1,3}$/;
		emailStatus = blurHandle(this,RegExp,'请填写邮箱！');
	}
	// 昵称(失去焦点)
	nicename.onblur = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/[\u4e00-\u9fa5\w-]/;
		nicenameStatus = blurHandle(this,RegExp,'请填写用户名！');
	}

	// 确认密码(失去焦点)
	pwd.onblur = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/[\w]{6,16}/;
		pwdStatus = blurHandle(this,RegExp,'请填写密码！');
		
	}

	// 密码(失去焦点)
	repwd.onblur = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/[\w]{6,16}/;
		repwdStatus = blurHandle(this,RegExp,'请确认一次密码！');
		// 两次密码一致性
		checkUniformity(this);
	}

	// 手机号(失去焦点)
	tel.onblur = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/^1(3|4|5|7|8)\d{1}\-?\d{4}\-?\d{4}$/;
		telStatus = blurHandle(this,RegExp,'请填写手机号！');
	}

	// 生日(失去焦点)
	birthday.onblur = function(){
		// 调用“输入框失去焦点验证”函数；
		var RegExp =/^(19|20)\d{2}-(1[0-2]|0[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])/;
		birthdayStatus = blurHandle(this,RegExp,'请填写生日！');
	}
	// 职业（失去焦点需要特殊处理）
	profession.onblur = function(){
		// 调用“下拉菜单是否选择”验证函数
		selectedHandle(this);
	}
	// 注册按钮点击事件
	var signUp = document.getElementById('signUp');
	// 获取弹出框
	var popupMain = document.getElementById('shade');
	var popupBtn = document.getElementById('btn');
	signUp.onclick = function(){
		// 运行一次所有的表单元素的“失去焦点”事件
		email.onblur();
		nicename.onblur();
		pwd.onblur();
		repwd.onblur();
		tel.onblur();
		birthday.onblur();
		profession.onblur();

		// 检验表单中的必填项的验证状态是否为真(true)
		if(emailStatus && nicenameStatus && pwdStatus && repwdStatus && birthdayStatus && professionStatus && uniformity){
			// 获取数据提交
			location.href = 'https://www.baidu.com/';
		}
		// 如果存在验证未通过的项
		else{
			popupMain.style.cssText = 'visibility:visible;opacity:1;';
		}
	}
	// 弹出框按钮点击事件
	popupBtn.onclick = function(){
		popupMain.style.cssText ='';
	}

	/**
	 * 功能：输入框失去焦点验证
	 * @param object ident 标识符，失去焦点对应的元素
	 * @param  string mesg  提示信息
	 * reg :正则表达式
	 * @return true:验证通过，false：未通过验证
	 */
	 function blurHandle(ident,Reg,mesg){
	 	// 获取当前表单元素的值
	 	var thisVal = ident.value;
	 	// 存储错误信息的节点
	 	var erroMesg = ident.previousElementSibling.previousElementSibling;
	 	console.log(erroMesg);
	 	// 如果当前值为空
	 	if(thisVal === ''){
	 		// 设置提示信息和元素边框颜色
	 		erroMesg.textContent = mesg;
	 		ident.style.borderColor = '#e00';
	 		// 返回验证结果
	 		return false;
	 	}
	 	// 验证值不正确
	 	else if(!Reg.test(thisVal)){
	 		// 设置提示信息和元素边框颜色
	 		erroMesg.textContent = '请输入正确的格式！';
	 		ident.style.borderColor = '#e00';
	 				// 返回验证结果
	 				return false;
	 			}
		// 否则
		else{
			erroMesg.textContent = '';
			ident.style.borderColor = '';
			return true;

		}
	}
	/**
	 * 功能：两次密码一致性验证
	 * @param  标示符
	 * 
	 */
	 function checkUniformity(ident){
   // 获取两次密码值
   var pwdVal = pwd.value,
   repwdVal = ident.value;
   // 存储错误信息的节点
   var thisErrorMeg = ident.previousElementSibling.previousElementSibling;
   // 如果密码和确认密码都非空
   if(pwdVal && repwdVal){
   		// 不一致
   		if(pwdVal !== repwdVal){
   			thisErrorMeg.textContent = '两次输入的密码不一致！';
   			uniformity = false;
   		}else{
   			thisErrorMeg.textContent = '';
   			uniformity = true;
   		}
   	}
   }
   /**
    * 功能：下拉菜单是否选择验证
    * @param   ident 标识符
    * @return 
    */
    function selectedHandle(ident){
   	// 获取当前下拉菜单的值
   	var thisVal = ident.value;
   	// 存储错误消息提示元素
   	var erroMesg = ident.previousElementSibling.previousElementSibling;
   	// 如果当前的值为空
   	if(thisVal === '未选择'){
   		// 设置错误消息和输入框状态
   		erroMesg.textContent = '请选择您的职业！';
   		ident.style.borderColor = '#e00';
   		professionStatus = false;
   	}
   	// 否则
   	else{
   		// 清空错误消息和恢复输入框状态
   		erroMesg.textContent = '';
   		ident.style.borderColor = '#999';
   		professionStatus = true;
   	}
   }

