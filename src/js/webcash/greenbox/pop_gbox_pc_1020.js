/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : chhaeuy chhon ( chheouy@yahoo.com )
 * @Description    : 받는이 선택 view
 * @History      	 : 20140425093118, chhaeuy chhon
 * </pre>
 **/

var pop_gbox_pc_1020 = {};

new (Jex.extend({
	onload:function() {
		document.getElementById("USER_NM").placeholder = $.i18n.prop("lang_phder_usrnamesearch");//Write a message
//		document.getElementById("RECEIVER").placeholder = $.i18n.prop("lang_phder_searchreciver");//Write a message
		

		$("#USER_NM").attr("placeholder", _extLang.searchName);  //placeholder="이름검색" 
		$("#USER_NM").focus();
		$("#USR_TBL tbody tr:first").hide();
		
		gbox.ui.setReceiverInputAjax("#RECEIVER", function(dat) {
//			$("#RECEIVER").select2("val", _receiver);
		});
		
		pop_gbox_pc_1020.fillGroupList();		
		
		pop_gbox_pc_1020.fillUserTbl();		
		
		$('.club_wrap').slimScroll({
	        height: '400px'
	    });
		$(".search2_wrap #USER_NM").focus();
	
		$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", true);
	}, event:function() {
		
		$("#cancelBtn").click(function(){
			self.close();
		//	var recieveEmpty=$("#s2id_RECEIVER ul.select2-choices").text();			
//			if(!confirm("취소 하시겠습니까?")){
//				return;
//			}
//			$("#s2id_RECEIVER ul li.select2-search-choice").remove();
//			$("#TreeGroup input[name=GRP_NO]").attr('checked', false);
			
		});
		
		
		$("#cmbo").change(function(){
			pop_gbox_pc_1020.userTbl.setCurrentPage(1);
			pop_gbox_pc_1020.userTbl.setSvrPageNo(1);
			pop_gbox_pc_1020.fillUserTbl();
		});
		
		$("#USER_NM").keyz({
			
			"enter": function(ctrl, sft, alt, event) {
				pop_gbox_pc_1020.fillUserTbl();
			}
		});
		
	
		$("#btSearch").click(function() {
			pop_gbox_pc_1020.fillUserTbl();
		});	
		$("#isSelected").live("click",function(){
			//$(this).prop('checked', true);
			var selected = $("#RECEIVER").select2("data");
			if(!selected) selected = [];
			
			var newSelected = [];
			$(".group_level li:has(input[data-id]:checked)").each(function(i, v) {
				var grpNo = $(this).find("input:checkbox").val();
				var grpNm = $(this).find("label").text();
				
				var label;
    			
    			if(/\@J$/.test(grpNo)) {
    				//label = "[직원그룹]";
    				label =  "["+$.i18n.prop("lang_tabemplgrp")+"]";
    			}
    			else if(/\@Y$/.test(grpNo)) {
    				//label = "[연락처그룹]";
    				label = "["+$.i18n.prop("lang_tabcontactgrp")+"]";
    			}
    			else if(/\@D$/.test(grpNo)) {
    				//label = "[직원부서그룹]";
    				label = "["+$.i18n.prop("lang_grpEmplDept")+"]";
    			}
    			else {
//    				label = "[그룹]";
    				label= $.i18n.prop("lang_group");
    			}
				
//				newSelected.push(["GROUP_" + grpNo+":" + grpNm]);
				newSelected.push({id:"GROUP_" + grpNo, text:label + grpNm});
			});
			
			$("table#USR_TBL > tbody > tr:has(input:checked)").each(function(i, v) {
				var userNo = $(this).find("input:hidden").val();
				var userNm = $(this).find("div#USER_NM").text();
				
				var label;
    			
    			if(/\@J$/.test(userNo)) {
    				//label = "[직원]";
    				label = $.i18n.prop("lang_employee");
    			}
    			else if(/\@Y$/.test(userNo)) {
    				//label = "[연락처]";
    				label = $.i18n.prop("lang_contact");
    			}
    			else if(/\@D$/.test(userNo)) {
    				//label = "[직원부서]";
    				label = "["+$.i18n.prop("lang_tabempldept")+"]";
    			}
    			else {
//    				label = "[개인]";
    				label= $.i18n.prop("lang_privates");
    			}
    			
//				newSelected.push(["USER_" + userNo+":" + userNm]);
				newSelected.push({id:"USER_" + userNo, text:label + userNm});
			});
			
			if(newSelected.length == 0) {
				//jex.warning(_extLang.selectItemAdd);//추가할 항목을 선택하세요.
			}
			else {
				selected.push(newSelected);
				$("#RECEIVER").select2("data", selected);
			}
			
			var selectedVal = [];
			
			$.each(selected, function(i, v) {
				selectedVal.push(v.id);
			});
//			
			$("#RECEIVER").select2("val", selectedVal);
		});
		//delete receiver
		/*$("li.select2-search-choice a").click(function(){alert("testing");});*/
		
		
		$("#addBtn").click(function() {
//			var data = [
//	            {id: "GROUP_1", text: "그룹1"}
//			];
//			$("#RECEIVER").select2("data", data);
			
			
			/*
			var selected = $("#RECEIVER").select2("val");
			var newSelected = [];
			$(".group_level li:has(input[data-id]:checked)").each(function(i, v) {
				var grpNo = $(this).find("input:checkbox").val();
				var grpNm = $(this).find("label").text();
//				newSelected.push(["GROUP_" + grpNo+":" + grpNm]);
				newSelected.push(["GROUP_" + grpNo]);
			});
			
			$("table#USR_TBL > tbody > tr:has(input:checked)").each(function(i, v) {
				var userNo = $(this).find("input:hidden").val();
				var userNm = $(this).find("div#USER_NM").text();
//				newSelected.push(["USER_" + userNo+":" + userNm]);
				newSelected.push(["USER_" + userNo]);
			});
			
			if(newSelected.length == 0) {
				jex.warning(_extLang.selectItemAdd);//추가할 항목을 선택하세요.
			}
			else {
				selected.push(newSelected);
				$("#RECEIVER").select2("val", selected);
			}
			*/
			
			
			var selected = $("#RECEIVER").select2("data");
			if(!selected) selected = [];
			
			var newSelected = [];
			$(".group_level li:has(input[data-id]:checked)").each(function(i, v) {
				var grpNo = $(this).find("input:checkbox").val();
				var grpNm = $(this).find("label").text();
				
				var label;
    			
    			if(/\@J$/.test(grpNo)) {
    				//label = "[직원그룹]";
    				label =  "["+$.i18n.prop("lang_tabemplgrp")+"]";
    			}
    			else if(/\@Y$/.test(grpNo)) {
    				//label = "[연락처그룹]";
    				label = "["+$.i18n.prop("lang_tabcontactgrp")+"]";
    			}
    			else if(/\@D$/.test(grpNo)) {
    				//label = "[직원부서그룹]";
    				label = "["+$.i18n.prop("lang_grpEmplDept")+"]";
    			}
    			else {
    				//label = "[그룹]";
    				label= $.i18n.prop("lang_privates");
    			}
				
//				newSelected.push(["GROUP_" + grpNo+":" + grpNm]);
				newSelected.push({id:"GROUP_" + grpNo, text:label + grpNm});
			});
			
			$("table#USR_TBL > tbody > tr:has(input:checked)").each(function(i, v) {
				var userNo = $(this).find("input:hidden").val();
				var userNm = $(this).find("div#USER_NM").text();
				
				var label;
    			
    			if(/\@J$/.test(userNo)) {
    				//label = "[직원]";
    				label = $.i18n.prop("lang_employee");
    			}
    			else if(/\@Y$/.test(userNo)) {
    				//label = "[연락처]";
    				label = $.i18n.prop("lang_contact");
    			}
    			else if(/\@D$/.test(userNo)) {
    				//label = "[직원부서]";
    				label = "["+$.i18n.prop("lang_tabempldept")+"]";
    				
    			}
    			else {
//    				label = $.i18n.prop("lang_select2Individual");
    				label= $.i18n.prop("lang_privates");
    			}
    			
//				newSelected.push(["USER_" + userNo+":" + userNm]);
				newSelected.push({id:"USER_" + userNo, text:label + userNm});
			});
			
			if(newSelected.length == 0) {
				jex.warning(_extLang.selectItemAdd);//추가할 항목을 선택하세요.
			}
			else {
				selected.push(newSelected);
				$("#RECEIVER").select2("data", selected);
			}
			
			var selectedVal = [];
			
			$.each(selected, function(i, v) {
				selectedVal.push(v.id);
			});
//			
			$("#RECEIVER").select2("val", selectedVal);
		});
		
		
			
		$(".group_level li #grpNmClick").live("click", function() {
			$(".group_level li").removeClass("on");
			$(this).parents("li").addClass("on");
			//$("#USR_TBL").empty();
			//pop_gbox_pc_1020.fillGroupUserTbl({"GRP_NO":grpNo});
			//$("#USER_NM").focus();

			//var grpNo = $(this).find("input:checkbox").val();
			
			 _grpNo = $(this).prev("input:checkbox").val();
			//alert(grpNo);
			/*pop_gbox_pc_1020.userTbl.setSvrPageNo(1);
			pop_gbox_pc_1020.userTbl.setCurrentPage(1);
			
			var hash = {};
			hash['currentPage']	=	"1";
			hash['svrPage']		=	"1";
			jex.setHString(hash);*/
			
			pop_gbox_pc_1020.fillUserTbl();
			/*if(jex.isNull(grpNo)) {
				pop_gbox_pc_1020.fillUserTbl();
			}
			else {
				pop_gbox_pc_1020.fillUserTbl({"GRP_NO":_grpNo});
			}*/
		
		});
		
		/*$(".group_level li #test").live("click", function() {
			$(".group_level li").removeClass("on");
			$(this).parents("li").addClass("on");
			
			 _grpNo = $(this).prev("input:checkbox").val();
			
			pop_gbox_pc_1020.fillUserTbl({"GRP_NO":_grpNo});
		
		});*/
		
		
		//group check all
		$("li.groups:first-child input:checkbox").click(function() {
			$("li.groups input:checkbox").prop("checked", $(this).is(":checked"));
		});
		
		//user check all
		$("table.tbl_result > thead > tr:first-child input:checkbox").click(function() {
			$("table#USR_TBL > tbody > tr input:checkbox").prop("checked", $(this).is(":checked"));
		});
		
		//toggle tr css class
		$("table#USR_TBL > tbody > tr input:checkbox").live("click", function() {
			if($(this).is(":checked")) {
				$(this).closest("tr").addClass("on");
			}
			else {
				$(this).closest("tr").removeClass("on");
			}
		});
		
		$(".navi_wrap ul li, .navi_wrap div").click(function() {
			$("#USER_NM").val("");
			_grpNo = "";
			_apiCd = $(this).data("api_cd");
			
//			$(this).addClass("on").siblings().removeClass("on");
			$(".navi_wrap ul li").removeClass("on");
			$(".navi_wrap div").removeClass("on");
			$(this).addClass("on");
			
//			var input = {};
//			input["API_CD"] = $(this).data("api_cd");
//			if(input.API_CD == "D"){
			if(_apiCd == "D"){
				pop_gbox_pc_1020.fillGroupList1();
				pop_gbox_pc_1020.fillUserTbl();
				$(".tbl_result #hBigo").css("display", "none");
				$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", true);
			}else if( _apiCd == "J" || _apiCd ==  "Y"){
				pop_gbox_pc_1020.fillGroupList();
				//2015-aug-12
				pop_gbox_pc_1020.fillUserTbl1();
				
				$(".tbl_result #hBigo").css("display", "none");
				$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", true);
			}
			else{
				pop_gbox_pc_1020.fillGroupList();
				pop_gbox_pc_1020.fillUserTbl();
				$(".tbl_result #hBigo").show();
			}
			$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", true);
			
//			pop_gbox_pc_1020.fillUserTbl();
			
			$("#USER_NM").focus();
			
			$("#USR_TBL tbody").hide();
			$("#USR_TBL tfoot").show();
			
			
		
		});
		
		
		//confirm
		$("#confirmBtn").click(function() {
//			var callbackData = $("#RECEIVER").select2("val");
			var callbackData = $("#RECEIVER").select2("data");
			
			var callbackFn = opener.gbox.popup.callbackFn["pop_gbox_pc_1020"];
			callbackFn(JSON.stringify(callbackData));
			self.close();
		});
		
	}
	
	
}))();


