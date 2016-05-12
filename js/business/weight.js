/*
 * 日期控件声明
 */
function creatDataPicker(){
    laydate({
    elem: '#u-beginTime',  
    event: 'click' 
    });
    laydate({
    elem: '#u-endTime', 
    event: 'click' 
    });
}
 
/*
 * 根据下拉表的选择显示折线图
 * @param {string} 下拉表当前被选择的值，其实不利用
 */
function showTableAsSelect(options){
    if (options=='all') {
        showAllData();
    }
    if (options=='severnDay') {
       shoWSenvenDay();
    }
    else{
       showOneMonth();
       }
}
/*
 *随机数值函数
 */
 var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
            //return 0;
};
 /*
 *清除上一个折线图
 */
function lineToggle() {
    $('#container').remove();
      var warp=$(document.createElement('div'));
      warp.attr("id","container");
      warp.css({ "min-width":"310px","height": "400px" ,"margin":"0 auto"});
      $('.g-sd').append(warp);
}


 /*
  *显示7天数据
  */
 function shoWSenvenDay(){ 
    
     $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title:{
            text:''
        },
        xAxis: {
            categories: ['1', '2',  '3', '4', '5', '6', '7' ]
        },
        yAxis: {
            title: {
                text: '体重(kg)'
            }
        },
        lang: {
            printChart: '打印图表',
            downloadPNG: '下载JPEG 图片',
            downloadJPEG: '下载JPEG文档',
            downloadPDF: '下载PDF 文件',
            downloadSVG: '下载SVG 矢量图',
            contextButtonTitle: '下载图片'
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        tooltip: {
                shared: true,
                crosshairs: true
            },
        series: [{
            name: '体重',
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2,]
        }] });
}
 /*
  *显示一个月数据
  */
function showOneMonth(){
      lineToggle();
      $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title:{
            text:''
        },
        xAxis: {
            categories: ['0', '2', '4', '6', '8', '12', '14', '16', '18', 
            '20','22','24','26','28','30','32','34','36','38','40' ]
        },
        yAxis: {
            title: {
                text: '体重(kg)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        tooltip: {
                shared: true,
                crosshairs: true
            },
        series: [{
            name: '体重',
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 
            63.3, 65.3, 63.9, 65.6,57, 56.9, 59.5, 59.5, 60.4, 61.5]
        }]
    });
}
/*
  *显示全部数据
  */
// function  showAllData(){
//        lineToggle();      
//        $('#container').highcharts({
//         chart: {
//             type: 'line',
//             borderWidth: 2,
//             plotBackgroundColor: 'white',
//             plotShadow: true,
//             plotBorderWidth: 1
//         },
//         title:{
//             text:''
//         },
        
//         xAxis: {
//             categories: ['0', '2', '4', '6', '8', '12', '14', '16', '18', 
//             '20','22','24','26','28','30','32','34','36','38','40' ]
//         },
//         yAxis: {
//             title: {
//                 text: '体重(kg)'
//             }
//         },
//         lang: {
//             printChart: '打印图表',
//             downloadPNG: '下载JPEG 图片',
//             downloadJPEG: '下载JPEG文档',
//             downloadPDF: '下载PDF 文件',
//             downloadSVG: '下载SVG 矢量图',
//             contextButtonTitle: '下载图片'
//         },
//         plotOptions: {
//             line: {
//                 dataLabels: {
//                     enabled: true
//                 },
//                 enableMouseTracking: true
//             }
//         },
//         tooltip: {
//                 shared: true,
//                 crosshairs: true
//             },
//         credits:{
//                  enabled:false,                    // 默认值，如果想去掉版权信息，设置为false即可
               
