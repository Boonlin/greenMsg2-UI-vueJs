/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Long Bunna ( long_bunna@ymail.com )
 * @Description    : (팝업)연락처 삭제 view
 * @History      	 : 20140425085832, Long Bunna
 * </pre>
 **/
new (Jex.extend({	
	onload:function() {
		
		var userNameArray=[];
		var userNoArray=[];
		var hp_noArray=[];
		var tex =[];
		$.each(_groups,function(i,v){
				userNameArray.push(v.USER_NM);
				userNoArray.push(v.USER_NO);
				hp_noArray.push(v.HP_NO);
				tex.push(v.USER_NM+"( "+v.HP_NO+" ) ");
		});
		$('#uName').text(tex);
		
			}, event:function() {					
				$("#btnDelete").click(function() {
					var ajax = jex.createAjaxUtil("pc_gruser_d001");
				  	ajax.set("GRP_NO", _gNo);
					//var ajax = jex.createAjaxUtil("pc_user_d001");
					
					ajax.set("DEL_REC", _groups);
					ajax.execute(function(dat) {
						//jex.warning(_extLang.contactdel);
						jex.alert("연락처가 삭제되었습니다.");//"연락처가 삭제되었습니다."
						window.opener.gbox_pc_3000.tbl.setCurrentPage(1);
						window.opener.gbox_pc_3000.tbl.setSvrPageNo(1);
						opener.gbox_pc_3000.fillUserTbl();
						self.close();					
					});
				});	
			}
}))();
