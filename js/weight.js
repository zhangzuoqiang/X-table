//页面加载时
$(function () {
    showAllData();
    $('#weightHidden').hide();
    toggle();
});
//随机数值函数
 var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
            //return 0;
};
  //显示7天数据
function shoWSenvenDay(){ 
     $('#container').remove();
     var warp=document.createElement('div');
     warp.attr(id,'container');
     $('.g-sd').append(warp);
     ('#container').highcharts({
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
function toggle(){
       
        // // 取得tabel
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
              $("#container").show();
        });
        btn2.bind('click',function(){
            btn1.removeClass('select');
            btn2.addClass('select');
            $("#container").hide();
            $("#weightHidden").show();
        });     
}
//显示一个月
function  showOneMonth(){
     $('#container').remove();
      var warp=$(document.createElement('div'));
      warp.attr("id","container");
      warp.css({ "min-width":"310px","height": "300px" ,"margin":"0 auto"});
      $('.g-sd').append(warp);
      $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title:{
            text:''
        },
        
        xAxis: {
            categories: ['0', '2', '4', '6', '8', '12', '14', '16', '18', '20','22','24','26','28','30','32','34','36','38','40' ]
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
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6,57, 56.9, 59.5, 59.5, 60.4, 61.5]
        }]
    });
}
function  showAllData(){

     //清理前一个容器
      $('#container').remove();
      var warp=$(document.createElement('div'));
      warp.attr("id","container");
      warp.css({ "min-width":"310px","height": "300px" ,"margin":"0 auto"});
      $('.g-sd').append(warp);
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
            categories: ['0', '2', '4', '6', '8', '12', '14', '16', '18', '20','22','24','26','28','30','32','34','36','38','40' ]
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
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6,57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6,62.2, 66.5, 63.3, 65.3, 63.9, 65.6]
        }]
    });
}

function showTableAsSelect(){
    var options=$("select option:selected");  //获取选中的项
    if (options.value=="all") {
        

       showAllData();
        chart.redraw();
    }
    if (options.value=="severnDay") {
      shoWSenvenDay();
       chart.redraw();
    }
    else{
       showOneMonth();
        chart.redraw();
    }
}

  // clear all series of the chart
       function clearPlot() {
          //console.log("clear plot data!!!");
              var series=chart.series;              
              while(series.length > 0) {
                  series[0].remove(false);
              }
              chart.redraw();
        };