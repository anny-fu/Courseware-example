/**
 * 功能：弹出框构造函数
 * 最后修改日期：2017-8-30
 * 管理人：
 * 手机：
 * 参数说明：
 * header：弹出框头部文本（String）
 * teachrInfo：咨询老师信息（String）
 * message：消息框内容（String）
 * focusEvent：消息输入框获得焦点的事件（Function）
**/
function DialogRimi(param) {
	// 设置弹出框头部文本对象参数
	var header = param.header;
	// 设置咨询老师信息对象参数
	var teachrInfo = param.teachrInfo;
	// 设置消息内容对象参数
	var message = param.message;
	// 消息过长处理
	if(message.length > 48) {
		message = message.slice(0,47) + "...";
	}
	// 消息输入框获得焦点事件
	param.focusEvent = (typeof(param.focusEvent) != "undefined") ? param.focusEvent : function(){
		console.error("你还没有给这个消息框设置事件。");
	};
	
	// 获取现在的时间
	var nowDate = new Date();
	var hours = nowDate.getHours(),
		minutes = nowDate.getMinutes(),
		second = nowDate.getSeconds();
	// 时间补零操作
	hours = (hours.toString().length === 2) ? hours : "0" + hours;
	minutes = (minutes.toString().length === 2) ? minutes : "0" + minutes;
	second = (second.toString().length === 2) ? second : "0" + second;
	// 拼接出当前的时间
	var nowTime = hours + ":" + minutes + ":" + second;
	// 创建弹出框
	var createDialog = function() {
		var dialog = document.createElement("dialog-custom");
		dialog.innerHTML = 
			'<dialog-header>' +
				'<dialog-icon></dialog-icon>' +
				'<span>' + header + '</span>' +
				'<i>1</i>' +
				'<div class="close">×</div>' +
			'</dialog-header>' +
			'<dialog-content>' +
				'<div class="consulter">' +
					'<span>' + teachrInfo + '</span>' +
					'<span>' + nowTime + '</span>' +
				'</div>' +
				'<div class="message">' + message + '</div>' +
			'</dialog-content>' +
			'<dialog-mesgbox>' +
				'<input type="text" name="mesgContent" placeholder="请在此输入...">' +
				'<button type="button">发送</button>' +
			'</dialog-mesgbox>';
		// 设置一个弹出框的ID
		dialog.setAttribute("id", "dialogCustom");
		// 将弹出框添加进页面
		document.body.appendChild(dialog);
		// 生成一个遮罩层
		var masklayer = document.createElement("masklayer");
		document.body.appendChild(masklayer);
	}
	
	// 消息框获得焦点事件
	var mesgBoxFocus = function() {
		var mesgContent = document.getElementsByName("mesgContent")[0];
		mesgContent.onfocus = function() {
			param.focusEvent();
		}
	}
	// 关闭对话框
	var coloseDialog = function() {
		var dialogCustom = document.getElementById("dialogCustom");
		var closeBtn = dialogCustom.getElementsByClassName("close")[0];
		closeBtn.addEventListener("click", function() {
			dialogCustom.style.opacity = 0;
			dialogCustom.style.transform = "translate(-50%, -50%) scale(0)";
			setTimeout(function() {
                // 对话框主体移除
                dialogCustom.remove();
                // 遮罩层移除
                var masklayer = document.getElementsByTagName("masklayer")[0];
                masklayer.remove();
            },300);
		});
	}
	
	// 初始化并执行
	this.init = function() {
		// 创建对话框
		createDialog();
		// 消息框获得焦点事件
		mesgBoxFocus();
		// 关闭对话框
		coloseDialog();
	}
}
