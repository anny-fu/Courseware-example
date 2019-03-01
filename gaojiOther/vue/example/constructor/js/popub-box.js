/**
 * 弹出框插件
 * @param {Object} options 为弹出框提供各种配置项，如下：
 * type: 指定弹出框类型，允许的值有：alert,confirm
 * title: 弹出框标题
 * content: 弹出框的内容
 * event: 确认事件
 */
function PopupBox(options) {
    // 异常处理
    options.type = (options.type === undefined) ? 'alert' : options.type;
    options.title = (options.title === undefined) ? '系统消息' : options.title;
    options.content = (options.content === undefined) ? '程序员精神有点恍惚，忘记写内容了' : options.content;
    options.event = (options.event === undefined) ? function(){
        box.remove();
    } : options.event;

    const box = document.createElement('div');
    box.innerHTML += `
        <div class="header">${options.title}</div>
        <div class="content">${options.content}</div>
        <div class="footer">
            <button type="button" class="popup-cancel">取消</button>
            <button type="button" class="popup-confirm">确认</button>
        </div>
    `;
    box.setAttribute('class','popup-box');
    document.body.appendChild(box);

    // 确认按钮
    const popupConfirm = box.querySelector('.popup-confirm');
    // 取消按钮
    const popupCancel = box.querySelector('.popup-cancel');

    // 如果是消息框
    if(options.type === 'alert') {
        popupCancel.remove();
        popupConfirm.onclick = function() {
            box.remove();
        }
    } 
    // 如果是带取消的消息框
    else if(options.type === 'confirm') {
        // 自定义确认的事件（通过回调函数实现的）
        popupConfirm.onclick = function() {
            options.event();
            box.remove();
        }
    }

    // 取消按钮的事件（关闭弹出层）
    popupCancel.onclick = function() {
        box.remove();
    }
   
}