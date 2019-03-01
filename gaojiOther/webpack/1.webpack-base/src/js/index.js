const $ = require('jquery');
const mod = require('./modules');
const exp = require('./exports');

/**** 直接调用“modules.js”模块函数 ****/
mod();

/**** 按需调用“exports.js”模块里的函数 ****/
// 原始尺寸
$('.setoriginal').on('click', function() {
    exp.setoriginal();
});
// 中等图片
$('.setMedium').on('click', function() {
    exp.setMedium();
});
// 小图片
$('.setSmall').on('click', function() {
    exp.setSmall();
});