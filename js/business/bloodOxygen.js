//页面加载
$(function(){
   creatLineAndPutDataToTable();
   creatDataPicker();
  
  
});

/*
 * 日期控件声明
 */
 var beginTime;
 var endTime;
 var maxData='2099-06-16';
 var minData='2000-00-01';


var dataPickerOptions={

}
function creatDataPicker(){
  laydate({
    elem: '#u-beginTime',  
    event: 'click',
    choose: function(datas){ //选择日期完毕的回调
      var beginTime=datas
        alert('得到：'+beginTime);

    } 
 
  });
   
    laydate({
    elem: '#u-endTime', 
    event: 'click',  
    choose: function(datas){ //选择日期完毕的回调
      var endTime=datas
        alert('得到：'+datas);
    } 
   
    });
}


function  creatLineAndPutDataToTable(beginTime,endTime){
  //定义空数组存储血氧饱和度用于折线图
  var XyElement=[];
 //定义空数组来存储心率用于折线图
  var MbElement=[];

  var TimeELement=[]
  
  var chart_validatestatics;
  //折线图配置参数
  var options_validatestatics={
        chart: {
            renderTo: 'container',
            type: 'line'
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
            width:'2'
            
        }, {
            name: '血氧饱和度',
            width:'2'
        }]}
  //跨域支持
  jQuery.support.cors=true;
  $.ajax({
       method:'get',
       url:'http://58.67.201.23/serviceProxy/servlet/'+ new Date(),
       data:{
         "id":"522622198501281033",
         "startTime":minData,
         "table":"yhxy01",
         "endTime":maxData,
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
                         $(this).text(item.JCRQ.slice(0,-2));
                         TimeELement.push(item.JCRQ.slice(0,-2));
                       break;
                       case(1):
                         $(this).text(item.YHMC);
                       break;
                       case(2):
                         
                         if (item.SJZT==1) {
                          $(this).text('正常');
                         }
                         else{
                          $(this).text('异常');
                         }
                       break;
                       case(3):
                         
                       
                          $(this).text(item.XY);
                          XyElement.push([item.JCRQ.slice(0,-2),parseInt(item.XY)]);
                       
                        break;
                       case(4):
                      
                      

                         $(this).text(parseInt(item.MB));
                         MbElement.push([item.JCRQ.slice(0,-2),parseInt(item.MB)]);
                       break;
                
                  }
                
                });
                clonedTr.insertAfter(tr);
            });
             
       options_validatestatics.xAxis.categories=TimeELement;
       options_validatestatics.series[0].data=MbElement;
       options_validatestatics.series[1].data=XyElement;
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

/*
var startOptions = {
    elem: '#start',
    format: 'YYYY/MM/DD',
    max: '2099-06-16 23:59:59', //最大日期
    istime: true, //是否显示确认
    istoday: true,////是否显示今天
    choose: function(datas){
         var beginTime=datas;
    }
};
var endOptions = {
    elem: '#end',
    format: 'YYYY/MM/DD',
    min: '2000-00-01',
    max: '2099-06-16',
    istime: true,
    istoday: false,
    choose: function(datas){
        var endTime=datas; //结束日选好后，重置开始日的最大日期
    }
};
laydate(start);
laydate(end);*/