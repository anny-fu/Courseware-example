/**
 * 功能：Vue入门
 * 日期：2017/11/28
 **/
const app1 = new Vue({
	el: '#app-1',
	components: {
		'comp-base': {
			template: `
				<div>
					<p>这是我的<span style="color:#b83f48;font-size:24px">组件</span>内容-1</p>
					<p>这是我的<span style="color:#41b883;font-size:24px">组件</span>内容-2</p>
					<p>这是我的<span style="color:#4b8bb8;font-size:24px">组件</span>内容-3</p>
				</div>
			`
		}
	}
});

// 全局组件--列表
Vue.component('custom-book-list', {
	props: ['bookprop'],
	template: '<li>书名：<span style="font-size:24px">《{{bookprop.name}}》</span>，售价：￥{{bookprop.price}}</li>'
});

const app2 = new Vue({
	el: '#app-2',
	data: {
		bookList: [
			{ name: "乔布斯自转", price: 78 },
			{ name: "三国演义", price: 370 },
			{ name: "茶花女", price: 45 },
			{ name: "JavaScript高级程序设计", price: 99 },
		]
	}
});

