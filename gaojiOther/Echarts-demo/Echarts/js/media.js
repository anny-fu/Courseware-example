/**
 * 功能：媒体查询图表
 * 日期：2017/6/13
 **/
/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
// 图表实例化对象
let DATACharts;

// 岩石背景
let imgBg = new Image();
imgBg.src = "img/bg-1.jpg";
// 获取图片宽度
/*imgBg.onload = function () {
	var wid = imgBg.offsetWidth;
	var hid = imgBg.offsetHeight;
}*/

// 图表对象配置
let CHARTSOPTION = {
    /* 图表1 */
    charts_1: {
      baseOption: {
        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#663366"
          },
          {
            offset: 1,
            color: "#331133"
          }
        ], false),
        title: {
          text: "噩梦·幽梦兽",
          left: 10,
          top: 10
        },
        tooltip: {},
        legend: {
          data: ["攻击", "防御", "智力", "体质", "敏捷"],
          orient: 'vertical',
          left: 10,
          top: 50
        },
        series: {
          name: "噩梦·幽梦兽",
          type: "pie",
          radius: "50%",
          data: [
            { value: 400, name: "攻击" },
            { value: 274, name: "防御" },
            { value: 310, name: "智力" },
            { value: 235, name: "体质" },
            { value: 335, name: "敏捷" }
          ],
          center: ["55%", "50%"]
        }
      },
      media: [{
          query: {
            minWidth: 455
          },
          option: {
            legend: {
              left: 50,
              top: 80
            },
            series: {
              center: ["60%", "50%"]
            }
          }
        },
        {
          query: {
            maxWidth: 454
              // 表示宽高比小于0.8，竖屏
              //maxAspectRatio: 0.8
              // 表示宽高比大于1，横屏
              //maxAspectRatio: 1
          },
          option: {
            legend: {
              show: false
            },
            series: {
              radius: "60%",
              center: ["50%", "55%"]
            }
          }
        }
      ]
    },
    /* 图表2 */
    charts_2: {
      baseOption: {
        backgroundColor: new echarts.graphic.RadialGradient(0.1, 0.3, 1.2, [{
            offset: 0,
            color: "#7c7e81"
          },
          {
            offset: 0.6,
            color: "#f7f8fa"
          },
          {
            offset: 1,
            color: "#7c7e81"
          }
        ]),
        title: {
          text: "钢·雷光兽",
          left: 10,
          top: 10
        },
        tooltip: {},
        legend: {
          data: ["攻击", "防御", "智力", "体质", "敏捷"],
          orient: 'vertical',
          top: 10,
          right: 10
        },
        series: {
          name: "钢·雷光兽",
          type: "pie",
          roseType: "angle",
          radius: ["35%", "55%"],
          data: [
            { value: 310, name: "攻击" },
            { value: 400, name: "防御" },
            { value: 310, name: "智力" },
            { value: 335, name: "体质" },
            { value: 135, name: "敏捷" }
          ],
          center: ["40%", "50%"]
        }
      },
      media: [{
          query: {
            minWidth: 455
          },
          option: {
            legend: {
              right: 50,
              top: 80,
            },
            series: {
              center: ["40%", "50%"]
            }
          }
        },
        {
          query: {
            maxWidth: 454
              //maxAspectRatio: 0.8
          },
          option: {
            legend: {
              show: false
            },
            series: {
              radius: ["30%", "60%"],
              center: ["50%", "55%"]
            }
          }
        }
      ]
    },
    /* 图表3 */
    charts_3: {
      baseOption: {
        backgroundColor: {
          image: imgBg,
          repeat: "repeat"
        },
        title: {
          text: "熔·岩甲兽",
          left: 10,
          top: 10,
          textStyle: {
            color: "#fff9e6"
          }
        },
        tooltip: {},
        legend: {
          data: ["攻击", "防御", "智力", "体质", "敏捷"],
          textStyle: {
            color: "#fff9e6",
            fontSize: 14
          },
          bottom: 15
        },
        series: {
          name: "熔·岩甲兽",
          type: "pie",
          radius: ["35%", "55%"],
          data: [
            { value: 274, name: "攻击" },
            { value: 400, name: "防御" },
            { value: 200, name: "智力" },
            { value: 335, name: "体质" },
            { value: 235, name: "敏捷" }
          ],
          label: {
            normal: {
              textStyle: {
                color: "#fff9e6",
                fontSize: 14
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: "#fff9e6"
              }
            }
          },
          center: ["50%", "50%"]
        }
      },
      media: [{
          query: {
            minWidth: 455
          },
          option: {
            legend: {
              orient: 'vertical',
              left: 50,
              top: 80,
            },
            series: {
              center: ["60%", "50%"]
            }
          }
        },
        {
          query: {
            maxWidth: 454
              //maxAspectRatio: 0.8
          },
          option: {
            legend: {
              show: false
            },
            series: {
              radius: ["40%", "60%"],
              center: ["50%", "55%"]
            }
          }
        }
      ]
    }
  }
  /*************************************************/
  /* 页面加载完统一执行部分 */
  /*************************************************/
$(function() {
  /* 图表1 */
  setEcharts("mediaCharts1", CHARTSOPTION.charts_1, "dark");

  /* 图表2 */
  setEcharts("mediaCharts2", CHARTSOPTION.charts_2, "infographic");

  /* 图表3 */
  setEcharts("mediaCharts3", CHARTSOPTION.charts_3, "vintage");
  /* 窗口缩放事件 */
  $(window).resize(function() {
    //console.debug(DATACharts);
    // 延时执行图表配置，防止窗口缩放多次执行带来的性能问题
    setTimeout(function() {
      /* 图表1 */
      setEcharts("mediaCharts1", CHARTSOPTION.charts_1, "dark");

      /* 图表2 */
      setEcharts("mediaCharts2", CHARTSOPTION.charts_2, "infographic");

      /* 图表3 */
      setEcharts("mediaCharts3", CHARTSOPTION.charts_3, "vintage");
    }, 500);
  });

  //console.timeEnd("所有功能完整执行耗时：");
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：图表初始化配置
 * 参数1：元素ID--字符串
 * 参数2：配置项设置--对象
 * 参数3：主题，可使用的配置项有："dark","infographic","macarons","roma","shine","vintage"
 **/
function setEcharts(ident, option, theme) {
  // 基于准备好的dom，初始化echarts实例
  DATACharts = echarts.init(document.getElementById(ident), theme);

  // 使用刚指定的配置项和数据显示图表。
  DATACharts.setOption(option);

  // 图表大小随容器变化而变化
  window.onresize = DATACharts.resize;

  // 为当前数据图表绑定一个点击事件
  DATACharts.on("click", function(info) {
    // 输出数据的完整信息
    $("#spritInfo > div").html(`【${info.seriesName}】的<span class="propertyName" style="color:${info.color}">${info.name}</span>为<span class="propertyValue">${info.value}</span>，在整体属性中占<span class="propertyValue">${info.percent}%</span>的比重。`);
    console.log(info);
    // $("#spritInfo > div").html(`【${info.seriesName}】的${info.name}为${info.value}，在整体属性中占${info.percent}%的比重。`);
    // console.log(info);
  });
}