/**
 * 功能：可缩放动态图表
 * 日期：2017/6/13
 **/

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
// 图表实例化对象
let DATACharts;

/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
$(function () {
	
	setEcharts("scaleCharts", {
		color: ["rgba(255,255,255,0.8)"],
		title: {
			text: "ECharts动态缩放图表"
		},
		tooltip: {},
		toolbox: {
			show: true,
			feature: {
				dataView: {readOnly: false},
				restore: {},
				saveAsImage: {}
			}
		},
		legend: {
			data:["动态柱状图","动态折线图"]
		},
		xAxis: {
			data: ["项1","项2","项3","项4","项5","项6","项7","项8","项9"]
		},
		yAxis: {},
		series: [
			{
				name: "动态柱状图",
				type: "bar",
				data: [15, 23, 36, 44, 31, 18, 45, 37, 22]
			},
			{
				name: "动态折线图",
				type: "line",
				data: [15, 23, 36, 44, 31, 18, 45, 37, 22]
			}
		],
		dataZoom: [
			{
				type: "inside",
				start: 0,
				end: 100
			},
			{
				type: "slider",
				start: 0,
				end: 100
			}
		],
		grid: {
			left: "4%",
			top: "10%",
			right: "6%",
			bottom: "14%"
		}
	});
	
	// 创建生成10~100之间的随机数方法
	let randomNum = function () {
		let rNum = Math.round(Math.random() * 90 + 10);
		return rNum;
	}
	
	// 重设数据
	setInterval(function () {
		DATACharts.setOption({
			series: [
				{
					data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()]
				},
				{
					data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()]
				}
			]
		});
	},2000);
	
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/

/**
 * 功能：图表初始化配置
 * 参数1：元素ID
 * 参数2：配置项设置
 **/
function setEcharts(ident,option) {
	// 基于准备好的dom，初始化echarts实例
	DATACharts = echarts.init(document.getElementById(ident), "dark");
	
	// 使用刚指定的配置项和数据显示图表。
	DATACharts.setOption(option);
	
	// 图表大小随容器变化而变化
	window.onresize = DATACharts.resize;
}
