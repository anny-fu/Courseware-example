/**
 * 功能：默认功能图表
 * 日期：2017/6/13
 **/

/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
$(function () {
	// 调用函数设置柱状、折现图
	setLine("echarts-1", {
		backgroundColor: '#d3d1b1',
		// 图表标题
		title: {
			text: '高新行业入职前五年薪水概况'
		},
		// 工具栏(提示框组件)
		tooltip: {},
		// 图表图注
		legend: {
			data:['程序员','医生','律师'],
			right: 20,
			top: 0
		},
		// X轴设置
		xAxis: {
			data: ["第1年","第2年","第3年","第4年","第5年"]
		},
		// Y轴设置
		yAxis: {},
		// 系列设置
		series: [
			{
				name: '程序员',
				type: 'line',
				data: [2500, 4200, 5200, 6188, 9600]
			},
			{
				name: '医生',
				type: 'line',
				data: [3200, 3300, 3600, 3900, 5000]
			},
			{
				name: '律师',
				type: 'line',
				data: [3800, 4100, 4158, 5122, 5677]
			}
		]
	});
	// 调用柱状图
	setBar("echarts-2", {
		backgroundColor: '#bdd3c7',
		// 图表标题
		title: {
			text: '主流浏览器分辨率2013年至2017年使用情况'
		},
		// 工具栏
		tooltip: {},
		// 图表图注
		legend: {
			data:['1920*1080','1440*900','1366*768','1024*768'],
			orient: 'vertical',
			right: 0,
			top: 140
		},
		// X轴设置
		xAxis: {
			data: ["2013年","2014年","2014年","2016年","2017年"]
		},
		// Y轴设置
		yAxis: {},
		// 系列设置
		series: [
			{
				name: '1920*1080',
				type: 'bar',
				data: [63800, 95000, 136300, 148000, 189000]
			},
			{
				name: '1440*900',
				type: 'bar',
				data: [153500, 131000, 96500, 71220, 46770]
			},
			{
				name: '1366*768',
				type: 'bar',
				data: [161800, 153200, 137200, 106120, 93000]
			},
			{
				name: '1024*768',
				type: 'bar',
				data: [153900, 105700, 67300, 42000, 31770]
			}
		],
		grid: {
			left: "10%",
			top: "12%",
			right: "14%",
			bottom: "12%"
		}
	});
	
	// 调用饼状图函数
	setPieType("echarts-3",{
		backgroundColor: "#f1cdd4",
		title: {
			text: '2016年手机系统使用比重'
		},
		series : [
			{
				name: '访问来源',
				type: 'pie',
				radius: '75%',
				data:[
					{value: 3.96e8, name:'Android'},
					{value: 1.5e8, name:'iPhone'},
					{value: 0.12e8, name:'Windows Phone'},
					{value: 0.36e8, name:'其它'}
				]
			}
		],
		itemStyle: {
			emphasis: {
				// 阴影的大小
				shadowBlur: 50,
				// 阴影颜色
				shadowColor: '#2396ff'
			}
		}
	});
	
	// 调用南丁格尔图
	setRoseType("echarts-4",{
		backgroundColor: '#c2bcda',
		title: {
			text: '生活消费比例'
		},
		//视觉映射组件
		visualMap: {
			//是否显示 visualMap-continuous 组件
			show: false,
			min: 0,
			max:2000,
			//定义 在选中范围中 的视觉元素
			//包括图元大小，类别，颜色，透明度，明暗度，饱和度，色调
			inRange: {
				// 颜色的明暗度
				colorLightness: [1, 0]
			}
		},
		series : [
			{
				name: '访问来源',
				type: 'pie',
				radius: '75%',
				data:[
					{value: 1200, name: '饮食'},
					{value: 1400, name: '购物'},
					{value: 650, name: '居家'},
					{value: 220, name: '交通'},
					{value: 980, name: '娱乐'},
					{value: 1800, name: '金融'},
					{value: 712, name: '医疗'},
					{value: 688, name: '其它'}
				],
				roseType: 'angle',
				label: {
					normal: {
						textStyle: {
							fontSize: 24,
							fontFamily: "全新硬笔行书简",
							color: 'rgba(255, 0, 0, 0.9)'
						}
					}
				},
				labelLine: {
					normal: {
						lineStyle: {
							color: 'rgba(255, 0, 0, 0.6)'
						}
					}
				},
				itemStyle: {
					normal: {
						color: '#c23531',
						shadowBlur: 200,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	});
	
});

/*************************************************/
/* 功能函数定义部分 */
/*************************************************/
/**
 * 功能：折线图
 * 参数1：元素ID
 * 参数2：配置项设置
**/
function setLine(ident,opt) {
	// 基于准备好的dom，初始化echarts实例
	let myChart = echarts.init($('#' + ident)[0]);
	
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(opt);
}
/**
 * 功能：柱状图
 * 参数1：元素ID
 * 参数2：配置项设置
**/
function setBar(ident,opt) {
	// 基于准备好的dom，初始化echarts实例
	let myChart = echarts.init($('#' + ident)[0]);
	myChart.showLoading();
	// 使用刚指定的配置项和数据显示图表。
	setTimeout(function () {
		myChart.hideLoading();
		myChart.setOption(opt);
	},1600);
}
/**
 * 功能：饼状图
 * 参数1：元素ID
 * 参数2：配置项设置
 **/
function setPieType(ident,opt) {
	// 基于准备好的dom，初始化echarts实例
	let myChart = echarts.init($('#' + ident)[0]);

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(opt);
}
/**
 * 功能：南宁格尔图
 * 参数1：元素ID
 * 参数2：配置项设置
 **/
function setRoseType(ident,opt) {
	// 基于准备好的dom，初始化echarts实例
	let myChart = echarts.init($('#' + ident)[0]);
	
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(opt);
}
