/**
 * 功能：索引页面功能
 * 日期：2017/4/15
 **/

let $paragraph = $(`main > div > p`);
const item_icon_style = {
	'width': '24px',
	'height': '24px',
	'background': 'url(img/list-item.svg) center center no-repeat',
	'background-size': 'contain',
	'display': 'inline-block'
};

$(function () {
	$paragraph.prepend(`
		<i class="item_icon"></i>
	`);
	$(`.item_icon`).css(item_icon_style);
});