pop_gbox_pc_1020.fillGroupList = function(input) {
	$("table.tbl_result > thead > tr:first-child input:checkbox").attr("checked",false);
	$(".group_level").empty();
	if(!input) input = {};
	input["API_CD"] = _apiCd;
	var ajax = jex.createAjaxUtil("pc_group_r001");
	ajax.set(input);
//	gbox.ui.createProgressBar();
	ajax.execute(function(dat) {
		$.each(dat.INQ_REC, function(i, v) {
			$(".group_level").append('<li><span class="bg txt_ellipsis"><label for="" class="txt_ellipsis"><input type="checkbox" id="isSelected" name="GRP_NO" data-id="GRP_NO" value="'+v.GRP_NO+'"><a href="javascript:" id="grpNmClick">'+v.GRP_NM+'</a></label></span></li>');	
		});
//		gbox.ui.destroyProgressBar();
	});
};
function processTable(data, idField, foreignKey, rootLevel) {
	  var hash = {};

	  for (var i = 0; i < data.length; i++) {
	    var item = data[i];
	    var id = item[idField];
	    var parentId = item[foreignKey];

	    hash[id] = hash[id] || [];
	    hash[parentId] = hash[parentId] || [];

	    item.children = hash[id];
	    hash[parentId].push(item);
	  }

	  return hash[rootLevel];
	}
