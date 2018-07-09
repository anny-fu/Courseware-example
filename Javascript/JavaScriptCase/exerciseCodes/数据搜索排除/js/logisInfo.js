/**
* 功能：筛选数据功能
**/
/**** 全局变量对象命名法 ****/
var logisEle = {
    // 排除按钮
    filterBtn: document.getElementById("filterData"),
    // 搜索按钮
    searchBtn: document.getElementById("searchData"),
    // 排除数据输入框
    filterBox: document.getElementById("filterVal"),
    // 搜索数据输入框
    searchBox: document.getElementById("searchVal")
}
/* 定义一个数据对象 */
var loginsInfo = {
    orderNum: ["tabao-001","tabao-002","tabao-003","tabao-004","tabao-005","tabao-006"],
    goodsName: ["单反","手机","书籍","茶杯","电脑","衣服"],
    beginDete: ["2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11","2016-11-11"],
    endDete: ["2016-11-16","2016-11-18","2016-11-18","2016-11-19","2016-11-21","2016-11-23"],
    consignee: ["皮卡丘","柯南","鸣人","路飞","悟空","黑崎一护"],
    describe: ["查看","查看","查看","查看","查看","查看"]
}

// 数组对象
 var logistics=[
        {
            orderId:'taobao_001',
            name:'单反',
            sendTime:'2016-11-11',
            getTime:'2016-11-16',
            whoSign:'皮卡丘',
            detail:'查看'
        },
        {
            orderId:'taobao_002',
            name:'手机',
            sendTime:'2016-11-11',
            getTime:'2016-11-18',
            whoSign:'柯南',
            detail:'查看'
        },
        {
            orderId:'taobao_003',
            name:'书籍',
            sendTime:'2016-11-11',
            getTime:'2016-11-18',
            whoSign:'鸣人',
            detail:'查看'
        },
        {
            orderId:'taobao_004',
            name:'茶杯',
            sendTime:'2016-11-11',
            getTime:'2016-11-19',
            whoSign:'路飞',
            detail:'查看'
        },
        {
            orderId:'taobao_005',
            name:'电脑',
            sendTime:'2016-11-11',
            getTime:'2016-11-21',
            whoSign:'悟空',
            detail:'查看'
        },
        {
            orderId:'taobao_006',
            name:'衣服',
            sendTime:'2016-11-11',
            getTime:'2016-11-23',
            whoSign:'八戒',
            detail:'查看'
        },
    ];



function filterDate(){
    // 数据长度
    var DateLen = logistics.length;
    // tbody
var  tableCont = document.getElementById("logisInfoTable").getElementsByTagName("tbody")[0];

    tableCont.innerHTML = "";
    // 获取排除值
      var filterVal = logisEle.filterBox.value;
    for (var i = 0; i < DateLen; i++) {
        // 如果等于排除值，就不输出
        if(filterVal == logistics[i].orderId || filterVal == logistics[i].name ||
            filterVal == logistics[i].sendTime || filterVal == logistics[i].getTime ||
            filterVal == logistics[i].whoSign || filterVal == logistics[i].detail){
            continue;
        }
        tableCont.innerHTML += `<tr>
        <td>${logistics[i].orderId}</td>
        <td>${logistics[i].name}</td>
        <td>${logistics[i].sendTime}</td>
        <td>${logistics[i].getTime}</td>
        <td>${logistics[i].whoSign}</td>
        <td>${logistics[i].detail}</td>
        </tr>`;
    }
}

/**** 函数事件触发 ****/
/* 筛选排除数据 */
logisEle.filterBtn.onclick = function() {
    // 点击触发函数
    filterData();
    // filterDate();
}
/* 搜索指定数据 */
logisEle.searchBtn.onclick = function() {
    // 点击触发函数
    searchData();
}

// 置空搜索框内的内容
logisEle.filterBox.onfocus = function() {
    this.value = "";
}
// 置空排除框内的内容
logisEle.searchBox.onfocus = function() {
    this.value = "";
}

/**
* 功能：排除筛选结果输出
**/
function filterData() {
        // 获取排除输入框的值
        // var filterVal = document.getElementById("filterVal").value,
        var filterVal = logisEle.filterBox.value;
        // 获取数组长度
        var loginsInfo_data_len = loginsInfo.orderNum.length,
        // 物流信息表格内容
        tableCont = document.getElementById("logisInfoTable").getElementsByTagName("tbody")[0];
        console.log(loginsInfo.orderNum);
        // 置空表格内容
        tableCont.innerHTML = "";

        // 置空搜索框内的内容
        logisEle.filterBox.value = "";

        // 执行数组长度的循环
        for(var i = 0; i < loginsInfo_data_len; i++) {
            // 将用户输入的值和每一列的值进行对比
            if(filterVal == loginsInfo.orderNum[i] ||
                filterVal == loginsInfo.goodsName[i] ||
                filterVal == loginsInfo.beginDete[i] ||
                filterVal == loginsInfo.endDete[i] ||
                filterVal == loginsInfo.consignee[i] ||
                filterVal == loginsInfo.describe[i]) {
                // 一旦发现有相同的值跳出本轮循环
            continue;
                }
            // 如果没有找到匹配的，输出本行数据
            else {
                tableCont.innerHTML += '<tr><td>' +
                loginsInfo.orderNum[i] +
                '</td><td>' +
                loginsInfo.goodsName[i] +
                '</td><td>' +
                loginsInfo.beginDete[i] +
                '</td><td>' +
                loginsInfo.endDete[i] +
                '</td><td>' +
                loginsInfo.consignee[i] +
                '</td><td>' +
                loginsInfo.describe[i] +
                '</td></tr>';
            }
        }
}

/**
* 功能：搜索结果输出指定行
**/
function searchData() {
        // 获取搜索输入框的值
        var searchVal = document.getElementById("searchVal").value,
        // 获取数组长度
        loginsInfo_data_len = loginsInfo.orderNum.length,
        // 物流信息表格内容
        tableCont = document.getElementById("logisInfoTable").getElementsByTagName("tbody")[0];

        // 置空表格内容
        tableCont.innerHTML = "";

        // 置空搜索框内的内容
        logisEle.searchBox.value = "";

        // 执行数组长度的循环
        for(var i = 0; i < loginsInfo_data_len; i++) {
            // 将用户输入的值和每一列的值进行对比
            if(searchVal == loginsInfo.orderNum[i] ||
                searchVal == loginsInfo.goodsName[i] ||
                searchVal == loginsInfo.beginDete[i] ||
                searchVal == loginsInfo.endDete[i] ||
                searchVal == loginsInfo.consignee[i] ||
                searchVal == loginsInfo.describe[i]
            ) {
                // 一旦发现有相同的值就将该行内容输出
            tableCont.innerHTML += '<tr><td>' +
            loginsInfo.orderNum[i] +
            '</td><td>' +
            loginsInfo.goodsName[i] +
            '</td><td>' +
            loginsInfo.beginDete[i] +
            '</td><td>' +
            loginsInfo.endDete[i] +
            '</td><td>' +
            loginsInfo.consignee[i] +
            '</td><td>' +
            loginsInfo.describe[i] +
            '</td></tr>';
        }
    }
}























