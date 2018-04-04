/**
 * 功能：Vue入门
 * 日期：2017/11/28
 **/
const vm = new Vue({
	el: '#main',
	data: {
        userName: '',
        respons: '请输入一个新的用户名',
    },
    watch: {
        userName: function() {
            this.respons = '正在输入内容....';
            this.getUserList();
        }
    },
    methods: {
        // 用户名可用性检测
        getUserList: _.debounce(function() {
            // 绑定this指向
            const thisVM = this;
            axios.get('http://aulence.com/data/user-list.json').then(function(res) {
                var data_length = res.data.length;
                for(let i = 0; i < data_length; i++) {
                    if(thisVM.userName === "") {
                        thisVM.respons = '请输入一个新的用户名';
                        break;
                    }
                    else if(!/\w{6,16}/.test(thisVM.userName)) {
                        thisVM.respons = '用户名必须是6~16位的字符！';
                        break;
                    }
                    else if(res.data[i].name === thisVM.userName) {
                        thisVM.respons = '用户名已经存在，请重新输入！';
                        break;
                    } else {
                        thisVM.respons = '恭喜您！用户名可以使用';
                    }
                }
            }).catch(function(errInfo) {
                console.error(errInfo);
            });
        },800)
    }
});

