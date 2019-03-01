new Vue({
    el: '#app',
    data: {
        goodsInfo: [],
        goodsDetail_state: false,
        goodsDetail: {
            identifier: '',
            name: '',
            country: '',
            manufDate: '',
            price: ''
        }
    },
    created() {
        axios.get('/data/goodsinfo.json').then((info) => {
            this.goodsInfo = info.data;
        });
    },
    computed: {
        count() {
            return this.goodsInfo.length;
        },
        total() {
            let totalMoney = 0;
            for(let i = 0; i < this.count; i++) {
                totalMoney += this.goodsInfo[i].price;
            }
            return totalMoney;
        }
    },
    methods: {
        // 显示详情
        showDetails(goods) {
            this.goodsDetail = {
                identifier: goods.identifier,
                name: goods.name,
                country: goods.country,
                manufDate: goods.manufDate,
                price: goods.price
            }
            this.goodsDetail_state = true;
        },
        // 关闭详情
        closeDetails() {
            this.goodsDetail_state = false;
        },
        deleteGoods(index) {
            this.goodsInfo.splice(index, 1);
        },
        // 排序
        reorder(param) {
            this.goodsInfo.sort((g1,g2) => {
                // 升序
                if(param === 'asce') {
                    return g1.price - g2.price;
                }
                // 降序
                else if(param === 'desc') {
                    return g2.price - g1.price;
                }
                // 缺省值（升序）
                else {
                    return g1.price - g2.price;
                }
            });
        }
    },
    filters: {
        currency(val) {
            if(!val) {
                return val;
            }
            return '￥' + val.toLocaleString();
        },
        toDate(val) {
            if(!val) {
                return val;
            }
            return new Date(val).toLocaleString();
        }
    }
});