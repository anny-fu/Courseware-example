/**
* 功能：信贷计算系统
**/

/****************************************/
/* 页面加载完成后执行 */
/****************************************/
window.onload = function() {
	// 输入消费笔数的事件
	quantityHandle();
}

/****************************************/
/* 函数定义部分 */
/****************************************/
/**
* 功能：分期数输入后触发的事件
**/
function quantityHandle() {
	// 获取分期数数字输入框
	var quantity = document.getElementById("quantity");
	
	// 分期数数字输入框绑定事件
	quantity.oninput = function() {
		// 总结果容器
		var sumRes = document.getElementById("sumRes");
		
		// 总结果归零
		sumRes.getElementsByClassName("res-1")[0].textContent = 0;
		sumRes.getElementsByClassName("res-2")[0].textContent = 0;
		sumRes.getElementsByClassName("res-3")[0].textContent = 0;
		
		// 获取内容操作区域
		var unitByStage = document.getElementById("unitByStage");
		
		// 获取输入的值并动态执行循环添加数据
		var thisValNum = parseInt(this.value);
		
		// 如果当前值为NaN（通过parseInt空字符串后，值为NaN），写入提示语，并结束本次操作
		if(isNaN(thisValNum)) {
			unitByStage.innerHTML = '<span class="placeholder">请先输入分期笔数</span>';
			return;
		}
		// 如果当前值小于等于0，就将其值设为0，写入提示语，并结束本次操作
		else if(thisValNum <= 0) {
			this.value = 0;
			unitByStage.innerHTML = '<span class="placeholder">请先输入分期笔数</span>';
			return;
		}
		// 如果大于10，就将它的值设置为10（限制为10）
		else if(thisValNum > 10) {
			thisValNum = 10;
			this.value = 10;
		}
		
		// 标签字符串
		var htmlStr = "";
		for(var i = 0; i < thisValNum; i++) {
			htmlStr += '<div class="ctrlLine"><label>第' + (i + 1) + '笔分期金额：</label><input type="text" placeholder="请输入分期金额" maxlength="12" class="byStageMoney"><span>元</span><label class="ml50">分期数：</label><select class="byStageCount"><option value="2">2</option><option value="3">3</option><option value="6">6</option><option value="10">10</option><option value="12">12</option><option value="18">18</option><option value="24">24</option></select></div><div class="resLine"><div><label>本期利息：</label><output><span class="res-1">0</span><span>元</span></output></div><div><label>总利息：</label><output><span class="res-2">0</span><span>元</span></output></div><div><label>本期本息：</label><output><span class="res-3">0</span><span>元</span></output></div><div><label>总本息：</label><output><span class="res-4">0</span><span>元</span></output></div></div>';
		}
		// 通过HTML方式写入新内容
		unitByStage.innerHTML = htmlStr;
		
		// 为所有的分期金额框和分期数下拉菜单绑定事件
		eventBind();
	}
}
/**
* 功能：为所有的分期金额框和分期数下拉菜单绑定事件
**/
function eventBind() {
	// 获取到“分期金额数”输入框的集合及长度
	var byStageMoney = document.getElementsByClassName("byStageMoney"),
		byStageMoney_leng = byStageMoney.length;
	
	// 获取到“分期数”下拉菜单的集合（这里不需要再获取长度，以输入框为主）
	var byStageCount = document.getElementsByClassName("byStageCount");
	
	// 循环添加下标属性和绑定事件
	for(var i = 0; i < byStageMoney_leng; i++) {
		// 输入框添加自定义下标属性
		byStageMoney[i].index = i;
		// 输入框添加事件
		byStageMoney[i].oninput = function() {
			// 执行利息率计算函数
			calcInterestRate(this.index);
			// 执行总利息率信息计算
			calcInterestRate_total();
		}
		
		// 下拉菜单添加自定义下标属性
		byStageCount[i].index = i;
		// 下拉菜单添加事件
		byStageCount[i].onchange = function() {
			// 执行利息率计算函数
			calcInterestRate(this.index);
			// 执行总利息率信息计算
			calcInterestRate_total();
		}
	}
}

