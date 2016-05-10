
$(document).ready(function(){
   function randomScalingFactor() {
            return Math.round(Math.random() * 10);
        }; 
 var  xElement=[];
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
        xAxis: {
           
        },
        yAxis: {
            title: {
                text: '摄氏度℃'
            }
        },
        
        series: [{
            name: '胎心率',
            width:'1'

            }]
    }



   for (var i = 0; i < 500; i++) {
   
     
       xElement.push(randomScalingFactor());
       yELement.push([xElement,randomScalingFactor()]);


    }  
     
      console.log(xElement+yELement);
      options_validatestatics.xAxis.categories=xElement;
      options_validatestatics.series[0].data=yELement;
      var chartLine=new Highcharts.Chart(options_validatestatics);
 
});
 

