 
    /*<table id="generatedTable" style ="border=2; display: none;">  
                <thead>  
                    <tr>  
                        <th style='width:10%;'>第一列</th>  
                        <th style='width:15%;'>第二列</th>  
                        <th style='width:10%;'>第三列</th>  
                        <th style='width:10%;'>第四列</th>                               
                        <th style='width:3%;'>第五列</th>                            
                    </tr>  
                </thead>  
                <tbody>  
                    <tr id="cloneTr">  
                       <td></td>  
                       <td></td>  
                       <td></td>  
                       <td></td>  
                      <td></td>           
                     </tr>  
                 </tbody>  
     </table>*/                    
 function getDateToTable(){
   ajaxPost({  
         type:"GET",  
         url:"<c:url value='/logDetails.auth'/>",  
         data:"datas="+datas;//要发送的数据  
                               
                 //object是后台传过来的java list数据集合  
                   success:function(objects){                         
                                        
                      //1,获取上面id为cloneTr的tr元素  
                          var tr = $("#cloneTr");  
  
                       $.each(objects, function(index,item){                              
                             //克隆tr，每次遍历都可以产生新的tr                              
                               var clonedTr = tr.clone();  
                               var _index = index;  
                              
                               //循环遍历cloneTr的每一个td元素，并赋值  
                               clonedTr.children("td").each(function(inner_index){  
                                  
                                      //根据索引为每一个td赋值  
                                            switch(inner_index){  
                                                  case(0):   
                                                     $(this).html(_index + 1);  
                                                     break;  
                                                  case(1):  
                                                     $(this).html(item.caller);  
                                                     break;  
                                                 case(2):  
                                                     $(this).html(item.imsi);  
                                                     break;  
                                                 case(3):  
                                                     $(this).html(item.imei);  
                                                     break;  
                                                 case(4):  
                                                     $(this).html(item.osid);  
                                                     break;  
                                
                                           }//end switch                          
                          });//end children.each  
                          
                           //把克隆好的tr追加原来的tr后面  
                        clonedTr.insertAfter(tr);  
                });//end $each  
      $("#cloneTr").hide();//隐藏id=clone的tr，因为该tr中的td没有数据，不隐藏起来会在生成的table第一行显示一个空行  
    $("#generatedTable").show();  
         }//end success  
    });//end ajaxpost                          
 };
 //
 function padding(number){
   return number<10?'0'+number:''+number;
 }
 // formatData
 function format(date){
      return date.getFullYear()+'-'+padding(date.getMouth()+1)+'-'+padding(date.getDate())+''+padding(date.gethours())+':'+padding(date.getMinutes())+':'+padding(date.getSeconds());
 }
 function getTimeLag(){
            var bng = document.getElementById('bng').value;
            var end =  document.getElementById('end').value;
            alert('bng='+bng+',end='+end);
            var bngDate = new Date(bng.substr(0,4),bng.substr(4,2)-1,bng.substr(6,2));
            var endDate = new Date(end.substr(0,4),end.substr(4,2)-1,end.substr(6,2));
            var days = (endDate.getTime()-bngDate.getTime())/24/60/60/1000;
            alert(days);
}
function getNow(){

}

//new data(2015,2,0);
//设置3月的第0天，浏览器会自动生成二月最后一天，因此可以通过getDate()，来求一个月的个数;

function getDay(year,month){
    var date=new Date(year,month,0);
    return date.getDate();
}