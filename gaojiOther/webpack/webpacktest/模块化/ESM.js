/*
一个文件一个模块(EcmaScript Module)
加载模块:import   暴露模块 ：export
代表：ES6
*/

// Default exports and named exports
// 导入mylib模块下面的默认方法，和默认方法依赖的两个方法
import theDefault, { named1, named2 } from 'src/mylib';
// 等同于
import theDefault from 'src/mylib';
import { named1, named2 } from 'src/mylib'

// Renameing :import named1 as myNamed1
// 只是将named1重命名为myNamed1
import { named1 as myNamed1, named2 } from 'src/mylib';

// Importing the module as an object  (with one property per named export)
// 引入当前模块的所有方法
import * as mylib from 'src/mylib';

// only load the module ,don't import anything
// 只加载，但未引用暴露的任何接口或方法
import 'src/mylib'





// exprot暴露
// 直接暴露变量或者方法
export var myVar1 = "";
export function myFunc() {};

// default关键字暴露方式(可以是值，对象，字符串，匿名函数，类等等)
export default 123;
export default function(x) {
  return x;
}
export default x => x;
export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// 或者先定义，最后来选择性暴露
const MY_CONST = "";

function myFunc() {}

export { MY_CONST, myFunc };
export { MY_CONST as THE_CONST, myFunc as theFunc };

export * from 'src/other_module';
export { foo, bar }
from 'src/other_module';

// Export other_module's foo as myFoo
export { foo as myFoo, bar }
from 'src/other_module';