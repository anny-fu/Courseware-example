/**
 * 功能：Webpack配置文件
 * 日期：2017-6-8
 **/

const webpack = require('webpack');
const path = require('path');

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, 'src'),
	entry: './js/index',
	output: {
		path: path.resolve(__dirname, "dist/assets"),
		filename: 'app.js',
		publicPath: 'dist/assets/'
	},
	module: {
		rules: [
			// CSS和less处理
			{
				test: /\.(css|less)$/,
				use:  [
					{
						loader: "style-loader" // 从JS字符串创建样式节点
					}, 
					{
						loader: "css-loader" // 将CSS转换成普通JS
					}, 
					{
						loader: "less-loader" // 将Less编译为CSS
					}
				]
			},
			// 图片处理
			{
				test: /\.(gif|jpe?g|png)\??.*$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 小于8kb则将图片转换为base64格式渲染，如果大于8kb，则编译生成一个新的图片到publicPath指定的目录
							limit: 8192
						}
					}
				]
			},
			// 字体图标处理
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	}
};
