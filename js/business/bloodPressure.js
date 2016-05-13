// 取得tabel
	var table=$("#weightHidden");
	//获取到canvas
	var canvas=$("#container");

	var btn1=$('#weightTable');

	var btn2=$('#weightData');



$(function () {
	$('#weightHidden').hide();
	 $("#daySelect").change(function(){
      var options=$("#daySelect option:selected").val(); 
      showTableAsSelect(options);
    });
	 getBpDataToTable("2015-08-18","2016-01-15");

});
 
function showTableAsSelect(options){
    if (options=='all') {
        showAllData();
        alert('a');
    }
    if (options=='severnDay') {
      shoWSenvenDay();
      alert('b');
    }
    if (options=='oneMonth') {
      showOneMonth();
       alert('c');
    }
}       			 
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

     var chart_validatestatics;
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
         legend:{
            enabled : true 
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
				}]
  }
 


function getBpDataToTable(startTime,endTime){
         //定义体温数组来存储心率用于折线图
				var SZYElement=[];
				var SSYElement=[];
				var PJYElement=[];
				var TimeELement=[]
				jQuery.support.cors = true;
				$.ajax({
					 type:"get",
					 url:"http://58.67.201.23/serviceProxy/servlet/",
					 data:{
						"id":"522622198501281033",
						"startTime":startTime,
						"table":"yhxy",
						"endTime":endTime,
						"SERVICE_CODE":"bull.ResourcesHZ.CXDXXX.List",
						"CONSUMER_ID":"test-3db1115089554ee5baf819409034c399"
					 },
					dataType:"json",
						error:function(readyState,status,error){
							console.log(readyState+status+error);
					 },
					 success:function(data){
							
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
var chooseBeginTime='';
var startOptions = {
    elem: '#u-beginTime',//ID
    format: 'YYYY-MM-DD',
    max: '2099-06-16', //最大日期
    istime: true, //是否显示确认
    istoday: true,////是否显示今天
    choose: function(datas){
          chooseBeginTime=datas;

    }
};
var chooseEndTime='';
var endOptions = {
    elem: '#u-endTime',
    format: 'YYYY-MM-DD',
    min: '2000-00-01',
    max: '2099-06-16',
    istime: true,
    istoday: true,
    choose: function(datas){
          chooseEndTime=datas; 
    }
};
laydate(startOptions);
laydate(endOptions);


function lineToggle() {
    $('#container').remove();
      var warp=$(document.createElement('div'));
      warp.attr("id","container");
      warp.css({ "min-width":"310px","height": "400px" ,"margin":"0 auto"});
      $('.g-sd').append(warp);
}
/*
 *  清理表格
 */
function  TableCLear(){
   $('.g-sd tbody').empty();
   var clonedTr=$("<tr id='cloneTr'><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
   $('.g-sd tbody').append(clonedTr);
}



$('#u-submit').bind('click',function(){
  var XyElement=[];
  var MbElement=[];
  var TimeELement=[]
  lineToggle();
  TableCLear();
  getBpDataToTable(chooseBeginTime,chooseEndTime);
});
function showAllData(){
  lineToggle();
  TableCLear();
  var XyElement=[];
  var MbElement=[];
  var TimeELement=[]
  getBpDataToTable('2010-08-18','2030-01-15');
   options_validatestatics.xAxis.type='linear';
}
function shoWSenvenDay(){
   TableCLear();
  var today=new Date();
  //生成JSON请求时间段
  var todayString=format(today).toString();
  var severnDay=new Date(today.getTime()-(7*1000*60*60*24));
  var severnDayString=format(severnDay).toString();
    getBpDataToTable(severnDayString,todayString);
}
function showOneMonth(){
   TableCLear();
  var today=new Date();
  //生成JSON请求时间段
  var todayString=format(today).toString();
  //30天前，一个月(偷懒)
  var severnDay=new Date(today.getTime()-(30*1000*60*60*24));
  var severnDayString=format(severnDay).toString();
   getBpDataToTable(severnDayString,todayString);
}

/**
 * [因为js中的月份是从0开始，所以需要进行转换]
 * @param  {[num]} number [传入的数字]
 * @return {[type]}        [description]
 */
function padding(number){
   return number<10?'0'+number:''+number;
 }
 // formatData
function format(date){
      return date.getFullYear()+'-'+padding(date.getMonth()+1)+'-'+padding(date.getDate());
}
