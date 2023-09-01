/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : yonryna ( yonryna123@gmail.com )
 * @Description    : (팝업)메시지 송신내역별 수신내역 목록조회 view
 * @History      	 : 20140425063135, yonryna
 * </pre>
 **/
var pop_gbox_pc_2020={};

new (Jex.extend({
	// onload function 
	onload:function() {
		var input ={};
		input['MSG_NO'] = _msgNo;
		pop_gbox_pc_2020.fillUserTbl(input);
	}, 
	event:function() {
		/*$("#sendSmsBtn").click(function() {
			var ajax=jex.createAjaxUtil("pc_sms_c001");
			ajax.set("MSG_NO" , _msgNo);
			ajax.execute(function(dat){
				jex.success(_extLang.total +dat.SMS_CNT+ _extLang.unconfirmedSMS);  //총                     //건의 미확인 SMS 메시지를 보냈습니다.
			});
		});*/
	}
}))();

$("#closeVieSendPopup").live("click", function(){
//	$('#viewSendPopUpFram').bPopup().close();
	 var iframe =  parent.document.getElementById("viewSendPopUpFram");
	 parent.$(iframe).bPopup().close();
	 
});

//fill data to table 
pop_gbox_pc_2020.fillUserTbl = function(input) {
	
	if(!input) input = {};
	
	if(jex.isNull(pop_gbox_pc_2020.tbl)) {
		pop_gbox_pc_2020.tbl=jex.plugin.newInstance("JEX_TBL","#TBL_SET");
		pop_gbox_pc_2020.tbl.addEvent("onSvrPageChange", function(dat) {
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": pop_gbox_pc_2020.tbl.getSvrPageSize()
			};
			//pop_gbox_pc_2020.fillTbl(input);
			pop_gbox_pc_2020.fillUserTbl(input);
		});
		
		pop_gbox_pc_2020.tbl.addFormatter("MSG_GB", function(dat) {
			if(dat == "0") {
				return "SMS";
			}
			else if(dat == "1") {
				return "그린메시지";
			}
		});
		
		//add format on field row data
		pop_gbox_pc_2020.tbl.addFormatter("ROW_DATA", function(dat) {
			var datarow = jex.parse(dat);
			
			//not readed
			if(datarow.RECV_STS != "1") {
				//sms
				if(datarow.MSG_GB == "0") {
					return "-";
				}
				//green message
			   	else {
					return "<span style='color: red;'>미확인</span>";
				}
			}
			//readed
			else {
				//display readed date and time
				return moment(datarow.RECV_DATE, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow.RECV_TIME, "HHmmss").format("HH:mm");
			}
		});
		//add format on field row data1
		pop_gbox_pc_2020.tbl.addFormatter("ROW_DATA1", function(dat) {
			var datarow1 = jex.parse(dat);
			
			/*if(datarow1.MSG_GB == "0") {
		   		return "-";
		   	}
		   	else {}*/
		   		if(datarow1.SMS_SND_DATE == "0" || datarow1.SMS_SND_DATE == null) {
	    			return "-";
			   	}else {
			   		return moment(datarow1.SMS_SND_DATE, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow1.SMS_SND_TIME, "HHmmss").format("HH:mm:ss");
				}
		   	
		});
	}
	//set pagination for data table
	pop_gbox_pc_2020.tbl.setPaging("div:#paging2;per:"+10);
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": pop_gbox_pc_2020.tbl.getSvrPageSize()
		};
	}
	
	var ajax=jex.createAjaxUtil("pc_sendcnt_r001");
	ajax.set(input);
	ajax.execute(function(dat){
		//console.log(dat);
		var jsonRecs = [];
		var notReadedCnt = 0;
		$.each(dat['INQ_REC'], function(i, v) {
			v["ROW_DATA"] = jex.toStr(v);
			v["ROW_DATA1"] = jex.toStr(v);

			jsonRecs.push(v);
			
			if(v.RECV_STS != "1") {
				notReadedCnt++;
			}

		});
		
		
		pop_gbox_pc_2020.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		pop_gbox_pc_2020.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
	    pop_gbox_pc_2020.tbl.setAll(jsonRecs);
   		if(dat['INQ_REC'].length > 0) {
   			$("#tfoot").hide();
   		}
   		else{
   			$("#tfoot").show();
   		}
   		
   		if(notReadedCnt > 0) {
   			$("#sendSmsBtn").show();
   		}
	});
};




