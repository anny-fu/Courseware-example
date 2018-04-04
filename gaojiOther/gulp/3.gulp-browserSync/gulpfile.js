/**
 * 功能：Gulp入门配置文件
 * 日期：2017/6/11
 **/

const gulp = require("gulp");
const gulpLess = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");

// 创建一个browser-sync任务
gulp.task('browserSync', function() {
	browserSync({
		// 服务配置
		server: {
			// 设置服务器根目录
			baseDir: './'
		}
	})
});

// 定义一个testLess任务
gulp.task("compileLess", function () {
	// 任务针对的文件
	gulp.src("style/less/*.less")
		.pipe(gulpLess())
		.pipe(gulp.dest("style/css"))
		.pipe(autoprefixer())
		.pipe(browserSync.reload({
			stream: true
		}));
});

// 按任务顺序执行
gulp.task("watch", ["browserSync","compileLess"],function () {
	gulp.watch("style/less/*.less",["compileLess"]);
});
