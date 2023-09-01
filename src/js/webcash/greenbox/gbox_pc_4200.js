/**


 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : daravuth ( daravuth.sd@gmail.com )
 * @Description    : gbox_pc_4200
 * @History      	 : 20140506034334, daravuth
 * </pre>
 **/

var JsonAppCdNo =[];
var gbox_pc_4200 = {};
var check = false;
var noReload = false;
//scroll
var g_row_tot_cnt = 0; // ì•ŒëžŒ ì´ê±´ìˆ˜
var page_size = 11;
var tot_cnt = 0;
var scroll_no = 1; // ì•ŒëžŒ ë¯¸í™•ì¸ ìš”ì²­ê±´ìˆ˜

var g_colabo_fld_srno = "";  // ì½œë¼ë³´ (ê¸°ë³¸í´ë” ì‹œí€€ìŠ¤)
new (Jex.extend({
	onload:function() {
		var input = {};
		input['PAGE_SIZE'] = page_size;
		input['TOT_CNT'] = tot_cnt;
		gbox_pc_4200.fillTbl(input);	
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);
		
	}, event:function() {
		//--- define event action ---//	
		
		$("#btnCancel").click(function(){
			self.close();
		});
		
		$("#cmbo").change(function(){
			gbox_pc_4200.tbl.setCurrentPage(1);
			gbox_pc_4200.tbl.setSvrPageNo(1);
			gbox_pc_4200.fillTbl();
		});
		
		$("#chkSelectAll").click(function () {	
		    $('input:checkbox').not(this).prop('checked', this.checked);	
		});
		
		$("#btnDeletion").click(function () {	
			JsonAppCdNo.length =0;
			var linKAppCdNoArray=[];
			var linkName =[];
			
			$(".tbl_result tbody tr:has(input:checked)").each(function(i,v){
				var jsonItem={
						"APPCD_NO":$(v).find("#APPCD_NO").text(),
						"APP_NM":$(v).find("#APP_NM").text()
						
				};
				JsonAppCdNo.push(jsonItem);
			});
			if( JsonAppCdNo.length == 0 ){
				jex.warning($.i18n.prop("lang_delWarn")); //삭제할 항목을 선택하세요.
				return false;
			}
			else {
				 $('#popUPDeleteLink').bPopup(slideDown);
				 $.each(JsonAppCdNo,function(i,v){
					 linKAppCdNoArray.push(v.APPCD_NO);
					 linkName.push(("‘"+v.APP_NM+"’"));		
				 });
					$("#form #nameLink").text(linkName);
			} 
			
		});
		// Button Delete link
		$("#btnDeleteLink").click(function(){
			var bPopup = $('#popUPDeleteLink').bPopup();
			var ajax = jex.createAjaxUtil("pc_link_d001");
			ajax.set("DEL_REC", JsonAppCdNo);
			ajax.execute(function() {
				$("#LinkInfo").empty();
				var input = {};
				input['PAGE_SIZE'] = 11;
				tot_cnt = 0;
				input['TOT_CNT'] = tot_cnt;
				scroll_no = 0;
				gbox_pc_4200.fillTbl(input);
				//jex.success("삭제되었습니다.");
				jex.success($.i18n.prop("lang_deleted"));
				$("#popUPDeleteLink").hide();
				noReload = true;
				bPopup.close();
			});
//			
//			$(".tbl_result tbody tr:has(input:checked)").each(function(i,v){
////				$(this).remove();
//				console.log(this);
//			});
		     	       
		});
		
		// Cancel&close PopUp delete link 
		$("#canceDelLinkPopup,#closeDelLinkPopup").click(function(){
			$("#popUPDeleteUser").hide();
			var bPopup = $('#popUPDeleteLink').bPopup();
			bPopup.close();
		});
	
		
		$("#btnEnroll").click(function () {
			$("#submitForm")[0].reset();
			check = false;
			$("#popUpLinkDetail").bPopup({
				 easing: 'easeOutBack', //uses jQuery easing plugin
		            speed: 450,
		            transition: 'slideDown'
		        });
			$(".tbl_ipt_pop2 #APP_NM").focus();
			
			
			
//			gbox.popup.linkAppForm(null, function() {
//				gbox_pc_4200.tbl.setCurrentPage(1);
//				gbox_pc_4200.tbl.setSvrPageNo(1);
//				gbox_pc_4200.fillTbl();
//			});
		});
		$("#btnClose,#btnClosePopUp").click(function(){
			$("#popUpLinkDetail").hide();
			var bPopup = $('#popUpLinkDetail').bPopup();
			bPopup.close();
		});
		//----------pop_up register (pop_up gbox-pc_4210)----------//
		
		// link_gb change event
		// if changed, add or remove attribute conditional
		$(".tbl_ipt_pop2 #LINK_GB").change(function() {
			if($(this).val() == "1") {
				checkValidate("APP");
			}
			else{					
				
				checkValidate("WEB");
			}							
		});		
		
		$(".scroller_body").scroll(function(){
			if($(".scroller_body").scrollTop()+ $(".scroller_body").height() > $(".scroller_body")[0].scrollHeight-100){
				var s_diff_var = 0;
				if(g_row_tot_cnt%page_size != 0 || g_row_tot_cnt < page_size){
					s_diff_var = Math.ceil(g_row_tot_cnt/page_size);
				} else {
					s_diff_var = g_row_tot_cnt/page_size;
				}
				if(scroll_no < s_diff_var){
					scroll_no++;
					var input = {};
					input['PAGE_SIZE'] = page_size;
					input['TOT_CNT'] = tot_cnt;
					if(!noReload){
						gbox_pc_4200.fillTbl(input);
					}
					noReload = false;
				}
				
			}
		});
		
		
		$('#btnStorage').click(function(){
			var bPopup = $("#popUpLinkDetail").bPopup();
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			var wsvcId = "";
			
			if (!check) {
				wsvcId = "pc_link_c001";	
			}
			//update mode
			else {
				wsvcId = "pc_link_u001";				
			}
			
			var jexAjax = jex.createAjaxUtil(wsvcId);
			jexAjax.set(jex.getAllData("#submitForm"));
		//	jexAjax.set("APPCD_NO", $("#APPCD_NO").val());
			jexAjax.execute(function(dat) {
				if(wsvcId == "pc_link_c001"){
					jex.success($.i18n.prop("lang_regSucc"));//"링크 정보가 등록되었습니다."
				}
				if(wsvcId == "pc_link_u001"){
					jex.success($.i18n.prop("lang_updateSucc"));//"링크 정보가 수정되었습니다."
					
				}
				$("#LinkInfo").empty();
				
				var input = {};
				input['PAGE_SIZE'] = 11;
				tot_cnt = 0;
				input['TOT_CNT'] = tot_cnt;
				scroll_no = 0;
				gbox_pc_4200.fillTbl(input);
				
				$("#popUpLinkDetail").hide();
				bPopup.close();
				$("#submitForm")[0].reset();
				noReload = true;						
			});		
		});	
	}	
}))();


