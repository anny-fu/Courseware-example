// html文件编译
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 打包后静态资源路径
const staticAssets = 'static/';

// 主页编译
exports.mainCompile = new HtmlWebpackPlugin({
	// 输出的子目录及完整文件名
	filename: 'index.html',
	// 设置JS文件插入的位置，可选：“true/body”，“head”
	inject: 'true',
	// 需要引用的原模版文件
	template: 'src/index.html',
	// 指定输出文件所依赖的入口文件（*.js）的[name]，这里的值是由“entry”（入口）属性内定义的
	chunks: ['main']
});
// 首页编译
exports.homeCompile = new HtmlWebpackPlugin({
	filename: staticAssets + 'doc/home.html',
	inject: 'true',
	template: 'src/doc/home.html',
	chunks: ['home']
});
// 商品编译
exports.goodsCompile = new HtmlWebpackPlugin({
	filename: staticAssets + 'doc/goods.html',
	inject: 'true',
	template: 'src/doc/goods.html',
	chunks: ['goods']
});
// 购物车编译
exports.cartCompile = new HtmlWebpackPlugin({
	filename: staticAssets + 'doc/cart.html',
	inject: 'true',
	template: 'src/doc/cart.html',
	chunks: ['cart']
});
// 个人中心编译
exports.meCompile = new HtmlWebpackPlugin({
	filename: staticAssets + 'doc/me.html',
	inject: 'true',
	template: 'src/doc/me.html',
	chunks: ['me']
});