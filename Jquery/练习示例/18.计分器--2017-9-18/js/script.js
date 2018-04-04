document.onreadystatechange = function () {
    // 该方法有4个状态
    // 1、uninitialized（还未开始载入）
    // 2、loading（载入中）
    // 3、interactive（已加载，文档与用户可以开始交互）
    // 4、complete（载入完成）
    //Jquery的ready事件等同于DOMContentLoaded
    if (document.readyState == "interactive") {
        // 正文部分
        var main = document.getElementById("main");
        var content = "";
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
		`;
        content += `<div id="score"><label>实得分数：</label><span>0<span></div>`;
        main.innerHTML = content;

        // 输入框
        var input = document.getElementsByTagName("input"),
            input_leng = input.length;
        // 重置
        var reset = document.getElementById("reset");
        // 计算按钮
        var calcRes = document.getElementById("calcRes");
        // 结果分数
        var score = document.getElementById("score"),
            scoreVal = score.getElementsByTagName("span")[0];


        // 计算按钮
        calcRes.onclick = function () {
            // count = 0;
          var count  = 0;
            for (let i = 0; i < input_leng; i++) {
                var val = Number(input[i].value);
                if (isNaN(val)) {
                    var val = 0;
                }
                count += Number(input[i].value);
            }
            var res = 100 - count;
            scoreVal.textContent = res;
        }
        reset.onclick = function () {
            for (let i = 0; i < input_leng; i++) {
                input[i].value = "";
            }
            scoreVal.textContent = 0;
            count = 0;
        }
        for (let i = 0; i < input_leng; i++) {
            input[i].onfocus = function () {
                this.previousElementSibling.className = "lblFocus";
            }
            input[i].onblur = function () {
                this.previousElementSibling.className = "";
            }
            input[i].onkeyup = function () {
                var thisNum = this.value;
                if (thisNum > 5) {
                    this.value = 5;
                }
            }
        }
        try {
            for (let i = 0; i < input_leng; i++) {
                input[i].onkeydown = function (e) {
                    console.log(e.keyCode);
                    /* 小键盘加号“+”或者“→”跳向下一个 */
                    if (e.keyCode == 107 || e.keyCode == 39) {
                        e.preventDefault();
                        this.nextElementSibling.nextElementSibling.focus();
                    }
                    /* 小键盘减号“-”或者“←”跳向上一个 */
                    else if (e.keyCode == 109 || e.keyCode == 37) {
                        e.preventDefault();
                        this.previousElementSibling.previousElementSibling.focus();
                    }
                    /* 小键盘星号“*”或空格键重置 */
                    else if (e.keyCode == 106 || e.keyCode == 32) {
                        e.preventDefault();
                        reset.onclick();
                        input[0].focus();
                    }
                    /* 回车计算结果 */
                    else if (e.keyCode == 13 || e.keyCode == 108) {
                        calcRes.onclick();
                    }
                }
            }
        }
        catch (errInfo) {
            console.warn("手动忽略了一段错误信息：" + errInfo);
        }
    }
}