//jex.table use

/*
gbox_pc_4200.fillTbl = function(input) {
	if(!input) input = {};
	if(jex.isNull(gbox_pc_4200.tbl)) {
		gbox_pc_4200.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
//		gbox_pc_4200.tbl.addEvent("onSvrPageChange", function(dat) {
//			input["PAGINATION"] = {
//				"PAGE_NO": dat,
//				"PAGE_SIZE": gbox_pc_4200.tbl.getSvrPageSize()
//			};
//			gbox_pc_4200.fillTbl(input);
//		});
		
		//REG_DT formatting
		gbox_pc_4200.tbl.addFormatter("REG_DT", function(dat) {
			return moment(dat, "YYYYMMDD").format("YYYY-MM-DD");
		});
		//REG_TM formatting
		gbox_pc_4200.tbl.addFormatter("REG_TM", function(dat) {
			return moment(dat, "HHmmss").format("HH:mm:ss");
		});
		//LINK_GB formatting
		gbox_pc_4200.tbl.addFormatter("LINK_GB", function(dat) {
			if(dat == "1") {
				return "APP";
			}
			else if(dat == "2") {
				return "URL";
			}
		});
		gbox_pc_4200.tbl.onClick("APP_NM", function(row) {
			check = true;
			
			$("#popUpLinkDetail").bPopup();
			row["WEB_URL"] = jex.null2Void(row["WEB_URL"]);
			gbox_pc_4200.loadData(row);
		
			
			
//			gbox.popup.linkAppForm(row, function(dat) {
//				gbox_pc_4200.tbl.setCurrentPage(1);
//				gbox_pc_4200.tbl.setSvrPageNo(1);
//				gbox_pc_4200.fillTbl();
//			});
	    });
	}
	$("table tbody input:checkbox").live("click", function() {
		if($(this).is(":checked")) {
			$(this).closest("tr").addClass("on");
		}
		else {
			$(this).closest("tr").removeClass("on");
		}
	});
	
//	var cmb = $("#cmbo").val();
//	gbox_pc_4200.tbl.setPaging("div:#paging;per:"+cmb);
//	gbox_pc_4200.tbl.setPaging("div:#paging;per:11");
	
	
//	if(jex.isNull(input["PAGINATION"])) {
//		var hString = jex.getHString();	
//		
//		if(hString) {
//			gbox_pc_4200.tbl.setCurrentPage(hString["currentPage"]);
//			gbox_pc_4200.tbl.setSvrPageNo(hString["svrPage"]);
//		}
		
//		var hash = {};
//		hash['currentPage']	=	"1";
//		hash['svrPage']		=	"1";
//		ksetHString(hash);
//		
//		input["PAGINATION"] = {
//			"PAGE_NO": "1",
//			"PAGE_SIZE": gbox_pc_4200.tbl.getSvrPageSize()
//		};
//	}
	
	var ajax = jex.createAjaxUtil("pc_link_r001");
	ajax.set(input);	
	gbox.ui.createProgressBar();	
	ajax.execute(function(dat) {
		g_row_tot_cnt = dat['INQ_REC'].length;
//		gbox_pc_4200.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
//		gbox_pc_4200.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
		gbox_pc_4200.tbl.setAll(dat['INQ_REC']);	
		
		if(dat['INQ_REC'].length > 0) {
			$("#tfoot").hide();
		}
		else {
			$("#tfoot").show();
		}		
		gbox.ui.destroyProgressBar();	
		//gbox_pc_4200.fillTbl();
	});
};
*/
//jqurey tbl templet

