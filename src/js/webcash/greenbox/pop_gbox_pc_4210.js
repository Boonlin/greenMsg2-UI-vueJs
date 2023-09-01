/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : pop_gbox_pc_3120
 * @History      	 : 20140425055452, Choi Si-hwan
 * </pre>
 **/
var gbox_pc_4210 = {};
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		$("#APP_NM").focus();
		//edit mode
		
		if(!jex.isNull(_appcdNo)) {
			
			$("#pop_title").append(_extLang.modify); ///수정
			gbox_pc_4210.loadData();
		}else{
			$("#pop_title").append(_extLang.register); // 등록
		}
			
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);
		$("#submitFormLink").validationEngine(gbox.ui.validationEngineOptions);
		// check validate defualt of LiNK_GB (APP)
		if($("#LINK_GB").val()=="1"){
			checkValidate("APP");			
		}
		else {
			checkValidate("WEB");
		}
		alert(("#LINK_GB").val());
	}, event:function() {
		//--- define event action ---//
		
		$('#btnClose').click(function(){
			window.close();
		});
		
		$('#btnStorage').click(function(){
		
			if(!$("#submitFormLink").validationEngine('validate')) {
				return false;
			}
			var wsvcId = "";
			
			if (jex.isNull(_appNm)) {
				wsvcId = "pc_link_c001";	
			}
			//update mode
			else {
				wsvcId = "pc_link_u001";				
			}
			var jexAjax = jex.createAjaxUtil(wsvcId);
			jexAjax.set(jex.getAllData("#submitFormLink"));
			jexAjax.set("APPCD_NO", _appcdNo);
			jexAjax.execute(function(dat) {
				if(wsvcId == "pc_link_c001"){
					jex.success("링크 정보가 등록되었습니다.");
				//	opener.jex.success(_extLang.linkRegistration);//링크 정보가 등록되었습니다.
				}
				if(wsvcId == "pc_link_u001"){
				//	opener.jex.success(_extLang.linkCorrectInfo); // 링크 정보가 수정되었습니다.
					jex.success("링크 정보가 수정되었습니다.");
				}			
				
				var callbackData = {};
				callbackData["APPCD_NO"] = dat.APPCD_NO;
				callbackData["APP_NM"] = $('#APP_NM').val();
				
				var callbackFn = opener.gbox.popup.callbackFn["pop_gbox_pc_4210"];
				callbackFn(callbackData);
				$("#popUpLinkDetail").hide();
				bPopup.close();
				//window.close();
										
			});		
		});		
		// link_gb change event
		// if changed, add or remove attribute conditional
		$("#LINK_GB").change(function() {
			if($(this).val() == "1") {
				checkValidate("APP");
			}
			else{					
				
				checkValidate("WEB");
			}							
		});		

	}
}))();



//Function check  validate  
function checkValidate(Type){
	if(Type=="APP"){
					
		$("#AND_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$("#AND_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$("#IPN_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$("#IPN_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$("#WEB_URL").removeAttr("data-validation-engine");	
		
	}
	else if(Type=="WEB"){
		$("#AND_LINKURL").removeAttr("data-validation-engine");
		$("#AND_ESTBURL").removeAttr("data-validation-engine");
		$("#IPN_LINKURL").removeAttr("data-validation-engine");
		$("#IPN_ESTBURL").removeAttr("data-validation-engine");
		$("#WEB_URL").attr("data-validation-engine", "validate[required,maxSize[255]]");		
	}
};


gbox_pc_4210.loadData = function() {
	
	var jexAjax = jex.createAjaxUtil("pc_link_r002");
	jexAjax.set("APPCD_NO", _appcdNo);
	jexAjax.execute(function(dat) {
		
		dat.AND_LINKURL = jex.null2Void(dat.AND_LINKURL);
		dat.AND_ESTBURL = jex.null2Void(dat.AND_ESTBURL);
		dat.IPN_LINKURL = jex.null2Void(dat.IPN_LINKURL);
		dat.IPN_ESTBURL = jex.null2Void(dat.IPN_ESTBURL);
		dat.WEB_URL = jex.null2Void(dat.WEB_URL);
		
		jex.setAllData("#pcpcont", dat);
	});
};