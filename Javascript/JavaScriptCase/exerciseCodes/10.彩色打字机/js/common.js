window.onload = function() {
	var btn = document.getElementById("btn");
	btn.onclick = function() {
		printColorFont("txt");
	}
}

function printColorFont(ident) {
	// 获取当前文本框的Value值
	var txtVal = document.getElementById(ident).value;
	if(txtVal == ''){
		return ;
	}
	// 将这个值转换为数组
	var txtArr = txtVal.split("");
	// 获取到“信纸”里的div元素
	var showTxtDiv = document.getElementsByClassName("showTxt")[0].children[0];
	// 定义一个计数器
	var count = 0;
	// 创建一个定时器函数
	var interval = setInterval(function() {
		// 获取12~32之间的随机数
		var radomNum = Math.round(Math.random() * 20 + 12);
		// 拼接出class选择器的字符串
		var radomFZ = "fz-" + radomNum;
		
		// 将这次设置好class和对应的文字拼接为一个span标签添加进“信纸”内
		showTxtDiv.innerHTML += '<span class="' +
			radomFZ + '">' +txtArr[count++] + 
			'</span>';
		// 如果计数器长度和文本组成的数组相等，则清楚定时器
		if(txtArr.length === count) {
			clearInterval(interval);
		}
	}, 
    // 输出的时间间隔是160~560毫秒之间的一个随机值
    Math.round(Math.random() * 400) + 160);
}















