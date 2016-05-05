
$(function(){
  getBpDataToTable();
   creatLine();
  
});
  var XyElement=[];
  var MbElement=[];
function  creatLine(XyElement,MbElement){
 
    
    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title:{
            text:''
        },
         credits:{
            enabled:false 
      },
        xAxis: {
             categories: ['0', '2', '4', '6', '8', '12', '14', '16', '18', '20','22','24','26','28','30']
        },
        yAxis: {
            title: {
                text: 'bpm'
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
            name: '心率',
            data: eval("[" + MbElement + "]")
        }, {
            name: '血氧饱和度',
            data: eval("[" + XyElement + "]")
        }]
   
});
}
function getBpDataToTable(){
    
    $.ajax({
       method:'get',
       url:'http://58.67.201.23/serviceProxy/servlet/',
       data:{
         "id":"522622198501281033",
         "startTime":"2015-08-18",
         "table":"yhxy01",
         "endTime":"2016-01-15",
         "SERVICE_CODE":"bull.ResourcesHZ.CXDXXX.List",
         "CONSUMER_ID":"test-3db1115089554ee5baf819409034c399"
       },
       dataType:"json",
       error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);

       },
       success:function(data){
          
          console.log(data);
          console.log('获取数据成功');
        
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
                          //定义空数组存储血氧饱和度用于折线图
                       
                        $(this).text(data.BODY.data[inner_index].XY);
                        XyElement.push(data.BODY.data[inner_index].XY);
                       
                        break;
                       case(4):
                       //定义空数组来存储心率用于折线图
                      

                       $(this).text(data.BODY.data[inner_index].MB);
                       MbElement.push(data.BODY.data[inner_index].MB);
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

