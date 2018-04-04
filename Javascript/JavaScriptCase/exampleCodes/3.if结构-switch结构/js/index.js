fnTest();
function fnTest() {
	// 开关按钮
	var toggle1 = document.getElementById("toggle");
	// 图片
	var img1 = document.getElementsByTagName("img")[0];

	toggle1.onclick = function() {
		var status = img1.style.display;
		if(status == "block") {
			img1.style.display = "none";
		}
		else {
			img1.style.display = "block";
		}
	}
}