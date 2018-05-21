/**
 * 功能：公共JS文件
 * 日期：2017-11-15 11:25:01
 **/

/**** 页面加载完成后执行部分 ****/
$(function() {
    // 设置页头
    writeHeader("项目使用gulp构建基本流程");
    // 点击显示全屏相册
    fullScreenImage();
});

/**** 功能函数定义部分 ****/
/**
 * 设置页头
 * @param { String } 设置页头的文本
 */
function writeHeader(str) {
	$("header").text(str);
}

/**
 * 点击显示全屏相册
 */
function fullScreenImage() {
    // 清除原有的点击事件，绑定新的点击事件
    $(".album-list > li > img").off("click").on("click", function() {
        // 获取路径
        const imgURL = $(this).attr("src");
        // 创建图片显示面板，并绑定关闭事件
        $(`
            <div class="fullScreenPanel" style="background-image: url(${imgURL})"></div>
        `).on({
            // 点击关闭面板
            click() {
                $(this).fadeOut(300, function() {
                    $(this).remove();
                })
            }
        }).appendTo("body");
    });
}

