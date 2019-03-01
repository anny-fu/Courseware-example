Vue.component('left-menu', {
    data() {
        return {
            menuItem: [
                {
                    navItem: '产品',
                    childItem: ['产品介绍','购买渠道','售后服务','周边产品']
                },
                {
                    navItem: '关于',
                    childItem: ['企业文化','公司地址','联系方式']
                },
                {
                    navItem: '发现',
                    childItem: ['精品推荐','新货上市','好评如潮','当季热销']
                }
            ]
        }
    },
    template: `
        <ul class="left-menu">
            <li v-for="(outerItem,index) in menuItem" class="outer-item" ref="navItem">
                <a @click="slideDown(index)">{{ outerItem.navItem }}</a>
                <ul class="child-menu">
                    <li 
                        v-for="innerItem in outerItem.childItem"  class="inner-item"
                    >{{ innerItem }}</li>
                </ul>
            </li>
        </ul>
    `,
    methods: {
        slideDown(index) {
            const navItem = this.$refs.navItem,
            navItem_leng = navItem.length;
            for(let i = 0; i < navItem_leng; i++) {
                navItem[i].querySelector('.child-menu').classList.remove('show');
            }
            navItem[index].querySelector('.child-menu').classList.add('show');
        }
    }
});

/* new Vue({
    el: '#app'
}); */
// 或者
new Vue().$mount('#app');