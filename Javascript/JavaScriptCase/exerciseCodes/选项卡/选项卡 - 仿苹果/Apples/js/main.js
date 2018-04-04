/**
 * tab切换效果
 * @type {[type]}
 */
var datas = jsonData;
var oNav = document.getElementsByTagName('nav')[0];
var oContents =document.getElementById('contents');


// 遍历数据，创建元素节点
datas.forEach(function(data,idx){
	// 1、布局导航区域
	// <a></a>
	var oA   = document.createElement('a');
	// <figure></figure>
	var oFig = document.createElement('figure'
		);
	// setting style with oFig
	oFig.style.cssText = 'background: url("../images/'+data.navImg+'") no-repeat center;';

	// <a href="javascript:;"></a>
	oA.setAttribute('href', 'javascript:;');
	// a > figure
	oA.appendChild(oFig);
	// a > figure + textNode
	oA.appendChild(document.createTextNode(data.title));
	oNav.appendChild(oA);
	// 2、布局内容区域
	oContents.innerHTML += `
<div style="display: none;" class="item">
	<div class="fl" id="ct_fl" style="background: url('../images/${data["desImg"]}') no-repeat center;"></div>
	<div class="fr" id="ct_fr">
		<img src="../images/${data["navImg"]}">
		<h1>${data["title"]}</h1>
		<p>${data["des"]}</p>
		<a href="javascript:;">进一步了解？</a>
	</div>
</div>`;
	
});

// 设置默认值
oNav.firstElementChild.className = 'selected';
oContents.firstElementChild.style.display = 'block';

// 遍历`a`，添加点击事件
var aA = Array.prototype.slice.call(oNav.children);
aA.forEach(function(a, idx){

	// 为`a`添加一个自定义属性
	a.idx = idx;
	// a.setAttribute(`idx`, idx);

	a.onclick = function() {
		// this -> a
		for(var i = 0; i < oNav.children.length; i++) {
			if (aA[i].className == 'selected') {
				aA[i].className = '';
				oContents.children[i].style.display = 'none';
				break;
			}
		}
		this.className = 'selected';
		oContents.children[this.idx].style.display = 'block';

	}
});


