pop_gbox_pc_1020.fillGroupList1 = function(input) {
	$("table.tbl_result > thead > tr:first-child input:checkbox").attr("checked",false);
	$(".group_level").empty();
	$.jstree.destroy();
	if(!input) input = {};
	input["API_CD"] = _apiCd;
	var ajax = jex.createAjaxUtil("pc_group_r001");
	ajax.set(input);
	gbox.ui.createProgressBar();
	ajax.execute(function(dat) {	
		var data =[];
		$.each(dat.INQ_REC, function(i, v) {
//			if(dat.INQ_REC[i].PARENT_ID == null){
			if(jex.isNull(dat.INQ_REC[i].PARENT_ID)) {
				v['parent'] = "#";
			}
				else{
				v['parent'] = dat.INQ_REC[i].PARENT_ID;
			};
			v['id'] = dat.INQ_REC[i].GRP_NO;
			v['text'] = dat.INQ_REC[i].GRP_NM;
//			v[i] = data;
			data.push(v);
		});
		
		$('#TreeGroup').jstree({
			'checkbox': {
			 'keep_selected_style': true,
		     'tie_selection': false,
		     'whole_node': false // click on checkBox
			},
			"plugins": ["type","checkbox"],
			'core' : {
		    'data' : data,
		    "themes":{
	         "icons":false
	            
          
	        }
		           
		}})		
		.bind("select_node.jstree", function (event, data) {
			_grpNo = data.node.id;
			pop_gbox_pc_1020.fillUserTbl();
		})
		.bind('check_node.jstree', function(e, data) {
			
			var selected = $("#RECEIVER").select2("data");
			if(!selected) selected = [];
			
			var newSelected = [];
				
				var label;
    				//label = "[직원부서]";
					label = "["+$.i18n.prop("lang_tabempldept")+"]";	
				newSelected.push({id:"GROUP_" + data.node.id, text:label + data.node.text});
			
			
			if(newSelected.length == 0) {
				//jex.warning(_extLang.selectItemAdd);//추가할 항목을 선택하세요.
			}
			else {
				selected.push(newSelected);
				$("#RECEIVER").select2("data", selected);
			}
			
			var selectedVal = [];
			
			$.each(selected, function(i, v) {
				selectedVal.push(v.id);
			});
//			
			$("#RECEIVER").select2("val", selectedVal);
			
			_grpNo = data.node.id;
			_apiCd = "D";
			event.preventDefault();
		});
		

		gbox.ui.destroyProgressBar();
	});
};