/**
* 功能：单行利息率信息计算
* 参数：对应的文本框或下拉菜单的索引
**/
function calcInterestRate(index) {
	// 获取指定下标的文本框的值
	var assignTxtVal = parseFloat(document.getElementsByClassName("byStageMoney")[index].value);
	// 获取指定下标的下拉菜单的值
	var assignSltVal =  parseInt(document.getElementsByClassName("byStageCount")[index].value);
	
	// 处理文本框值为空的情况（会被parseFloat转化为NaN）
	assignTxtVal = isNaN(assignTxtVal) ? 0 : assignTxtVal;
	
	// 本期利息计算结果
	var curInterest;
	// 根据下拉菜单的值计算当前分期数的单位利息率
	switch(assignSltVal) {
		case 2:
			curInterest = assignTxtVal * (0.01 * 1E4) / 1E4;
			break;
		case 3:
			curInterest = assignTxtVal * (0.009 * 1E4) / 1E4;
			break;
		case 6:
			curInterest = assignTxtVal * (0.0075 * 1E4) / 1E4;
			break;
		case 10:
			curInterest = assignTxtVal * (0.007 * 1E4) / 1E4;
			break;
		case 12:
			curInterest = assignTxtVal * (0.0066 * 1E4) / 1E4;
			break;
		case 18:
			curInterest = assignTxtVal * (0.0068 * 1E4) / 1E4;
			break;
		case 24:
			curInterest = assignTxtVal * (0.0068 * 1E4) / 1E4;
			break;
		default:
			curInterest = 0;
			
	}
	// 获取分期操作容器
	var unitByStage = document.getElementById("unitByStage");
	
	// 设置当前“本期利息”
	unitByStage.getElementsByClassName("res-1")[index].textContent = curInterest.toFixed(2);
	
	// 设置当前“总利息”
	unitByStage.getElementsByClassName("res-2")[index].textContent = (curInterest * assignSltVal).toFixed(2);
	
	// 设置当前“本期本息”
	unitByStage.getElementsByClassName("res-3")[index].textContent = (assignTxtVal / assignSltVal + curInterest).toFixed(2);
	
	// 设置当前“总本息”
	unitByStage.getElementsByClassName("res-4")[index].textContent = (assignTxtVal + assignSltVal * curInterest).toFixed(2);
}

/**
* 功能：总利息率信息计算
**/
function calcInterestRate_total() {
	// 获取分期操作容器
	var unitByStage = document.getElementById("unitByStage");
	
	// 获取所有“本期利息”集合的长度
	var res_1 = unitByStage.getElementsByClassName("res-1"),
		res_1_leng = res_1.length;
	
	// 获取所有“总利息”的集合（之后全部以“本期利息”的长度为准）
	var res_2 = unitByStage.getElementsByClassName("res-2");
	
	// 获取所有“总本息”的集合
	var res_4 = unitByStage.getElementsByClassName("res-4");
	
	// 总结果
	var res_1_total = 0, 
		res_2_total = 0, 
		res_3_total = 0
	
	// 通过循环计算出结果
	for(var i = 0; i < res_1_leng; i++) {
		// 每期总利息
		res_1_total += parseFloat(res_1[i].textContent);
		// 全部总利息
		res_2_total += parseFloat(res_2[i].textContent);
		// 本息共计
		res_3_total += parseFloat(res_4[i].textContent);
	}
	
	// 总结果容器
	var sumRes = document.getElementById("sumRes");
	
	// 设置“每期总利息” 
	sumRes.getElementsByClassName("res-1")[0].textContent = res_1_total.toFixed(2);
	
	// 设置“全部总利息” 
	sumRes.getElementsByClassName("res-2")[0].textContent = res_2_total.toFixed(2);
	
	// 设置“本息共计” 
	sumRes.getElementsByClassName("res-3")[0].textContent = res_3_total.toFixed(2);
	
}














