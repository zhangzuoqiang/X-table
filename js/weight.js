// 取得tabel
var table=$("#weightHidden");
//获取到canvas
var canvas=$("#container");

var btn1=$('#weightTable');

var btn2=$('#weightData');
function shoWTable(){ 

    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title:{
            text:''
        },
        
        xAxis: {
            categories: ['0', '2', '4', '6', '8', '12', '14', '16', '18', '20','22','24','26','28' ]
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
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6]
        }]
    });
}


$(function () {
    shoWTable();
    $('#weightHidden').hide();

});
       
$('#weightTable').bind('click',function(){
     btn2.removeClass('select');
      btn1.addClass('select');
      table.hide();
      canvas.show();
});
$('#weightData').bind('click',function(){
    btn1.removeClass('select');
    btn2.addClass('select');
    canvas.hide();
     table.show();
});