/**
 * 功能：Gulp入门配置文件
 * 日期：2017/6/11
 **/

const gulp = require("gulp");
const gulpLess = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");

// 定义一个compileLess任务
gulp.task("compileLess", function () {
	// 任务针对的文件
	gulp.src("style/less/*.less")
		.pipe(gulpLess())
		.pipe(autoprefixer())
		.pipe(gulp.dest("style/css"));
});

gulp.task("watch", function () {
	gulp.watch("style/less/*.less",["compileLess"]);
});
