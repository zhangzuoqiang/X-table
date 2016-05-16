$(document).ready(function(){
   function randomScalingFactor() {
            return Math.round(Math.random() * 20 + 130);
            
 }; 
 function randomScalingFactorSamll() {
            return Math.round(Math.random() * 10 + 10);}
 /*var  xElement=[];*/
 var  yELement=[];
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
	   legend:{
		   enabled:false
	   },
        xAxis: {
          type: 'linear',
          tickInterval:38
          },
       

        yAxis: {
            title:'',
            min:80,
            max:180
        },
        series: [{
            name: '胎心率',
             lineWidth: 1
            }]
    }
   for (var i = 0; i < 1000; i++) {
      /* xElement.push(randomScalingFactor());*/
       yELement.push(randomScalingFactor());
    }  
      /*options_validatestatics.xAxis.categories=xElement;*/
      options_validatestatics.series[0].data=yELement;
      var chartLine=new Highcharts.Chart(options_validatestatics);
    var options={
        chart: {
            renderTo: 'container1',
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
		legend:{
		   enabled:false
	   },
         credits:{
            enabled:false 
       },
        xAxis: {
          type: 'linear',
          tickInterval:38
          },
        yAxis: {
            title:'',
            tickInterval:50,
            min:0,
            max:100
        },
        series: [{
            name: '宫缩',
             lineWidth: 1
            }]
    }
    
      
      /* var xElementResult=xElement.filter(function(item,index,array){
           return index<1;
       });  */
 
     var  xElement_1=[];
     var  yELement_1=[];
       for (var j = 0; j < 1000; j++) {
           xElement_1.push(randomScalingFactorSamll());
           yELement_1.push([xElement_1,randomScalingFactorSamll()]);
       }
      options.series[0].data=yELement_1;
      var chartLine1=new Highcharts.Chart(options);
      console.log(xElement.length+yELement.length);
});


function  creatDataToTable(beginTime,endTime){
  //跨域支持
  jQuery.support.cors=true;
  $.ajax({
       method:'get',
       url:'/Hy/getFetalHeartMonitorRecordByUserId',
       data:{
          'userId':3,
          'pageNow':2,
          'pageSize':3
       },
       dataType:"json",
       error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);
       },
       success:function(data){
        if (data.successInfo.success) {
            var tr=$('#cloneTr');
            $.each(data.fetalHeartMonitorRecordListInfo,function(index,item){
                //克隆tr，每次遍历都可以产生新的tr,对一横行进行处理 
                var clonedTr = tr.clone(); 
                var _index = index; 
                //根据索引为每一个td赋值  
                clonedTr.children("td").each(function(inner_index){
                   switch(inner_index){
                       case(0): 
                          $(this).text(item.userInfo.userName);
                       break;
                       case(1):
                          $(this).text(item.fetalHeartMonitorRecordListInfo[1].monitorDate);
                       break;
                       case(2):
                        $(this).text(item.fetalHeartMonitorRecordListInfo[0].monitorDuration);
                       break;
                       case(3):
                          $(this).text(item.fetalHeartMonitorRecordListInfo[0].monitorStartTime);
                       break;
                       case(4):
                         $(this).text(item.fetalHeartMonitorRecordListInfo[0].monitorEndTime);
                       break;
                       case(5):
                         $(this).text(item.userInfo.pregnantWeek);
                       break;
                       case(6):
                         $(this).text(item.fetalHeartMonitorRecordListInfo[0].AverageFhr)
                       break;
                    }
                });
                clonedTr.insertAfter(tr);
            });
       }
       else{
            alert('获取数据失败，请检查网络连接')
          }
           $("#cloneTr").hide();
   }     
  });
}