//                },
//         series: [{
//             name: '体重',
//             data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6,57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2,
//              66.5, 63.3, 65.3, 63.9, 65.6,62.2, 66.5, 63.3, 65.3, 63.9, 65.6]
//         }]
//     });
// }
 function showAllData(){


    var ranges = [
            [1246406400000, 14.3, 27.7],
            [1246492800000, 14.5, 27.8],
            [1246579200000, 15.5, 29.6],
            [1246665600000, 16.7, 30.7],
            [1246752000000, 16.5, 25.0],
            [1246838400000, 17.8, 25.7],
            [1246924800000, 13.5, 24.8],
            [1247011200000, 10.5, 21.4],
            [1247097600000, 9.2, 23.8],
            [1247184000000, 11.6, 21.8],
            [1247270400000, 10.7, 23.7],
            [1247356800000, 11.0, 23.3],
            [1247443200000, 11.6, 23.7],
            [1247529600000, 11.8, 20.7],
            [1247616000000, 12.6, 22.4],
            [1247702400000, 13.6, 19.6],
            [1247788800000, 11.4, 22.6],
            [1247875200000, 13.2, 25.0],
            [1247961600000, 14.2, 21.6],
            [1248048000000, 13.1, 17.1],
            [1248134400000, 12.2, 15.5],
            [1248220800000, 12.0, 20.8],
            [1248307200000, 12.0, 17.1],
            [1248393600000, 12.7, 18.3],
            [1248480000000, 12.4, 19.4],
            [1248566400000, 12.6, 19.9],
            [1248652800000, 11.9, 20.2],
            [1248739200000, 11.0, 19.3],
            [1248825600000, 10.8, 17.8],
            [1248912000000, 11.8, 18.5],
            [1248998400000, 10.8, 16.1]
        ],
        averages = [
            [1246406400000, 21.5],
            [1246492800000, 22.1],
            [1246579200000, 23],
            [1246665600000, 23.8],
            [1246752000000, 21.4],
            [1246838400000, 21.3],
            [1246924800000, 18.3],
            [1247011200000, 15.4],
            [1247097600000, 16.4],
            [1247184000000, 17.7],
            [1247270400000, 17.5],
            [1247356800000, 17.6],
            [1247443200000, 17.7],
            [1247529600000, 16.8],
            [1247616000000, 17.7],
            [1247702400000, 16.3],
            [1247788800000, 17.8],
            [1247875200000, 18.1],
            [1247961600000, 17.2],
            [1248048000000, 14.4],
            [1248134400000, 13.7],
            [1248220800000, 15.7],
            [1248307200000, 14.6],
            [1248393600000, 15.3],
            [1248480000000, 15.3],
            [1248566400000, 15.8],
            [1248652800000, 15.2],
            [1248739200000, 14.8],
            [1248825600000, 14.4],
            [1248912000000, 15],
            [1248998400000, 13.6]
        ];


    $('#container').highcharts({

        title: {
            text: ''
        },

        xAxis: {
            type: ''
        },

        yAxis: {
            title: {
                text: 'kg'
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: 'kg'
        },

        legend: {
        },

        series: [{
            name: '体重',
            data: averages,
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            }
        }, {
            name: 'Range',
            data: ranges,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0
        }]
    });

 }
/*
 * clear plot data!
 */
function clearPlot() {
          //console.log("clear plot data!!!");
              var series=chart.series;              
              while(series.length > 0) {
                  series[0].remove(false);
              }
              chart.redraw();
        }


/*
 * 折现表与数据表格的互相切换.
 */
function toggle(){
      // 取得tabel
      var tableIncr=$("#container1");
      var table=$("#weightHidden");
      //获取到canvas
      var canvas=$("#container");
      var btn1=$('#weightTable');
      var btn2=$('#weightData');
    
      var btnSelect=$(".btn-group");
      btn1.bind('click',function(){
      btn2.removeClass('select');
      btn1.addClass('select');
      $("#weightHidden").hide();
      $("#container1").hide();
      $("#container").show();
      });
      btn2.bind('click',function(){
      btn1.removeClass('select');
      btn2.addClass('select');
      $("#container").hide();
     
      $("#weightHidden").show();
      }); 
     
}
/*
 * 页面加载
 */
$(function () {
   
    creatDataPicker();
   
     showAllData();
  
    $('#weightHidden').hide();
   
    toggle();
    $("#daySelect").change(function(){
      var options=$("#daySelect option:selected").val(); 
      showTableAsSelect(options);
    });
});