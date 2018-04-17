/******
***img-show
***
*****/
// img大图容器
var img_conatiner=document.getElementById('img_container');
// img列表
var imgBox = document.getElementById('item');
var img_item=imgBox.children;
// 文字显示P
var show=img_container.children;
//当前点击的图片路径和文本内容,index记录当前选中的li
var index = 0;
console.log(show[1]);

for (var i = 0; i < img_item.length; i++) {
  // 记录li的下标
  img_item[i].index = i;
  // 为每个li添加点击事件
  img_item[i].onclick=showimg;
}

/*点击li显示对应的图片*/
function showimg(){
    // 判断当前点击的li是否选中
    if(!this.hasAttribute('on')){
      this.setAttribute('class','on');
      // 如果当前点击的li不等于记录的li,就清除当前li的class
      if(this.index != index){
       img_item[index].removeAttribute('class');
       // 从新记录添加class的li
       index =this.index;
     }
   }
   // 获取当前li下面的img的src和title
   var src = (this.children)[0].getAttribute('src');
   var text= (this.children)[0].getAttribute('title');
   // 从新设置在上面的大图显示
   show[0].setAttribute('src',src);
   show[1].innerHTML=text;
 }

