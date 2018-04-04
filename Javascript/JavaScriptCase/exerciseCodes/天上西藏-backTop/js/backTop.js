/**
 * 功能：回到顶部
 */
// 获取元素
/*回顶部*/
var goTop = document.getElementById("gotop"),
// 定时器
goTopt = null,
/*二维码*/
qrCode = document.getElementById("code"),
closeCode = qrCode .getElementsByTagName("a")[0];
/*回顶部，二维码出现*/
window.onscroll = function(){
	var scrollH = document.documentElement.scrollTop || document.pageYOffset || document.body.scrollTop || 0,
	screenH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	if(scrollH > screenH / 2){
		goTop.style.height = "127px";
		qrCode.style.cssText = "height:160px;border-bottom:1px solid #eee";
	}else{
		goTop.style.height ="0";
		qrCode.style.cssText = "height:0;border-bottom:none;";
	}
}
/*回顶部*/
goTop.onmouseover = function(){
	this.children[0].classList.add('active');
}
goTop.onmouseout = function(){
	this.children[0].classList.remove('active');
}
// 回到顶部执行函数
function got(){
	goTopt = setInterval(goTopTrans,10);
	// goTop.onclick = null;
}
// 回到顶部滑动动画
function goTopTrans(){
	// 获取滚动条滚动距离和每次向上滚动的距离
	var scrollH = document.documentElement.scrollTop ||document.pageYOffset || document.body.scrollTop,
	goSpeed = scrollH - scrollH / 10;
	console.log(goSpeed);
	if(scrollH > 0){
		document.documentElement.scrollTop = document.body.scrollTop = goSpeed;
	}else{
		clearInterval(goTopt);
		// goTop.onclick = got;
	}
}
// 按钮点击事件
goTop.onclick = got;

/*关闭二维码*/
closeCode.onclick = function(){
	qrCode.style.height = 0;
	setTimeout(function(){qrCode.style.display = "none";},700);
}



