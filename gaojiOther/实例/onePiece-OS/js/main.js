/**
* 作者：Verning Aulence
* 日期：2014-4-24
* 功能：基本交互功能控制
**/
/************************************/
/* 全局变量 */
/************************************/

// 当前页面的高度
let docHeight = $(document).height();

// 图标的信息
const IconInfo = {
	iconName: "",
	iconURL: "",
	base64Code: ""
};


/************************************/
/* 页面加载完成后的事件 */
/************************************/
$(function() { 
    /* 显示出"main" */
    $("#main").css("display","block").hide().fadeIn(1600);
    /* 设置main的高度 */
    $("#main, #container").css("height",(docHeight - 50 ) + "px");
	
    // 页面载入时根据本地存储对象生成图标
	localDataLoad();

    /* 显示开始面板 */
    $("#startBtn").click(function() {
        toggleStartBlock();
    });
    
    let container = $("#container")
    /* 点击桌面后响应的事件 */
	container.click(function(e) {
        // 隐藏开始面板
        hideStartBlock();
        // 消除图标选中效果
        $(".btnIcon").removeClass("checked");
        // 关闭菜单栏
        closeMouseRightList();
    });

    /* 图标相关事件 */
    $(document).on({
        // 打开文件内容窗口
        dblclick:function() { btnBar_dblclick(); },
        // 添加选中文件样式
        click:function(event) {
            // 阻止向上冒泡事件
            event.stopPropagation();
            btnBar_clickChecked(this); 
        }
    },".btnIcon");
    /* 开始菜单内的图标点击事件 */
    $("#startBlock").on("click",".btnIcon",function() {
        // 隐藏开始面板
        hideStartBlock();
        // 打开文件内容窗口
        btnBar_dblclick();
    });

    /* 点击窗口关闭事件 */
    $(".toolsBtn-closeWin").click(function() {
        // 关闭窗口
        closeWin();
    });
	
    // 全屏
	$(".fullScreen").click(function (e) {
		// 进入全屏
		requestFullScreen();
		setTimeout(function () {
			// 将“main”元素设为和浏览窗口等高
			setEleHeightEqWin(".main, .waterBg");
		},128);
		$(this).remove();
	});
	
    /* 图片上传代理事件 */
	$("body").on("change","#fileSystemIco", function (e) {
		fileUpload(e);
	});

    /**** 窗口大小改变的事件集 ****/
    $(window).resize(function() {
        /* 设置main的高度 */
        $("#main, #container").css("height",(docHeight - 50 ) + "px");
    });

    /**** 系统鼠标默认点击事件的重新设置 ****/
    document.oncontextmenu = function(e){
        //去掉默认的contextmenu事件，否则会和右键事件同时出现
        e.preventDefault();
    };
    // 设置点击右键的事件
	container.mousedown(function(e){
        // 如果点击的是右键
        if(e.button === 2){
        	// 如果点击的是container（右键图标需要单独处理）
        	if($(e.target).is("#container") || $(e.target).is("div.iconBarGroup")) {
				// 执行桌面右键函数
				mouseRightDown(e, this);
			}
        }
    });
	// 图标右键事件
	container.on("mousedown", ".btnIcon", function (e) {
		// 如果点击的是右键
		if(e.button === 2) {
			// 执行图标右键函数
			mouseRightDown_icon(e, "#container");
		}
		
	});
});

/************************************/
/* 方法函数事件 */
/************************************/

/**
 * 功能：页面载入时根据本地存储对象生成图标
 **/
function localDataLoad() {
	// 如果本地存储对象不存在
	if(!localStorage.getItem("OSInfo")) {
		return false;
	}
	// 获取本地存储对象数据
	let localData = JSON.parse(localStorage.getItem("OSInfo")),
		localData_length = localData.length;
	// 获取容器信息，根据容器信息生成图标布局
	const $container = $("#container"),
		$iconBarGroup = $(".iconBarGroup"),
		container_height = $container.height(),
		seatsNum = Math.floor(container_height / 112);
	// 计算出所需容器数量
	const needIconBar = Math.ceil(localData_length / seatsNum);
	for(let i = 0; i < needIconBar; i++) {
		// 如果长度达到当前图标容器的上限，则新增一个图标容器
		$iconBarGroup.append(`
			<div class="w100 h100p ml10 pt10 pb10 iconBar"></div>
		`);
		const $iconBar = $container.children().children(".iconBar");
		for(let i = 0; i < localData_length; i++) {
			// 往页面中最后一个图标容器添加图标
			$iconBar.last().append(`
			<div class="w100 h100 mt10 btnIcon">
				<a href="${localData[i].iconURL}" target="winContentIframe">
					<span class="d-b pos-rel icon">
						<img src="${localData[i].base64Code}">
					</span>
					<span class="w100p h30 d-b txt-ac f14 icon_name">${localData[i].iconName}</span>
				</a>
			</div>
		`);
		$("#startBlock .btnIconGroup").append(`
			<div class="btnIcon">
				<a href="${localData[i].iconURL}" target="winContentIframe">
					<span class="d-ib icon" style="vertical-align:middle">
						<img src="${localData[i].base64Code}">
					</span>
					<span class="d-ib txt-al f14 icon_name" style="vertical-align:middle">${localData[i].iconName}</span>
				</a>
			</div>
		`);
		}
	}
	
	
}

