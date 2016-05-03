 
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


//ajax处理数据，然后对数据进行分页
function getJSONData(pn) {
	// alert(pn);
	$.getJSON("blackList.ce", function(data) {
		var totalCount = data.totalCount; // 总记录数
		var pageSize = 10; // 每页显示几条记录
		var pageTotal = Math.ceil(totalCount / pageSize); // 总页数
		var startPage = pageSize * (pn - 1);
		var endPage = startPage + pageSize - 1;
		var $ul = $("#json-list");
		$ul.empty();
		for (var i = 0; i < pageSize; i++) {
			$ul.append('<li class="li-tag"></li>');
		}
		var dataRoot = data.jsonRoot;
		if (pageTotal == 1) {     // 当只有一页时
			for (var j = 0; j < totalCount; j++) {
				$(".li-tag").eq(j).append("<span class='col1'><input type='checkbox' value='"+parseInt(j + 1)+"'/></span>")
				.append("<span class='col2'>" + parseInt(j + 1)
						+ "</span>").append("<span class='col3'>" + dataRoot[j].mobile
						+ "</span>").append("<span class='col4'>" + dataRoot[j].province
						+ "</span>").append("<span class='col5'>" + dataRoot[j].gateway
						+ "</span>").append("<span class='col6'>" + dataRoot[j].insertTime
						+ "</span>").append("<span class='col7'>" + dataRoot[j].remark
						+ "</span>")
			}
		} else {
			for (var j = startPage, k = 0; j < endPage, k < pageSize; j++, k++) {
				if( j == totalCount){
					break;       // 当遍历到最后一条记录时，跳出循环
				}
				$(".li-tag").eq(k).append("<span class='col1'><input type='checkbox' value='"+parseInt(j + 1)+"'/></span>")
				.append("<span class='col2'>" + parseInt(j + 1)
						+ "</span>").append("<span class='col3'>" + dataRoot[j].mobile
						+ "</span>").append("<span class='col4'>" + dataRoot[j].province
						+ "</span>").append("<span class='col5'>" + dataRoot[j].gateway
						+ "</span>").append("<span class='col6'>" + dataRoot[j].insertTime
						+ "</span>").append("<span class='col7'>" + dataRoot[j].remark
						+ "</span>")
			}
		}
		$(".page-count").text(pageTotal);
	})
}
function getPage() {
	$.getJSON("blackList.ce", function(data) {
				pn = 1;
				var totalCount = data.totalCount; // 总记录数
				var pageSize = 10; // 每页显示几条记录
				var pageTotal = Math.ceil(totalCount / pageSize); // 总页数
				$("#next").click(function() {
							if (pn == pageTotal) {
								alert("后面没有了");
								pn = pageTotal;
							} else {
								pn++;
								gotoPage(pn);
							}
						});
				$("#prev").click(function() {
							if (pn == 1) {
								alert("前面没有了");
								pn = 1;
							} else {
								pn--;
								gotoPage(pn);
							}
						})
				$("#firstPage").click(function() {
							pn = 1;
							gotoPage(pn);
						});
				$("#lastPage").click(function() {
							pn = pageTotal;
							gotoPage(pn);
						});
				$("#page-jump").click(function(){
					if($(".page-num").val()  <= pageTotal && $(".page-num").val() != ''){
						pn = $(".page-num").val();
						gotoPage(pn);
					}else{
						alert("您输入的页码有误！");
						$(".page-num").val('').focus();
					}
				})
				$("#firstPage").trigger("click");
				
			})
}
function gotoPage(pn) {
	// alert(pn);
	$(".current-page").text(pn);
	getJSONData(pn)
}

$(function() {
	getPage();
})