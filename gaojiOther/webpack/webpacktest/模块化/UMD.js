/*
通用解决方案(Universal Module Definition)
三个步骤：
1.判断是否支持AMD
2.判断是否支持CommonJS
3.如果都没有 使用全局变量
*/

// 依赖单个组件暴露单个方法
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
}(this, function($) {
  //    方法
  function myFunc() {};

  //    暴露公共方法
  return myFunc;
}));


// 依赖多个组件并暴露多个方法

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'), require('underscore'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery, root._);
  }
}(this, function($, _) {
  //    方法
  function a() {}; //    私有方法，因为它没被返回 (见下面)
  function b() {}; //    公共方法，因为被返回了
  function c() {}; //    公共方法，因为被返回了

  //    暴露公共方法
  return {
    b: b,
    c: c
  }
}));