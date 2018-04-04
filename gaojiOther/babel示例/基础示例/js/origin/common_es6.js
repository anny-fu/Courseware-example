/**
 * 功能：公共功能JS文件（未编译的ES6文件）
 * 日期：2017/4/15
 **/

let $body = $(`body`);
const contentArr = ['Babel简要介绍', '基本概念', '该页面由柯宇的老师制作，若涉及到法律相关问题，请直接找柯宇的麻烦，谢谢！'];

let setTheme = (element, color) => {
	$(element).css('backgroundColor', color);
};

$body.html(`
	<header><h1>${contentArr[0]}</h1></header>
	<main>
		<h2>${contentArr[1]}</h2>
		<div>
			<p>Babel的主要用途是能把你写的JavaScript文件变成其他版本的JavaScript。本例Babel使用的版本为目前的最新版本“6.24.1”。</p>
			<p>比如，由于ES6（ECMAScript标准的第六版，简称“ES2015”或“ES6”）更加合理的语法特性，以及更多新增的属性和方法，现在已慢慢成为主流，被Web前端开发者所“追逐”。但是ES6在国内却面临一个非常致命的问题，就是除了Google Chrome（包括version 55.0和之后版本，其它浏览器以这个版本发布的时间作为参考）以外的浏览器，没有一个浏览器能完全支持ES6的语法的。</p>
			<p>而Babel的出现，很大程度解决了上述问题，它能将开发者用ES6写的JS文件尽可能完美地转换为ES5（ECMA组织2010年发布的脚本语言标准）的语法，也就是说，开发者可以在项目中任性地使用ES6的语法了。当然，把JS文件从ES6转到ES5并不是它的唯一用途。</p>
			<p>需要说明的是bable也是一个基于node的项目，也就是说要确保你的电脑里已经安装好了最新版本的nodeJS，npm（或cnpm）能正常的使用，并且项目内已经用<code>npm init</code>命令创建好了<file>package.json</file>文件。</p>
			<p>Babel的使用非常简单，只要你有过npm使用的相关经验，那网上任何一篇Babel的入门教程（前提是笔者不是来报复社会的）都可以让你学会Babel的使用。</p>
			<p>但是如果你想真正学好babel，尤其是学会babel和其它现有流行的构建工具（如webpack）一起使用虽说谈不上多难，也绝对不会太简单。但当你熟练掌握了这些构建工具的使用，那你的项目产出将会是非常优秀的，这也是你成为一个合格前端开发工程师的重要证明。</p>
		</div>
	</main>
	<footer>${contentArr[2]}</footer>
`);

setTheme('header, footer','#237dfd');
