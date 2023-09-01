/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : pop_gbox_pc_3130
 * @History      	 : 20140425061846, Choi Si-hwan
 * </pre>
 **/
new (Jex.extend({
	onload:function() {
		
		//--- todo onload start ---//
		var groupNameArray = [];
	   
		$.each(_groups, function(i, v) {
			groupNameArray.push(v.GRP_NM);
			
		});
		$('#gName').text(groupNameArray);
		
	}, event:function() {
		//--- define event action ---//
		//Close
		$('#btnClose').click(function(){
			self.close();
		});
		//Delete
		$('#btnDelete').click(function(){
			var jsonRec=[];
			ajax = jex.createAjaxUtil("pc_group_d001");
			
			ajax.set("DEL_REC", _groups);
			ajax.execute(function() {
				jex.alert(_extLang.groupDel); //그룹이 삭제되었습니다.
				//jex.success(_extLang.groupDel); //그룹이 삭제되었습니다.
				window.opener.gbox_pc_3100.tbl.setCurrentPage(1);
				window.opener.gbox_pc_3100.tbl.setSvrPageNo(1);
				opener.gbox_pc_3100.fillTbl();
				self.close();
			});
		});
	}
}))();