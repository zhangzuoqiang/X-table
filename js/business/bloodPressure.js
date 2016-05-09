// 取得tabel
var table=$("#weightHidden");
//获取到canvas
var canvas=$("#container");

var btn1=$('#weightTable');

var btn2=$('#weightData');



$(function () {
	
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
        //定义体温数组来存储心率用于折线图
  var SZYElement=[];

  var SSYElement=[];

  var PJYElement=[];

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
         legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
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
            width:'2'
            
        },{
            name: '扩张压',
            width:'2'
            
        },{
            name: '平均压',
            width:'2'
            
        }
         ]}


		jQuery.support.cors = true;
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
		 
				error:function(readyState,status,error){
					console.log(readyState+status+error);
				
				 
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
												$(this).text(item.SZY);
												SZYElement.push([TimeELement,parseFloat(item.SZY)]);
												break;
											 case(4):
												$(this).text(item.SSY);
												SSYElement.push([TimeELement,parseFloat(item.SSY)]);

											break;
											case(5):
												$(this).text(item.PJY);
												PJYElement.push([TimeELement,parseFloat(item.PJY)]);
											break;

		 
									}
								
								});
								clonedTr.insertAfter(tr);});
						         options_validatestatics.xAxis.categories=TimeELement;
                                 options_validatestatics.series[0].data=SSYElement;
                                 options_validatestatics.series[1].data=SZYElement;
                                 options_validatestatics.series[2].data=PJYElement;

      
       //创建图表，new Highcharts.Chart options_validatestatics为配置参数
       chart_validatestatics = new Highcharts.Chart(options_validatestatics);
					
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