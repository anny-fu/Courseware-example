/**
 * 功能：登录验证
 * 日期：2017-8-24
 **/
// 邮箱
var email = document.getElementById("email");
var userPwd = document.getElementById("userPwd");

// 登录按钮
var btnSignIn = document.getElementById("btnSignIn");
// 登录验证事件
btnSignIn.onclick = function() {
	// 获取正确的邮箱和密码
	var correctEmial = localStorage.getItem("email"),
		correctPwd = localStorage.getItem("password");
	if(email.value === correctEmial && userPwd.value === correctPwd) {
		alert("登录成功！");
	} else {
		alert("账号或密码错误，请重试！")
	}
}


