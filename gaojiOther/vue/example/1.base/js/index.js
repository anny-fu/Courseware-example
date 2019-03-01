// 视图模型（View Model，又叫做“根实例”）
new Vue({
    el: '#app',
    // 数据源（Model，数据模型）
    data: {
        msg: '商品价格：',
        money: ['$','￥','€'],
        price: 398965,
        goodsList: ['羊毛衫','卫衣','冲锋衣','蛋糕']
    }
});