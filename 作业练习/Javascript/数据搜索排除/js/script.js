/**
* 功能：筛选,搜索数据功能
**/
/* 数据对象定义 */
var loginsInfo = {
	orderNum: ["tabao-001","tabao-002","tabao-003","tabao-004","tabao-005","tabao-006"],
	goodsName: ["单反","手机","书籍","茶杯","电脑","衣服"],
	beginDete: ["2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11"],
	endDete: ["2016-11-16","2016-11-18","2016-11-18","2016-11-19","2016-11-21","2016-11-23"],
	consignee: ["皮卡丘","柯南","鸣人","路飞","悟空","黑崎一护"],
	describe: ["查看","查看","查看","查看","查看","查看"]
}

/**
 * 获取对应的元素，定义为全局对象变量
 */
 var loginsSer = {
 	filterBox:document.getElementById('filterVal'),
 	searchBox:document.getElementById('searchVal'),
 	filterBtn:document.getElementById('filterData'),
 	searchBtn:document.getElementById('searchData')
 }
 console.log(loginsSer.searchBtn);

/**
 * 输入框失去焦点事件
 */
 loginsSer.filterBox.onfocus = function(){
	// 清空输入框内容
	loginsSer.filterBox.value = '';
}
loginsSer.searchBox.onfocus = function(){
	// 清空输入框内容
	loginsSer.searchBox.value = '';
}


/**
 * 点击排除按钮事件
 */
 loginsSer.filterBtn.onclick = function(){
	// 调用排除数据方法
	filterData();
}
/**
 * 点击搜索按钮事件
 */
 loginsSer.searchBtn.onclick = function(){
	// 调用搜索数据方法
	searchData();
}

/**
 *功能：排除数据函数
 * 
 */
 function filterData(){
		// 获取排除框值
		var filterVal = loginsSer.filterBox.value,
		// 数据长度
		loginsData_len = loginsInfo.orderNum.length,
		// 获取显示数据的table
		contentTable = document.
		getElementById('logisInfoTable').
		getElementsByTagName('tbody')[0];
		console.log(contentTable);
		// 清空输入框数据
		loginsSer.filterBox.value = '';
		// 清空table数据
		contentTable.innerHTML = '';

		// 循环数据排除显示
		for (var i = 0; i < loginsData_len; i++) {
			// 判读如果等于输入框的排除值就继续循环，不做输出
			if(filterVal == loginsInfo.orderNum[i] ||
				filterVal == loginsInfo.goodsName[i]||
				filterVal == loginsInfo.beginDete[i] ||
				filterVal == loginsInfo.endDete[i] ||
				filterVal == loginsInfo.consignee[i] ||
				filterVal == loginsInfo.describe[i]
				){
				continue;
		}
						// 如果不相等，就输出
						contentTable.innerHTML +='<tr><td>'+
						loginsInfo.orderNum[i] +'</td><td>'+
						loginsInfo.goodsName[i] +'</td><td>'+
						loginsInfo.beginDete[i] +'</td><td>'+
						loginsInfo.endDete[i] + '</td><td>' +
						loginsInfo.consignee[i] +'</td><td>'+
						loginsInfo.describe[i] +'</td></tr>';
					}
				}

/**
 *功能：搜索数据函数
 * 
 */
 function searchData(){
		// 获取排除框值
		var searchVal = loginsSer.searchBox.value,
		// 数据长度
		loginsData_len = loginsInfo.orderNum.length,
		// 获取显示数据的table
		contentTable = document.
		getElementById('logisInfoTable').
		getElementsByTagName('tbody')[0];
		console.log(contentTable);
		// 清空搜索框数据
		loginsSer.searchBox.value = '';
		// 清空table数据
		contentTable.innerHTML = '';

		// 循环数据排除显示
		for (var i = 0; i < loginsData_len; i++) {
			// 判读
			if(searchVal == loginsInfo.orderNum[i] ||
				searchVal == loginsInfo.goodsName[i]||
				searchVal == loginsInfo.beginDete[i] ||
				searchVal == loginsInfo.endDete[i] ||
				searchVal == loginsInfo.consignee[i] ||
				searchVal == loginsInfo.describe[i]
				){
						// 如果相等，就输出
					contentTable.innerHTML +='<tr><td>'+
					loginsInfo.orderNum[i] +'</td><td>'+
					loginsInfo.goodsName[i] +'</td><td>'+
					loginsInfo.beginDete[i] +'</td><td>'+
					loginsInfo.endDete[i] + '</td><td>' +
					loginsInfo.consignee[i] +'</td><td>'+
					loginsInfo.describe[i] +'</td></tr>';
				}
			}
		}




