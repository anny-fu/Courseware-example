/**
 * 功能：Gulp入门配置文件
 * 日期：2017-11-13
 **/
// 请求gulp主模块
const gulp = require("gulp");
// 请求gulp-less插件模块（编译less为CSS，属于CSS预处理）
const gulpLess = require("gulp-less");
// 请求gulp-autoprefixer模块（CSS自动前缀，属于CSS后处理）
const autoprefixer = require("gulp-autoprefixer");

// 定义默认任务
gulp.task("default", function() {
	// 任务针对的文件
	gulp.src("style/less/*.less")
		// 调用执行gulpLess模块
		.pipe(gulpLess())
		//调用执行gulp-autoprefixer模块
		.pipe(autoprefixer())
		// 指定编译后生成CSS文件目录
		.pipe(gulp.dest("style/css"));
});




/*// 定义一个名为compileLess任务
gulp.task("compileLess", function () {
	// 任务针对的文件
	gulp.src("style/less/*.less")
		// 调用执行gulpLess模块
		.pipe(gulpLess())
		//调用执行gulp-autoprefixer模块
		.pipe(autoprefixer())
		// 指定编译后生成CSS文件目录
		.pipe(gulp.dest("style/css"));
});*/

