#Gulp的4个API
1. gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
2. gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
3. gulp.dest(path[, options]) 处理完后文件生成路径
4. gulp.watch(globs[,opts,cb]);用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩或编译等

#Gulp常用插件介绍
1. 编译
     gulp-less：编译less文件
     gulp-sass：编译sass文件
     gulp-sourcemaps：生成map文件（资源映射），便于调试
     gulp-babel：ES6 ----> ES5

2. 压缩
     gulp-clean-css:压缩css文件
     gulp-uglify:压缩JS文件
     gulp-imagemin：压缩图片
     gulp-htmlmin：压缩html文件

3. 代码同步
   browser-sync ：自动刷新，当代码变化时，它可以帮我们自动刷新页面

4. 工具
     gulp-load-plugins：自动加载插件

5. 文件操作
     gulp-concat：用来把多个文件合并为一个文件。我们可以用它来合并js或css文件等，这样就能减少页面的http请求数。

6. 自动注入
     gulp-autoprefixer：自动为css添加浏览器前缀。








