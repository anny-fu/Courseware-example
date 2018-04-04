/*************************************/
/* 全局变量部分 */
/*************************************/

/*************************************/
/* 页面加载完成后的事件部分 */
/*************************************/
$(function() {
    // 将“main”元素设为和浏览窗口等高
    setEleHeightEqWin(".main, .waterBg");

    // 页面加载完成后调整登陆框位置
    setLoginBoxPos();

    // 点击Sunny后出现密码框
    $(".sunnyShip").click(function() {
        $(this).animate({
            "margin-left": "300px"
        },600,function() {
            $(this).slideUp(300);
            $(".userInput").css("display", "block");
        });

    });

    // 验证密码输入
    let enter = $("#enter");
	enter.click(function() {
        verifyPwdEnter();
    });
	enter.keypress(function (e) {
		if(e.which === 13) {
			verifyPwdEnter();
		}
	});
	
    let userPwd = $("#userPwd");
    // 密码框获得焦点暂停“航海”动画效果
	userPwd.focusin(function() {
        pauseAnimation(".waterBg");
    });
    // 密码框失去焦点开始“航海”动画效果
	userPwd.focusout(function() {
        runningAnimation(".waterBg");
    });
    
	$(".fullScreen").click(function (e) {
		// 进入全屏
		requestFullScreen();
		setTimeout(function () {
			// 将“main”元素设为和浏览窗口等高
			setEleHeightEqWin(".main, .waterBg");
		},128);
		$(this).remove();
		setEleHeightEqWin(".main");
	});
    // 退出全屏
    //exitFullscreen();

    /**** 窗口缩放事件 ****/
    $(window).resize(function() {
        // 将“main”元素设为和浏览窗口等高
        setEleHeightEqWin(".main");
    });
});

/*************************************/
/* 方法函数事件 */
/*************************************/

/**  
* 功能：使一个容器高度等于当前页面高度
* 参数：1、元素选择符
* 最后修改日期：2016年7月18日00:26:10
* 创建人：魏叶
**/
function setEleHeightEqWin(ele) {
    // 获取浏览器窗口高度
    let win_h = window.innerHeight;
    // 设置元素高度为浏览器窗口高度
    $(ele).css("height", win_h + "px");
}

/**  
* 功能：页面加载完成后调整登陆框位置
* 参数：无
* 最后修改日期：2016年7月18日00:28:07
* 创建人：魏叶
**/
function setLoginBoxPos() {
    // 获取浏览器窗口高度
    let win_h = window.innerHeight,
        // 获取登陆框元素
        loginWin = $(".loginWin"),
        loginWin_h = loginWin.outerHeight(),
        // 计算出登陆框需要距离窗口顶部的距离
        result_top = (win_h / 2) - (loginWin_h / 2);
    loginWin.animate({
        "top": result_top + "px"
    },1200);
}

/**
* 功能：登录按钮后的验证
**/
function verifyPwdEnter() {
    // 设置一个模拟密码
    let virtualPwd = (parseInt("0001",2).toString(10)) + (parseInt("0010",2).toString(10)) + (parseInt("0011",2).toString(10)) + (parseInt("0100",2).toString(10)) + (parseInt("0101",2).toString(10)) + (parseInt("0110",2).toString(10)),
		userPwd = $("#userPwd"),
        // 获取密码输入
        inputPwd = userPwd.val();
    // 判断密码输入
    if(virtualPwd === inputPwd) {
        // 输入正确，进入系统
		location.assign("html/main.html");
    } else {
        alert("密码输入错误，请重新输入！");
        // 输入错误清空输入框
		userPwd.val("").focus();
    }
}

/** 
* 功能：一个元素在获得焦点时暂停一个动画效果
* 参数：需要暂停动画元素的选择符
**/
function pauseAnimation(pauseEle) {
    $(pauseEle).css("animation-play-state", "paused");
}
/** 
* 功能：一个元素在失去焦点时开始一个动画效果
* 参数：需要开始动画元素的选择符
**/
function runningAnimation(runningEle) {
    $(runningEle).css("animation-play-state", "running");
}
/* 进入全屏 */
function requestFullScreen() {
    let de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } 
    else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } 
    else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
/* 退出全屏*/
function exitFullscreen() {
    let de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } 
    else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } 
    else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
}
