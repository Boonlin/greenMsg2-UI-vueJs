/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Long Bunna ( long_bunna@ymail.com )
 * @Description    : (팝업)연락처 추가 view
 * @History      	 : 20140425062807, Long Bunna
 * </pre>
 **/
new (Jex.extend({
	onload:function() {
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);	
		$("#USER_NM").focus();
	}, event:function() {
		//origi
		/*$("#btnAdd").click(function() {
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			var ajax = jex.createAjaxUtil("pc_user_c001");
			ajax.set(jex.getAllData("#form"));	
			ajax.execute(function() {
				opener.jex.success(_extLang.contactadd );//"연락처가 추가되었습니다."
				window.opener.gbox_pc_3000.tbl.setCurrentPage(1);
				window.opener.gbox_pc_3000.tbl.setSvrPageNo(1);
				opener.gbox_pc_3000.fillUserTbl(jex.getAllData("#searchForm"));
				//window.opener.location.href = "\gbox_pc_3000.act";
				self.close();		
			});	
		});		*/
		// Add Group UseR
		$('#btnConfirm').click(function(){		
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}	
			var ajax = jex.createAjaxUtil("pc_gruser_c001");
			gbox.ui.createProgressBar();
			ajax.set("GRP_NO", _gNo);
			ajax.set(jex.getAllData("#submitForm"));
			ajax.execute(function(dat) {
				gbox.ui.destroyProgressBar();
				jex.success("연락처가 추가되었습니다.");
				opener.gbox_pc_3000.fillUserTbl();
				self.close();	
			});				
			
		});
			
		$("#btnCancel").click(function(){
			self.close();	
		});
	}
}))();
