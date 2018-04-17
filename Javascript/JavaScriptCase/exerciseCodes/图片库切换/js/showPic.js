window.onload = function(){
	var whichpic = document.getElementsByTagName('a');
	for (var i = 0; i < whichpic.length; i++) {
	/*	whichpic[i].onclick = function(event){
			// 阻止超链接标签的默认事件和事件冒泡
			event.preventDefault();
			event.stopPropagation();
			showPic(this);
		}*/
		// 可以改写为如下方法
		whichpic[i].onclick = showPic;
	}
}

function showPic (event) {
	event.preventDefault();
			var place = document.getElementById("ku00"),
					source = this.getAttribute("href");
			place.setAttribute("src",source);

			var text = this.getAttribute("title"),
					description = document.getElementById("description");
					description.innerHTML = text;
		}
