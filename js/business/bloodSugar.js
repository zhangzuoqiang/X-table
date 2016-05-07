
$(function(){
   creatLineAndPutDataToTable();
  
});

function  creatLineAndPutDataToTable(){
 
 //定义体温数组来存储心率用于折线图
  var XTElement=[];

  var TimeELement=[]
  
  var chart_validatestatics;
  //折线图配置参数
  var options_validatestatics={
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        lang: {
            printChart: '打印图表',
            downloadPNG: '下载JPEG 图片',
            downloadJPEG: '下载JPEG文档',
            downloadPDF: '下载PDF 文件',
            downloadSVG: '下载SVG 矢量图',
            contextButtonTitle: '下载图片'
        },
        title:{
            text:''
        },
         credits:{
            enabled:false 
       },
        xAxis: {
           
        },
        yAxis: {
            title: {
                text: 'mmol/L'
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
            name: '血糖',
            width:'2'
            
        } ]}
  //跨域支持
  jQuery.support.cors=true;
  $.ajax({
       method:'get',
       url:'http://58.67.201.23/serviceProxy/servlet/',
       data:{
             "id":"522622198501281033",
             "startTime":"2015-08-18",
             "table":"yhxt",
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
                       //日期
                       case(0):
                         $(this).text(item.JCRQ.slice(0,-2));
                         TimeELement.push(item.JCRQ.slice(0,-2));
                       break;
                       //姓名
                       case(1):
                         $(this).text(item.YHMC);
                       break;
                       //状态值,为1为正常，否则为异常
                       case(2):
                         
                         if (item.SJZT==1) {
                          $(this).text('正常');
                         }
                         else{
                          $(this).text('异常');
                         }
                       break;
                       case(3):
                         
                          
                          $(this).text(item.XT);
                          XTElement.push([item.JCRQ.slice(0,-2),parseFloat(item.XT)]);
                       
                        break;
                      
                  }
                
                });
                clonedTr.insertAfter(tr);
            });
             
       options_validatestatics.xAxis.categories=TimeELement;
       options_validatestatics.series[0].data=XTElement;
      
       //创建图表，new Highcharts.Chart options_validatestatics为配置参数
       chart_validatestatics = new Highcharts.Chart(options_validatestatics);
    
       }
       else{
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            alert('获取数据失败，请检查网络连接')

          }
           $("#cloneTr").hide();
  
  
 }     
    });
}

