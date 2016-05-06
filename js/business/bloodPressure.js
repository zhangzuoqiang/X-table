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
            name: '收缩压',
            data: [57, 56.9, 59.5, 59.5, 60.4, 61.5, 62.2, 66.5, 63.3, 65.3, 63.9, 65.6]
        },
        {
            name: '舒张压',
            data: [67, 70.9, 79.5, 69.5, 70.4, 71.5, 72.2, 76.5, 73.3, 75.3, 73.9, 75.6]
        }]
    });
}


$(function () {
    shoWTable();
    $('#weightHidden').hide();
     getBpDataToTable();

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

function getBpDataToTable(){
    
    $.ajax({
       type:"get",
       url:"http://58.67.201.23/serviceProxy/servlet/",
       data:{
        "id":"522622198501281033",
        "startTime":"2015-08-18",
        "table":"yhxy",
        "endTime":"2016-01-15",
        "SERVICE_CODE":"bull.ResourcesHZ.CXDXXX.List",
        "CONSUMER_ID":"test-3db1115089554ee5baf819409034c399"
       },
      dataType:"json",
        error:function(data){
        
         
       },
       success:function(data){
          alert('a');
          console.log(data);
          console.log('请求成功');
        
        if (data.SYS_HEAD.RET_STATUS=='S') {

            var tr=$('#cloneTr');
            
            $.each(data.BODY.data,function(index,item){
                //克隆tr，每次遍历都可以产生新的tr,对一横行进行处理 
                var clonedTr = tr.clone(); 
                var _index = index; 
                //根据索引为每一个td赋值  
                
                clonedTr.children("td").each(function(inner_index){
                   switch(inner_index){
                       case(0):
                         $(this).text(data.BODY.data[inner_index].JCRQ.slice(0,-2));
                       break;
                       case(1):
                         $(this).text(data.BODY.data[inner_index].YHMC);
                       break;
                       case(2):
                         
                         if (data.BODY.data[inner_index].SJZT==1) {
                          $(this).text('正常');
                         }
                         else{
                          $(this).text('异常');
                         }
                       break;
                       case(3):
                        $(this).text(data.BODY.data[inner_index].SZY);
                        break;
                       case(4):
                       $(this).text(data.BODY.data[inner_index].SSY);

                      break;
                      case(5):
                        $(this).text(data.BODY.data[inner_index].PJY);
                      break;

     
                  }
                
                });
                clonedTr.insertAfter(tr);});
          
       }
       else{
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);

          }

           $("#cloneTr").hide();
    }      
    });
}