pop_gbox_pc_1020.fillUserTbl = function(input) {
	$("table.tbl_result > thead > tr:first-child input:checkbox").attr("checked",false);
//	if(jex.isNull(_grpNo)) {
//		if(jex.isNull($(".search2_wrap #USER_NM").val())) {
//			jex.warning("그룹을 선택하거나 검색어를 입력하세요.");
//			$(".search2_wrap #USER_NM").focus();
//			return;
//		}
//	}
	
	if(!input) input = {};
	
//	if(!jex.isNull(pop_gbox_pc_1020.userTbl)) {
//		delete(pop_gbox_pc_1020.userTbl);
//	}
	
	if(jex.isNull(pop_gbox_pc_1020.userTbl)) {
		pop_gbox_pc_1020.userTbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
	}
	
	pop_gbox_pc_1020.userTbl.addEvent("onSvrPageChange", function(dat) {
		var input = jex.getAllData(".search2_wrap");
		input["PAGINATION"] = {
			"PAGE_NO": dat,
			"PAGE_SIZE": pop_gbox_pc_1020.userTbl.getSvrPageSize()
		};
		pop_gbox_pc_1020.fillUserTbl(input);
	});
	pop_gbox_pc_1020.userTbl.addEvent("onAfterDrawTbl",function(dat){
		if($(".scroller_body").get(0).scrollHeight > $(".scroller_body").height()){
			$("#USR_TBL #BIGO").removeAttr('style');
		}else{
			$("#USR_TBL #BIGO").attr('style','padding:0px !important');
		}
	});
	
//	pop_gbox_pc_1020.userTbl.setPaging("div:#paging;per:7;max:35");
	pop_gbox_pc_1020.userTbl.setPaging("div:#paging;per:100000");
	
	var ajax = jex.createAjaxUtil("pc_gruser_r002");
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": pop_gbox_pc_1020.userTbl.getSvrPageSize()
		};
	}
	
	ajax.set("GRP_NO", _grpNo);
	ajax.set("API_CD", _apiCd);
	if($("input[data-id='USER_NM']").val() !=$("input[data-id='USER_NM']").attr("placeholder")){
		ajax.set("USER_NM", $("input[data-id='USER_NM']").val());
	}
	ajax.set(input);
	gbox.ui.createProgressBar();
	ajax.execute(function(dat) {
		pop_gbox_pc_1020.userTbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		pop_gbox_pc_1020.userTbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		pop_gbox_pc_1020.userTbl.setAll(dat['INQ_REC']);
		if(dat['INQ_REC'].length < 11){
			$("#USR_TBL #BIGO").attr('style','padding:0px !important');
		}else{
			$("#USR_TBL #BIGO").removeAttr('style');
		}
		
		
		if(dat['INQ_REC'].length > 0) {
			$("#USR_TBL tbody").show();
			$("#USR_TBL tfoot").hide();
//			$(".paging_wrap").show();
			$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", false);
		}
		else {
			$("#USR_TBL tbody").hide();
			$("#USR_TBL tfoot").show();
//			$(".paging_wrap").hide();
			$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", true);
		}		
		gbox.ui.destroyProgressBar();
	});
};

