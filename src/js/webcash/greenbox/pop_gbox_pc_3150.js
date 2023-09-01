/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : .
 * @History      	 : 20140509013618, Choi Si-hwan
 * </pre>
 **/
gbox_pc_3150={};
new (Jex.extend({
	onload:function() {
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);	
	
		gbox_pc_3150["Data"]={
				"GRP_NM" : _gName ,
				"GRP_NO" : _gNum
		};
		jex.setAllData("#form", gbox_pc_3150["Data"]);
	
		//--- todo onload start ---/
	}, event:function() {
		//--- define event action ---//
		//Update
		$('#btnUpdate').click(function(){
			/*if($("#GRP_NM").val().length >=50){
				jex.warning("Data must less than 50 charater length");
				return true;
			}*/
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			ajax = jex.createAjaxUtil("pc_group_u001");
			ajax.set("GRP_NM",$('#GRP_NM').val());
			ajax.set("GRP_NO",_gNum);
			ajax.execute(function(){
			opener.jex.success(_extLang.groupModified); //그룹이 수정되었습니다.
				window.opener.gbox_pc_3100.tbl.setCurrentPage(1);
				window.opener.gbox_pc_3100.tbl.setSvrPageNo(1);
				opener.gbox_pc_3100.fillTbl();
				self.close();
			});
		});
		//Close
		$('#btnClose').click(function(){
			self.close();
		});
	}
}))();