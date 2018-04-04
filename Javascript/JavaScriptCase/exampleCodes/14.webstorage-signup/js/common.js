/**
 * 功能：利用Web存储实现注册和登录
 * 日期：2017-9-9
 **/

/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
// 页面完整加载完成后执行
/*window.onload = function() {

}*/

// 页面内容加载完成后执行
/*document.onreadystatechange = function() {
	if(document.readyState === "interactive") {
	   // 需要执行的语句
    }
}*/
// 等效于
document.addEventListener("DOMContentLoaded", function() {
	// 创建导航栏
	createNavBar();
	// 注册弹出框事件的相关功能
	beginSignUp();
	// 登录弹出框事件的相关功能
	beginSignIn();
	// 根据会话存储判断当前的登录状态
	signInStatus();
});


/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/*var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!'
	}
});*/

/**
* 功能：注册弹出框事件的相关功能
**/
function beginSignUp() {
	// 开始注册的按钮
	var btnBeginSignUp = document.getElementById("begin-signUp");
	btnBeginSignUp.onclick = function() {
		// 调用弹出框函数并进行内容和功能的配置
		createPopupBox({
			head: "用户注册",
			content: 
			'<form id="signUpInfoForm">' +
			'<div>' +
			'<label>用户名：</label>' +
			'<input name="userName" type="text" placeholder="请输入邮箱或手机号">' +
			'</div>' +
			'<div>' +
			'<label>密码：</label>' +
			'<input name="userPwd" type="password" placeholder="请输入6-16位的密码">' +
			'</div>' +
			'<div>' +
			'<label>确认密码：</label>' +
			'<input name="userRepwd" type="password" placeholder="请再次输入您的密码">' +
			'</div>' +
			'</form>',
			sureBtnName: "注册",
			callback: function() {
				// 获取表单
				var signUpInfoForm = document.getElementById("signUpInfoForm");

				// 实例化一个错误显示对象
				var erro = new ErroMesg(signUpInfoForm);

				// 设置当前用户的信息，并存储为一个对象
				var newUserInfo = {
					userName: signUpInfoForm.userName.value,
					userPwd: signUpInfoForm.userPwd.value
				}

				// 获取本地存储的用户列表信息数据
				var userInfoListDB = localStorage.getItem("userInfoList");

				// 检查用户名或密码输入（为了简便测试流程，这里没有判断确认密码）
				if(newUserInfo.userName === "" || newUserInfo.userPwd === "") {
					// 显示错误信息
					erro.create("请填写完整的用户名和密码");

					// 抖动元素盒子
					shakeTheBox(this.closest("dialog-box"));
					return;
				}

				// 如果该键名不存在
				if(!userInfoListDB) {
					// 创建用户数组
					var userArr = [];
				}
				// 如果键名已经存在
				else {
					// 取出该键
					var userArr = localStorage.getItem("userInfoList");
					// 解析JSON字符串成一个可操作的JS对象数组
					userArr = JSON.parse(userArr);
				}

				// 检查用户名是否已经注册过
				var userArr_leng = userArr.length;
				for(var i = 0; i < userArr_leng; i++) {
					// 如果该账号已经注册过
					if(newUserInfo.userName === userArr[i].userName) {
						// 显示错误信息
						erro.create("对不起，该账号已经被注册过了");

						// 抖动元素盒子
						shakeTheBox(this.closest("dialog-box"));
						return;
					}
				}

				// 将弹出框的内容替换为“昵称填写”
				signUpInfoForm.innerHTML = 
					'<div>' +
					'<label>昵称：</label>' +
					'<input name="userNiceName" type="text" placeholder="我们应该怎么称呼您呢？">' +
					'</div>';

				// 获取到“注册按钮”
				var dialogBtnOprateSure = document.getElementById("dialog-btn-oprateSure");

				// 替换“注册”按钮的ID，从而利用它来完成后续流程（存储昵称）
				dialogBtnOprateSure.id = "saveUserInfo";

				// 获取到“新的注册按钮”
				var saveUserInfo = document.getElementById("saveUserInfo");
				// 为用户对象新增一个“昵称”属性（注意这是在一个点击事件内绑定一个点击事件）
				saveUserInfo.onclick = function() {
					// 获取当前用户输入的昵称
					var getNiceName = signUpInfoForm.userNiceName.value;
					// 为对象新增一个niceName属性
					newUserInfo.niceName = getNiceName;

					// 创建一个存储昵称的会话存储来保留登录状态
					sessionStorage.setItem("niceName", newUserInfo.niceName);

					// 为用户数组新增当前用户的信息
					userArr.push(newUserInfo);

					// 转换为JSON字符串
					userArr = JSON.stringify(userArr);

					// 创建本地存储的键值对
					localStorage.setItem("userInfoList", userArr);

					// 移除登录/注册按钮，显示当前用户的昵称
					document.getElementById("signUpAndsignIn").remove();
					// 显示昵称
					document.getElementById("currentUser").innerHTML = "欢饮您，<a href='#'>" + sessionStorage.getItem("niceName") + "</a>";

					// 触发取消按钮的点击事件（移除弹出框组件）
					document.getElementById("dialog-btn-cancel").onclick();
				}
			} // END: callback
		});
	}
}

