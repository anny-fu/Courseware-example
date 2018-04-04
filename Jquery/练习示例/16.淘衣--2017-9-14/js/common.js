window.onload = function () {
    let fieldset = document.getElementsByTagName("fieldset")[0];
    let anchor = fieldset.getElementsByTagName("a"),
        anchor_leng = anchor.length;
    let panel = document.getElementsByClassName("infoPanel")[0];
    for(let i = 0; i < anchor_leng; i++) {
        anchor[i].onclick = function () {
            // 下拉显示信息面板
            panel.classList.add("show");
            getJSON("json/clothingData.json", function (data) {
                switch (i) {
                    case 0:
                        outputInfo(data.clothes);
                        break;
                    case 1:
                        outputInfo(data.skirt);
                        break;
                    case 2:
                        outputInfo(data.shoe);
                        break;
                    default:
                        outputInfo(data.clothes);
                }
            }, function () {
                console.error("请求失败");
            });
        }
    }
    /* 收回信息面板 */
    panel.onclick = function () {
        this.classList.remove("show");
    }
}

/**
 * 功能：向信息面板输入内容
 * 参数：1、对象属性名
 **/
function outputInfo(jsonData) {
    var infoPanel = document.getElementsByClassName("infoPanel")[0];
    var showInfo = infoPanel.getElementsByTagName("span");
    var i = 0;
    for(let x in jsonData) {
        if(x == "brand") {
            showInfo[i].classList.add("brand");
        }
        if(x == "price") {
            showInfo[i++].textContent = "$" + Number(jsonData[x]).toFixed(2);
        }
        else {
            showInfo[i++].textContent = jsonData[x];
        }
    }
}
/**
 * 功能：AJAX获取JSON文件
 * 参数：1、URL； 2、成功回调函数； 3、错误处理函数
**/
function getJSON(url, callback, erro) {
    erro = (erro === undefined) ? function () {} : erro;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var data = xhr.responseText,
                JSONData = JSON.parse(data);
                callback(JSONData);
            }
            else {
                erro();
            }
        }

    }
}