//2015-aug-13
pop_gbox_pc_1020.fillUserTbl1 = function(input) {
	$("table.tbl_result > thead > tr:first-child input:checkbox").attr("checked",false);
	
	if(!input) input = {};
	
//	if(!jex.isNull(pop_gbox_pc_1020.userTbl)) {
//		delete(pop_gbox_pc_1020.userTbl);
//	}
	
	if(jex.isNull(pop_gbox_pc_1020.userTbl)) {
		pop_gbox_pc_1020.userTbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
	}
	
	pop_gbox_pc_1020.userTbl.addEvent("onSvrPageChange", function(dat) {
		var input = jex.getAllData(".search2_wrap");
		input["PAGINATION"] = {
			"PAGE_NO": dat,
			"PAGE_SIZE": pop_gbox_pc_1020.userTbl.getSvrPageSize()
		};
//		pop_gbox_pc_1020.fillUserTbl1(input);
	});
	pop_gbox_pc_1020.userTbl.addEvent("onAfterDrawTbl",function(dat){
		if($(".scroller_body").get(0).scrollHeight > $(".scroller_body").height()){
			$("#USR_TBL #BIGO").removeAttr('style');
		}else{
			$("#USR_TBL #BIGO").attr('style','padding:0px !important');
		}
	});
	
//	pop_gbox_pc_1020.userTbl.setPaging("div:#paging;per:7;max:35");
	pop_gbox_pc_1020.userTbl.setPaging("div:#paging;per:100000");
	
	var ajax = jex.createAjaxUtil("pc_user_r001");
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": pop_gbox_pc_1020.userTbl.getSvrPageSize()
		};
	}
	
	ajax.set("GRP_NO", _grpNo);
	ajax.set("API_CD", _apiCd);
	if($("input[data-id='USER_NM']").val() !=$("input[data-id='USER_NM']").attr("placeholder")){
		ajax.set("USER_NM", $("input[data-id='USER_NM']").val());
	}
	ajax.set(input);
	gbox.ui.createProgressBar();
	ajax.execute(function(dat) {
		pop_gbox_pc_1020.userTbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		pop_gbox_pc_1020.userTbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		pop_gbox_pc_1020.userTbl.setAll(dat['INQ_REC']);
		if(dat['INQ_REC'].length < 11){
			$("#USR_TBL #BIGO").attr('style','padding:0px !important');
		}else{
			$("#USR_TBL #BIGO").removeAttr('style');
		}
		
		
		if(dat['INQ_REC'].length > 0) {
			$("#USR_TBL tbody").show();
			$("#USR_TBL tfoot").hide();
//			$(".paging_wrap").show();
			$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", false);
		}
		else {
			$("#USR_TBL tbody").hide();
			$("#USR_TBL tfoot").show();
//			$(".paging_wrap").hide();
			$("table.tbl_result > thead > tr:first-child input:checkbox").attr("disabled", true);
		}		
		gbox.ui.destroyProgressBar();
	});
};

