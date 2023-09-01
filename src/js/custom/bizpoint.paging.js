
var _datChrgList = [];

var INQ_TOTL_NCNT  = 15;//한페이지당 표시 목록 수
var PAGE_NO        = 1;	//현재페이지 번호
var TOTL_PAGE_NCNT = 1; //총페이지수

var _searchList={
		
	
	setInit : function(){
		
		var tmpTxtBox = "";
		
		tmpTxtBox += "<ul>																		";
		tmpTxtBox += "<li><input type=\"hidden\" id=\"\" value=\"15\"><a href=\"#none\">15개</a></li>    ";
		tmpTxtBox += "<li><input type=\"hidden\" id=\"\" value=\"20\"><a href=\"#none\">20개</a></li>    ";
		tmpTxtBox += "<li><input type=\"hidden\" id=\"\" value=\"30\"><a href=\"#none\">30개</a></li>    ";                   
		tmpTxtBox += "<li><input type=\"hidden\" id=\"\" value=\"100\"><a href=\"#none\">100개</a></li>  ";
		tmpTxtBox += "</ul>    		                                                            ";
		
        $("#pagingPopLst").append(tmpTxtBox);
        
   
        
	},

	setInqTotlNcnt : function(inqtotlncnt){
		INQ_TOTL_NCNT = inqtotlncnt;
	},
	
	setPageNo : function(pageno){
		PAGE_NO = pageno;	
	},
	
	setTotlPageNcnt : function(totlpagencnt){
		TOTL_PAGE_NCNT = totlpagencnt;	
	},
	
	getInqTotlNcnt : function(){
		return INQ_TOTL_NCNT;	
	},
	
	getPageNo : function(){
		return parseInt(PAGE_NO);
	},
	
	getTotlPageNcnt : function(){
		return parseInt(TOTL_PAGE_NCNT);
	},
	
	drawTablePaing : function(div_id, callback, curPageNo, totPage){

		
		
		var page_size = 10; //표시할 페이지 수
		
		var currentPage  = (curPageNo)?curPageNo:1;
		if(currentPage < 1) currentPage = 1;
		if(currentPage > totPage) currentPage = totPage;
		var currentBlock = Math.ceil(currentPage/page_size);
		var firstPage     = currentBlock*page_size-page_size+1;
		var lastPage      = currentBlock*page_size;
		
		$("#"+div_id).children().remove();
		
		if(totPage > 0){
			var firstHtml   = " <a id=\"paging_first\" class=\"btn_pag_cntr first\"><span class=\"blind\">first</span></a>";
			var prevHtml    = " <a id=\"paging_pre\"   class=\"btn_pag_cntr prev\" ><span class=\"blind\">previous</span></a>";
			var nextHtml    = " <a id=\"paging_next\"  class=\"btn_pag_cntr next\" ><span class=\"blind\">next</span></a>";
			var lastHtml    = " <a id=\"paging_last\"  class=\"btn_pag_cntr last\" ><span class=\"blind\">last</span></a>";
			var pageHtml    = " <span class=\"pag_num\"> ";
			
			for(var i = firstPage; i <= lastPage && i <= totPage;  i++){
				if(currentPage == i){
					pageHtml += "<a class=\"on\">"+i+"</a>";
				}else{ 
					pageHtml += "<a>"+i+"</a>";				
				}
				if(i != lastPage && i != totPage){
					pageHtml += "&nbsp;.";
				}
			} 	
			pageHtml += " </span>";
			
			$("#"+div_id).append(firstHtml);
			$("#"+div_id).append(prevHtml);
			$("#"+div_id).append(pageHtml);
			$("#"+div_id).append(nextHtml);
			$("#"+div_id).append(lastHtml);
		}
/*		
		$("#"+div_id).find("#paging_first").bind("click",function(){			
			if($.isFunction(callback)){
				callback(1);
			}							
		});		

		$("#"+div_id).find("#paging_pre").bind("click",function(){		
			currentBlock--;
			currentPage = currentBlock*page_size-page_size+1;
			if(currentPage < 0) currentPage = 1;
			if($.isFunction(callback)){
				callback(currentPage);
			}
		});
		$("#"+div_id).find("#paging_next").bind("click",function(){		
			currentBlock++;
			currentPage = currentBlock*page_size-page_size+1;
			if(currentPage > totPage){
				currentPage = totPage;
			}
			if($.isFunction(callback)){
				callback(currentPage);
			}
		});
		$("#"+div_id).find("#paging_last").bind("click",function(){		
			if($.isFunction(callback)){
				callback(totPage);
			}
		});
		$("#"+div_id).find(".pag_num a").bind("click",function(){		
			currentPage = $(this).html();
			if($.isFunction(callback)){
				callback(currentPage);
			}
		});
*/			
		$("#"+div_id).find("#paging_first").click(function(){
			if($.isFunction(callback)){
				callback(1);
			}
		});
		$("#"+div_id).find("#paging_pre").click(function(){
			currentBlock--;
			currentPage = currentBlock*page_size-page_size+1;
			if(currentPage < 0) currentPage = 1;
			if($.isFunction(callback)){
				callback(currentPage);
			}
		});
		$("#"+div_id).find("#paging_next").click(function(){
			currentBlock++;
			currentPage = currentBlock*page_size-page_size+1;
			if(currentPage > totPage){
				currentPage = totPage;
			}
			if($.isFunction(callback)){
				callback(currentPage);
			}
		});
		$("#"+div_id).find("#paging_last").click(function(){
			if($.isFunction(callback)){
				callback(totPage);
			}
		});
		$("#"+div_id).find(".pag_num a").click(function(){
			currentPage = $(this).html();
			if($.isFunction(callback)){
				callback(currentPage);
			}
		});			
	}


};
