/**
 * 功能：Gulp browser-sync
 * 日期：2017-6-11
 **/

$(function () {
	var showImgBanner = $(".banner > .showBannerImg");
	var img_leng = showImgBanner.children().length;
	setInterval(function () {
		var showImg = showImgBanner.children(".show"),
			showImg_idx = showImg.index();
		if(showImg_idx !== img_leng - 1) {
			showImg.removeClass("show").next().addClass("show");
		} else {
			showImg.removeClass("show");
			showImgBanner.children().first().addClass("show");
		}
	}, 4000);
});

