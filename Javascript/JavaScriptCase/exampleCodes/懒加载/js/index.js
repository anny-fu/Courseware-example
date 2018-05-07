/**
 * 功能：图片懒加载
 * 开发人员：Tom.Anny
 * 日期：2018/4/3
 */
// 图片资源数组
var imgArr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg"];

//图片长度和图片容器
var imgURL_len = imgArr.length;
var imgBox = document.getElementById('imgBox');

/*先将突图片加载到DOM中*/
var str = "";
for (var i = 0; i < imgURL_len; i++) {
    //可以给初始src设置一个加载动画图片
    str += `<li class="img-area"><img src="" alt="" data-src="${imgArr[i]}"></li>`;
}
imgBox.innerHTML = str;

/************************全局变量***********************/
//存储图片加载到的位置，避免每次都从第一张图片开始遍历
var index = 0;
/*
 * 图片懒加载函数
 * */
function lazyLoad() {
    //    获取所有的img
    var imgs = imgBox.getElementsByTagName('img'), imgs_len = imgs.length;

    for (var i = index; i < imgs_len; i++) {
        //判断图片距离页面顶部的位置是否小于屏幕可见高度
        // 即元素是否从下滚动到眼球可见位置,并且当前元素src为空或者为加载动画图片
        console.log(isInSight(imgs[i]));
        if (isInSight(imgs[i])) {
            if (imgs[i].getAttribute('src') == "") {
                //    获取data-src中属性值设置到src中
                imgs[i].src = imgs[i].dataset.src;
            }
            //    更新加载图片下标
            index = i;
        }
    }
}
/*
 * 元素是否在可视区域
 * 参数：当前元素
 * */
function isInSight(el) {
    // 方法二：
    var bound = el.getBoundingClientRect();//表示图片到可视区域顶部距离；
    var clientH = window.innerHeight;//表示可视区域的高度。
    return bound.top <= clientH + 100;
    // 方法1：
    // var offsetT = el.offsetTop;
    // var clientH = document.documentElement.clientHeight;
    // var scrollT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    // return offsetT - scrollT < clientH + 100;
}

/*
 * 简单的节流函数
 * 参数：fun(要执行的函数)；mustRun（调用函数的时间间隔）
 *
 * */

function throttle(fn, mustRun = 500) {
    // 存储上一次执行时间
    var previous = null;
    return function () {
        var now = new Date();
        // 存储当前对象和参数
        var context = this;
        var args = arguments;
        // 如果上一次执行时间不存在就赋值为当前时间
        if (!previous) {
            previous = now;
        }
        var remaining = now - previous;
        //如果当前时间-上一次执行时间 >= 间隔时间；就执行函数
        if (mustRun && remaining >= mustRun) {
            fn.apply(context, args);
         //  更新上一次时间
            previous = now;
        }
    }
};






