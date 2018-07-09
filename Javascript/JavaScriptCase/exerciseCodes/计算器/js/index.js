/*
 * @Author: tom.anny 
 * @Date: 2018-06-22 17:43:31 
 * @Last Modified by: tom.anny
 * @Last Modified time: 2018-06-22 17:48:09
 */

//  获取元素
var firstNum = document.getElementById('firstNum'),
  lastNum = document.getElementById('lastNum'),
  fuhao = document.getElementById('fuhao'),
  text = document.getElementById('text');
//  声明变量存储数字和符号以及结果
var num1 = 0,
  num2 = 0,
  fh = 1,
  result = 0;
//  监听输入框值变化事件
firstNum.oninput = function() {
  num1 = this.value;
  console.log(num1);
  //    方法二：调用封装运算函数
  result = calculator(num1, num2, fh);
  /*方法一：不封装*/
  ////    判断值是否为空，如果为空直接返回0
  //     num1 = Number(num1),num2 = Number(num2);
  //     if(num1 === '' || num2 === ''){
  //       result = 0;
  //      return result;
  //     }
  ////     如果不为空
  //    switch(fh){
  //      case 1:
  //        result = num1 + num2;
  //        break;
  //      case 2:
  //        result = num1 - num2;
  //        break;
  //      case 3:
  //        result = num1 * num2;
  //        break;
  //      case 4:
  //        result = num1 / num2;
  //        break;
  //      case 5:
  //        result = num1 % num2;
  //        break;
  //      default:
  //        result = 0;
  //    }

  //    结果显示
  text.innerHTML = result;
}
lastNum.oninput = function() {
  num2 = this.value;
  console.log(num2);
  //    调用运算函数
  result = calculator(num1, num2, fh);

  //    结果显示
  text.innerHTML = result;
}

//监听下拉列表改变
fuhao.onchange = function() {
    fh = Number(this.value);
    console.log(fh);
    //    调用运算函数
    result = calculator(num1, num2, fh);
    //    结果显示
    text.innerHTML = result;
  }
  /**
   * 功能：计算函数
   * 参数：1,数字一；2，数字二；3，运算符
   * return：计算结果
   * */
function calculator(n1, n2, fh) {
  //    判断值是否为空，如果为空直接返回0
  var num1 = Number(n1),
    num2 = Number(n2);
  if (num1 === '' || num2 === '') {
    return 0;
  }
  //     如果不为空
  switch (fh) {
    case 1:
      return num1 + num2;
    case 2:
      return num1 - num2;
    case 3:
      return num1 * num2;
    case 4:
      // 除法结果保留2位小数
      return (num1 / num2).toFixed(2);
    case 5:
      return num1 % num2;
    default:
      return 0;
  }
}