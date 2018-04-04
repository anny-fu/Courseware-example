var marry = true,
	hasChild = true,
	school = true,
	hasPartner = true;
console.log("亲戚：结婚了吗？");
// 结婚
if(marry) {
	console.log("我：结了");
	console.log("亲戚：有孩子吗？");
	// 有孩子的情况
	if(hasChild) {
		console.log("我：有");
		console.log("亲戚：上学了吗？");
		// 上学
		if(school) {
			console.log("我：上了");
	    	console.log("亲戚：上的什么学校呢？");
			console.log("我：-_-!");
	    }
    	// 没有上学
    	else {
	    	// 什么时候上
	    	// ...
    	}
    }
    // 没有孩子的情况
    else {
		
    }
}
// 没有结婚
else {
	console.log("我：没有！");
	console.log("亲戚：有对象了吗？");
	// 有没有对象
	if(hasPartner) {
		console.log("我：有");
		console.log("亲戚：什么时候带出来看看呢？");
		console.log("我：对不起我有事，先走了！！！");
	}
	else {
		
	}
}