/* 显、隐开始面板 */
function toggleStartBlock() {
    $("#startBlock").slideDown(300);
}

/* 隐藏开始面板 */
function hideStartBlock() {
    $("#startBlock").hide(300);
}
/* 桌面图标单击选中效果 */
function btnBar_clickChecked(thisBtn) {
    $(thisBtn).siblings(".btnIcon").removeClass("checked");
    $(thisBtn).addClass("checked");
}
/* 桌面图标双击 */
function btnBar_dblclick() {
    $(".window").show(300);
}
/**
 * 功能：桌面右键事件
 * 参数1：事件对象
 * 参数2：需要执行该功能的选择器
 **/
function mouseRightDown(ev, thisCont) {
    // 清除已经存在的右键菜单
    closeMouseRightList();
    
    // 获取鼠标位置
    let mouseX = ev.pageX | ev.clientX,
        mouseY = ev.pageY | ev.clientY,
        // 获取当前屏幕高度
        winHight = window.innerHeight - 52,
        // 计算Y设置偏移值
        skewYVal = (mouseY / winHight);
    
    // 根据鼠标位置调整菜单出现的Y坐标
    // 数字285为右键菜单高度的实际，生产环境中需要用JS去获取菜单的高度并进行一定的杂项值运算去处
    mouseY = mouseY - (285 * skewYVal);
    
    // 创建右键菜单
    $(thisCont).append(
        '<div class="mouseRightBtnList" style="left:' + mouseX +'px; top:' + mouseY + 'px">' +
        '<ul>' +
        '<li class="creatFile"><span></span><span>新建</span><span><!--<img src="../images/contImg/icon-gt.png">--></span></li>' +
        '</ul>' +
        '<ul>' +
        '<li class="largeIcon"><span class="mouseRightIco sz-24"></span><span>大图标</span><span></span></li>' +
        '<li class="normalIcon"><span class="mouseRightIco sz-18"></span><span>中图标</span><span></span></li>' +
        '<li class="smallIcon"><span class="mouseRightIco sz-12"></span><span>小图标</span><span></span></li>' +
        '</ul>' +
        '<ul>' +
        '<li class="changeBgImg"><span></span><span>更换壁纸</span><span></span></li>' +
        '<li class="changeResolution"><span></span><span>修改分辨率</span><span></span></li>' +
        '</ul>' +
        '<ul>' +
        '<li class="changeUser"><span></span><span>切换用户</span><span></span></li>' +
        '<li class="closeThisOS"><span></span><span>关闭系统</span><span></span></li>' +
        '</ul>' +
        '</div>'
    );
    // 将右键菜单显示出来
    $(".mouseRightBtnList").fadeIn(200);
    
    // 绑定右键菜单的相关事件
    $(document).off("click", ".mouseRightBtnList li").on({
        // 鼠标进入时
        mouseenter: function() {
            $(this).css("background-color","#b3bfcc") ;
        },
        // 鼠标离开时
        mouseleave: function() {
            $(this).css("background-color","transparent") ;
        },
        // 点击事件
        click: function() {
            // 主要操作区域选择器复用
            let $main = $("#main");
            
            // 判断点击的菜单是否是该项
                // 创建文件
            let isCreatFile = $(this).hasClass("creatFile"),
                // 大图标
                isLargeIcon = $(this).hasClass("largeIcon"),
                // 中图标
                isNormalIcon = $(this).hasClass("normalIcon"),
                // 小图标
                isSmallIcon = $(this).hasClass("smallIcon"),
                // 更改壁纸
                isChangeBgImg = $(this).hasClass("changeBgImg"),
                // 修改分辨率
                isChangeResolution = $(this).hasClass("changeResolution"),
                // 切换用户
                isChangeUser = $(this).hasClass("changeUser"),
                // 关闭系统
                isCloseOS = $(this).hasClass("closeThisOS");
            // 创建文件
            if(isCreatFile) {
                // 关闭菜单栏
                closeMouseRightList();
                // 调用对话框函数，创建新建图标窗口
                dialog({
					type: "form",
					closeButtonShow: false,
					header: "新建图标",
					content: '<form id="iconInfo">' +
                        '<div>' +
                            '<label>图标：</label>' +
                            '<input id="fileSystemIco" name="fileSystemIco" type="file" spellcheck="false">' +
                        '</div>' +
						'<div id="previewIcon"><img src=""></div>' +
                        '<div>' +
                            '<label>名称：</label>' +
                            '<input id="txtIcoName" name="txtIcoName" type="text" spellcheck="false">' +
                        '</div>' +
                        '<div>' +
                            '<label>URL：</label>' +
                            '<input id="urlIcoURL" name="urlIcoURL" type="url" spellcheck="false">' +
                        '</div>' +
                    '</form>',
					confirm: function () {
						const $container = $("#container");
						const container_height = $container.height();
						// 计算一列图标能容纳的个数
						const seatsNum = Math.floor(container_height / 112);
						// 获取当前容器内图标的个数
						const $iconBarGroup = $container.children(".iconBarGroup");
						const $iconBarListLast = $iconBarGroup.children().last();
						const iconCount = $iconBarListLast.children(".btnIcon").length;
						// 首先判断是否存在图标容器
						if($iconBarListLast.length === 0) {
							// 如果不存在则添加一个图标容器
							$iconBarGroup.html(`
								<div class="w100 ha ml10 pt10 pb10 iconBar"></div>
							`);
						}
						// 如果长度达到当前图标容器的上限，则新增一个图标容器
						if(seatsNum === iconCount) {
							$iconBarListLast.after(`
								<div class="w100 ha ml10 pt10 pb10 iconBar"></div>
							`);
						}
						// 获取表单数据
						IconInfo.iconName = $("#txtIcoName").val();
						IconInfo.iconURL = $("#urlIcoURL").val();
						// 往页面中最后一个图标容器添加图标
						$(".iconBar").last().append(`
							<div class="w100 h100 mt10 btnIcon">
								<a href="${IconInfo.iconURL}" target="winContentIframe">
									<span class="d-b pos-rel icon">
										<img src="${IconInfo.base64Code}">
									</span>
									<span class="w100p h30 d-b txt-ac f14 icon_name">${IconInfo.iconName}</span>
								</a>
							</div>
						`);
						$("#startBlock .btnIconGroup").append(`
							<div class="btnIcon">
								<a href="${IconInfo.iconURL}" target="winContentIframe">
									<span class="d-ib icon" style="vertical-align:middle">
										<img src="${IconInfo.base64Code}">
									</span>
									<span class="d-ib txt-al f14 icon_name" style="vertical-align:middle">${IconInfo.iconName}</span>
								</a>
							</div>
						`);
						// 如果本地存储对象不存在
						if(!localStorage.getItem("OSInfo")) {
							// 创建本地存储对象
							localStorage.setItem("OSInfo", "[]");
						}
						// 转换成JS对象
						let localData = JSON.parse(localStorage.getItem("OSInfo"));
						// 将数据push进临时对象
						localData.push(IconInfo);
						// 将数据转换为JSON字符串进行存储
						localStorage.setItem("OSInfo", JSON.stringify(localData));
						//console.log(localData);
					},
					cancel: function () {
						closeDialog();
					}
				});
            }
            // 更改为大图标
            else if(isLargeIcon) {
                // 关闭菜单栏
                closeMouseRightList();
            }
            // 更改为中图标
            else if(isNormalIcon) {
                // 关闭菜单栏
                closeMouseRightList();
            }
            // 更改为小图标
            else if(isSmallIcon) {
                // 关闭菜单栏
                closeMouseRightList();
            }
            // 更换桌面壁纸
            else if(isChangeBgImg) {
                // 关闭菜单栏
                closeMouseRightList();
            }
            // 修改分辨率
            else if(isChangeResolution) {
                // 关闭菜单栏
                closeMouseRightList();
            }
            // 切换用户
            else if(isChangeUser) {
                // 关闭菜单栏
                closeMouseRightList();
				// 调用弹出框函数，并配置
				dialog({
					type: "confirm",
					closeButtonShow: false,
					content: "退出此次登录并跳转到系统登录界面？",
					//footer: ""
					confirm: function () {
						location.href="../index.html";
					},
					cancel: function () {
						closeDialog();
					}
				});
            }
            // 关闭系统
            else if(isCloseOS) {
                // 调用弹出框函数，并配置
				dialog({
					type: "confirm",
					closeButtonShow: false,
					content: "您确定要关闭该系统吗？",
					//footer: ""
					confirm: function () {
						location.href = "about:blank";
						window.close();
					},
					cancel: function () {
						closeDialog();
					}
				});
            }
            else {
                // 关闭菜单栏
                closeMouseRightList();
            }
        }
    },".mouseRightBtnList li");
}
/**
 * 功能：关闭右键菜单栏
 **/
