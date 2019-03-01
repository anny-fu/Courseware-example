const $ = require('jquery');

const $snowGirl = $('.snowGirl').children('img');

exports.setoriginal = function () {
    $snowGirl.animate({
        width: '580px'
    },300);
}

exports.setMedium = function () {
    $snowGirl.animate({
        width: '460px'
    },300);
}

exports.setSmall = function () {
    $snowGirl.animate({
        width: '320px'
    },300);
}