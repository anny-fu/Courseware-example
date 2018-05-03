/**
 * 功能：自定义AJAX请求插件
 * 开发人员：Tom.Anny
 * 日期：2017/12/5
 */

/**
 * *
 * 数据请求构造函数
 * */
function RequestData() {
	/**
	 * 功能：数据请求
	 * 参数：1，URL地址I(String);2,请求类型（String）3,回调函数(Function)
	 * */
	this.get = function (url,type,data,callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send(data);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var data = xhr.responseText;
				switch (type) {
					case "HTML":
						return callback(data);
					case "text":
						return callback(data);
					case "JSON":
						var obj = JSON.parse(data);
						return callback(obj);
					case "script":
						return callback(data);
				}
			}
		}
	}

	/**
	 * *请求json数据
	 * 参数：1，URL地址I(String);2，回调函数(Function)
	 * */
	this.getJSON = function (url,data,callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
        // 如果 使用post发送数据 必须 设置 如下内容(请求的头文件信息 ，可在控制台Network中查看requestHeader-content-type)
        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		xhr.send(data);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var jsonTxt = xhr.responseText;
				var result = JSON.parse(jsonTxt);
				callback(result);
			}
		}
	}
	/**
	 * *请求script数据
	 * 参数：1，URL地址I(String);2，回调函数(Function)
	 * */
	this.getScript = function (url,data,callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var scriptText = xhr.responseText;
				callback(scriptText);
			}
		}
	}
}
window.$ajax = new RequestData();

/**
 * *功能：参数序列化
 * 参数：原生对象(Object)
 * */

function param(obj) {
	var typeVal = Object.prototype.toString.call(obj);
	typeVal = typeVal.slice(typeVal.indexOf(' ') + 1,
		typeVal.lastIndexOf(']')).toLowerCase();
	if (typeVal !== "object") {
		console.error("该函数的参数只能是一个原生对象！");
		return typeof(typeVal);
	}
	var paramArr = [], paramStr = '';
	//attrName + = + attrVal&
	for (var x in obj) {
		paramStr = x + "=" + encodeURIComponent(obj[x]);
		// encodeURIComponent()编码的字符串范围比encodeURI()广
		//对字符编码的区别：
		//encodeURI还不对：ASCII字母和数字 ~!@#$%&*()=:/,;?+编码
		//encodeURIComponent不对：ASCII字母和数字 ~!*()编码；

		paramArr.push(paramStr);
	}
	var result = paramArr.join('&');
	console.log(result);
	return result;

}