function closeMouseRightList() {
    $(".mouseRightBtnList").fadeOut(200,function() {
        $(this).remove();
    });
}
/* 关闭窗口 */
function closeWin() {
    $(".window").hide(300);
}
/* 更换壁纸 */
function changeBgImage() {
	let imgList = '<div class="imgChooseList">' +
        '<ul>' +
        '<li></li>' +
        '<li></li>' +
        '<li></li>' +
        '</ul>' +
        '</div>'
}
/**
 * 功能：图标右键事件
 * 参数1：事件对象
 * 参数2：需要执行该功能的选择器
 **/
function mouseRightDown_icon(ev, thisCont) {
	// 清除已经存在的右键菜单
	closeMouseRightList();
	
	// 获取鼠标位置
	let mouseX = ev.pageX | ev.clientX,
		mouseY = ev.pageY | ev.clientY,
		// 获取当前屏幕高度
		winHight = window.innerHeight - 52,
		// 计算Y设置偏移值
		skewYVal = (mouseY / winHight);
	
	// 根据鼠标位置调整菜单出现的Y坐标
	// 数字285为右键菜单高度的实际，生产环境中需要用JS去获取菜单的高度并进行一定的杂项值运算去处
	mouseY = mouseY - (285 * skewYVal);
	
	// 创建右键菜单
	$(thisCont).append(
		'<div class="mouseRightBtnList" style="left:' + mouseX + 'px; top:' + mouseY + 'px">' +
			'<ul>' +
				'<li class="modifyInfo"><span></span><span>修改信息</span><span></span></li>' +
				'<li class="deleteIcon"><span></span><span>删除图标</span><span></span></li>' +
			'</ul>' +
		'</div>'
	);
	// 将右键菜单显示出来
	$(".mouseRightBtnList").fadeIn(200);
	
	// 删除图标及对应数据信息
	$(".deleteIcon").click(function () {
		if($(ev.target).hasClass("btnIcon")) {
			$(ev.target).remove();
		} else {
			$(ev.target).closest(".btnIcon").remove();
		}
	});
}

