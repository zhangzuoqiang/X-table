function myline(){
  
  var Data = {
    labels : ["09/12","09/13","09/14","09/15","09/16","09/17","09/18"], //X轴 坐标
    datasets : [
        {
            fillColor : "transparent", // 背景色
            strokeColor : "#ef7c1f", // 线
            pointColor : "#ef7c1f", // 点
            pointStrokeColor : "#fff", // 点的包围圈
            data : [120,140,110,130,150,170,160] // Y轴坐标
        },
        {
            fillColor : "transparent",
            strokeColor : "#3dc448",
            pointColor : "#3dc448",
            pointStrokeColor : "#fff",
            data : [80,90,80,100,110,130,100]
        }
    ]

 }
  var options = {
                
    //Boolean - If we show the scale above the chart data           
    scaleOverlay : false,
    
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : false,
    
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : null,
    
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 20,
    
    // Y 轴的起始值
    scaleStartValue : null,

    // Y/X轴的颜色
    scaleLineColor : "rgba(0,0,0,.1)",
    
    // X,Y轴的宽度
    scaleLineWidth : 1,

    // 刻度是否显示标签, 即Y轴上是否显示文字
    scaleShowLabels : true,
    
    // Y轴上的刻度,即文字
    scaleLabel : "<%=value%>",
    
    // 字体
    scaleFontFamily : "'Arial'",
    
    // 文字大小
    scaleFontSize : 12,
    
    // 文字样式
    scaleFontStyle : "normal",
    
    // 文字颜色
    scaleFontColor : "#666",    
    
    // 是否显示网格
    scaleShowGridLines : false,
    
    // 网格颜色
    scaleGridLineColor : "rgba(0,0,0,.05)",
    
    // 网格宽度
    scaleGridLineWidth : 2, 
    
    // 是否使用贝塞尔曲线? 即:线条是否弯曲
    bezierCurve : false,
    
    // 是否显示点数
    pointDot : true,
    
    // 圆点的大小
    pointDotRadius : 8,
    
    // 圆点的笔触宽度, 即:圆点外层白色大小
    pointDotStrokeWidth : 2,
    
    // 数据集行程
    datasetStroke : true,
    
    // 线条的宽度, 即:数据集
    datasetStrokeWidth : 2,
    
    // 是否填充数据集
    datasetFill : false,
    
    // 是否执行动画
    animation : true,

    // 动画的时间
    animationSteps : 60,
    
    // 动画的特效
    animationEasing : "easeOutQuart",

    // 动画完成时的执行函数
    onAnimationComplete : null
  }
  
  var ctx = document.getElementById("canvas").getContext("2d");
  
  var myLineChart =new Chart(ctx).Line(Data, options);;
};

window.onload=function(){
    myline();
}

  