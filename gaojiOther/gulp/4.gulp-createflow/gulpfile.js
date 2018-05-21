const gulp = require("gulp");
// 编译Less
const gulpLess = require("gulp-less");
// 合并文件
const concat = require("gulp-concat");
// 压缩css
const minicss = require("gulp-minify-css");
// 压缩js
const minijs = require("gulp-uglify");
// 重命名文件
const rename = require("gulp-rename");
// 使用babel编译JS版本
const babel = require('gulp-babel');

gulp.task('compileLess', function () {
    gulp.src('style/less/entry.less')
		.pipe(gulpLess())
		.pipe(minicss())
		.pipe(rename("index.css"))
		.pipe(gulp.dest('style/css'));
});

gulp.task('miniconcat', function () {
    gulp.src(['plugin/*.js','!plugin/*.min.js','js/src/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
	.pipe(minijs())
	.pipe(concat('index.js'))
	.pipe(gulp.dest('js'));
});

gulp.task("watch", function () {
	gulp.watch(
        ['style/less/*.less', 'js/src/*.js'],
        ['compileLess','miniconcat']
	);
});

gulp.task("default", ["compileLess","miniconcat"]);




