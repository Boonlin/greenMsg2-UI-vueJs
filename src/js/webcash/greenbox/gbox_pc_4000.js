/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Pisall (  )
 * @Description    : gbox_pc_4000
 * @History      	 : 20140505090542, Pisall
 * </pre>
 **/

var gbox_pc_4000 = {};

new (Jex.extend({
	onload:function() {
		//--- todo onload start ---/				
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);	
		
		gbox_pc_4000.loadData();
	}, event:function() {
		//--- define event action ---//
		 $('#btnUpdate').click(function(){
			 if(!$("#submitForm").validationEngine('validate')) {
					return false;
				}
			 var ajax=jex.createAjaxUtil("pc_profile_u001");
			 ajax.set('ORG_NM',$('#ORG_NM').val());
			 ajax.set('PHOTO', $('#PHOTO').val());
			 //ajax.set('PHOTO',"/upload?cmd=download&uid=" + $('#PHOTO_UID').val());
			 //ajax.set('PHOTO_IMG',"/upload?cmd=getthumb&width=78&height=78&uid=" + $('#PHOTO_UID').val());
			 ajax.execute(function() {    
				 jex.success(_extLang.beingModified);//수정되었습니다.
			 });
		 });
		 

		 
		  
		//photo upload
		 $("#photoUploadBtn").click(function() {
			
			 gbox.popup.photoUpload(null, function(dat) {
				
				 $("#PHOTO").val(dat.uid);
				
				 $("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&width=78&height=78&uid=" + dat.uid);
				 //$("#photoDeleteBtn").attr("data-uid", dat.uid);
				 $("#photoDeleteBtn").show()
//				 if($("#PHOTO").val("")){
//					$("#photoDeleteBtn").show();
//					 
//				 }else{
//					 $("#photoDeleteBtn").hide();
//				 }
				
			 });
		 });
		 
		 //photo delete
		 $("#photoDeleteBtn").click(function() {
			 if(!jex.isNull($("#PHOTO").val())) {
				 $("#PHOTO_IMG").attr("src", "../../imgs/comm/thumb_my.png");				
				 $.get("/upload?cmd=delete&uid=" + $("#PHOTO").val(), function(dat) {
					 //$(this).removeAttr("data-uid");
					 $("#PHOTO").val("");
					 $("#photoDeleteBtn").hide();
					 
				 });
				
			 }
		 });
		 
		 //reset page
		 $("#btnReset").click(function(){
//			 $("#submitForm")[0].reset();
			 gbox_pc_4000.loadData();
		});
		 
		 
	}
}))();

gbox_pc_4000.loadData = function() {
	var ajax=jex.createAjaxUtil("pc_profile_r001");
	ajax.execute(function(dat) {
		$('#ORG_NM').val(dat.ORG_NM);
		
		if(!jex.isNull(dat.PHOTO)) {
			$('#PHOTO').val(dat.PHOTO);
			
			if(jex.null2Void(dat.PHOTO).startsWith("http")) {
				$("#PHOTO_IMG").attr("src", dat.PHOTO);
			}
			else {
				$("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&width=78&height=78&uid=" + dat.PHOTO);
			}
			
			$("#photoDeleteBtn").show();
		}
		else {
			$("#PHOTO_IMG").attr("src", "../../imgs/comm/thumb_my.png");
			 $("#photoDeleteBtn").hide();
		}
	});
	
};