/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Long Bunna ( long_bunna@ymail.com )
 * @Description    : 웹케시 산악회 view
 * @History      	 : 20140428113048, Long Bunna
 * </pre>
 **/
var gbox_pc_3110 = {};
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		gbox_pc_3110.fillUserTbl();
		$("#USER_NM").attr("placeholder", _extLang.searchByName); // 이름검색
		var gName = _gNm;
		$("#GRP_NM").text(gName);
		
		$("#USER_NM").keyz({
			"enter": function(ctrl, sft, alt, event) {
				gbox_pc_3110.fillUserTbl();
				return false;
			}
		});	
		
	}, event:function() {
		//--- define event action ---//
		//Close 
		$('#btnClose').click(function(){
			self.close();
		});
	
		//Delete User
		$('#btndel').click(function(){
			var jsonRec=[];
			var checkedList=$('tr:has(input:checked)').find('#USER_NM');
			var ajax = jex.createAjaxUtil("pc_gruser_d001");
			if( checkedList.length == 0 ){
				jex.warning("삭제할 항목을 선택하세요.");//삭제할 항목을 선택하세요.
				return false;
			}
			else{
		    	ajax.set("GRP_NO",_gNum);
			    	
		    	$("table#USR_TBL tbody tr:has(input:checked)").find("#USER_NO").each(function(i, v) {
		    		var jsonItem1 = {"USER_NO": $(v).text()};
		    		jsonRec.push(jsonItem1);
		    	});
			    ajax.set("DEL_REC",jsonRec);
				
				ajax.execute(function(){
					opener.jex.success("구성원이 삭제되었습니다.");//구성원이 삭제되었습니다.
					//self.close();
				});
			}
		});
		
		//Search
		$('#btnS').click(function(){
				gbox_pc_3110.fillUserTbl();	
		});
		//CheckAll Checkbox
		$('#checkAll').click(function(){
			$('input:checkbox').not(this).prop('checked', this.checked);
			
			if($(this).is(":checked")) {
				$("table tbody tr").addClass("on");
			}
			else {
				$("table tbody tr").removeClass("on");
			}
		});
		
		
		$("table tbody input:checkbox").live("click", function() {
			if($(this).is(":checked")) {
				$(this).closest("tr").addClass("on");
			}
			else {
				$(this).closest("tr").removeClass("on");
			}
		});
	}
}))();


gbox_pc_3110.fillUserTbl = function(input) {
	if(!input) input = {};
	
	if(jex.isNull(gbox_pc_3110.tbl)) {
		gbox_pc_3110.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
		gbox_pc_3110.tbl.addEvent("onSvrPageChange", function(dat) {
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": gbox_pc_3110.tbl.getSvrPageSize()
			};
			gbox_pc_3110.fillUserTbl(input);
		});
	}
	
	gbox_pc_3110.tbl.setPaging("div:#paging;per:"+10);
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": gbox_pc_3110.tbl.getSvrPageSize()
		};
	}
	
	var ajax=jex.createAjaxUtil("pc_gruser_r001");
	
	ajax.set("USER_NM",$('#USER_NM').val());
	ajax.set("GROUP_NO", _gNum);
	ajax.set(input);
	
	ajax.execute(function(dat) {
		gbox_pc_3110.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		gbox_pc_3110.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		gbox_pc_3110.tbl.setAll(dat['USER_REC']);
		
		//if data not exist
		if(dat['USER_REC'] == "") {
    	   	$("#tfoot").show();
    	   	$(".paging_wrap").hide();
		}
		//if data exist
		else {
			$("#tfoot").hide();
			$(".paging_wrap").show();
		}
	});
};