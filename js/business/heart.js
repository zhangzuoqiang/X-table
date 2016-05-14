$(document).ready(function(){
   function randomScalingFactor() {
            return Math.round(Math.random() * 20 + 130);
            
 }; 
 function randomScalingFactorSamll() {
            return Math.round(Math.random() * 10 + 10);}
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
          type: 'linear',
          tickInterval:50
          },
       

        yAxis: {
            title: {
                text: '次数'
            },
            min:80,
            max:180
        
        },
        series: [{
            name: '胎心率',
             lineWidth: 1
            }]
    }
   for (var i = 0; i < 1000; i++) {
       xElement.push(randomScalingFactor());
       yELement.push([xElement,randomScalingFactor()]);
    }  
     
      options_validatestatics.xAxis.categories=xElement;
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
         credits:{
            enabled:false 
       },
        xAxis: {
          type: 'linear',
          tickInterval:50
          },
        yAxis: {
            title: {
                text: '次数'
            },
            min:0,
            max:50
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
      options.xAxis.categories=xElement_1;
      options.series[0].data=yELement_1;
      var chartLine1=new Highcharts.Chart(options);
      console.log(xElement.length+yELement.length);
});