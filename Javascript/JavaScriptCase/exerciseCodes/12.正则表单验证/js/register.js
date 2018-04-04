/**
 * 功能：数据验证基础
 * 日期：2017-8-24
 **/
// 表单输入内容
var email = document.getElementById("email"), emailStatus = false,
	nicename = document.getElementById("nicename"), nicenameStatus = false,
	pwd = document.getElementById("pwd"), pwdStatus = false,
	repwd = document.getElementById("repwd"), repwdStatus = false,
	tel = document.getElementById("tel"), telStatus = false,
	birthday = document.getElementById("birthday"), birthdayStatus = false,
	profession = document.getElementById("profession"), professionStatus = false,
	// 两次密码的一致性
	uniformity = false;

// 注册按钮
var signUp = document.getElementById("signUp");

// 邮箱（失去焦点）  
email.onblur = function() {
	emailStatus = regExpFun(
		this,
		/^[\w\-]+@[\w\-]+\.[a-z]+$/g,
		"请输入正确的邮箱格式"
	);
}

// 昵称（失去焦点）
nicename.onblur = function() {
	nicenameStatus = regExpFun(
		this,
		/^\S+$/g,
		"昵称不能含有空格，且不能为空"
	);
}

// 密码（失去焦点）
pwd.onblur = function() {
	pwdStatus = regExpFun(
		this,
		/^\S{6,16}$/g,
		"请输入6-16位密码"
	);
	// 调用“两次密码一致性核对”函数
	checkUniformity(this);
}

// 确认密码（失去焦点）
repwd.onblur = function() {
	repwdStatus = regExpFun(
		this,
		/^\S{6,16}$/g,
		"请再次输入密码"
	);
	checkUniformity(this);
}

// 手机号（失去焦点）
tel.onblur = function() {
	telStatus = regExpFun(
		this,
		/^1[34578]\d\-?\d{4}\-?\d{4}$/g,
		"请输入正确的手机号格式"
	);
}

// 生日（失去焦点）
birthday.onblur = function() {
	birthdayStatus = regExpFun(
		this,
		/^[12]\d{3}[\-\/]\d{1,2}[\-\/]\d{1,2}$/g,
		"请输入正确的日期格式"
	);
}

// 职业（失去焦点需要特殊处理）
profession.onblur = function() {
	// 调用“下拉菜单是否选择”验证函数
	selectedHandle(this);
}
profession.onchange = function() {
	selectedHandle(this);
}


// 注册按钮点击事件
signUp.onclick = function() {
	// 运行一次所有表单元素的“失去焦点”事件
	email.onblur();
	nicename.onblur();
	pwd.onblur();
	repwd.onblur();
	tel.onblur();
	birthday.onblur();
	profession.onblur();
	
	// 检查表单元素状态值是否为真（true）,最后一个条件是判断两次密码是否一致
	if(emailStatus && nicenameStatus && pwdStatus && repwdStatus && telStatus && birthdayStatus && professionStatus && uniformity) {
		// 存储数据
		localStorage.setItem("email",email.value);
		localStorage.setItem("password",pwd.value);
		// 跳转到登录页
		location.href = "sign-in.html";
	}
	// 如果有值存在错误
	else {
		alert("表单填写有误，请检查！");
	}
}

/**
 * 功能：下拉菜单是否选择验证
 * 参数：标识符
**/
function selectedHandle(ident) {
	// 获取当前表单元素的值
	var thisVal = ident.value;
	// 存储错误信息节点元素
	var erroMesg = ident.previousElementSibling.previousElementSibling;
	
	// 如果当前的值为空
	if(thisVal === "未选择") {
		erroMesg.textContent = "请选择您的职业";
		// 设置红色边框进行提示
		ident.style.borderColor = "#e00";
		professionStatus = false;
	}
	// 否则
	else {
		erroMesg.textContent = "";
		// 恢复原来边框的颜色
		ident.style.borderColor = "#999";
		professionStatus = true;
	}
}

/**
 * 功能：两次密码一致性核对
 * 参数：标识符
**/
function checkUniformity(ident) {
	// 获取两次密码输入的值
	var pwdVal = pwd.value,
		repwdVal = repwd.value;
	// 存储错误信息节点元素
	var thisErroMesg = ident.previousElementSibling.previousElementSibling,
		pwdErroMesg = pwd.previousElementSibling.previousElementSibling,
		repwdErroMesg = repwd.previousElementSibling.previousElementSibling;
	// 如果密码和确认密码都通过非空验证
	if(pwdStatus && repwdStatus) {
	    // 如果两次输入的不一致，并且都不为空
		if(pwdVal !== repwdVal) {
			thisErroMesg.textContent = "两次输入的密码不一致，请检查";
			uniformity = false;
		}
		else {
			pwdErroMesg.textContent = "";
			repwdErroMesg.textContent = "";
			uniformity = true;
		}
    }
	
}

/**
 * 功能：数据正则验证函数
 * 参数1：标识符（Element）
 * 参数2：正则表达式（RegExp）
 * 参数3：错误提示文本（String）
**/
function regExpFun(ident,regx,erroTxt) {
	// 验证结果
	var verified  = false;
	// 当前表单的值
	var thisVal = ident.value;
	// 错误信息元素
	var erroMesg = ident.previousElementSibling.previousElementSibling;
	// 验证通过
	if(regx.test(thisVal)) {
		erroMesg.textContent = "";
		verified = true;
	}
	// 验证不通过
	else {
		erroMesg.textContent = erroTxt;
		verified = false;
	}
	return verified;
}











