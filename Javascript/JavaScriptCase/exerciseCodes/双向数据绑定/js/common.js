/**
 * 功能：双向数据绑定实现
 * 日期：2017-9-5
 **/

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var bookList = {
	name: "《海贼王》",
	author: "尾田一郎",
	country: "日本"
}


/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
document.addEventListener("DOMContentLoaded", function() {
	// 载入数据
	loadData("dynamicData",bookList);
	// 数据监听
	for(var x in bookList) {
		dataListener(bookList, x, "dynamicData");
	}
});


/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
* 功能：载入数据
* 参数1：列表的ID
* 参数2：对象数据
**/
function loadData(ident,data) {
	var list = document.getElementById(ident);
	if(list.childElementCount > 0) {
	   list.innerHTML = "";
   	}
	for(var x in data) {
		var li = document.createElement("li");
		li.innerHTML = data[x];
		list.appendChild(li);
	}
}
/**
* 功能：数据监听
* 参数1：对象数据
* 参数2：该对象的属性或方法的名称
* 参数3：视图的ID
**/
function dataListener(obj,attr,ident) {
	// 没有get和set的情况
	/*Object.defineProperty(obj,attr, {
		// 编辑总开关
		configurable: true,
		// 是否可写
		writable: true,
		// 对象的属性是否可枚举
		enumerable: true,
		// 当前对象的属性值
		value: (function() {
			return obj[attr];
		})()
	});*/
	
	// 有get和set的情况
	var val = obj[attr];
	Object.defineProperty(obj, attr, {
		get: function() {
			return val;
		},
		set: function(newVal) {
			val = newVal;
			// 重新生成数据
			loadData(ident,obj);
		}
	});
}











