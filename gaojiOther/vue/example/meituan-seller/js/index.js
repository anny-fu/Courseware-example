new Vue({
    el: '#app',
    data: {
        sellerList: []
    },
    created() {
        axios.get('./data/sellerInfo.json')
        .then((resp) => {
            this.sellerList = resp.data;
            // console.log(resp.data);
        })
        .catch((err) => {
            console.error(err);
            alert('由于您的网络正在开小差，所以暂时不能请求到数据');
        });
    }
});