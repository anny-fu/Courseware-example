/**
* 功能：视图模型配置
**/

 const vm = new Vue({
	el: "#app",
	data: {
		// 创建商家数据表单显隐状态
		formShowState: false,
		// 新增商家数据
		newInfo: {
			image: "img/xxxx.jpg",
			name: "",
			pickup: false,
			salesCount: 4896,
			timeUsed: 26,
			distance: 1.3,
			startFee: 0,
			transportFee: 0,
			activities: `<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p><p><span class="purple">减</span>新用户立减15元;首次使用银行卡支付半价</p>`
		},
		// 原有商家数据
		sellerList: [
			{
				image: "img/log-001.jpg",
				name: "姐妹荷叶饭",
				pickup: true,
				salesCount: 9188,
				timeUsed: 33,
				distance: 2.8,
				startFee: 0,
				transportFee: 3,
				activities: `
					<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p>
					<p><span class="purple">减</span>新用户立减15元;首次使用银行卡支付半价</p>
				`
			},
			{
				image: "img/log-002.jpg",
				name: "军魂干伴冒菜",
				pickup: false,
				salesCount: 9188,
				timeUsed: 33,
				distance: 2.8,
				startFee: 0,
				transportFee: 3,
				activities: `
				<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p>
				<p><span class="purple">减</span>配送费立减1元</p>
				`
			},
			{
				image: "img/log-003.jpg",
				name: "好吃得一哔（高新店）",
				pickup: false,
				salesCount: 9188,
				timeUsed: 33,
				distance: 2.8,
				startFee: 0,
				transportFee: 3,
				activities: `
				<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p>
				<p><span class="purple">减</span>本店新用户立减1元，新用户立减15元</p>
				`
			},
			{
				image: "img/log-004.jpg",
				name: "宜宾燃面",
				pickup: true,
				salesCount: 9188,
				timeUsed: 33,
				distance: 2.8,
				startFee: 0,
				transportFee: 3,
				activities: `
					<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p>
					<p><span class="purple">减</span>新用户立减15元</p>
				`
			},
			{
				image: "img/log-005.jpg",
				name: "正新鸡排",
				pickup: true,
				salesCount: 9188,
				timeUsed: 33,
				distance: 2.8,
				startFee: 0,
				transportFee: 3,
				activities: `
					<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p>
					<p><span class="purple">减</span>本店新用户立减5元</p>
				`
			},
		]
	},
	methods: {
		// 显示创建商家数据表单
		showCreateForm() {
			this.formShowState = true;
			setTimeout(function() {
				sellerInfoCreate.scrollTop = 0;
			},0);
		},
		// 隐藏创建商家数据表单
		hideCreateForm() {
			this.formShowState = false;
		},
		// 点击确认创建商家
		createSeller() {
			// 添加编写完成的数据
			this.sellerList.push(this.newInfo);
			// 隐藏表单
			this.formShowState = false;
			// 恢复默认数据
			this.newInfo = {
				image: "img/xxxx.jpg",
				name: "",
				pickup: false,
				salesCount: 4896,
				timeUsed: 26,
				distance: 1.3,
				startFee: 0,
				transportFee: 0,
				activities: `<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p><p><span class="purple">减</span>新用户立减15元;首次使用银行卡支付半价</p>`
			}
		}
	}
});