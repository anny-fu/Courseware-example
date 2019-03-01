/**
* 功能：组件定义
**/

/* 商家列表组件 */
Vue.component('seller-list',{
    props: ['seller'],
    template: `
        <li>
            <div class="bus-img">
                <img :src="seller.image">
            </div>
            <div class="bus-introd">
                <div class="bus-name">
                    <span>{{seller.name}}</span>
                    <span v-if="seller.pickup">支持自取</span>
                </div>
                <div class="bus-situation">
                    <div class="score"><i class="star-all"></i><i class="star-all"></i><i class="star-all"></i><i class="star-all"></i><i class="star-half"></i></div>
                    <div class="saleCount">
                        月售<span>{{seller.salesCount}}</span>
                    </div>
                    <div class="distance">
                        <span>{{seller.timeUsed}}分钟</span> | <span>{{seller.distance}}km</span>
                    </div>
                </div>
                <div class="deliveryCost">
                    <span>起送 ￥{{seller.startFee}}</span> | <span>配送 ￥{{seller.transportFee}}</span>
                </div>
                <div class="activities" v-html="seller.activities"></div>
            </div>
        </li>
    `
});