var count = 0;
var page = document.getElementsByTagName("page");
var page1 = page[0],	
	page2 = page[1],
	page3 = page[2];
page1.onclick = function() {
	count++;
	if(count == 1) {
		page2.classList.add("page2_anim-1");
	}
}
page2.onclick = function() {
	count++;
	if(count == 2) {
		page3.classList.add("page3_anim-1");
	}
}

document.oncontextmenu = function(event) {
	event.preventDefault();
	if(count == 0) {
		return;
	}
	else {
		count--;
	}
	if(count == 0) {
		page2.classList.remove("page2_anim-1");
	}
	if(count == 1) {
		page3.classList.remove("page3_anim-1");
	}
}















