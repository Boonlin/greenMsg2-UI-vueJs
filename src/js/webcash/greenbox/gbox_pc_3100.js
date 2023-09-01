/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : 그룹 관리화면 view
 * @History      	 : 20140425050151, Choi Si-hwan
 * </pre>
 **/
var gbox_pc_3100 = {};
/*var page=1;
var comb0=10;*/

new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		//gbox_pc_3100.fillTbl();
		$("#GRP_NM").attr("placeholder", _extLang.searchByName); // 이름검색
		gbox_pc_3100.fillTbl(jex.getAllData("#searchForm"));
		
		/*var x = document.getElementById("cmb");
		x.remove(1);*/
	
	}, event:function() {
		//--- define event action ---//
		//Combobox Change
		$("#cmb").change(function(){
			gbox_pc_3100.tbl.setCurrentPage(1);
			gbox_pc_3100.tbl.setSvrPageNo(1);
			gbox_pc_3100.fillTbl();
			//alert($("#cmb").val());
			var input = jex.getAllData("#searchForm");
			gbox_pc_3100.fillTbl(input);
			
		});
		
		//Delete Data
		$("#btnDelete").click(function () {
			var jsonRec=[];
			var cval="";
			$("table#USR_TBL tbody tr:has(input:checked)").each(function(i,v){
				
				var jsonItem1 = {
						"GRP_NO": $(v).find("#GRP_NO").text(),
						"GRP_NM": $(v).find("#GRP_NM").text()
				};
	    		jsonRec.push(jsonItem1);
			});
		    var gNum=$('td input:checked').parents('td').siblings().find('#GRP_NO').text();
			
			if(jsonRec.length == 0) {
			 	jex.warning(_extLang.selectDel);//삭제할 항목을 선택하세요.
			}
			else {
				var input = {};
				input["GROUPS"] = jex.toStr(jsonRec);
				jex.newWin( "/pop_gbox_pc_3130.act", "pop_gbox_pc_3130", 500, 250, input);
			}
		});
	
		//Add New Data
		$("#btnNew").click(function(){
			jex.newWin( "/pop_gbox_pc_3120.act", "pop_gbox_v2", 500, 250 );
		});
		//search
		$("#btnSearch").click(function(){
			gbox_pc_3100.tbl.setCurrentPage(1);
		    gbox_pc_3100.tbl.setSvrPageNo(1);
		    gbox_pc_3100.fillTbl(jex.getAllData("#searchForm"));
		   
		});	
		
		$("#chk").keyz({
			"enter": function(ctrl, sft, alt, event) {
				gbox_pc_3100.tbl.setCurrentPage(1);
			    gbox_pc_3100.tbl.setSvrPageNo(1);
				gbox_pc_3100.fillTbl(jex.getAllData("#searchForm"));
			}
		});
		
		$("#GRP_NM").keyz({
			"enter": function(ctrl, sft, alt, event) {
				gbox_pc_3100.tbl.setCurrentPage(1);
			    gbox_pc_3100.tbl.setSvrPageNo(1);
				gbox_pc_3100.fillTbl(jex.getAllData("#searchForm"));
			}
		});
		//Update Data
		$("#btnUpdate").click(function () {
			//check button Update (Can Update 1 Row)
			// if j==1 have checkbox 1 
			// if j!=1 have checkbox muti or 0
			var j=0;
			$("table#USR_TBL tbody tr:has(input:checked)").each(function(i,v){
					j=j+1;
				});
			
			if(j==1)
			 {
				var cval=$('td input:checked').parents('td').next().find('div').text();
				var gNum=$('td input:checked').parents('td').siblings().find('#GRP_NO').text();
				var input = {};
				input["GROUP_NAME"] = cval;
				input["GROUP_NUM"] = gNum;
				jex.newWin( "/pop_gbox_pc_3150.act", "pop_gbox_pc_3150", 500, 250, input);
			 }
			else
			 {
				jex.warning(_extLang.selectModify);//수정할 항목을 선택하세요.
			 }

		});
			
			
		//Button CheckboxAll Chekcbox	
		$('#checkb').click(function(){
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





gbox_pc_3100.fillTbl = function(input) {
	
	if(!input) input = {};
	
	if(jex.isNull(gbox_pc_3100.tbl)) {
		gbox_pc_3100.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");	
		gbox_pc_3100.tbl.addEvent("onSvrPageChange", function(dat) {
			var input = jex.getAllData("#searchForm");
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": gbox_pc_3100.tbl.getSvrPageSize()
			};
			gbox_pc_3100.fillTbl(input);
			
		});
		
		gbox_pc_3100.tbl.onClick("btnGA", function(row) {			
//			var input = {};
//			input["GROUP_NAME"] = cval;
			jex.newWin( "pop_gbox_pc_3140.act", "pop_gbox_pc_3140", 620, 700, row);
		});
		
		gbox_pc_3100.tbl.onClick("btnSA", function(row) {
			jex.newWin( "pop_gbox_pc_3110.act", "pop_gbox_pc_3110", 620, 700, row);
		});
	}
	
	var ajax=jex.createAjaxUtil("pc_group_r001");
	var combo = $("#cmb").val();
	gbox_pc_3100.tbl.setPaging("div:#paging;per:"+combo);
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": gbox_pc_3100.tbl.getSvrPageSize()
		};
		
	}
	
	ajax.set(input);
	
	
	gbox.ui.createProgressBar();
	
	ajax.execute(function(dat){
		gbox_pc_3100.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		gbox_pc_3100.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		gbox_pc_3100.tbl.setAll(dat['INQ_REC']);
		
   
		if(dat['INQ_REC'] == ""){
			$("#tfoot").show();
   	   	}
		else {
			$("#tfoot").hide();
		}
		
		gbox.ui.destroyProgressBar();
	});
};
