window.onload = function(){
	var whichpic = document.getElementsByTagName('a');
	for (var i = 0; i < whichpic.length; i++) {
		// 为a标签添加自定下标属性
		whichpic[i].index = i;
		whichpic[i].onclick = function(event){
			// 阻止超链接标签的默认事件和事件冒泡
			event.preventDefault();
			event.stopPropagation();
			showPic(whichpic,this.index);
		}
	}
}

function showPic (whichpic,index) {
			var place = document.getElementById("ku00"),
					source = whichpic[index].getAttribute("href");
			place.setAttribute("src",source);

			var text = whichpic[index].getAttribute("title"),
					description = document.getElementById("description");
					description.innerHTML = text;
		}
