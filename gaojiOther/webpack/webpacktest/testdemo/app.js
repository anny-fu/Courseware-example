// es6 module
import sum from './sum';

// commonJS module
var minus = require('./minus');

// AMD:异步加载，会多一个0.bundle.js文件
require(['./muti'], function(muti) {
  console.log('muti(4,20) =', muti(4, 20));
});

console.log('sum(20,40) =', sum(20, 40));
console.log('minus(80,38) =', minus(80, 38));