'use strict';

/**
 * 功能：索引页面功能
 * 日期：2017/4/15
 **/
require;

var $paragraph = $('main > div > p');
var item_icon_style = {
	'width': '24px',
	'height': '24px',
	'background': 'url(img/list-item.svg) center center no-repeat',
	'background-size': 'contain',
	'display': 'inline-block'
};

$(function () {
	$paragraph.prepend('\n\t\t<i class="item_icon"></i>\n\t');
	$('.item_icon').css(item_icon_style);
});
//# sourceMappingURL=index.js.map