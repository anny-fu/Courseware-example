/**
* 功能：视图模型配置
**/
// 开发功能配置
// Vue.config.devtools = true;
Vue.config.silent = true;

// 配置Vue实例
const vm = new Vue({
	el: "#app",
	data: {
        // 排序菜单当前选中项
        filterMenueChecked: '综合排序',
        // 排序菜单
        filterMenue: ['综合排序','速度最快','评分最高','起送价最低','配送费最低','人气高到低','人气低到高'],
        filterMenueEvent: [
            ['giveMeMoney', 'desc'],
            ['timeUsed', 'asc'],
            ['salesCount', 'desc'],
            ['startFee', 'asc'],
            ['transportFee', 'asc'],
            ['star', 'desc'],
            ['star', 'asc']
        ],
		// 创建商家数据表单显隐状态
		formShowState: false,
		// 新增商家数据
		newInfo: {
			image: "如：http://url.jpg",
			name: "",
			pickup: false,
			salesCount: 0,
			timeUsed: 0,
			distance: 0,
			startFee: 0,
			transportFee: 0,
			activities: `<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p><p><span class="purple">减</span>新用户立减15元;首次使用银行卡支付半价</p>`
		},
		// 原有商家数据
		sellerList: [],
        // 筛选二级导航显示状态
        filterMenueShow: false
    },
    computed: {
        // 商家统计
        sellerCount() {
            return this.sellerList.length;
        }
    },
    created() {
        // axios.get('https://www.aulence.com/data/sellerInfo.json').then((resp) => {
        axios.get('data/sellerInfo.json').then((resp) => {
            this.sellerList = resp.data;
        }).catch(() => {
            throw new Error('数据请求错误！');
        });
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
				image: "http://url.jpg",
				name: "",
				pickup: false,
				salesCount: 0,
				timeUsed: 0,
				distance: 0,
				startFee: 0,
				transportFee: 0,
				activities: `<p><span class="red">减</span>满20减8;满50减25;满80减45;满100减55</p><p><span class="purple">减</span>新用户立减15元;首次使用银行卡支付半价</p>`
			}
        },
        // 显隐二级筛选菜单
        toggleFilerMenue() {
            this.filterMenueShow = !this.filterMenueShow;
        },
        /**
         * 商家排序
         * @param sortType { String } 排序项
         * @param order { String: 'asc','desc' } 排序类型（升序或降序）
         * @param index { Number } 二级菜单项的索引值
         **/
        sortSeller(sortType, order, index) {
            // 根据传入的值对商家进行排序
            this.sellerList.sort((item1,item2) => {
                // 升序排序
                if(order === "asc") {
                    return item1[sortType] - item2[sortType];
                }
                // 降序排序
                else if(order === "desc") {
                    return item2[sortType] - item1[sortType];
                }
                else {
                    throw new Error('参数传入错误，请检查！');
                }
            });
            if(typeof index !== "undefined" )  {
                // 设置菜单栏第一个按钮显示排序选中项
                this.filterMenueChecked = this.filterMenue[index];
            }
            else {
                this.filterMenueChecked = '综合排序';
            }
            // 滚动条置顶
            this.$refs.content.scrollTop = 0;
            // 隐藏菜单
            this.filterMenueShow = false;
        }
	}
});

