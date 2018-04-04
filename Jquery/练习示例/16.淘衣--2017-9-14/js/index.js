/**
 * 功能：淘衣
 * 开发人员：Tom.Anny
 * 日期：2017/12/12
 */
$(function () {
    //获取显示信息面板
    var $panel = $('.infoPanel');
    // a标签添加点击事件
    $('fieldset>a').click(function () {
        //下拉显示面板信息
        $panel.addClass('show');
        //    获取数据显示
        var id = $(this).index();
        $.getJSON('json/clothingData.json', function (data) {
            console.log(id);
            switch (id) {
                case 1:
                    outputInfo(data.clothes);
                    break;
                case 2:
                    outputInfo(data.skirt);
                    break;
                case 3:
                    outputInfo(data.shoe);
                    break;
                default:
                    outputInfo(data.clothes);
            }
        },function(msg){
            console.error(msg);
            }
        )
    })
    /* 收回信息面板 */
    $panel.click(function () {
        $(this).removeClass('show');
    })
})
/**
 * 功能：向信息面板输入内容
 * 参数：1、对象属性名
 **/
function outputInfo(jsonData) {
    var showInfo = $('.infoPanel>p');
    var i =0;
    for(let x in jsonData) {
        if(x == "brand") {
            showInfo.eq(i).children('span').addClass("brand");
        }
        if(x == "price") {
            showInfo.eq(i++).children('span').text("$" + Number(jsonData[x]).toFixed(2));
        }
        else {
            showInfo.eq(i++).children('span').text(jsonData[x]);
        }
    }
}