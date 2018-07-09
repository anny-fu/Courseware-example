//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
  less = require('gulp-less'), //less
  sourcemaps = require('gulp-sourcemaps'), //资源映射
  autoprefixer = require('gulp-autoprefixer'), //添加浏览器前缀
  browserSync = require("browser-sync").create(), //检测less文件
  cleanCSS = require('gulp-clean-css'), //压缩css
  htmlmin = require('gulp-htmlmin'); //压缩html




// 创建一个browser-sync任务
gulp.task('browserSync', function() {
  browserSync.init({
    // 服务配置
    server: {
      // 设置服务器根目录
      baseDir: './dist'
    }
  })
});

//定义一个compile-less任务（自定义任务名称）
gulp.task('compile-less', function() {
  gulp.src('src/less/*.less') //该任务针对的文件
    .pipe(less()) //编译less
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/css'))

});
// 压缩css文件后输出
gulp.task('cleanCSS', function() {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
});
gulp.task('minifyhtml', function() {
  gulp.src('./*.html')
    .pipe(htmlmin({
      // 1. 清除html注释	
      removeComments: true,
      // 2. 清除空格(压缩)
      collapseWhitespace: true,
      // 3. 省略布尔属性的值 <input checked="true"/> ==> <input />
      collapseBooleanAttributes: true,
      // 4. 删除所有空格作属性值 <input id="" /> ==> <input />
      removeEmptyAttributes: true,
      // 5. 删除<script>的type="text/javascript"
      removeScriptTypeAttributes: true,
      // 6. 删除<style>和<link>的type="text/css"
      removeStyleLinkTypeAttributes: true,
      // 7. 压缩页面css
      minifyCSS: true,
      // 8. 压缩页面js
      minifyJS: true
    }))
    .pipe(gulp.dest('dist/'))
    // 实时刷新
    .pipe(browserSync.reload({ stream: true })); //将会在src/css下生成index.css
});

gulp.task('watch', ['browserSync', 'compile-less', 'cleanCSS', 'minifyhtml'], function() {
  gulp.watch("src/less/*.less", ["compile-less"]); //实时监测编译less
  console.log("编译完成！");
}); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务