/**
* 功能：登录弹出框事件的相关功能
**/
function beginSignIn() {
	// 导航条上的登录按钮
	var beginSignIn = document.getElementById("begin-signIn");
	beginSignIn.onclick = function() {
		// 调用弹出框函数并进行内容和功能的配置
		createPopupBox({
			head: "用户登录",
			sureBtnName: "登录",
			content: 
			'<form id="signInInfoForm">' +
			'<div>' +
			'<label>用户名：</label>' +
			'<input name="userName" type="text" placeholder="请输入邮箱或手机号">' +
			'</div>' +
			'<div>' +
			'<label>密码：</label>' +
			'<input name="userPwd" type="password" placeholder="请输入6-16位的密码">' +
			'</div>' +
			'</form>',
			callback: function() {
				// 获取弹出框
				var dialogBox = this.closest("dialog-box");

				// 获取用户现在输入的用户名和密码
				var formInfo = document.getElementById("signInInfoForm"),
					uesrName = formInfo.userName.value,
					uesrPwd = formInfo.userPwd.value;

				// 实例化错误信息操作对象
				var erro = new ErroMesg(formInfo);

				// 获取用户注册的数据（本地存储内获取）
				var userArr = localStorage.getItem("userInfoList");
				if(uesrName === "" || uesrPwd === "") {
					// 显示错误信息
					erro.create("请先填写完整用户名和密码");

					// 抖动元素盒子
					shakeTheBox(dialogBox);

					return;
				}
				// 如果该数据不存在
				if(!userArr) {
					// 显示错误信息
					erro.create("对不起，该账号还没有注册，请先注册");

					// 抖动元素盒子
					shakeTheBox(dialogBox);

					return;
				}
				// 解析JSON字符串成一个可操作的JS对象
				userArr = JSON.parse(userArr);

				// 查找状态（找到为true，未找到为false）
				var searchStatus = false;

				// 获取用户列表的长度
				var userArr_leng = userArr.length;
				// 遍历进行用户名对比
				for(var i = 0; i < userArr_leng; i++) {
					if(userArr[i].userName === uesrName) {
						searchStatus = true;
						break;
					}
				}
				// 进行密码判断，如果通过（这里是循环结束后，最后的“i”会保留到这个作用域里的特性）
				if(searchStatus && userArr[i].userPwd === uesrPwd) {
					// 移除登录/注册按钮，显示当前用户的昵称
					document.getElementById("signUpAndsignIn").remove();
					// 设置会话存储
					sessionStorage.setItem("niceName", userArr[i].niceName);
					// 显示昵称
					document.getElementById("currentUser").innerHTML = 
						"欢饮您，<a href='#'>" +
						sessionStorage.getItem("niceName") +
						"</a>";

					// 触发取消按钮的点击事件（移除弹出框组件）
					document.getElementById("dialog-btn-cancel").onclick();
				}
				// 密码输入错误
				else {
					// 显示错误信息
					var erro = new ErroMesg(formInfo);
					erro.create("用户名或密码输入错误请检查");

					// 抖动元素盒子
					shakeTheBox(dialogBox);

					return;
				}
			} // END: callback
		});
	}
}

