/**
 * 功能：滚动轮播效果
 */
// 获取页面元素
var wrap = document.getElementsByClassName('wrap')[0];
var imgBox = document.getElementsByClassName('imgs-box')[0];
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];
var aIdots = document.getElementsByClassName('idot-item');

/**
 * 初始化变量
 * 默认选中图片下标
 * 记录动画执行状态
 * 定时器
 */
 var curImgIdx = 1;
 var isAnimation = false;
 var timer = 0;

// 动画播放
paly();


/**
 * 点击下一张事件
 */
 next.onclick = function(){
    // 判断动画状态和当前下标索引
    if(isAnimation){return;}
    if(curImgIdx == 6){curImgIdx = 1;}else{curImgIdx++;}
    // 调用图片切换效果和圆点状态样式函数
    tab(-520);
    changeIdots();
}
/**
 * 点击上一张事件
 */
 prev.onclick = function(){
    // 判断动画状态和当前下标索引
    if(isAnimation){return;}
    if(curImgIdx == 1){curImgIdx = 6;}else{curImgIdx--;}
    // 调用图片切换效果和圆点状态样式函数
    tab(520);
    changeIdots();
}

// 鼠标悬停，动画停止，移除动画重新开始
wrap.onmouseover = stop;
wrap.onmouseout = paly;


/**
 * 小圆点添加点击事件
 */
 for (var i = 0,len = aIdots.length; i < len; i++) {
    // 记录位置，设置自定义index属性
    aIdots[i].index = i + 1;
    aIdots[i].onclick = function(){
        if(isAnimation || this.index == curImgIdx){
            return;
        }
        // offset = -520 *(要跳转的位置 - 当前位置)
        var offset = -520 * (this.index - curImgIdx );
         // 调用切换效果函数
         tab(offset);
         // 更新当前下标
         curImgIdx = this.index;
         // 调用设置小圆点的样式函数
         changeIdots();
        }
    }


/**
 * 小圆点切换样式设置函数
 */

 function changeIdots(){
    // 循环删除所有“active”类名
    for (var i = 0; i < aIdots.length; i++) {
        // 如果包含，就删除
        if(aIdots[i].classList.contains('active')){
            aIdots[i].classList.remove('active');
            break;
        }
    }
    // 为当前的小圆点设置class为active
    aIdots[curImgIdx - 1].classList.add('active'); 
}

/**
 * 图片切换效果函数
 * 参数：滚动距离
 */
 function tab(offset){
        // 开启动画
        isAnimation = true;
        // 设置动画帧（动画时间，每帧切换时间，
        // 执行多少帧，每一帧移动的距离）
        var duration = 500,interval = 15,
        frames = duration / interval,
        speed =  Math.ceil(offset / frames);
      // 获取目标值
      var tabLeft = parseInt(getStyle(imgBox,'left')) + offset;
      // 设置定时器(每隔一定时间执行一次回调函数)
      var tim = setInterval(function(){
                // 获取当前图片left值
                var curLeft = parseInt(getStyle(imgBox,'left'));
                // 判断执行动画的条件
                // 向右：必须小于0,大于目标值
                // 向左：必须大于0,小于目标值
                if((offset < 0 && curLeft > tabLeft) || (offset > 0 && curLeft < tabLeft)){
                    imgBox.style.left = (curLeft + speed) + 'px';
                }else{
                    // 结束动画，清除定时器，更新当前值
                    isAnimation = false;
                    clearInterval(tim);
                    imgBox.style.left = tabLeft + 'px';
                    // 无限滚动
                    curLeft = parseInt(getStyle(imgBox,'left'));
                    if(curLeft < -3120){
                        imgBox.style.left = '-520px';
                    }else if(curLeft > -520){
                        imgBox.style.left = '-3120px';
                    }   
                }
            },interval)
    }


 // 获取非行间样式的值
 function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }else {
        return getComputedStyle(obj, false)[attr];
    }
 }


 /**
  * 自动播放
  */
  function paly(){
    // 设置定时器
    timer = setInterval(function(){
        // 调用下一张事件函数
        next.onclick();
    },3000)
 }

/**
 * 停止播放
 */
function stop(){
    // 清除定时器
    clearInterval(timer);
}



