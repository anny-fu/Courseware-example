window.onload = function() {
	toUnicode.onclick = function() {
		var contentStr = content.value;
		// 调用“将字符串转换为Unicode”函数
		codingUnicode(contentStr);
	}
	toNormal.onclick = function() {
		var contentStr = content.value;
		// 调用“将Unicode转换为字符串”函数
		codingString(contentStr);
	}
}

/**
* 功能：将字符串转换为Unicode
* 参数：文本字符串
**/
function codingUnicode(str) {
	if(str.includes("\\u")) {
		return false;
	}
	const leng = str.length;
	let unicodeStr = "";
	// 通过循环添加Unicode前缀“\n”（需要转义）
	for(let i = 0; i < leng; i++) {
		unicodeStr += "\\u" + str.charCodeAt(i).toString(16);
    }
	showUnicode.textContent = unicodeStr;
}
/**
* 功能：将Unicode转换为字符串
* 参数：文本字符串
**/
function codingString(str) {
	/**
	 * 标签模板(模板字符串)的写法
	 */
	var obj = `{"unicodeString": "${str}"}`;
	/**
	 * 简单的字符串拼接方法
	 */
	// var obj = '{"unicodeString": "'+str+'"}';
	// 使用JSON方法转换为普通对象
	obj = JSON.parse(obj);
	// 将解析后的对象属性的值写入显示容器元素
	showUnicode.textContent = obj.unicodeString;
}




