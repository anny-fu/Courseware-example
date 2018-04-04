
/**
 * 功能：自定义AJAX请求插件
 * 开发人员：Tom.Anny
 * 日期：2017/12/5
 */

/**
 * *
 * 数据请求构造函数
 * */
function RequestData(){
    /**
     * 功能：文本数据请求
     * 参数：1，URL地址I(String);2，回调函数(Function)
     * */
    this.getText = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var text = xhr.responseText;
                    callback(text);
                }else{
                    alert('数据请求错误！');
                }
            }
        }
    }

    /**
     * *请求json数据
     * 参数：1，URL地址I(String);2，回调函数(Function)
     * */
    this.getJSON = function(url,callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            var jsonTxt = xhr.responseText;
            var data = JSON.parse(jsonTxt);
            callback(data);
        }
        xhr.open('GET',url);
        xhr.send();
    }
}
window.ajax = new RequestData();

/**
 * *功能：参数序列化
 * 参数：原生对象(Object)
 * */

function param(obj){
    var typeVal = Object.prototype.toString.call(obj);
    typeVal = typeVal.slice(typeVal.indexOf(' ') + 1,
        typeVal.lastIndexOf(']')).toLowerCase();
    console.log(typeVal);
    if(typeVal !== "object"){
        console.error("该函数的参数只能是一个原生对象！");
        return typeof(typeVal);
    }
    var paramArr = [],paramStr = '';
    //attrName + = + attrVal&
    for(var x in obj){
        paramStr = x +"="+encodeURIComponent(obj[x]);
        // encodeURIComponent()编码的字符串范围比encodeURI()广
        //对字符编码的区别：
        //encodeURI还不对：ASCII字母和数字 ~!@#$%&*()=:/,;?+编码
        //encodeURIComponent不对：ASCII字母和数字 ~!*()编码；

        paramArr.push(paramStr);
    }
    console.log(paramArr);
    var result = paramArr.join('&');
    return result;

}