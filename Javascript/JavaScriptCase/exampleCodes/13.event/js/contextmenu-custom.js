var main = document.getElementById("main");
main.oncontextmenu = function(e) {
	// 调用右键菜单函数
	createContextMenue({
		ident: this,
		evObj: e,
		menueItem: '<li id="deleteIcon">删除图标</li>' +
			'<li>刷新</li>' +
			'<li>设置</li>',
		callback: function(){
			var delIcon = document.getElementById("deleteIcon");
			delIcon.onclick = function() {
				var iconList = document.getElementsByClassName("icon");
				if(iconList.length) {
				   iconList[iconList.length - 1].remove();
				}
				
			}
		}
	});
}

/**
* 功能：右键菜单功能函数
* 参数：
* ident：当前元素节点（Element）
* evObj：事件对象（MouseEvent）
* menueItem：菜单项（HTML String）
* callback：回调函数（Function）
**/
function createContextMenue(param) {
	// 阻止默认菜单事件
	param.evObj.preventDefault();
	//console.log(Object.prototype.toString.call(param.evObj));
	// 尝试查找页面内的“右键菜单”
	var contextMenue = document.getElementById("contextMenue");
	// 含有右键菜单（布尔值，有为true，没有为false）
	var hasMenue = param.ident.contains(contextMenue);
	// 如果还有右键菜单，则清除右键菜单
	if(hasMenue) {
		contextMenue.remove();
	}
	// 获取鼠标在当前页面的位置
	var mouseX = param.evObj.pageX,
		mouseY = param.evObj.pageY;
	// 创建一个自定标签“menue”
	var menue = document.createElement("menue");
	// 为该标签添加HTML内容
	menue.innerHTML = '<ul>' + param.menueItem +'</ul>';
	// 设置这个自定义标签的ID
	menue.setAttribute("id", "contextMenue");
	// 这个自定义标签添加到<main>标签内
	main.appendChild(menue);
	// 获取这个ID
	var contextMenue = document.querySelector("#contextMenue");
	// 将菜单的位置（左上角）设置为鼠标的位置
	contextMenue.style.left = mouseX + "px";
	contextMenue.style.top = mouseY + "px";
	// 回调函数
	param.callback();
	contextMenue.onclick = function() {
		this.remove();
	}
	// 点击非右键菜单部分消除该菜单
	param.ident.addEventListener("click", function(menueEvent){
		var isMain = menueEvent.target.id === "main";
		if(isMain) {
			contextMenue.remove();
		}
	});
}










