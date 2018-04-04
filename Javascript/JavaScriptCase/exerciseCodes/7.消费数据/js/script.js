/**
 * 功能：消费数据
 * 日期：2017-8-14
 **/
 /*************************************************/
/* 页面文档加载完成后触发 
*DOM文档加载的步骤为
1.解析HTML结构。
2.加载外部脚本和样式表文件。
3.解析并执行脚本代码。
4.DOM树构建完成。//DOMContentLoaded
5.加载图片等外部文件。
6.页面加载完毕。//load
*/
/*************************************************/
// document.addEventListener("DOMContentLoaded", function() {
	// 添加数据按钮
// 	var creatData = document.getElementById("creatData");
// 	creatData.onclick = function() {
// 		setExpensData.call(expensInfo);
// 	}
// });
// 或者
window.onload = function() {
	// 添加数据按钮
	var creatData = document.getElementById("creatData");
	creatData.onclick = function() {
		setExpensData.call(expensInfo);
	}
}

/*************************************************/
/* 全局对象声明部分 */
/*************************************************/
var expensInfo = {
	food: [],
	shopping: [],
	aodu: [],
	traffic: [],
	entertainment: [],
	socialContact: [],
	financial: [],
	medical: [],
	other: []
}

/*************************************************/
/* 函数定义部分 */
/*************************************************/
/**
* 功能：设置消费数据
**/
function setExpensData() {
	// 获取文本框的个数
	var input = document.getElementsByClassName("data-create-group")[0].getElementsByTagName("input"),
	input_leng = input.length;
	// 创建一个新的<tr>
	var tbody = document.getElementsByTagName("tbody")[0];
	tbody.innerHTML += '<tr></tr>'
	// 获取tr的个数
	var tr = tbody.getElementsByTagName("tr"),
	tr_leng = tr.length;
	// 定义一个计数器
	var count = 0;
	// 遍历对象
	for(var x in this) {
		// 取得当前文本框的值
		var currentInputVal = input[count].value;
		if(currentInputVal == "") {
			currentInputVal = 0;
		}
		// 为对象的每个属性的数组添加当前的文本框值
		this[x].push(Number(currentInputVal));
		tr[tr_leng-1].innerHTML += '<td>￥' + this[x][tr_leng-1].toFixed(2) + '</td>';
		count++;
	}
	// 总值
	var sum = 0;
	// 计算出总消费
	for(var y in this) {
		var lineSum = this[y].reduce(function(e1,e2) {
			return Number(e1) + Number(e2);
		});
		sum += lineSum;
	}
	// 计算平均每日消费
	var avgExpense = sum / tr_leng;
	
	// 获取平均值和总值的td
	var avgExpenseTd = document.getElementsByClassName("avgExpense")[0];
	var sumExpenseTd = document.getElementsByClassName("sumExpense")[0];
	// 设置平均值
	avgExpenseTd.innerHTML = "￥" + avgExpense.toFixed(2);
	sumExpenseTd.innerHTML = "￥" + sum.toFixed(2);
}