/**
 * 功能：弹出框
 * 参数：{object}
 * type {string} 允许的值有："info"、"confirm"、"form"、"image"
 * closeButtonShow {boolean} 是否显示自带的关闭按钮
 * header {string} 弹出框标题头，允许HTML代码
 * content {string} 弹出框内容，允许HTML代码
 * footer {string} 弹出框页脚，允许HTML代码，弹出框类型为“confirm”和“image”的时候不可用（即不需要设置该项）
 * confirm {function} 确认按钮事件函数，弹出框类型为“info”和“image”的时候不可用
 * cancel {function | boolean:false} 取消按钮事件，默认效果（不设置该项的时候）为关闭弹出框。若值为一个布尔值“false”的时候，“取消”按钮将不显示，“确认”按钮功能等同于“取消”
 **/
function dialog(param) {
	// 默认配置项处理--header
	param.header = typeof(param.header) === "undefined" ? "系统消息" : param.header;
	// 默认配置项处理--content
	param.content = typeof(param.content) === "undefined" ? "" : param.content;
	// 默认配置项处理--footer
	param.footer = typeof(param.footer) === "undefined" ? "" : param.footer;
    
    // 为body添加弹出框
    $("body").append(`
        <dialog class="dialog">
            <div class="maskLayer"></div>
            <div class="dialog-box">
                <i class="dialog-box-close">×</i>
                <div class="header">${param.header}</div>
                <div class="content">${param.content}</div>
                <div class="footer">${param.footer}</div>
            </div>
        </dialog>
    `);
    
    // 存储弹出框内容
	$dialogBox = $(".dialog").last().children(".dialog-box");
    $content = $dialogBox.children(".content");
    $footer = $dialogBox.children(".footer");
	
	// 默认配置项处理--确认事件
	param.confirm = typeof(param.confirm) === "undefined" ? function () {} : param.confirm;
	// 默认配置项处理--取消事件
	if(typeof(param.cancel) === "undefined") {
		param.cancel = function () {
			$footer.html("");
			param.cancel = function () {}
		}
	} else if(param.cancel === false) {
		$footer.html(`
            <button id="dialog-cancel">确定</button>
        `);
		param.cancel = closeDialog;
	} else {
		$footer.html(`
            <button id="dialog-confirm">确定</button>
            <button id="dialog-cancel">取消</button>
        `);
		param.cancel = closeDialog;
    }
	
	// 根据弹出框类型决定弹出框的显示方式
    switch (param.type) {
        case "info":
			$dialogBox.addClass("info");
			$content.addClass("text-center");
			$footer.html(`
				<button id="dialog-confirm">确定</button>
			`);
			param.confirm = closeDialog;
			break;
        case "confirm":
            $dialogBox.addClass("confirm");
			$content.addClass("text-center");
			break;
        case "form":
			$dialogBox.addClass("form");
			$content.addClass("text-center");
			break;
        default:
			$dialogBox.addClass("info");
			$content.addClass("text-center");
			$footer.html(`
				<button id="dialog-info-confirm">确定</button>
			`);
			param.confirm = closeDialog;
    }
    $dialogBoxClose = $(".dialog-box-close");
    // 是否显示关闭按钮
    if(param.closeButtonShow) {
		$dialogBoxClose.css("display","block");
    }
    
    // 确定事件
    $("#dialog-confirm,#dialog-info-confirm").click(function () {
        param.confirm();
		closeDialog();
	});
    // 取消事件
    $("#dialog-cancel").click(function () {
        param.cancel();
		closeDialog();
	});
    // 自带关闭按钮
	$dialogBoxClose.click(function () {
		closeDialog();
	});
	// 弹出框主体放大出现
    setTimeout(function () {
		$dialogBox.addClass("show");
	},0);
}
/**
 * 功能：关闭弹出框
 **/
