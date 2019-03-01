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