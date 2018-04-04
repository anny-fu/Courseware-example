/**
 * 功能：成绩统计表
 * 日期：2017-8-8
 **/

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var scoreData = {
	classify: ["姓名","HTML","CSS","JavaScript","jQuery","Bootstrap","Tools","Vue","总分","平均分"],
	personInfo: [
		{
			name: "马浩",
			score: [65,74,85,97,80,79,88]
		},
		{
			name: "王震",
			score: [75,84,65,57,70,89,78]
		},
		{
			name: "蔡星月",
			score: [45,74,95,67,90,72,66]
		},
		{
			name: "赵兴英",
			score: [65,77,66,73,68,78,76]
		},
		{
			name: "李鳞",
			score: [35,47,56,63,78,88,96]
		}
	]
}
// 统计表格
var statisTable = document.getElementById("statisTable");
// 表头的tr和表格tbody
var	tableHeadTR = statisTable.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0],
	tableTbody = statisTable.getElementsByTagName("tbody")[0];

/*************************************************/
/* 函数调用部分 */
/*************************************************/
// 调用“生成表头数据”函数
createThead(scoreData.classify);
// 调用“生成人员成绩信息”函数
createScroeInfo();

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/

/**
 * 功能：生成表头数据
 * 参数：表头数组（数组）
**/
function createThead(data) {
	var data_length = data.length;
	for(var i = 0; i < data_length; i++) {
		tableHeadTR.innerHTML += '<td>' + data[i] + '</td>'
	}
}
/**
 * 功能：生成人员成绩信息
**/
function createScroeInfo() {
	// 获取数据条数
	var data_leng = scoreData.personInfo.length;
	for(var i = 0; i < data_leng; i++) {
		// 添加一行tr
		tableTbody.innerHTML += '<tr></tr>';
		// 获取所有tr和最新一个tr
		var trList = tableTbody.getElementsByTagName("tr"),
			newTr = trList[trList.length - 1];
		// 添加人员姓名
		newTr.innerHTML += '<td>' + scoreData.personInfo[i].name + '</td>';
		// 获取成绩数组长度
		var score_leng = scoreData.personInfo[i].score.length;
		// 输出成绩
		for(var j = 0; j < score_leng; j++) {
			newTr.innerHTML += '<td>' + scoreData.personInfo[i].score[j] + '</td>';
		}
		// 计算出总分
		var td_score = newTr.getElementsByTagName("td");
		var td_score_leng = td_score.length;
		// 总分结果
		var sumRes = 0;
		for(var k = 0; k < td_score_leng; k++) {
			if(k === 0) {
				continue;
			}
			sumRes += parseFloat(td_score[k].textContent);
		}
		newTr.innerHTML += '<td>' + sumRes + '</td>';
		// 计算出平均分
		var average = sumRes / (td_score_leng - 1);
		newTr.innerHTML += '<td>' + average.toFixed(1) + '</td>';
	}
}
