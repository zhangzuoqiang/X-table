/*
 * 日期控件声明
 */
  function dataPicker(){
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
      warp.css({ "min-width":"310px","height": "350px" ,"margin":"0 auto"});
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
function  showAllData(){
       lineToggle();      
       $('#container').highcharts({
        chart: {
            type: 'line',
            borderWidth: 2,
            plotBackgroundColor: 'white',
            plotShadow: true,
            plotBorderWidth: 1
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
        credits:{
                 enabled:false,                    // 默认值，如果想去掉版权信息，设置为false即可
               
               },
        series: [{
            name: '体重',
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6,57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2,
             66.5, 63.3, 65.3, 63.9, 65.6,62.2, 66.5, 63.3, 65.3, 63.9, 65.6]
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
   
    dataPicker();
   
    showAllData();
  
    $('#weightHidden').hide();
   
    toggle();
    $("#daySelect").change(function(){
      var options=$("#daySelect option:selected").val(); 
      showTableAsSelect(options);
    });
});


/*
function showBMI(){
   $('#container1').highcharts({
        chart: {
            type: 'line'
        },
        title:{
            text:''
        },
        xAxis: {
            categories: ['0', '2',  '4',  '6', '8~9', 
            '9~10','10~11','11~12','12~13','13~14','14~15','15~16','16~17','17~18','18~19','19~20','20~21','21~22','22~23',
            '23~24','24~25','25~26','26~27','27~28','28~29','29~30','30~31','31~32','32~33','33~34','34~35','35~36',
            '36~37','37~38','38~39','39~40' ]
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
            data: [0,0,0,0,0.5,0.7,0.9,1.1,1.4,1.7,2.0,2.3,2.7,3.0,3.4,3.8,4.3,4.7,5.1,5.5,5.9,6.4,6.8,7.2,
            7.4,7.7,8.1,8.4,8.8,9.1,9.5,10.0,10.4,10.5,11,11.3]
        }]
    });
}
*/