$(".txt_ellipsis#APP_NM").live("click",function(){
	var input={};
	input['APPCD_NO'] = $(this).data("appcd_no");
	$("#popUpLinkDetail").bPopup();
	gbox_pc_4200.loadData(input);
});



var tmp = '<tr><td ><div style="height:10px;"><input type="checkbox" id="chkSelectAll" 	class="checkbox"  title="선택" /></div></td>';
	tmp +=	'<td class="tal" ><div class="txt_ellipsis" style="cursor: pointer;" id="APP_NM" data-APPCD_NO="${APPCD_NO}">${APP_NM}</div></td><td ><div id="APPCD_NO">${APPCD_NO}</div></td>';
	tmp +=	'<td ><div id="LINK_GB">${LINK_GB}</div></td><td ><div><span id="REG_DT">${REG_DT}</span>&nbsp;<span id="REG_TM">${REG_TM}</span></div></td></tr>';
gbox_pc_4200.fillTbl = function(input) {
	if(!input) input = {};
	$("table tbody input:checkbox").live("click", function() {
		if($(this).is(":checked")) {
			$(this).closest("tr").addClass("on");
		}
		else {
			$(this).closest("tr").removeClass("on");
		}
	});
	
	var ajax = jex.createAjaxUtil("pc_link_r001");
	ajax.set(input);	
	gbox.ui.createProgressBar();	
	ajax.execute(function(dat) {
		if(dat['INQ_REC'].length > 0) {
			g_row_tot_cnt = dat.TOTAL_ROWS;
			tot_cnt = dat.TOT_CNT;
			
			var jsonRecount = [];
			$.each(dat['INQ_REC'], function(i, v) {
				v["REG_DT"] = moment(v.REG_DT, "YYYYMMDD").format("YYYY-MM-DD");
				v["REG_TM"] = moment(v.REG_DT, "HHmmss").format("HH:mm:ss");
				if(v['LINK_GB'] == '1'){
					v['LINK_GB'] = "APP";
				}else{
					v['LINK_GB'] = "URL";
				};
				
				jsonRecount.push(v);
			});
			
			$.tmpl(tmp ,jsonRecount).appendTo("#LinkInfo");

			
			$("#tfoot").hide();
		}
		else {
			$("#tfoot").show();
		}		
		gbox.ui.destroyProgressBar();	
	});
};


//-----pop_up gbox-pc_4210------//
gbox_pc_4200.loadData = function(input) {
	
	var jexAjax = jex.createAjaxUtil("pc_link_r002");
	jexAjax.set(input);
	jexAjax.execute(function(dat) {
		
		dat.AND_LINKURL = jex.null2Void(dat.AND_LINKURL);
		dat.AND_ESTBURL = jex.null2Void(dat.AND_ESTBURL);
		dat.IPN_LINKURL = jex.null2Void(dat.IPN_LINKURL);
		dat.IPN_ESTBURL = jex.null2Void(dat.IPN_ESTBURL);
		dat.WEB_URL = jex.null2Void(dat.WEB_URL);
		
		jex.setAllData("#pcpcont", dat);
		
//		 check validate defualt of LiNK_GB (APP)
		if($(".tbl_ipt_pop2 #LINK_GB").val()=="1"){
			checkValidate("APP");			
		}
		else {
			checkValidate("WEB");
		}
	});
};

//Function check  validate  
function checkValidate(Type){
	if(Type=="APP"){
					
		$(".tbl_ipt_pop2 #AND_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #AND_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #IPN_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #IPN_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #WEB_URL").removeAttr("data-validation-engine");
	}
	else if(Type=="WEB"){
		$(".tbl_ipt_pop2 #AND_LINKURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #AND_ESTBURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #IPN_LINKURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #IPN_ESTBURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #WEB_URL").attr("data-validation-engine", "validate[required,maxSize[255]]");		
	}
};
// popup slideDown
var slideDown={
		 easing: 'easeOutBack', //uses jQuery easing plugin
        speed: 450,
        transition: 'slideDown'
    };



//<script id="LinkInfoTemplate" type="text/x-jquery-tmpl">

function changeLang(lang) {
    jQuery.i18n.properties({
        name: 'gbox_pc_4200',
        path: '/lang/',
        mode: 'both',
        language: lang,
        async: true,
        callback: function () {
        	gbox.ui.setAllLang("body", $.i18n.prop);
        }
    });
}