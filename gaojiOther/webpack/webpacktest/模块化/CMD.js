/*
通用模块规范(Common Module Definition)
一个文件一个模块
定义模块：define     加载模块:require
代表：SeaJS
特点：依赖就近，延迟执行（or 尽可能的懒执行）
源码介绍:https://github.com/cmdjs/specification/blob/master/draft/module.md
*/
// 所有模块都是通过define定义
define(function(require, exports, module) {
  // 通过require引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');

  //   通过exports对外提供接口
  //   exports.doSomething = ...

  //   或者通过module.exports提供整个接口
  //    module.exports = ...

  //   不能直接使用exports = ...这种方式暴露
});