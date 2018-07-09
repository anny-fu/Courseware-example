/**
 * 功能：jQuery AJAX公共功能设置
 * 日期：2017/3/23
 **/
/****************************************/
/* 页面载入完成后执行 */
/****************************************/
$(function () {
	/* 写入导航文件 */
	// jQuery2.x版本的ajax方法语法格式
	$.ajax({
		type: "GET",
		url: "pages/header.html",
		context: $("header"),
		dataType: "html"
	}).done(function (elements) {
		$(this).html(elements);
		$(`header`).find('a').eq(0).trigger('click');
	});
	/* 导航载入AJAX数据 */
	$(`header`).on("click", "a", function (e) {
		$(this).addClass("ckd").parent().siblings().children().removeClass("ckd");
		let anchorTxt = $(this).text();
		switch (anchorTxt) {
			case "$.get":
				loadTextFile();
				break;
			case "$.getJSON":
				loadJSONFile();
				break;
			case "$.getScript":
				loadJavaScriptFile();
				break;
			case "$.post":
				loadHTMLFile();
				break;
			case "$.ajax":
				loadOtherFile("GET", "pages/ajaxHTMLFile.html", {"name": "anny"});
				break;
			case "jsonp":
				testGetParam("GET", "https://api.douban.com/v2/book/27176647");
				break;
			default:
				console.log("没有任何请求!")
		}
	});

	/* 请求完成后在控制台输出请求的文本 */
	$(document).ajaxComplete(function (event, xhr, set) {
		console.log(set.url);
		if (set.url === "doc/textFile.txt") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if (set.url === "json/test.json") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if (set.url === "js/javascriptFile.js") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if (set.url === "pages/htmlFile.html") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if (set.url === "pages/ajaxHTMLFile.html?name=anny") {
			console.clear();
			console.log(xhr.responseText);
		} else if (set.url == "https://api.douban.com/v2/book/27176647?callback=flightHandler") {
			console.clear();
			console.log(xhr.responseText);
		}
	});
});

/* 载入Text文件 */
function loadTextFile() {
	$.get("doc/textFile.txt", function (data) {
		$("main").html(data);
	});
}
/* 载入JSON文件 */
function loadJSONFile() {
	$.getJSON("json/test.json", function (data) {
		var $main = $("main");
		$main.html(`
			<div class="userInfo">
				<div class="infoLine">
					<label>姓名：</label>
					<span>${data.name}</span>
				</div>
				<div class="infoLine">
					<label>年龄：</label>
					<span>${data.age}</span>
				</div>
				<div class="infoLine">
					<label>职业：</label>
					<span>${data.profession}</span>
				</div>
				<div class="infoLine">
					<label>技能：</label>
					<span></span>
				</div>
			</div>
		`);
		let str = "";
		$.each(data.skill, function (index, element) {
			str += element + "、";
		});
		str = str.slice(0, str.lastIndexOf("、"));
		$main.find(".infoLine").eq(3).children("span").text(str);
});
}

/* 载入JavaScript文件 */
function loadJavaScriptFile() {
	$.getScript("js/javascriptFile.js");
}

var dataObj = {
	username: "xiaoluohao",
	age: 23,
	skill: "HTML"
}
/* 载入HTML文件 */
function loadHTMLFile() {
	$.post("pages/htmlFile.html", dataObj, function (data) {
		$(`main`).html(data);
	});
}

/* 使用$.ajax载入其它文件数据 */
function loadOtherFile(sendType, url, sendData) {
	// jQuery ajax方法的1.x版本表示法
	$.ajax({
		type: sendType,
		url: url,
		cache: true, // 默认值，type属性为"GET"的时候有效
		dataType: "html",
		data: sendData,
		success: function (elements) {
			$(`main`).html(elements);
		}
	});
	// 等同于
	/*$.get("pages/ajaxHTMLFile.html?name=anny",function (elements) {
	 $(`main`).html(elements);
	 });*/
}

/*跨域请求数据*/
function testGetParam(sendType, url) {
	/*模拟请求豆瓣网的书本详情*/
	//https://book.douban.com/
	//打开上面豆瓣网链接，然后随机点击一本书进去，
	// 查看url地址中的书本Id
	//列如：https://book.douban.com/subject/
	// (书id：27176647)/?icn=index-editionrecommend
	//然后请求数据使用豆瓣的api链接,在链接后面拼接书id即可
	// https://api.douban.com/v2/book/[id]

	$.ajax({
		type: sendType,
		url: url,
		async: false,
		dataType: "jsonp",
// jsonp: "callback",
		//回掉函数名的参数名，默认callback，服务端通过它来获取到回调函数名
		// jsonpCallback: 'successCallback',
		//  回掉函数名，默认jquery自动生成
		//两个参数可以随后台确定，如果你传入后端，那么后端需要调用这个回调函数，函数的参数data才会得到结果
		success: function (bookData) {
//			操作请求到的数据
			console.log(bookData);
			var $main = $("main");
			$main.html(`
			<div class="bookInfo">
			<h1>
			    <span >${bookData.title}</span>
			</h1>
			<div id="content">
					<div class="grid-16-8 ">
						<div class="article">
							<div class="indent">
								<div class="subjectwrap ">
									<div class="subject ">
										<div id="mainpic" class="">
											<a class="nbg" href="${bookData.images.large}" title="${bookData.title}">
												<img src="${bookData.image}" width="135px" title="点击看大图" alt="${bookData.title}">
											</a>
										</div>
										<div id="info" >
											<p>
												<span class="pl">作者:</span>&nbsp;
													<a href="https://book.douban.com/author/4507615/">
													${bookData.author}
													</a>
											</p>
											<p>
												<span class="pl">出版社:</span> 
												${bookData.publisher}
											</p>
											<p>
											<span class="pl">出版年:</span>
											${bookData.pubdate}
											</p>
											<p>
												<span class="pl">页数:</span>
												${bookData.pages}
											</p>
											<p>
												<span class="pl">定价:</span>
												${bookData.price}
											</p>
											<p>
												<span class="pl">装帧:</span> 
												${bookData.binding}
											</p>
											<p>
												<span class="pl">ISBN:</span>
												${bookData.isbn13}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="related_info">
								<h2>内容简介......</h2>
								<div class="indent">
									<div class="intro">
										${bookData.summary}
									</div>
								</div>
								<h2>作者简介......</h2>
								<div class="indent">
									<div class="intro">
										${bookData.author_intro}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`);
		},
		error: function (jqXHR, textStatus) {
			console.log(textStatus);
		}
	});

	//自定义回调函数名
	function successCallback(data) {
		console.log("successCallback");
		console.log(data);
	}

}
