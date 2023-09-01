/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    :  pop_pop_gbox_pc_3140
 * @History      	 : 20140425062103, Choi Si-hwan
 * </pre>
 **/
var pop_gbox_pc_3140 = {};
new (Jex.extend({
	
	
	
	onload:function() {
		//--- todo onload start ---//
		$("#USER_NM").attr("placeholder", _extLang.searchByName); // 이름검색
		pop_gbox_pc_3140.fillUserTbl(jex.getAllData("#searchForm"));
		
		$("#USER_NM").keyz({
			"enter": function(ctrl, sft, alt, event) {
				pop_gbox_pc_3140.fillUserTbl(jex.getAllData("#searchForm"));
				return false;
			}
		});
		
		var gName = _gNm;
		$("#GRP_NM").text(gName);
		
	}, event:function() {
		//--- define event action ---//
		/*$('#btnClose').click(function(){
			self.close();
		});*/
		
		// Add Group User
		$('#btnCom').click(function(){
			var checkedList=$('tr:has(input:checked)').find('#USER_NM');
			var jsonRec=[];
			var ajax=jex.createAjaxUtil("pc_gruser_c001");
			if( checkedList.length == 0 ){
				jex.warning(_extLang.selectRegister); //등록할 항목을 선택하세요.
				return false;
			}
			else{
		    	ajax.set("GRP_NO",_gNum);
		    	$("table#USR_TBL tbody tr:has(input:checked)").find("#USER_NO").each(function(i, v) {
		    		var jsonItem1 = {"USER_NO": $(v).text()};
		    		jsonRec.push(jsonItem1);
		    	});
			    ajax.set("REG_REC",jsonRec);
				ajax.execute(function(){
					opener.jex.success(_extLang.registerMember);//구성원이 등록되었습니다.
					opener.gbox_pc_3100.fillTbl();
					self.close();
				});
			}
		});
		//Search
		$('#btnSearch').click(function(){
			pop_gbox_pc_3140.fillUserTbl(jex.getAllData("#searchForm"));
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


pop_gbox_pc_3140.fillUserTbl = function(input) {
	if(!input) input = {};
	
	if(jex.isNull(pop_gbox_pc_3140.tbl)) {
		pop_gbox_pc_3140.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
		pop_gbox_pc_3140.tbl.addEvent("onSvrPageChange", function(dat) {
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": pop_gbox_pc_3140.tbl.getSvrPageSize()
			};
			pop_gbox_pc_3140.fillUserTbl(input);
		});
	}
	
	pop_gbox_pc_3140.tbl.setPaging("div:#paging;per:"+10);
//	pop_gbox_pc_3140.tbl.setSvrPageNo("10");
	
//	pop_gbox_pc_3140.tbl.beforePageChange(function() {
//		//alert("prev");
//	});
//	pop_gbox_pc_3140.tbl.afterPageChange(function() {
//		//alert("next");
//	});
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": pop_gbox_pc_3140.tbl.getSvrPageSize()
		};
	}
	
	var ajax=jex.createAjaxUtil("pc_user_r001");
	ajax.set("USER_NM",$('#USER_NM').val());
	ajax.set("GRP_NO", _gNum);
	ajax.set(input);
	ajax.execute(function(dat) {
		pop_gbox_pc_3140.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		pop_gbox_pc_3140.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		pop_gbox_pc_3140.tbl.setAll(dat['INQ_REC']);
		
		//if data not exist
		if(dat['INQ_REC'] == "") {
    	   	$("#tfoot").show();
		}
		//if data exist
		else {
			$("#tfoot").hide();
		}
	});
};