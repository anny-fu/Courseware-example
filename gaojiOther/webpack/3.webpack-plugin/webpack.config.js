/**
 * 功能：Webpack配置文件
 * 日期：2017-6-8
 **/

const webpack = require('webpack');
const path = require('path');

// CSS剥离
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// CSS输出
const outputStyle = new ExtractTextWebpackPlugin("style.css");
// CSS压缩插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 实例化CSS压缩插件
const cssMini = new OptimizeCssAssetsPlugin({
	// 资源名称匹配
	assetNameRegExp: /\.css$/g,
	// 依赖第三方CSS处理器“cssnano”
	cssProcessor: require('cssnano'),
	// CSS处理器“cssnano”的配置
	cssProcessorOptions: { 
		// 移除CSS注释
		discardComments: { removeAll: true } 
	},
	// 允许打印
	canPrint: false
});

// 文件压缩
let jsMini = new webpack.optimize.UglifyJsPlugin({
	// 是否保留注释
	comments: false,
	// 压缩配置
	compress: {
		// 禁用警告信息
		warnings: false
	}
});

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, 'src'),
	entry: './js/index',
	output: {
		path: path.resolve(__dirname, "dist/assets"),
		filename: 'app.js'
	},
	module: {
		rules: [
			// CSS和less处理
			{
				test: /\.(css|less)$/,
				use: ExtractTextWebpackPlugin.extract([
					'css-loader',
					'less-loader'
				])
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
			},
			// babel处理
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				  	loader: 'babel-loader',
				  	options: {
						presets: ['env']
					}
				}
			}
		]
	},
	// 使用插件
	plugins: [outputStyle,cssMini,jsMini]
	// plugins: [outputStyle]
};
