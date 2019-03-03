/*
异步模块规范(Async Module Definition)
一个文件一个模块
定义模块：define     加载模块:require
代表：RequireJS
特点：依赖前置，提前执行
源码介绍:https://github.com/amdjs/amdjs-api/wiki/AMD
*/
define(
  // 模块名[可省略]
  "alpha",
  // 依赖
  ["require", "exports", "beta"],
  // 模块输出
  function(require, exports, beta) {
    exports.verb = function() {
      return beta.verb();
      //   or  create missing node module:“beta”
      return require("beta").verb();
    }
  }
);


// 或者

define(
  // 依赖
  ["a", "b", "c"],
  // 模块输出
  function(a, b, c) {
    exports.verb = function() {
      //  等于在最前面申明并初始化了要用到的所有模块
      if (false) {
        // 即使没有去用到任何模块，比如这里的b模块，但是b还是提前执行了
        b.foo();
      }
    }
  }
);