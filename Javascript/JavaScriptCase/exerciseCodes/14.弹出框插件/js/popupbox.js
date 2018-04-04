/**
* 功能：弹出框插件功能
* 结构：页面所有的可视化内容应该包含在一个<main>标签内，添加弹出框的元素应该独立在<main>标签以外，如<aside>标签
* 参数：1、添加弹出框的元素ID；2、对象（详见下方的“参数对象属性”）
* 【参数对象属性】
* type: 弹出框的类型（必选）。可以包含：text（文本）、confirm（消息确认）、image（图片）、form（表单）这四个字符串
* showClose: 是否显示右上角的关闭按钮，为一个布尔值。
* content: 弹出框的内容，值类型为字符串。（可以包括HTML标签字符串）
* url: 图片相对路径，值类型为字符串。
* imgTitle: 图片的小标题描述，值类型为字符串。
* confirm: 确认事件回调函数，值类型为函数。
* login: 登录事件回调函数，值类型为函数。
* cancel: 取消事件回调函数，值类型为函数。
**/
function popupbox(ident,objParam) {
	// 获取页面内的main标签
	var main = document.getElementsByTagName("main")[0];
    // 获取弹出框显示元素容器
    var showPopupElement = document.getElementById(ident);

    // 写入基本的弹出框标签元素
	showPopupElement.innerHTML = '<popup-main id="popup-main">' +
		'<masklayer></masklayer>' +
		'<popup-box>' +
		'<popup-close>×</popup-close>' +
		'<popup-content>' + 
		objParam.content +
		'</popup-content>' +
		'</popup-box>' +
		'</popup-main>';
	
	// 弹出框组件
	var popupMain = document.getElementById("popup-main");
	// 弹出框内容
	var popupContent = popupMain.getElementsByTagName("popup-content")[0];
	
	// 是否显示关闭按钮
	var closeBtn = popupMain.getElementsByTagName("popup-close")[0];
	// 如果配置的值为不显示或没有配置
	if(!objParam.showClose) {
		// 移除关闭按钮
		closeBtn.remove();
	}
	// 获取当前的弹出框所配置的类型
	var popupType = objParam.type;
	// 如果是文本内容
	if(popupType == "text") {
		// 获取文本内容
		var contentTxt = popupContent.textContent;
		// 处理过长的文本，限制在63字以内
		popupContent.textContent = contentTxt.replace(contentTxt.substr(63), "...");
		
		// 设置对应类型的class
		popupContent.className = "text";
	}
	// 如果是确认弹出框
	else if(popupType == "confirm") {
		// 设置对应类型的class
		popupContent.className = "confirm";
		// 添加一个存放按钮的容器
		popupContent.innerHTML += '<div class="buttonGroup">' +
			'<button id="confirm" type="button">确认</button>' +
			'<button id="cancel" type="button">取消</button>' +
			'</div>';
		// 获取确认和取消按钮
		var confirm = document.getElementById("confirm");
		var cancel = document.getElementById("cancel");
		// 确认事件
		confirm.onclick = function() {
			// 处理未配置
			objParam.confirm = objParam.confirm === undefined ? function(){} : objParam.confirm;
			// 执行回调
			objParam.confirm();
			// 调用关闭弹出框函数
			closePopupBox(main,popupMain);
		}
		// 取消事件
		cancel.onclick = function() {
			// 处理未配置
			objParam.cancel = objParam.cancel === undefined ? function(){} : objParam.cancel;
			// 执行回调
			objParam.cancel();
			// 调用关闭弹出框函数
			closePopupBox(main,popupMain);
		}
	}
	// 如果是图片
	else if(popupType == "image") {
		// 处理未配置
		objParam.url = objParam.url === undefined ? "img/default-1.jpg" : objParam.url;
		objParam.imgTitle = objParam.imgTitle === undefined ? "" : objParam.imgTitle;
		// 设置对应类型的class
		popupContent.className = "image";
		// 添加一张图片
		popupContent.innerHTML = '<img src="' + objParam.url + '" title="' + objParam.imgTitle + '">';
	}
	// 如果是表单
	else if(popupType == "form") {
		// 设置对应类型的class
		popupContent.className = "form";
		// 添加一个存放按钮的容器
		popupContent.innerHTML += '<div class="buttonGroup">' +
			'<button id="login" type="button">登录</button>' +
			'<button id="cancel" type="button">取消</button>' +
			'</div>'
		// 获取确认和取消按钮
		var login = document.getElementById("login");
		var cancel = document.getElementById("cancel");
		// 确认事件
		login.onclick = function() {
			// 处理未配置
			objParam.login = objParam.login === undefined ? function(){} : objParam.login;
			// 执行回调
			objParam.login();
		}
		// 取消事件
		cancel.onclick = function() {
			// 处理未配置
			objParam.cancel = objParam.cancel === undefined ? function(){} : objParam.cancel;
			// 执行回调
			objParam.cancel();
			// 调用关闭弹出框函数
			closePopupBox(main,popupMain);
		}
	}
	
	// 显示出弹出框组件
    setTimeout(function() {
        main.classList.add("blur");
        popupMain.style.visibility = "visible";
        popupMain.style.opacity = 1;
    },0);
	
	// 关闭按钮事件
	closeBtn.onclick = function() {
		// 调用关闭弹出框函数
		closePopupBox(main,popupMain);
	}
}

/**
* 功能：关闭弹出框
**/
function closePopupBox(main,popupMain) {
	main.classList.remove("blur");
	popupMain.style.opacity = 0;
	popupMain.style.visibility = 'hidden';
	setTimeout(function() {
		popupMain.remove();
	},300);
}