/**
* 功能：生成弹出框
* 参数对象：
* head：弹出框标题（String）
* content：弹出框内容（HTML-String）
* sureBtnName：确认操作按钮的名称（String）
* callback：点击确认按钮之后的回调函数（Function）
**/
function createPopupBox(params) {
	// ----处理默认配置----
	// 弹出框标题
	params.head = (params.head !== undefined) ? params.head : "系统消息"
	// 弹出框内容
	params.content = (params.content !== undefined) ? params.content : "<div style='padding: 20px 0 0'>程序猿脑袋晕，似乎忘记写内容了-_-!</div>"
	// 确认操作按钮的名称
	params.sureBtnName = (params.sureBtnName !== undefined) ? params.sureBtnName : "确认";
	// 点击确认按钮之后的回调函数
	params.callback = (params.callback !== undefined) ? params.callback : function(){};
	// ----/处理默认配置----

	// 示例话一个文档碎片对象
	var fragment = document.createDocumentFragment();
	// 创建组件
	var component = document.createElement("component");
	component.innerHTML = 
		'<masklayer></masklayer>' +
		'<dialog-box>' +
		'<div class="dialog-header">' +
		params.head +
		'</div>' +
		'<div class="dialog-content">' +
		params.content +
		'</div>' +
		'<div class="dialog-oprate">' +
		'<button id="dialog-btn-oprateSure" type="button">' + params.sureBtnName + '</button>' +
		'<button id="dialog-btn-cancel" type="button">取消</button>' +
		'</div>' +
		'</dialog-box>';

	// 将comment这个Element对象存储于文档碎片内，以供后续高性能的操作
	fragment.appendChild(component);

	// <注意>这个时候HTML代码尚未生成，但是已经可以通过访问文档碎片进行DOM操作了
	//console.log(fragment.getElementById("dialog-btn-oprateSure"));

	// 获取“确认”和“取消”元素节点
	// <注意>不要去document上查找节点，耗时会比较多，应该缩小范围。直接在“DocumentFragment”里去查找性能会高很多，document的内容越多，这个性能的差距就越明显
	var btnSure = fragment.getElementById("dialog-btn-oprateSure");
	var btnCancel = fragment.getElementById("dialog-btn-cancel");


	// 确认按钮的事件
	btnSure.onclick = function() {
		// 执行回调函数（准确名称叫做“回调方法”，因为function已经在一个对象里了）,将回调函数内部的this绑定到该按钮上，否则回调函数内的this会指向“params”这个配置对象
		//params.callback.call(btnSure);
		// 或者用bind方法绑定this（注意两种写法的差异）
		params.callback.bind(btnSure)();
	}

	// 取消按钮事件
	btnCancel.onclick = function() {
		// 找到取消按钮对应最邻近匹配的组件元素
		var component = this.closest("component");
		// 淡出效果
		component.style.opacity = 0;
		// 淡出动画完成后彻底移除该组件
		setTimeout(function() {
			component.remove();
		}, 600);
	}

	// 将文档碎片加载进body里成为HTML（由于appendChild方法有“提取节点”的作用，在使用了这个方法后“DocumentFragment”的地址会发生改变，所以这一步必须放在所有属性和方法设置完成后）
	// 可以尝试一下将这段代码放置于“fragment.appendChild(component)”这行代码的后面，点击头部“注册”按钮观察控制台的报错信息
	document.body.appendChild(fragment);

	// 调整弹出框位置
	var dialogBox = document.querySelector("dialog-box");
	// 获取弹出框实际的宽和高
	var oWidth = dialogBox.offsetWidth,
		oHeight = dialogBox.offsetHeight;

	dialogBox.style.cssText = 
		"left: 50%;" +
		"top: 50%;" +
		"margin-left:" + -(oWidth/2) + "px;" +
		"margin-top:" + -(oHeight/2) + "px;";

	// 组件淡入（这里用延时函数的原因是DOM渲染到页面内需要一定的时间，立刻执行的话过渡效果会看不到）
	setTimeout(function() {
		document.querySelector("component").style.opacity = 1;
	},0);

	var formInfo = dialogBox.getElementsByTagName("form")[0];
	var inputEle = formInfo.getElementsByTagName("input"),
		inputEle_leng = inputEle.length;
	// 实例化错误显示对象
	var erro = new ErroMesg(formInfo);
	// 所有表单元素在获得焦点的时候清空错误信息
	for(var i = 0; i < inputEle_leng; i++) {
		inputEle[i].onfocus = function() {
			erro.remove();
		}
	}

}

