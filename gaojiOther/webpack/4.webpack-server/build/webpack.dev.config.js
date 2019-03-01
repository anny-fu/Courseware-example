/**
 * 功能：项目模版
 * 日期：
 **/

const webpack = require('webpack');
const path = require('path');

// ============== 插件部分 ==============
// 热模块替换插件
const HotReplace = new webpack.HotModuleReplacementPlugin();

module.exports = {
    devtool: 'source-map',
	context: path.resolve(__dirname, '../'),
	entry: './src/js/index',
	module: {
        rules: [
            // CSS和Sass
            {
                test: /\.(css|scss)/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ]
            },
            // Babel
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
              }
        ]
    },
    plugins: [HotReplace],
    devServer: {
        // 本地服务器启动所在的目录
        contentBase: "./src",
        // 找不到页面时跳转到index.html
        historyApiFallback: true,
        // 自动刷新
        inline: true,
        // 端口号
        port: 8080
    } 
};
