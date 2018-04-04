var bookInfo = {
	name: "JavaScript编程技术",
	pubDate: "2016-12-04",
	author: "达芬奇",
	pages: "477",
	pubType: "精装",
	showInfo: function(info) {
		return this[info];
	}
}