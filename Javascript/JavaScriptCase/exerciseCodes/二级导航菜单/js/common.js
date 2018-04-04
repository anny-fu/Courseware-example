/**
 * 功能：二级导航菜单
 * 日期：2017-8-8
 **/
 /*************************************************/
 /* 函数调用部分 */
 /*************************************************/
 var navMenu = new NavMenus(goods);

// 调用“设置子导航的一级导航”函数
navMenu.setSubNavMenu();

// 调用“设置子导航的二级导航”函数
navMenu.setSubNavMenu_lv2();

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：设置导航构造函数
 * 参数：数据（object）
 **/
 function NavMenus(navData){
 		var menuData = navData;
		/**
		 * 功能：设置子导航的一级导航
		 * 
		 **/
		this.setSubNavMenu = function() {
			// 子导航列表容器
			var goodsNavUl = document.getElementById("goodsNav").getElementsByTagName("ul")[0];
			
			// 获取当前导航数据的条数
			var data_length = menuData.length;
			
			// 设置一个空字符用来拼接HTML内容已节省DOM操作性能开销
			var liStr = ""
			
			for(var i = 0; i < data_length; i++) {
				liStr += '<li><a hef="#">' + 
				menuData[i].classfiy + 
				'<i>&gt;</i></a></li>';
				
			}
			// 为子导航列表容器写入导航列表项
			goodsNavUl.innerHTML = liStr;
		}
		/**
		 * 功能：设置子导航的二级导航
		 * 
		 **/
		 this.setSubNavMenu_lv2 = function() {
				// 子导航列表容器内的一级导航菜单列表集合
				var goodsNavList = document.getElementById("goodsNav").getElementsByTagName("ul")[0].getElementsByTagName("li"),
				goodsNavList_leng = goodsNavList.length;
				
				// 子导航列表容器内的二级导航菜单列表
				var goodsNavList_lv2 = document.getElementById("goodsNav").getElementsByTagName("ul")[1];
				
				// 通过循环为一级导航列表项添加索引属性并绑定鼠标进入事件
				for(var i = 0; i < goodsNavList_leng; i++) {
					// 存储当前列表项
					var currentList = goodsNavList[i];
					
					// 为当前列表项添加索引属性
					currentList.index = i;
					
					// 绑定鼠标进入事件（onmouseenter不会冒泡，而onmouseover会冒泡）
					currentList.onmouseenter = function() {
						// 获取对应二级导航数据及长度
						var navData_lv2 = menuData[this.index].goodsNav,
						navData_lv2_leng = menuData.length;
						
						// 设置一个空字符用来拼接HTML内容已节省DOM操作性能开销
						var liStr = "";

						// 循环拼接出二级导航的数据为导航列表项
						for(var j = 0; j < navData_lv2_leng; j++) {
							liStr += '<li>' +
							'<a href="#">' +
							'<img src="' +
							navData_lv2[j].imgUrl +
							'">' +
							navData_lv2[j].name +
							'</a>' +
							'</li>';
						}
						// 将当前列表项写入列表
						goodsNavList_lv2.innerHTML = liStr;
					}
				}
			}

	}







