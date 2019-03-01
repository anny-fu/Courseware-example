new Vue({
    el: '#app',
    data: {
        userInfo: {
            name: '',
            age: '',
            gender: '',
            hobby: []
        },
        roleThead: ['姓名','年龄','性别','爱好'],
        roleList: [
            {
                name: '小李',
                age: 23,
                gender: '男',
                hobby: ['格斗','跳舞']
            }
        ]
    },
    filters: {
        arrToStr(val) {
            if(!Array.isArray(val)) {
                return val;
            }
            return val.join("、");
        }
    },
    methods: {
        addRole() {
            this.roleList.push(this.userInfo);
            this.userInfo = {
                name: '',
                age: '',
                gender: '',
                hobby: []
            }
        }
    }
});