//fill data to table 
/*pop_gbox_pc_2020.fillUserTbl = function(input) {
	
	if(!input) input = {};
	
	if(jex.isNull(pop_gbox_pc_2020.tbl)) {
		pop_gbox_pc_2020.tbl=jex.plugin.newInstance("JEX_TBL","#TBL_SET");
		pop_gbox_pc_2020.tbl.addEvent("onSvrPageChange", function(dat) {
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": pop_gbox_pc_2020.tbl.getSvrPageSize()
			};
			//pop_gbox_pc_2020.fillTbl(input);
			pop_gbox_pc_2020.fillUserTbl(input);
		});
		
		pop_gbox_pc_2020.tbl.addFormatter("MSG_GB", function(dat) {
			if(dat == "0") {
				return "SMS";
			}
			else if(dat == "1") {
				return "그린메시지";
			}
		});
		
		//add format on field row data
		pop_gbox_pc_2020.tbl.addFormatter("ROW_DATA", function(dat) {
			var datarow = jex.parse(dat);
			
			if(datarow.MSG_GB == "0") {
		   		return "-";
		   	}
		   	else {
				if(datarow.RECV_STS != "1") {
					return "<span style='color: red;'>미확인</span>";
				}
				else {
					return moment(datarow.RECV_DATE, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow.RECV_TIME, "HHmmss").format("HH:mm");
				}
		   	}
		});
		//add format on field row data1
		pop_gbox_pc_2020.tbl.addFormatter("ROW_DATA1", function(dat) {
			var datarow1 = jex.parse(dat);
			
			if(datarow1.MSG_GB == "0") {
		   		return "-";
		   	}
		   	else {}
		   		if(datarow1.SEND_DT == "0" || datarow1.SEND_DT == null) {
	    			return "<span style='color: red;'>미확인</span>";
			   	}else {
					//return moment(datarow1.RECV_DATE, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow1.RECV_TIME, "HHmmss").format("HH:mm");
					return moment(datarow1.SEND_DT, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow1.SEND_TM, "HHmmss").format("HH:mm");
				}
		   	
		});
	}
	//set pagination for data table
	pop_gbox_pc_2020.tbl.setPaging("div:#paging;per:"+10);
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": pop_gbox_pc_2020.tbl.getSvrPageSize()
		};
	}
	
	var ajax=jex.createAjaxUtil("pc_sendcnt_r001");
	ajax.set("MSG_NO" , _msgNo);
	ajax.set(input);
	ajax.execute(function(dat){
		var jsonRecs = [];
		var notReadedCnt = 0;
		
		$.each(dat['INQ_REC'], function(i, v) {
			v["ROW_DATA"] = jex.toStr(v);
			v["ROW_DATA1"] = jex.toStr(v);
		
			jsonRecs.push(v);
			
			if(v.RECV_STS != "1") {
				notReadedCnt++;
			}
		});
		
		
		pop_gbox_pc_2020.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		pop_gbox_pc_2020.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
	    pop_gbox_pc_2020.tbl.setAll(jsonRecs);
	    
   		if(dat['INQ_REC'].length > 0) {
   			$("#tfoot").hide();
   		}
   		else{
   			$("#tfoot").show();
   		}
   		
   		if(notReadedCnt > 0) {
   			$("#sendSmsBtn").show();
   		}
	});
};*/



