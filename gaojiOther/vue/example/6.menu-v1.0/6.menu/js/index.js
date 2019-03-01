Vue.component('left-menu', {
    data() {
        return {
            menuItem: [
                {
                    navItem: '产品',
                    childItem: ['产品介绍','购买渠道','售后服务']
                },
                {
                    navItem: '关于',
                    childItem: ['企业文化','公司地址','联系方式']
                }
            ]
        }
    },
    template: `
        <ul class="left-menu">
            <li v-for="outerItem in menuItem" class="outer-item">
                <a>{{ outerItem.navItem }}</a>
                <ul class="child-menu">
                    <li 
                        v-for="innerItem in outerItem.childItem"  class="inner-item"
                    >{{ innerItem }}</li>
                </ul>
            </li>
        </ul>
    `
});

new Vue({
    el: '#app'
});