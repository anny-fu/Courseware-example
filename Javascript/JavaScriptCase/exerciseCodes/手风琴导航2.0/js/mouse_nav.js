/***
***
***背景滑动导航
***
***
***/

/*获取所有导航li和背景li*/
var nav_list = document.getElementById('nav_list').children;
var nav_bg =document.getElementById('nav_bg');

/*初始化背景li的位置*/
nav_list[0].className = 'on';
nav_bg.style.width =nav_list[0].offsetWidth + 'px';
nav_bg.style.left =nav_list[0].offsetLeft + 'px';

/*循环遍历导航添加鼠标移入移除事件*/
for (var i = 0; i < nav_list.length; i++) {
  /*记录当前选中的li*/
  nav_list[i].index = i;
  /*鼠标移入事件*/
  nav_list[i].onmouseover =function(){
   /*判断当前hover的li*/
   if(this.index == 0){
    nav_list[0].className = 'on';
  }else{
    this.className = 'on';
    nav_list[0].className = '';
    nav_bg.style.width = this.offsetWidth + 'px';
    nav_bg.style.left =this.offsetLeft + 'px';
  }
}
  /*鼠标移除事件*/
  nav_list[i].onmouseout = function(){
   this.className = '';
   nav_list[0].className = 'on';
   nav_bg.style.width =nav_list[0].offsetWidth + 'px';
   nav_bg.style.left =nav_list[0].offsetLeft + 'px';
    }
 }
















