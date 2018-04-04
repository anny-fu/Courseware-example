/**
 * 功能：记分器(记录扣除分数)
 * 开发人员：Tom.Anny
 * 日期：2017/12/12
 */
// 该方法有4个状态
// 1、uninitialized（还未开始载入）
// 2、loading（载入中）
// 3、interactive（已加载，文档与用户可以开始交互）
// 4、complete（载入完成）
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        var $main = $('#main');
        var content = "";
        //动态生成输入框
        for (let i = 0; i < 20; i++) {
            content += `
				<label>${i + 1}.</label>
				<input type="text" maxlength="1">
			`;
        }
        content += `
			<div class="btnGroup">
				<button id="reset" type="button">重置</button>
				<button id="calcRes" type="button">计算</button>
			</div>
			<div id="score"><label>实得分数：</label><span>0<span></div>
		`;
        $main.append(content);

        //输入框
        var $input = $("input[type='text']");

        // 结果分数
        var $scoreVal = $('#score>span');
        var count;
        // 计算按钮
        $('#calcRes').click(function () {
            count = 0;
            $input.each(function () {
		        if (isNaN($(this).val())){
			        $(this).val(0);
		        }
		        count += Number($(this).val());
	        })
            $scoreVal.text(100 - count);
        })
        // 重置
        $('#reset').click(function () {
            $input.each(function () {
                $(this).val('');
            })
            $scoreVal.text(0);
        });

        // 设置所有input元素的获取焦点和失去焦点事件
        $input.focus(function () {
            $(this).prev().addClass('lblFocus');
        });
        $input.blur(function () {
            $(this).prev().removeClass('lblFocus');
        });
        $input.keyup(function () {
            if ($(this).val() > 5)
                $(this).val(5);
        });

        //设置数字键盘和方向键，回车键的事件
        $input.keydown(function(e){
            console.log(e.keyCode);
            /* 小键盘加号“+”或者“→”跳向下一个 */
            if (e.keyCode == 107 || e.keyCode == 39) {
                e.preventDefault();
                $(this).next().next().focus();
            }
            /* 小键盘减号“-”或者“←”跳向上一个 */
            else if (e.keyCode == 109 || e.keyCode == 37) {
                e.preventDefault();
                $(this).prev().prev().focus();
            }
            /* 小键盘星号“*”或空格键重置 */
            else if (e.keyCode == 106 || e.keyCode == 32) {
                e.preventDefault();
                $('#reset').click();
                $input.eq(0).focus();
            }
            /* 回车计算结果 */
            else if (e.keyCode == 13 || e.keyCode == 108) {
                $('#calcRes').click();
            }
        });
    }
}