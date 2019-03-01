/**
 * 功能：Vue入门
 * 日期：2017/11/28
 **/
const app1 = new Vue({
	el: '#app-1',
	data: {
        price: 50,
        count: 10,
        total: 0
    },
    created() {
        this.total = this.price * this.count;
    }
});

