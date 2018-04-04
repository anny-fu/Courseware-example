/**
 * 功能：图片上传
 * 日期：2017-5-16
 **/

/**
* 功能：图片信息获取及图片base64生成并显示
* 参数：无（内置事件对象）
**/
function fileUpload(e) {  
	// IE兼容性处理
    e = e || window.event;
	// 获取目标文件
    var files = e.target.files;  
    var output = [];  
	console.log(files[0]); // 查看文件对象
    for(var i = 0, f; f = files[i]; i++) {  
		// 获取上传的图片名及图片大小列表
        output.push('<li><strong>' + f.name + '</strong>(' + f.type + ') - ' + f.size +' bytes</li>');  
    }  
	// 将获取到的图片信息显示出来
    document.getElementById('lists').innerHTML = '<ul>' + output.join('') + '</ul>';  
	// 如果上传的文件类型不为图片则给出提示，并中止操作
	if(!/image\/\w+/.test(files[0].type)){ 
		alert("请确保文件为图像类型"); 
		return false; 
	}
	// 实例化文件读取对象
	var reader = new FileReader();
	// 将文件编码成Data URL（即用Base64来渲染图片的很长的那串代码）
	reader.readAsDataURL(files[0]);
	reader.onload = function(){
		// 这个结果就是base64图片码
		var res = this.result;
		var base64Img = document.getElementById('base64Img');
		base64Img.innerHTML = '<img src="' + res + '">';
		// 将图片写入该标签
		base64Img.innerHTML += res; 
	}
}  
if(window.File && window.FileList && window.FileReader && window.Blob) {
	// 监听文件上传表单元素从而触发“fileUpload”函数
    document.getElementById('files').addEventListener('change', fileUpload, false);  
} else {  
    alert('您的浏览器太古典，请鼠标右键切换浏览器模式或使用Chrome、Edge、FireFox等浏览器');  
}  

