var btnAddInfo = document.getElementById("btnAddInfo");

// 添加产品点击事件
btnAddInfo.onclick = function() {
// 存储表单元素节点
	var brand = document.getElementById("brand"),
		model = document.getElementById("model"),
		param = document.getElementById("param"),
		price = document.getElementById("price"),
		country = document.getElementById("country");
	// 获取表单输入的值
	var formObject = {
		brandVal: brand.value,
		modelVal: model.value,
		paramVal: param.value,
		priceVal: price.value,
		countryVal: country.value
	}
	// 存储表格
	var showData = document.getElementById("showData"),
		tbody = showData.getElementsByTagName("tbody")[0];
	tbody.innerHTML += "<tr></tr>";
	// 最新一个tr标签
	var tbody_tr = tbody.getElementsByTagName("tr"),
		newTr = tbody_tr[tbody_tr.length - 1];
	for(var x in formObject) {
		newTr.innerHTML += "<td>" + formObject[x] + "</td>";
	}
}








