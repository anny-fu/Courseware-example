 /**
  * 功能：Webpack配置文件
  * 日期：2017-6-8
  **/

 const webpack = require('webpack');
 const path = require('path');

 // 导入“html-webpack-plugin”的配置
 const htmlPlugin = require('./webpack.html.plugin');
 // 导入加载器的配置
 const loaderConfig = require('./loader.config');

 // 打包后静态资源路径
 const staticAssets = 'static/';

 // CSS压缩插件
 const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 const cssPress = new OptimizeCssAssetsPlugin();



 // 文件压缩
 const compress = new webpack.optimize.UglifyJsPlugin({
     comments: false, //是否压缩注释
     compress: {
         warnings: false //取消警告
     }
 });

 // 核心配置部分
 module.exports = {
     context: path.resolve(__dirname, '../'),
     devtool: 'inline-source-map',
     entry: {
         main: './src/scripts/main',
         home: './src/scripts/home',
         goods: './src/scripts/goods',
         cart: './src/scripts/cart',
         me: './src/scripts/me'
     },
     output: {
         path: path.resolve(__dirname, "../dist/"),
         filename: staticAssets + 'js/[name]-bundle.js',
         publicPath: "http://127.0.0.1:8080/"
     },
     // 解析
     resolve: {
         // 创建别名
         alias: {
             // CSS初始化
             'normalize-css': 'bootstrap/less/normalize.less',
             // 字体图标
             'font-icon': 'font-awesome/css/font-awesome.css'
         }
     },
     module: {
         //  加载的loader.config.js
         rules: loaderConfig.config
     },
     // 此处是 将板块分离开发
     plugins: [
         // 样式剥离
         loaderConfig.styles,
         // 主页编译
         htmlPlugin.mainCompile,
         // 首页编译
         htmlPlugin.homeCompile,
         // 商品编译
         htmlPlugin.goodsCompile,
         // 购物车编译
         htmlPlugin.cartCompile,
         // 个人中心编译
         htmlPlugin.meCompile,
         // 配置全局依赖的库和插件
         new webpack.ProvidePlugin({
             axios: 'axios',
             $: 'jquery',
             jQuery: 'jquery'
         })
     ]
 };
 console.info("开始编译...");