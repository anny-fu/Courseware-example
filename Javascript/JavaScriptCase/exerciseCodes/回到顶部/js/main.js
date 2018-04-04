/**
 * Created by LiHongyao on 2017/4/18.
 */


var  oBtn = document.getElementById('backToBtn');
var offset = 0;

// events
addEvent(window, 'scroll', function() {
    // document.documentElement.scrollTop
    // document.body.scrollTop（兼容 chrome）
    offset = document.documentElement.scrollTop || document.body.scrollTop;
    if (offset > 200) {
        oBtn.style.opacity = 1;
    }else {
        oBtn.style.opacity = 0;
    }
});

addEvent(oBtn, 'click', function() {
    var duration = 500;
    var interval = 15;
    var speed    = Math.ceil(offset / (duration / interval));

    var t = setInterval(function () {
        if(offset > 0) {
            document.documentElement.scrollTop = document.body.scrollTop = offset - speed;
        }else {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            clearInterval(t);
        }
    }, interval);
});


// functions
function addEvent(target, type, callBack) {
    if(target.addEventListener) {
        addEvent = function (target, type, callBack) {
            target.addEventListener(type, callBack, false);
        }
    }else {
        addEvent = function (target, type, callBack) {
            target.attachEvent('on' + type, callBack);
        }
    }
    addEvent(target, type, callBack);
}