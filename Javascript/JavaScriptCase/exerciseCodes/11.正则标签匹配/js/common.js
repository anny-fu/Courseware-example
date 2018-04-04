/**
 * 功能：正则标签匹配
 * 日期：2017-8-23
 **/

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
// 简化控制台日志输出操作
var cl = console.log;

/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
window.onload = function() {
	var codeHTML = document.getElementById("code-html");
	var codingAfter = "";
	
	/**** 匹配尖括号 ****/
	var	codeHTML_Str = codeHTML.innerHTML;
	// 将尖括号替换为实体引用
	codeHTML_Str = codeHTML_Str.replace(/</g, "&lt;");
	codeHTML_Str = codeHTML_Str.replace(/>/g, "&gt;");
	
	/**** 匹配标签 ****/
	var matchTagArr = codeHTML_Str.match(/&lt;\/?.+?&gt;/g);
	
	// 数组去重
	var noRepeatArr_tag = [];
	while(matchTagArr.length) {
		// 删除第一项
		var currentTag = matchTagArr.shift();
		// 如果在这个“不重复”数组内找不到这一项
		if(noRepeatArr_tag.indexOf(currentTag) === -1) {
			// 将原数组的第一项删除，存放到这个不重复数组里
			noRepeatArr_tag.push(currentTag);
		}
	}
	
	// 这个不重复数组的长度
	var noRepeatArr_tag_leng = noRepeatArr_tag.length;
	for(var i = 0; i < noRepeatArr_tag_leng; i++) {
		// 将该模式匹配的所有字符替换为嵌套了带样式的span的标签
		codeHTML_Str = codeHTML_Str.replace(new RegExp(noRepeatArr_tag[i], "g"), '<span style="color:#f76d6c">' + noRepeatArr_tag[i] + '</span>');
	}
	
	/**** 匹配属性名 ****/
	var matchAttrName = codeHTML_Str.match(/\s[a-z\-]+?=/g);
	
	// 数组去重
	var noRepeatArr_attrName = [];
	matchAttrName.forEach(function(item) {
		if(noRepeatArr_attrName.indexOf(item) === -1 && item !== " style=") {
			noRepeatArr_attrName.push(item);
		}
	});
	
	// 将该模式匹配的所有字符替换为嵌套了带样式的span的标签
	noRepeatArr_attrName.forEach(function(item) {
		codeHTML_Str = codeHTML_Str.replace(new RegExp(item, "g"), '<span style="color:#8bd12e">' + item + '</span>');
	});
	
	// ===========================================
	// 将“匹配标签”的方式对比“匹配属性名”方式
	// 发现“匹配属性名”更加简洁，容易理解
	// ============================================
	
	/**** 匹配属性值 ****/
	var matchAttrVal = codeHTML_Str.match(/[^=]"[\w\-]+?"/g);
	// 数组去重
	var noRepeatArr_attrName = [];
	matchAttrVal.forEach(function(item) {
		if(noRepeatArr_attrName.indexOf(item) === -1) {
			noRepeatArr_attrName.push(item);
		}
	});
	
	// 将该模式匹配的所有字符替换为嵌套了带样式的span的标签
	noRepeatArr_attrName.forEach(function(item) {
		// 这里注意替换结果中的第一个字符“>”，是我们匹配结果中的第一个字符，因为他们会被我们的结果覆盖掉，所以在里需要补上
		// 但如果匹配结果中的第一个字符是未知的，则应该在这次循环里将首字符取出来存入一个变量，最后再拼接到替换结果的第一个字符上
		codeHTML_Str = codeHTML_Str.replace(new RegExp(item, "g"), '><span style="color:#ece077">' + item.slice(1) + '</span>');
	});
	cl(codeHTML_Str);
	
	// 将经过多次正则匹配转换后的字符串显示到HTML页面内
	codeHTML.innerHTML = codeHTML_Str;
}

