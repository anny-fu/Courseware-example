window.onload = function () {
    /*获取导航title*/
    var navTitle = document.getElementsByClassName("sub_nav_title");
    /*循环遍历点击的title*/
    for (var i = 0;i < navTitle.length; i ++) {
        navTitle[i].index = i;
        navTitle[i].onclick = function () {
            var now = this.index;
            // 获取导航下的img标签
            tag(now);  //内容展开与收起
        }
    }
    function tag(index) {
    // 获取图片集合
    var imgs = document.getElementsByClassName("imgs");
    /*获取显示隐藏的content*/
    var navContent = document.getElementsByClassName("sub_nav_content");
    /*判断当前点击的title同级的content是否是展开的*/
    if (navContent[index].style.display === "block") {
        navContent[index].style.display = "none";
        imgs[index].src = 'img/icon01.png';

    } else {
        /*将所有content隐藏*/
        for (var i = 0;i < navTitle.length; i ++) {
            navContent[i].style.display = "none";
            imgs[i].src = 'img/icon01.png';
        }
        /*只显示当前点击的*/
        navContent[index].style.display = "block";
        imgs[index].src = 'img/icon02.png';
    }
}
}