function closeDialog() {
    let $dialogBox = $("dialog.dialog .dialog-box").last();
	$dialogBox.removeClass("show");
	setTimeout(function () {
		$dialogBox.closest("dialog").remove();
	},128);
}
/**
 * 功能：图片信息获取及图片base64生成并显示
 * 参数：无（内置事件对象）
 **/
function fileUpload(e) {
	// 获取目标文件
	const files = e.target.files;
	// 如果上传的文件类型不为图片则给出提示，中止操作
	if(!/image\/\w+/.test(files[0].type)){
		// 调用弹出框函数，并配置
		dialog({
			type: "info",
			content: "请确保您上传的文件为图像类型"
		});
		return false;
	}
	// 如果图片体积操作50kb给出提示，中止操作
	else if(files[0].size > 51200) {
		// 调用弹出框函数，并配置
		dialog({
			type: "info",
			content: "为节省系统资源，图标的文件体积不要超过50kb，请优化后重新上传"
		});
		return false;
	}
	// 实例化文件读取对象
	const reader = new FileReader();
	// 将文件编码成Data URL（即用Base64来渲染图片的很长的那串代码）
	reader.readAsDataURL(files[0]);
	reader.onload = function(){
		// 获取图片base64码
		let res = this.result;
		// 将图片的src属性修改为图片base64码
		$("#previewIcon > img").attr("src", res);
		// 将值传给全局对象
		IconInfo.base64Code = res;
		console.log(res);
	}
}
/**
 * 功能：进入全屏
 **/
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
/**
 * 功能：重设main的高度
 **/
function setEleHeightEqWin() {
	// 获取浏览器窗口高度
	let win_h = window.innerHeight;
	// 设置元素高度为浏览器窗口高度
	$("main").css("height", win_h + "px");
}

/* 设置显示系统时间 */
(function() {
    // 将显示日期容器存入变量以节约性能
	const dispY = $(".dispYear"),
        dispM = $(".dispMonth"),
        dispD = $(".dispDate"),
        dispHou = $(".dispHours"),
        dispMin = $(".dispMinutes");//,
    //dispSec = $(".dispSeconds");
    // 在DOM加载完成后立即执行
    getDateTime();
    // 每10秒定时执行
    setInterval(function() {
        getDateTime();
    },10000);

    /* 获取系统时间 */
    function getDateTime() {
        // 获取系统的年月日、时分秒
        const nowDate = new Date(),
            nowY = nowDate.getFullYear(),
            nowM = nowDate.getMonth() + 1,
            nowD = nowDate.getDate(),
            nowHou = nowDate.getHours(),
            nowMin = nowDate.getMinutes();

        // 将日期显示出来
        dispY.text(nowY);
        dispM.text(nowM);
        dispD.text(nowD);
        dispHou.text(nowHou);
        dispMin.text(nowMin);
    }
})();