// end 2015-aug-13
/*
pop_gbox_pc_1020.fillGroupUserTbl = function(input) {
	if(!input) input = {};
	
	if(jex.isNull(pop_gbox_pc_1020.userTbl)) {
		pop_gbox_pc_1020.userTbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
	}
	
	pop_gbox_pc_1020.userTbl.addEvent("onSvrPageChange", function(dat) {
		var input = jex.getAllData(".popup_wrap");
		input["PAGINATION"] = {
			"PAGE_NO": dat,
			"PAGE_SIZE": pop_gbox_pc_1020.userTbl.getSvrPageSize()
		};
		pop_gbox_pc_1020.fillGroupUserTbl(input);
	});
	
	pop_gbox_pc_1020.userTbl.setPaging("div:#paging;per:7");
	
	var ajax = jex.createAjaxUtil("pc_gruser_r002");
	
	if(jex.isNull(input["PAGINATION"])) {
		
		var hash = {};
		hash['currentPage']	=	"1";
		hash['svrPage']		=	"1";
		jex.setHString(hash);
		
		input["PAGINATION"] = {
			"PAGE_NO": "1",
			"PAGE_SIZE": pop_gbox_pc_1020.userTbl.getSvrPageSize()
		};
	}
	
//	var grpNo = $("li.groups.on").find("input:checkbox").val();
	//ajax.set("API_CD","A");
	ajax.set("GRP_NO", _grpNo);
	ajax.set("USER_NM", $("input[data-id='USER_NM']").val());
	ajax.set(input);

	/*	
	ajax.execute(function(dat) {
		
		pop_gbox_pc_1020.userTbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
		pop_gbox_pc_1020.userTbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		
		if(dat['INQ_REC'].length > 0) {
			$("#USR_TBL tfoot").hide();
			$(".paging_wrap").show();
		}
		else {
			$("#USR_TBL tfoot").show();
			$(".paging_wrap").hide();
		}
		
		pop_gbox_pc_1020.userTbl.setAll(dat['INQ_REC']);
	});
};
*/
function changeLang(lang) {
    jQuery.i18n.properties({
        name: 'pop_gbox_pc_1020',
        path: '/lang/',
        mode: 'both',
        language: lang,
        async: true,
        callback: function () {
        	gbox.ui.setAllLang("body", $.i18n.prop);
        }
    });
}


