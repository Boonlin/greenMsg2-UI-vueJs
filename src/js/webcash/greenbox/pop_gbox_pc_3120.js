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
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
			$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);	
			$("#GOP").focus();
	}, event:function() {
		//--- define event action ---//
		$('#btnSave').click(function(){
			
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			var gname=$('#GOP').val();
			var ajax = jex.createAjaxUtil("pc_group_c001");
			ajax.set("GRP_NM", $('#GOP').val());
			ajax.execute(function() {
				opener.jex.success(_extLang.addGroup); //그룹 추가되었습니다.
				window.opener.gbox_pc_3100.tbl.setCurrentPage(1);
				window.opener.gbox_pc_3100.tbl.setSvrPageNo(1);
				opener.gbox_pc_3100.fillTbl();
				self.close();
			});
	 	});
		
		$('#btnClose').click(function(){
			self.close();
		});
	
	}
}))();