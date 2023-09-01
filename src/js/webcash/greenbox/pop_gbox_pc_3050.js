/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : .
 * @History      	 : 20140509013916, Choi Si-hwan
 * </pre>
 **/
var gbox_pc_3050 = {};
new (Jex.extend({
	onload:function() {
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);	
		if(!jex.isNull(_uNum)){
			gbox_pc_3050["DATA"]={
					"USER_NM" : _userName,
					"GRP_NO" : _gNum,	
					"HP_NO" : _uNum,	
					"USER_NO":_uNo,
					"BIGO": _bigo
			};
			jex.setAllData("#pcpcont", gbox_pc_3050["DATA"]);
		}
	}, event:function() {
		$("#btnUpdate").click(function() {
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			//$("#USER_NM").attr("data-validation-engine", "validate[required]");
			// last update 07/10/2014 pc_gruser_u001 from pc_user_u001
			var ajax = jex.createAjaxUtil("pc_gruser_u001");
			ajax.set("GRP_NO", $("#GRP_NO").val());
			ajax.set("USER_NO", $("#USER_NO").val());
//			ajax.set("HP_NO",$("#HP_NO").val());
//			ajax.set("USER_NM",$("#USER_NM").val());
//			ajax.set("BIGO" ,$("#BIGO").val());
			ajax.set(jex.getAllData("#submitForm"));
			ajax.execute(function() {
				opener.jex.success("연락처가 수정되었습니다.");	//연락처가 수정되었습니다.
				window.opener.gbox_pc_3000.tbl.setCurrentPage(1);
				window.opener.gbox_pc_3000.tbl.setSvrPageNo(1);
				opener.gbox_pc_3000.fillUserTbl();
				self.close();
				//window.opener.location.href = "\gbox_pc_3000.act";
				
			});
					
		});	
		$("#btnCancel").click(function(){
			self.close();
		});
	}
}))();