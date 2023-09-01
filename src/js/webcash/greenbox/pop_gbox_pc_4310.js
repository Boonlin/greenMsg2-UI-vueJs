/**
 * <pre>

 * GREENMSG PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : daravuth ( daravuth.sd@gmail.com )
 * @Description    : pop_gbox_pc_4310
 * @History      	 : 20141007085231, daravuth
 * </pre>
 **/
var gbox_pc_4310 = {};
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
	//	gbox_pc_4310.loadProfile();

		
	}, event:function() {
		//--- define event action ---//
		$("#btnEdit").click(function(){
			var bPopup = $("#popUp_SMS").bPopup();
 			var ajax=jex.createAjaxUtil("pc_smsreg_u001");
			ajax.set("SMSNOTI_TIME",$(".sms_box #SMSNOTI_TIME").val());
			ajax.execute(function(dat) {
			jex.success("수정되었습니다.");
			$("#popUp_SMS").hide();
			bPopup.close();
			});

		});
	}
}))();

gbox_pc_4310.loadProfile = function() {
	var ajax=jex.createAjaxUtil("pc_smsreg_r001");
	ajax.execute(function(dat) {
	 jex.setAllData("#sendForm",dat);
		
		if(dat.NOTI_GB = "PUSH"){
			$("#NOTI_GBN").attr("checked","checked");

		}else
			{
			$("#NOTI_GBY").attr("checked","checked");
		};
		
		$("#NOTI_GB").text(dat.NOTI_GB);
//		$(".sms_box #SMSNOTI_TIME").text(dat.SMSNOTI_TIME);
		
		
		
	});
};

