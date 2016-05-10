var beginTime='';
var endTime='';

//页面加载
$(function(){
   //默认加载'2015-08-18'到'2016-01-15'区间数据.
   creatLineAndPutDataToTable('2000-00-01','2099-06-16');
   showTableAsSelect(options);
 
});
/**
 * [showTableAsSelect description 根据传进来的options来触发相应的事件]
 * @param  {[string]} options [description]
 * @return {[type]}         [description]
 */
/*function showTableAsSelect(options){
    $("#daySelect").change(function(){
    var options=$("#daySelect option:selected").val(); 
    
    if (options=='all') {
        showAllData();
    }
    if (options=='severnDay') {
       shoWSenvenDay();
    }
    else{
       showOneMonth();
       }
}       
/*!
 * startOptions和endOptions，为日期控件配置参数
 * @return {[string]}    var beginTime=datas,将返回的日期，复制给变量
 *  
 */
var startOptions = {
    elem: '#u-beginTime',//ID
    format: 'YYYY/MM/DD',
    max: '2099-06-16', //最大日期
    istime: true, //是否显示确认
    istoday: true,////是否显示今天
    choose: function(datas){
         var beginTime=datas;
    }
};
var endOptions = {
    elem: '#u-endTime',
    format: 'YYYY/MM/DD',
    min: '2000-00-01',
    max: '2099-06-16',
    istime: true,
    istoday: true,
    choose: function(datas){
       
        var endTime=datas; //结束日选好后
    }
};
laydate(startOptions);
laydate(endOptions);

/**
 * 计算日期的大小
 * @param  {[type]} beginTime [请求参数的开始时间]
 * @param  {[type]} endTime    [请求参数中的结束时间]
 * @return {[type]}           [description]
 */

function timeLag(beginTime,endTime){
   alert(typeof beginTime);
   var numberbeginTime=new Date(beginTime.substr(0,4),beginTime.substr(4,2),beginTime.substr(6,2));
   var numberEndendTime=new Date(endTime.substr(0,4),endTime.substr(4,2),endTime(6,2));
   var lag=numberEndendTime.getTime()-numberbeginTime.getTime();
   if (lag>=0) {
    alert('请选择，正确的时间');
    return;
  }
}  

/*
 *表格和数组的配置参数
 */
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
        }]
    }


/*
 * 请求数据和生成折线图
 * @param  {[string]} beginTime [请求参数的开始时间]
 * @param  {[string]} endTime   [请求参数中的结束时间]
 * @return {[obj]}           [返回生成数据的折线图和表格]
 */
function  creatLineAndPutDataToTable(beginTime,endTime){
  this.beginTime=beginTime;
  this.endTime=endTime;
  //跨域支持
  jQuery.support.cors=true;
  $.ajax({
       method:'get',
       url:'http://58.67.201.23/serviceProxy/servlet/'+ new Date(),
       data:{
         "id":"522622198501281033",
         "startTime":beginTime,
         "table":"yhxy01",
         "endTime":endTime,
         "SERVICE_CODE":"bull.ResourcesHZ.CXDXXX.List",
         "CONSUMER_ID":"test-3db1115089554ee5baf819409034c399"
       },
       dataType:"json",
       error:function(XMLHttpRequest, textStatus, errorThrown){
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);

       },
       beforeSend:function timeLag(){
           console.log(beginTime+endTime);
           var numberbeginTime=new Date(beginTime.substr(0,4),beginTime.substr(5,2)-1,beginTime.substr(8,2));
           console.log(numberbeginTime);
           var numberEndendTime=new Date(endTime.substr(0,4),endTime.substr(5,2)-1,endTime.substr(8,2));
           console.log(numberEndendTime);
           var lag=numberEndendTime.getTime()-numberbeginTime.getTime();
           if (lag<=0) {
            alert('请选择，正确的时间');
            return;
          }
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
          
            alert('获取数据失败，请检查网络连接')

          }
           $("#cloneTr").hide();
  
  
 }     
    });
}
/**
 * [lineToggle 清理页面中的折线图，重新生成一个新的折线图]
 * @return {[type]} [description]
 */
function lineToggle() {
    $('#container').remove();
      var warp=$(document.createElement('div'));
      warp.attr("id","container");
      warp.css({ "min-width":"310px","height": "400px" ,"margin":"0 auto"});
      $('.g-sd').append(warp);
}
/**
 * [点击提交]
 * @param  {[type]} ){ lineToggle();   creatLineAndPutDataToTable(beginTime,endTime);} [description]
 * @return {[type]}     [description]
 */
$('#u-submit').bind('click',function(){
   timeLag();
   lineToggle();

   creatLineAndPutDataToTable(beginTime,endTime);
})
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
      return date.getFullYear()+'-'+padding(date.getMouth()+1)+'-'+padding(date.getDate())+''+padding(date.gethours())+':'+padding(date.getMinutes())+':'+padding(date.getSeconds());
 }

/*(function{
  //lineToggle();
  var endTime=new Data();
  console.log(endTime);
  creatLineAndPutDataToTable(beginTime,endTime);
});
*/





