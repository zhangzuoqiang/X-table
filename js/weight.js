// 取得tabel
var table=$("#weightHidden");
//获取到canvas
var canvas=$("#container");

var btn1=$('#weightTable');

var btn2=$('#weightData');

var btnSelect=$(".btn-group");



//页面加载时
$(function () {
    showAllData();
    $('#weightHidden').hide();

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
//显示一个月
function  showAllData(){

     //清理前一个容器
      $('#container').remove();
      var warp=$(document.createElement('div'));
      warp.attr("id","container");
      warp.css({ "min-width":"310px","height": "400px" ,"margin":"0 auto"});
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
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6,57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6]
        }]
    });
}


btn1.bind('click',function(){
     btn2.removeClass('select');
     btn1.addClass('select');
     table.hide();
     canvas.show();
});
btn2.bind('click',function(){
    btn1.removeClass('select');
    btn2.addClass('select');
    canvas.hide();
    table.show();
});     