/**
* 功能：创建导航栏（包括用户登录/注册）
**/
function createNavBar() {
	// 获取页面内的header
	var header = document.getElementsByTagName("header")[0];
	// 获取当前页面的名称
	var winName = window.name;

	// 根据页面名称设置路径（这里是绝对路径）
	var basePath = (winName === "home") ? "/" : "../";

	// 创建导航标签（没有直接用innerHTML是考虑到header内可能会存在其它绑定了属性或事件的元素被重排）
	var nav = document.createElement("nav");
	nav.innerHTML = 
		'<ul class="mainNav">' +
		'<li>' +
		'<a href="' + basePath + 'index.html">网站首页</a>' +
		'</li>' +
		'<li>' +
		'<a href="' + basePath + 'pages/service.html">服务支持</a>' +
		'</li>' +
		'<li>' +
		'<a href="' + basePath + 'pages/solution.html">解决方案</a>' +
		'</li>' +
		'<li>' +
		'<a href="' + basePath + 'pages/about.html">关于我们</a>' +
		'</li>' +
		'</ul>' +
		'<div class="signinStatus">' +
		'<div id="signUpAndsignIn">' +
		'<button id="begin-signIn" type="button">登录</button>' +
		'/' +
		'<button id="begin-signUp" type="button">注册</button>' +
		'</div>' +
		'<div id="currentUser"></div>' +
		'</div>';

	// 获取导航列表
	var navList = nav.getElementsByClassName("mainNav")[0].children;

	// 根据页面名称设置导航按钮被选中的class效果
	switch(winName) {
		case "home":
			navList[0].classList.add("active");
			break;
		case "service":
			navList[1].classList.add("active");
			break;
		case "solution":
			navList[2].classList.add("active");
			break;
		case "about":
			navList[3].classList.add("active");
			break;
		default:
			navList[0].classList.add("active");
	}

	// 将生成的“导航”内容添加到导航栏
	header.appendChild(nav);
}

/**
* 功能：根据会话存储判断当前的登录状态
**/
function signInStatus() {
	var already = sessionStorage.getItem("niceName");
	// 如果昵称已经存在（证明已经登录了）
	if(already) {
		// 移除登录/注册按钮，显示当前用户的昵称
		document.getElementById("signUpAndsignIn").remove();
		// 显示昵称
		document.getElementById("currentUser").innerHTML = 
			"欢饮您，<a href='#'>" +
			sessionStorage.getItem("niceName") +
			"</a>";
	}
}

/** 
* 功能：错误信息的创建和移除
* 参数1：当前的标签元素节点（Element-Object）
* 参数2：错误信息文本（String）
**/
function ErroMesg(parentEle) {
	// 创建错误信息
	this.create = function(erroText) {
		// 创建错误信息
		var erroMesg = document.createElement("div");
		erroMesg.setAttribute("class", "erroMesg");
		erroMesg.textContent = erroText;
		// 显示错误信息
		parentEle.insertBefore(erroMesg, parentEle.firstElementChild);
	};
	// 移除错误信息
	this.remove = function() {
		var firstEle = parentEle.firstElementChild;
		// 如果首个元素是错误信息
		if(firstEle.className === "erroMesg") {
			firstEle.style.height = 0;
			// 延时完成后移除
			setTimeout(function() {
				// 则移除该元素
				firstEle.remove();
			}, 150);	
		}
	}
}

/**
* 功能：抖动元素盒子
* 参数：该元素节点（Element-Object）
**/
function shakeTheBox(thisEle) {
	// 添加抖动窗口的class
	thisEle.classList.add("shakeTheBox");
	// 延时完成后移除
	setTimeout(function() {
		// 移除的原因是因为这个动画class一旦挂载就只能生效一次，若想生效多次的话就需要每次都重新添加这个class
		thisEle.classList.remove("shakeTheBox");
	}, 150);
}

