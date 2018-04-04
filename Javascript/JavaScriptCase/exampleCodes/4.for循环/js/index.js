var newList = document.getElementById("newList");

var newList_length = newList.childElementCount;

var count = 0;
while(count < newList_length) {
	if(count % 2 == 1) {
		newList.children[count].style.marginLeft = "4%";
	}
	count++;
}

/*for(var i = 0; i < 5; i++) {
	console.log(i);
}*/