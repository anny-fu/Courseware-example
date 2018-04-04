/**
* 功能：页面基本操作
**/

// 文本类
var textPopBox = document.getElementById("textPopBox");
// 确认框类
var comfirmPopBox = document.getElementById("comfirmPopBox");
// 图片类
var imagePopBox = document.getElementById("imagePopBox");
// 表单类
var formPopBox = document.getElementById("formPopBox");

// 显示文本弹出框
textPopBox.onclick = function() {
	popupbox("showPopupElement", {
		type: "text",
		showClose: true,
		content: "人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。"
	});
}

// 显示确认弹出框
comfirmPopBox.onclick = function() {
	popupbox("showPopupElement", {
		type: "confirm",
		content: "您确认要更换当前的背景图片吗？",
		confirm: function() {
			// 获取当前的背景图class
			var main = document.getElementsByTagName("main")[0];
			var currentBgiClass = main.classList;
			// 转化为一个数组
			currentBgiClass = Array.prototype.slice.call(currentBgiClass);
			// 如果是背景图1
			if(currentBgiClass.indexOf("bg-1") != -1) {
				// 更换为背景图2
				main.classList.remove("bg-1");
				main.classList.add("bg-2");
			}
			// 如果是背景图2
			else if(currentBgiClass.indexOf("bg-2") != -1) {
				// 更换为背景图1
				main.classList.remove("bg-2");
				main.classList.add("bg-1");
			}
		}
	});
}

// 显示图片弹出框
imagePopBox.onclick = function() {
	popupbox("showPopupElement", {
		type: "image",
		showClose: true,
		url: "img/popupbox-img-1.jpg",
		imgTitle: "萌兔子"
	});
}

// 显示表单弹出框
formPopBox.onclick = function() {
	popupbox("showPopupElement", {
		type: "form",
		content: '<div>' +
		'<label>账号：</label>' +
		'<input id="userName" type="text" placeholder="请输入用户名">' +
		'</div><div>' +
		'<label>密码：</label>' +
		'<input id="userPwd" type="password" placeholder="请输入密码">' +
		'</div>',
		login: function() {
			// 判断当前输入的账号和密码
			var userName = document.getElementById("userName"),
				nameVal = userName.value;
			var userPwd = document.getElementById("userPwd"),
				pwdVal = userPwd.value;
			if(nameVal != "小罗耗" || pwdVal != "mengbi") {
				if(nameVal != "小罗耗") {
					var erroNode = userName.parentElement.firstElementChild;
					if(erroNode.tagName.toLowerCase() == "p") {
						return;
					}
					var errorNode = document.createElement("p");
					var errorTxt = document.createTextNode("用户名输入错误，请检查");
					errorNode.appendChild(errorTxt);
					errorNode.setAttribute("class", "errInfo");
					// 当前的DIV节点
					var formLine = userName.parentElement;
					// 错误信息插入容器
					var insertPos = formLine.firstChild;
					// 在这行div的开头插入错误信息
					formLine.insertBefore(errorNode,insertPos);
				}
				if(pwdVal != "mengbi") {
					var erroNode = userPwd.parentElement.firstElementChild;
					if(erroNode.tagName.toLowerCase() == "p") {
						return;
					}
					var errorNode = document.createElement("p");
					var errorTxt = document.createTextNode("密码输入错误，请检查");
					errorNode.appendChild(errorTxt);
					errorNode.setAttribute("class", "errInfo");
					// 当前的DIV节点
					var formLine = userPwd.parentElement;
					// 错误信息插入容器
					var insertPos = formLine.firstChild;
					// 在这行div的开头插入错误信息
					formLine.insertBefore(errorNode,insertPos);
				}
				// 清除错误信息
				userName.onfocus = function() {
					var erroNode = this.parentElement.firstElementChild;
					if(erroNode.tagName.toLowerCase() == "p") {
						erroNode.remove();
					}
				}
				userPwd.onfocus = function() {
					var erroNode = this.parentElement.firstElementChild;
					if(erroNode.tagName.toLowerCase() == "p") {
						erroNode.remove();
					}
				}
				return;
			}
			else {
				// 获取main标签
				var main = document.getElementsByTagName("main")[0];
				// 获取当前弹出框组件
				var popupMain = document.getElementById("popup-main");
				// 调用关闭弹出框函数
				closePopupBox(main,popupMain);
			}
		}
	});
}







