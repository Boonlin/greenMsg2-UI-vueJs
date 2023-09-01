/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : chhaeuy chhon ( chheouy@yahoo.com )
 * @Description    : 공지사항 목록조회 view
 * @History      	 : 20140503093623, chhaeuy chhon
 * </pre>
 **/


var gbox_pc_4100 = {};

new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		
		gbox_pc_4100.fillTbl();
		
	}, event:function() {
		$("#cmbo").change(function(){
			gbox_pc_4100.tbl.setCurrentPage(1);
			gbox_pc_4100.tbl.setSvrPageNo(1);
			gbox_pc_4100.fillTbl();
		});
	}
}))();

gbox_pc_4100.fillTbl = function(input) {
	if(!input) input = {};
	
	if(jex.isNull(gbox_pc_4100.tbl)) {
		gbox_pc_4100.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
		gbox_pc_4100.tbl.addEvent("onSvrPageChange", function(dat) {
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": gbox_pc_4100.tbl.getSvrPageSize()
			};
			gbox_pc_4100.fillTbl(input);
		});
		
		gbox_pc_4100.tbl.onClick(function(row) { 
			jex.newWin( "/pop_gbox_pc_4201.act", "pop_gbox_v3", 620, 700, row);
	    });
	}
	
	var cmb = $("#cmbo").val();
	gbox_pc_4100.tbl.setPaging("div:#paging;per:"+cmb);
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": gbox_pc_4100.tbl.getSvrPageSize()
		};
	}
	
	var ajax = jex.createAjaxUtil("pc_noti_r001");
	ajax.set(input);
	
	gbox.ui.createProgressBar();
	
	ajax.execute(function(dat) {	
		
		var totalRows = parseInt(dat.PAGINATION["TOTAL_ROWS"], 10);
		
		var jsonRecs = [];
		$.each(dat['INQ_REC'], function(i, v) {
			v["REG_DTM"] = moment(v.REG_DT, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(v.REG_TM, "HHmmss").format("HH:mm:ss");
//			v["NOTI_NO"] = Number(v["NOTI_NO"]);
			v["NOTI_TXT"] = totalRows--;
 		
			jsonRecs.push(v);
		});
		
		gbox_pc_4100.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		gbox_pc_4100.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		gbox_pc_4100.tbl.setAll(jsonRecs);
		
		gbox.ui.destroyProgressBar();
						
	});
};
