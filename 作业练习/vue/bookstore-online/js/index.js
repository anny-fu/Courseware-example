/**
 * 功能：网上书城功能
 **/
/**** 过滤器部分 ****/

/* 中国货币格式 */
Vue.filter('currency', function(val) {
    if(!val) {
		return '￥ 0';
	}
	if(typeof val === 'number') {
		val = '￥' + parseFloat(val.toFixed(2)).toLocaleString();
		if(val.lastIndexOf('\.') === -1) {
			val += ".00"
		}
	}
	return val;
})

/* 字节数判断 */
Vue.filter('sortString', function(val) {
    if(!val) {
		return '';
    }
    var stringLength = val.length;
	if(stringLength > 13) {
        val = val.slice(0,13) + "...";
    }
	return val;
})

/**** 组件声明部分 ****/

/* 搜索框 */
const searchBox = {
    template: `
        <div class="searchBox">
            <input type="search" v-model="searchVal" @keyup.enter="showResult" placeholder="请输入如：JavaScript高级程序设计">
        </div>
    `,
    data() {
        return {
            searchVal: ''
        }
    },
    methods: {
        showResult() {
            alert(this.searchVal);
        }
    }
}

/* 书籍列表 */
const bookList = {
    props: ['category','bookProp'],
    template: `
        <div class="book-list">
            <h2>
                {{category}}
                <span class="icon-arrow-right"></span>
            </h2>
            <div>
                <ul>
                    <li v-for="(book, index) in bookProp"  @click="showBookInfo(index)">
                        <img :src="book.photo">
                        <div class="book-name" :title="book.name">{{book.name | sortString}}</div>
                        <div class="book-price">{{book.price | currency}}</div>
                    </li>
                </ul>
            </div>
        </div>
    `,
    methods: {
        showBookInfo(index) {
            alert(this.bookProp[index].name);
        }
    }
}

/**** 视图模型部分 ****/
const app = new Vue({
    el: '#app',
    components: {
        'books-search': searchBox,
        'book-list': bookList
    },
    data: {
        webBook: [
            {
                name: 'JavaScript高级程序设计(第3版)',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/51CaeL3lLtL._SX260_.jpg',
                price: 65.30
            },
            {
                name: '编写高质量代码:Web前端开发修炼之道',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/41OO8kdSuUL._SX260_.jpg',
                price: 41.00
            },
            {
                name: '深入理解ES6',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/51kEnK%2BWQ-L._SX365_BO1,204,203,200_.jpg',
                price: 68.30
            },
            {
                name: 'JavaScript权威指南（原书第6版）',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/516BsgBkUpL.jpg',
                price: 96.50
            },
            {
                name: '高性能JavaScript',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/51T4tGqPRaL._SX396_BO1,204,203,200_.jpg',
                price: 51.30
            },
            {
                name: '码农·JavaScript（总第2期）',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/41ciPk2DBTL.jpg',
                price: 78.90
            }
        ],
        psychology: [
            {
                name: '行为心理学',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/51XzQ2q7VVL._SY346_.jpg',
                price: 19.34
            },
            {
                name: '乌合之众：大众心理研究',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/41EGXtD101L._SY346_.jpg',
                price: 23.40
            },
            {
                name: '习惯的力量（新版）',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/512H9AGzfKL.jpg',
                price: 44.30
            },
            {
                name: '跟任何人都聊得来：最受世界500强企业欢迎的沟通课',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/51qVegN225L._SY346_.jpg',
                price: 23.40
            },
            {
                name: '洗脑术：怎样有逻辑的说服他人',
                photo: 'https://images-cn.ssl-images-amazon.com/images/I/41wVGgha2RL.jpg',
                price: 22.70
            }
        ]
    },
    methods: {
        showBookInfo(index) {
            alert(this.webBook[index].name);
        }
    }
});