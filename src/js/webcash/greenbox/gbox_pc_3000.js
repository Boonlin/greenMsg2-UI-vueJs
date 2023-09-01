/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Long Bunna ( long_bunna@ymail.com )
 * @Description    : 연락처 관리 view
 * @History      	 : 20140425055153, Long Bunna
 * </pre>
 **/
var gbox_pc_3000 = {};
var tmp = '<li data-grp_no="${GRP_NO}" data-grp_nm="${GRP_NM}"><div id="group"><a href="javascript:" class="com_sub_item" data-grp_no="${GRP_NO}"  data-grp_nm="${GRP_NM}">${GRP_NM}</a><strong id="USER_CNT"></strong></a><span class=""><a href="javascript:" class="ico_edit" id="editGroup" ><span class="blind">edit button</span></a><a href="javascript:" class="ico_del" id="delGroup" data-grp_no="${GRP_NO}"><span class="blind">delete button</span></a></span></div></li>';
	tmp +='<div class="edit_group_box" id="edit_group" style="display: none;">';
	tmp += '<span style="width: 130px;"><input type="text" data-grp_no="${GRP_NO}"  id="" value="${GRP_NM}"></a></span><em class="opt"><a href="javascript:" id="btnSaveGr" class="done"><span class="blind">done</span></a><a href="javascript:" id="icon_del" class="ico_del"><span class="blind">cancel</span></a></em></div>';

