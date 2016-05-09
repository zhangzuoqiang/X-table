
$(function(){
   creatLineAndPutDataToTable();
  
});

function  creatLineAndPutDataToTable(){

  //跨域支持
  jQuery.support.cors=true;
  $.ajax({
       method:'get',
       url:'http://58.67.201.23:9083/serviceProxy/servlet/',
       data:{
        "id":"522622198501281033",
         "startTime":"2015-08-18",
        "table":"yhny",
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
                        
                       break;
                       //姓名
                       case(1):
                         $(this).text(item.YHMC);
                       break;
                      
                       case(2):
                          $(this).text(item.BXB);
                          break;
                       case(3):
                         $(this).text(item.PTT);
                         break;
                      case(4):
                         $(this).text(item.YXSY);
                         break;
                      case(5):
                         $(this).text(item.PH);
                         break;
                      case(6):
                         $(this).text(item.HXB);
                         break;
                      case(7):
                         $(this).text(item.NDY);
                         break;
                      case(8):
                         $(this).text(item.DHS);
                         break;
                      case(9):
                          $(this).text(item.DBZ);
                         break;
                       case(10):
                          $(this).text(item.BZ);
                         break;
                       case(11):
                          $(this).text(item.TT);
                         break;
                        case(12):
                          $(this).text(item.WSSC);
                         break;



                      
                  }
                
                });
                clonedTr.insertAfter(tr);
            });
             
    
    
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

