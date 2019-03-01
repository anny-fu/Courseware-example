// 消息按钮
const messg = document.querySelector('.messg');
messg.onclick = function() {
    new PopupBox({
        type: 'alert',
        title: '系统消息',
        content: '您的账户余额不足，请及时到充值中心充值'
    });
}

// 确认按钮
const confirm = document.querySelector('.confirm');
confirm.onclick = function() {
    new PopupBox({
        type: 'confirm',
        title: '系统消息',
        content: '您确认要删除当前的数据吗？',
        event() {
            var test = document.getElementById('test');
            test.style.color = '#f00';
            test.textContent = '已删除!';
        }
    });
}