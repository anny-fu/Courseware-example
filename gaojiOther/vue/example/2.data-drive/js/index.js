// 视图模型（View Model，又叫做“根实例”）
new Vue({
    el: '#app',
    // 数据源（Model，数据模型）
    data: {
        currentIndex: 0,
        tabItem: ['html','css','js'],
        skillContent: [
            '是前端里面的结构层',
            '是前端里面的表现层',
            '是前端里面的行为层'
        ]
    },
    methods: {
        switchTab(index) {
            this.currentIndex = index;
        }
    }
});