var _grpno = 0;
var _grpnm = '';
new (Jex.extend({
	onload:function() {
		
		
//		gbox_pc_3000.LoadGroup();
		$("#USER_NM").attr("placeholder", _extLang.searchByName); // 이름검색
		gbox_pc_3000.fillUserTbl(jex.getAllData("#searchForm"));
		$("#USER_NM").focus();
		
		gbox.ui.setUiComponent($(".srch_field_cbox"), {
			"component": "select"
		});
		
	}, event:function() {	
	
		// ComboBox select option value	
		$("#cmbo").change(function(){
			gbox_pc_3000.tbl.setCurrentPage(1);
		    gbox_pc_3000.tbl.setSvrPageNo(1);
			var input = jex.getAllData("#searchForm");
			gbox_pc_3000.fillUserTbl(input);
			 
		});	
		$("#GROUP_TBL #groupName li").live("click",function(){
			//alert($(this).closest("li a[data-grp_no] ").val());
//			alert($(this).("data-grp_no").val);
			_grpno = $(this).data("grp_no");
			_grpnm = $(this).data("grp_nm");
		    alert(_grpno);
		    alert(_grpnm);
//			$("#GRP_NM").text(_grpnm);
//			gbox_pc_3000.fillUserTbl();
		});
		
		// All checked of checkbox
		$("#chkSelectAll").click(function () {
			$('input:checkbox').not(this).prop('checked', this.checked);	
		     
		    if($(this).is(":checked")) {
		    	$("table tbody tr").addClass("on");
			}
			else {
				$("table tbody tr").removeClass("on");
			}
		});		
		
		// Button Delete 
		$("#btndelete").click(function () {
			var jsonRec=[];
			
			$("table#USR_TBL tbody tr:has(input:checked)").each(function(i,v){
				var jsonItem={
						"USER_NO":$(v).find("#USER_NO").text(),
						"USER_NM":$(v).find("#USER_NM").text(),
						"HP_NO":$(v).find("#HP_NO").text()
				};
				jsonRec.push(jsonItem);
			});
		  
			$('td input:checked').parents('td').siblings().find('#USER_NO').text();
			
			if(jsonRec.length == 0) {
			 	jex.warning("삭제할 항목을 선택하세요.");//삭제할 항목을 선택하세요.
			}
			 
			else {
				 var input={};
				 input["GROUPS"]=jex.toStr(jsonRec);
				 input["GRP_NO"] = _grpno;
				// jex.newWin( "/pop_gbox_pc_3020.act", "pop_gbox_pc_3020", 500, 250, input);	
				 jex.newWin( "/pop_gbox_pc_3020.act", "pop_gbox_pc_3020", 372, 209, input);	
			}
		});	
		
		// Button Update
		$("#btnUpdate").click(function () {
			var j=0;
			$("table#USR_TBL tbody tr:has(input:checked)").each(function(i,v){
				j=j+1;
			});			
				if(j==1) {
					var cval=$('td input:checked').parents('td').next().find('div').text();	//check value of UNER_NM 
					var gNum=$('td input:checked').parents('td').siblings().find('#GRP_NO').text(); //check value of GRP_NO 
					var pNum=$('td input:checked').parents('td').siblings().find('#HP_NO').text(); //check value of HP_NO 
					var pNo=$('td input:checked').parents('td').siblings().find('#USER_NO').text(); //check value of USER_NO
					var bigo=$('td input:checked').parents('td').siblings().find('#BIGO').text(); //check value of bigo
						var input = {};
						input["USER_NAME"] = cval;
						input["GRP_NO"]=gNum;
						input["USER_PHONE"]=pNum;
						input["USER_NO"]=pNo;
						input["BIGO"]=bigo;
						jex.newWin( "/pop_gbox_pc_3050.act", "pop_gbox_pc_3050", 500, 224, input);	
				}
				else{
					//jex.warning("한 개의 행을 선택하여 주십시오.");//수정하고자 하는 행을 선택하세요.
				}
		});													
		/*//Delete User
		$('#btndel').click(function(){
			var jsonRec=[];
			var checkedList=$('tr:has(input:checked)').find('#USER_NM');
			var ajax = jex.createAjaxUtil("pc_gruser_d001");
			if( checkedList.length == 0 ){
				jex.warning("삭제할 항목을 선택하세요.");//삭제할 항목을 선택하세요.
				return false;
			}
			else{
		    	ajax.set("GRP_NO", _grpno);
			    	
		    	$("table#USR_TBL tbody tr:has(input:checked)").find("#USER_NO").each(function(i, v) {
		    		var jsonItem1 = {"USER_NO": $(v).text()};
		    		jsonRec.push(jsonItem1);
		    	});
			    ajax.set("DEL_REC",jsonRec);
				
				ajax.execute(function(){
					jex.success("구성원이 삭제되었습니다.");//구성원이 삭제되었습니다.
					//self.close();
					gbox_pc_3000.fillUserTbl();
				});
			}
		});*/
		
		//add new
		$("#btnAdd").click(function() {
			var input = {};
			input["GRP_NO"] = _grpno;
			gbox.popup.contactForm(input, function() {
				gbox_pc_3000.tbl.setCurrentPage(1);
				gbox_pc_3000.tbl.setSvrPageNo(1);
				gbox_pc_3000.fillUserTbl(jex.getAllData("#searchForm"));
			});
		});
		
		$("#btnSearch").click(function(){
			gbox_pc_3000.tbl.setCurrentPage(1);
		    gbox_pc_3000.tbl.setSvrPageNo(1);
			gbox_pc_3000.fillUserTbl(jex.getAllData("#searchForm"));
		});	
		
		$("#excelUpload").click(function() {
			var input = {};
			input["GRP_NO"] = _grpno;
			gbox.popup.excelUpload(input, function(dat) {				
			
			});
		});
		
		$("#excelDownload").click(function() {
//			$("#target").attr("src", "/excel_export.jsp");
			location.href = "/download/Contact.xls";
		});
		
		$("#USER_NM").keyz({
			"enter": function(ctrl, sft, alt, event) {
				gbox_pc_3000.tbl.setCurrentPage(1);
			    gbox_pc_3000.tbl.setSvrPageNo(1);
				gbox_pc_3000.fillUserTbl(jex.getAllData("#searchForm"));
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
		
		//----------Group------------///
		$(".btn_add_group").click(function(){	
			$(this).prev().show();
			$("#GR_NM").focus();
			$("#GR_NM").val('');
		});
		$(".opt #icon_del").live("click",function(){				
		//	$(".btn_add_group").prev().slideToggle();
			$("#GR_NM").val('');
			$(this).parents("div#edit_group").hide().prev("li").find("#group").show();
				
		});
		
		// Create and Edit Group 
		$("#btnSaveGr").live('click',function(){	
			$("#GR_NM").focus();
			var _this = $(this);
			var grpNo = $(this).parents(".opt").prev().find('input').data("grp_no");
			var grpNm = $(this).parents(".opt").prev().find('input').val();
			var grpNm1 = $("#GR_NM").val();
			if(jex.isNull(grpNm1 || grpNm)){
				jex.warning("그룹명을 입력하세요..");
				return;
			}
			
			var wsvc = null; 
		
			if(jex.isNull(grpNo)){
				wsvc = "pc_group_c001";
			}
			else{
				wsvc = "pc_group_u001";
			}
	
			var input={};
			input['GRP_NM'] = $("#GR_NM").val();
			input['GRP_NM'] = $(this).parents(".opt").prev().find('input').val();
			input['GRP_NO'] = grpNo;
			
			var ajax = jex.createAjaxUtil(wsvc);
			
			ajax.set(input);
			ajax.execute(function(dat) {
				if(jex.isNull(input['GRP_NO'])){					
//					 $.tmpl( tmp, { "GRP_NM" : input.GRP_NM}).appendTo( "#groupName" );
					$("#groupName").empty();
					gbox_pc_3000.LoadGroup();
					 jex.success("그룹이 추가되었습니다.");
					 $("#GR_NM").val('');
				 }
				 else{
					 jex.success("그룹이 수정되었습니다.");
					 $(".opt #icon_del").parents("div#edit_group").hide().prev("li").find("#group").show();
					 _this.parents("div#edit_group").prev("li").find('a.com_sub_item').text(input.GRP_NM);
				 }	
			});
		});
		
		$(".btn_clear").live("click",function(){
			$("#GR_NM").val('');
		});
		
		// Delete groupName
		$("#delGroup").live('click',function(){
			var _this = $(this);
			var grpNm = $(this).parents("li").find('a').data("grp_nm");
			if(!confirm("'"+grpNm+"'"+" 그룹을 삭제 하시겠습니까?")){
				return false;
			}		
			var jsonRec =[];			
			var jsonitem={
					"GRP_NO": $(this).parents("li").find('a').data("grp_no"),
					"GRP_NM" : grpNm
			};
			jsonRec.push(jsonitem);
			var input = {};
			input["DEL_REC"] = jsonRec;
		//	jex.newWin( "/pop_gbox_pc_3130.act", "pop_gbox_pc_3130", 500, 250, input);
			ajax = jex.createAjaxUtil("pc_group_d001");
			ajax.set(input);
			ajax.execute(function() {
				_this.parents("li").find("div#group").remove();
				jex.success('그룹이 삭제되었습니다.');
			});
		});
		
		$("#editGroup").live("click", function(){	
//			$(this).parents("div#group").hide().parents("li").next().show();
			var $popup1 = $(this).parents("div#group");
			var $popup = $(this).parents("div#group").hide().parents("li").next();
			$(".edit_group_box").not($popup).hide();
			$("div#group").not($popup1).show();
			$popup.show();
			
		});
		
		$("#GROUP_TBL #groupName li").live("click",function(){
			$(this).closest("li").addClass('on').siblings().removeClass('on');  
		});
	}
}))();

/*gbox_pc_3000.fillUserTbl = function(input) {
	
	if(!input) input = {};
	
	if(jex.isNull(gbox_pc_3000.tbl)) {
		gbox_pc_3000.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
		gbox_pc_3000.tbl.addEvent("onSvrPageChange", function(dat) {
			var input = jex.getAllData("#searchForm");
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": gbox_pc_3000.tbl.getSvrPageSize()
			};
			gbox_pc_3000.fillUserTbl(input);
		});
	};
	
	var cmb = $("#cmbo").val();
	gbox_pc_3000.tbl.setPaging("div:#paging;per:"+cmb);	
	
	var ajax = jex.createAjaxUtil("pc_user_r001");
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": gbox_pc_3000.tbl.getSvrPageSize()
		};
	}
	
	ajax.set(input);
	
	gbox.ui.createProgressBar();
	
	ajax.execute(function(dat) {
		gbox_pc_3000.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		gbox_pc_3000.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		gbox_pc_3000.tbl.setAll(dat['INQ_REC']);
	
		if(dat['INQ_REC'].length > 0) {
			$("#tfoot").hide();
		}
		else {
			$("#tfoot").show();
		}
		
		gbox.ui.destroyProgressBar();
	});	
};*/

gbox_pc_3000.fillUserTbl = function(input) {
	if(!input) input = {};
	
	if(jex.isNull(gbox_pc_3000.tbl)) {
		gbox_pc_3000.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
		gbox_pc_3000.tbl.addEvent("onSvrPageChange", function(dat) {
			input["PAGINATION"] = {
				"PAGE_NO": dat,
				"PAGE_SIZE": gbox_pc_3000.tbl.getSvrPageSize()
			};
			gbox_pc_3000.fillUserTbl(input);
		});
	}
	
	gbox_pc_3000.tbl.setPaging("div:#paging;per:"+10);
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": gbox_pc_3000.tbl.getSvrPageSize()
		};
	}
	
	var ajax=jex.createAjaxUtil("pc_gruser_r001");
	
	ajax.set("USER_NM",$('#USER_NM').val());
	ajax.set("GROUP_NO", _grpno);
	ajax.set(input);
	
	ajax.execute(function(dat) {
	
	//	$("#USER_CNT").text(dat.USER_CNT);
		gbox_pc_3000.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		gbox_pc_3000.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		gbox_pc_3000.tbl.setAll(dat['USER_REC']);
		
		
		
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
gbox_pc_3000.LoadGroup = function(){
	var ajax=jex.createAjaxUtil("pc_group_r001");

	ajax.execute(function(dat){

		$.each(dat.INQ_REC,function(i){
			$.tmpl( tmp, {"GRP_NM": dat.INQ_REC[i].GRP_NM ,"GRP_NO":dat.INQ_REC[i].GRP_NO}).appendTo( "#groupName" );
		});
		
	});
};
