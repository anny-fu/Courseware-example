/**
 * 功能：消费数据（改良版）
 * 日期：2017-8-15
**/
/*************************************************/
/* 页面文档加载完成后触发 */
/*************************************************/
// 或者
window.onload = function() {
	// 添加数据按钮
	var creatData = document.getElementById("creatData");
	// 表单元素集合
	var inputGroup = document.getElementsByClassName("data-create-group")[0].getElementsByTagName("input");
	
	// 添加数据按钮事件
	creatData.onclick = function() {
		if(isNaN(parseInt())){}
		setExpensData(inputGroup, expensData);
	}
	// 设置元素样式改变
	changeLabelColor(inputGroup, "focusStyle");
}

/*************************************************/
/* 全局对象声明部分 */
/*************************************************/
// 消费数据值存储的对象数组
var expensData = [];

/*************************************************/
/* 函数定义部分 */
/*************************************************/
/**
 * 功能：设置消费数据
 * 参数1：表单元素集合（Similar Array）
 * 参数2：消费数据值存储的对象数组（Array）
**/
function setExpensData(input, data) {
	
	/**
	 * 当本次点击时间获取到的值存于一个临时对象
	 * 【改良版对对象的使用更贴合实际，
	 * 也有点像Vue对对象的使用方式】
	 */
	var temporaryObj = {
		food: Number( input[0].value ),
		shopping: Number( input[1].value ),
		aodu: Number( input[2].value ),
		traffic: Number( input[3].value ),
		entertainment: Number( input[4].value ),
		socialContact: Number( input[5].value ),
		financial: Number( input[6].value ),
		medical: Number( input[7].value ),
		other: Number( input[8].value )
	}
	// 将临时对象存储的数据push到消费数据值存储的对象数组里
	data.push(temporaryObj);
	
	// 找到表格内的tbody，并创建一个新行来显示数据
	var tbody = document.getElementById("expenseData").getElementsByTagName("tbody")[0];
	tbody.innerHTML += '<tr></tr>';

	// 找到最新一行的tr（因为表格内可能已经存在数据）
	var tr = tbody.getElementsByTagName("tr"),
		newTr = tr[tr.length - 1];

	// var newData = data[data.length - 1];
	// 对临时对象的值进行遍历（也可以拿expensData进行遍历，但会多出上面这样一步操作）
	for(var x in temporaryObj) {
		// 由于 toFixed 和 toLocaleString 方法都会将数字变成字符串。
		// 一方面需要注意用Number或parseFloat进行转换，
		// 一方面又要注意转换顺序
		newTr.innerHTML += '<td>￥' +
			parseFloat(temporaryObj[x].toFixed(2)).toLocaleString() +
			'</td>'
	}
	
	// 总值
	var sum = 0;
	// 消费数据值存储的对象数组的长度
	var data_leng = data.length;
	// 计算出总消费
	for(var i = 0; i < data_leng; i++) {
		for(var y in data[i]) {
			sum += data[i][y];
		}
	}
	
	// 计算平均每日消费
	var avgExpense = sum / data_leng;
	
	// 获取平均值和总值的td
	var avgExpenseTd = document.getElementsByClassName("avgExpense")[0];
	var sumExpenseTd = document.getElementsByClassName("sumExpense")[0];
	
	// 设置平均值值
	avgExpenseTd.innerHTML = "￥" +
		parseFloat(avgExpense.toFixed(2)).toLocaleString();
	// 设置总计
	sumExpenseTd.innerHTML = "￥" +
		parseFloat(sum.toFixed(2)).toLocaleString();
}


/**
 * 功能：表单元素获得焦点使前方的元素节放生样式改变
 * 参数1：需要添加颜色label后面对应的表单元素的集合（Similar Array）
 * 参数2：需要改变样式的CSS class（String）
**/
function changeLabelColor(identArr, focusStyle) {
	var identArr_leng = identArr.length;
	for(var i = 0; i < identArr_leng; i++) {
		// 表单元素获得焦点的事件
		identArr[i].onfocus = function() {
			var currentlabel = this.previousElementSibling;
			// 将当前标签前的label标签的class属性设置为指定CSS class属性值
			currentlabel.className += " " + focusStyle;
		}
		// 表单元素失去焦点的事件
		identArr[i].onblur = function() {
			var currentlabel = this.previousElementSibling;
			// 将当前标签前的label标签的指定CSS class属性值移除
			currentlabel.className = currentlabel.className.replace(focusStyle, "");
		}
	}
}



