var src = document.getElementById("src"),
	target = document.getElementById("target"),
	msg = document.getElementById("msg");

//拖放元素
src.ondragstart = function(e) {  //元素开始被拖放时
	e.dataTransfer.setData("Text",e.target.id);
	e.target.classList.add("dragged");
}

src.ondrag = function(e) {  //元素在拖放时反复触发
	msg.innerHTML = e.target.id;
}

src.ondragend = function(e) {  //完成元素拖放时
	e.target.classList.remove("dragged");
	msg.innerHTML = "Drop Here";
}

//创建释放区
target.ondragenter = handleDrag;  //当被拖动元素进入释放区触发
target.ondragover = handleDrag;  //当被拖动元素在释放区移动时触发

//dragenter和dragover事件默认是拒绝接受任何被拖放项目的，
//所以要阻止默认行为
function handleDrag(e) {
	e.preventDefault();
}

//接受释放
target.ondrop = function(e) {  //当被拖动元素在释放区放下时触发
	var draggedID = e.dataTransfer.getData("Text"),
		newElem = document.getElementById(draggedID).cloneNode(false);
	target.innerHTML = "";
	this.appendChild(newElem);
	e.preventDefault();
}




