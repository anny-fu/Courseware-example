window.onload = function() {
  var toBase64 = document.getElementById('toBase64');
  var toNormal = document.getElementById('toNormal');
  var content = document.getElementById('content');
  var showCode = document.getElementById('showCode');
  toBase64.onclick = function() {
    var contentStr = content.value;
    // 调用“将字符串以Base64编码”函数
    codingBase64(contentStr);
  }
  toNormal.onclick = function() {
    var contentStr = content.value;
    // 调用“将Base64编码转换为字符串”函数
    Base64String(contentStr);
  }
}

/**
 * 功能：将字符串以Base64编码
 * 参数：文本字符串
 **/
function codingBase64(str) {
  var strToBase64 = btoa(encodeURIComponent(str));
  showCode.textContent = strToBase64;
}
/**
 * 功能：将Base64编码转换为字符串
 * 参数：文本字符串
 **/
function Base64String(str) {
  var Base64ToStr = decodeURIComponent(atob(str));
  // 将解析后的对象属性的值写入显示容器元素
  showCode.textContent = Base64ToStr;
}