/**
 * 功能：Vue入门
 * 日期：2017/11/28
 **/
const app1 = new Vue({
	el: '#app-1',
	data: {
		mesg1: '我写的第一条Vue的代码！',
		mesg2: '我写的第二条Vue的代码！'
	}
});

const app2 = new Vue({
	el: '#app-2',
	/*data: {
		title:'这是鼠标移过来后的内容'
	},*/
	// data也可以写成这种形式
	// data: function() {
	// ES6表示对象方法的写法
	data() {
		const str1 = '这是鼠标移过来后的',
			str2 = '内容';
		return {
			title: str1 + str2
		}
	}
});

const app3 = new Vue({
	el: '#app-3',
	data: {
		show: true,
		hide: false,
		seen: true
	}
});

const app4 = new Vue({
	el: '#app-4',
	data: {
		cars: [
			{name: "上海大众", price: "250000", color: "黑色"},
			{name: "东风标致", price: "180000", color: "香槟色"},
			{name: "上海众泰", price: "110000", color: "白色"},
			{name: "通用雪佛兰", price: "190000", color: "黄色"},
			{name: "华晨宝马", price: "350000", color: "蓝色"}
		],
		arrs: ["a","b","c"]
	}
});

const app5 = new Vue({
	el: '#app-5',
	data: {
		mesg: '新增的数据：'
	},
	methods: {
		addText() {
			app5.mesg= '新增的文本';
		}
	}
});

const app6 = new Vue({
	el: '#app-6',
	data: {
		eaHader: ["编号","名称","品牌","价格","产地"],
		eaInfo: [
			{
				id: "EA001",
				name: "电视",
				brand: "三星",
				price: 6999,
				country: "韩国"
			},
			{
				id: "EA002",
				name: "冰箱",
				brand: "西门子",
				price: 3680,
				country: "日本"
			},
			{
				id: "EA003",
				name: "洗衣机",
				brand: "海尔",
				price: 3001,
				country: "中国"
			},
			{
				id: "EA004",
				name: "空调",
				brand: "长虹",
				price: 4500,
				country: "中国"
			}
		]
	}
});

const app7 = new Vue({
	el: '#app-7',
	data: {
		userName: '李鳞'
	}
});

const app8 = new Vue({
	el: '#app-8',
	data() {
		let res;
		let num = new Date().getDay() % 2;
		res = num === 0 ?
			"https://www.baidu.com" : "https://www.google.com";
		return {
			url: res
		}
	}
});
