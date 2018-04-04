
var form = document.querySelector("form");

//设置事件代理
form.addEventListener("focusin",function(event){
	//如果是input获得焦点
	if(event.target.tagName.toLowerCase() == "input"){
		if(event.target.previousElementSibling){//如果target是同意协议的checkbox 就不执行下面的代码
			event.target.previousElementSibling.style.display = "none";//设置input上面的提示文字隐藏
			//设置下面的输入的格式的提示信息
			event.target.parentElement.nextElementSibling.querySelector("span").innerHTML = event.target.getAttribute("data-tip")
		}
	}
});
//设置失去焦点的代理事件
form.addEventListener("focusout",function(){
	if(event.target.tagName.toLowerCase() == "input"){
		if(event.target.value == ""){//如果用户没有输入信息，就还原样式
			event.target.previousElementSibling.style.display = "inline";
			event.target.parentElement.nextElementSibling.querySelector("span").innerHTML = ""
		}else{//如果用户输入了信息，就做判断
			var input_str = event.target.value;//获取用户输入的信息
			var result = "";
			//根据id进行不同的判断
			switch(event.target.getAttribute("id")){
				case "username":result = username(input_str); break;
				case "passwd":result = passwd(input_str); break;
				case "repasswd":result = repasswd(document.getElementById("passwd").value,input_str);break;
				case "phone":result = phone(input_str);break;
				case "authCode":result = true;break;//如果是密码提示信息，直接返回TRUE 隐藏掉下面的提示信息
				default:return;//其他的直接返回，主要针对checkbox
			}
			if(result == true){
				//如果用户输入符合规范，直接隐藏提示信息
				event.target.parentElement.nextElementSibling.querySelector("span").innerHTML = ""
			}else{
				//如果用户输入不符合规范
				event.target.parentElement.nextElementSibling.querySelector("span").innerHTML = '<i class="i-error"></i><span class="error">'+result+"</span>";
			}
		}
	}
})


function username(username){
	if(/[^\u4e00-\u9fa5\w-]/.test(username)){
		return "格式错误，仅支持汉字、字母、数字、“-”“_”的组合";
	}else if(username.length < 4 || username.length > 20){
		return "长度只能在4-20个字符之间";
	}else{
		return true;
	}
}
function passwd(passwd){
	//先做判断repasswd是否和passwd一致，用户可能repasswd输入正确，密码输入错误，再重新修改密码
	var repasswd_input = document.getElementById("repasswd");
	if(repasswd_input.value != ""){
		var result = repasswd(passwd,repasswd_input.value);
		if(result){
			repasswd_input.parentElement.nextElementSibling.querySelector("span").innerHTML = ""
		}else{
			repasswd_input.parentElement.nextElementSibling.querySelector("span").innerHTML = '<i class="i-error"></i><span class="error">'+result+"</span>";
		}
	}

	if(passwd.length < 6){
		return "长度只能在6-20个字符之间";
	}else {
		return true;
	}
}
function repasswd(passwd,repasswd){
	if(passwd != repasswd){
		return "两次密码输入不一致";
	}else {
		return true;
	}
}
function phone(phone_num){
	console.log(/^1(3|4|5|7|8)\d{9}$/.test(phone_num));
	if(/^1(3|4|5|7|8)\d{9}$/.test(phone_num)){
		return true;
	}else{
		return "格式有误";
	}
}
//监听同意协议的CheckBox的改变
document.querySelector(".form_agreen>input").onchange = function(){
	if(this.checked){//如果是勾上的，还原样式
		this.parentElement.classList.remove("nochecked");
		this.parentElement.nextElementSibling.querySelector("span").innerHTML = "";
	}else{//如果没有勾上
		this.parentElement.classList.add("nochecked");
		this.parentElement.nextElementSibling.querySelector("span").innerHTML = '<i class="i-error"></i><span class="error">请同意协议并勾选</span>';
	}

}

//设置验证码
//获取装随机函数的span框
var yzm,
	ranDom=document.getElementById("yzm");
    ranDom.innerHTML="<span>点击获取</span>";
 //随机数生成函数
function randoms(){
    var character='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    character+='abcdefghijklmnopqrstuvwxyz';
    character+='0123456789';
    var str='';
    for(var i=0;i<4;i++){
        var rand=Math.floor(Math.random()*62);
        str +=character.substring(rand,rand+1)
    }
    return str;
 }
ranDom.onclick = function(){
	yzm =randoms();
	this.innerHTML='<i id="yzm">'+yzm+'</i>';
	this.style.letterSpacing ='7px'
}