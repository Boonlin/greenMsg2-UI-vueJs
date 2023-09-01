/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @Description    : (공통)사진 추가 view
 * @History      	 : 20140425091333, chhaeuy chhon
 * </pre>
 **/
var gbox_pc_1010={};
var data = {};
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		data = '';
		gbox.ui.setSingleFileUploader("#UPLOADPIC", {
    		keyTarget: "#UPLOADPIC_UID",
    		allowedExts: "jpg,png,gif",
    		onAfterUpload: function(dat) {
    			if(!jex.isNull(dat)) {
    				var val = dat.fileName;
    				if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
    					data = dat;
        				$("#UPLOADPIC_FILENAME").val(dat.fileName);
//        				var callbackFn = opener.gbox.popup.callbackFn["pop_gbox_pc_1010"];    				
//        				callbackFn(dat);
//        				gbox.ui.createProgressBar();
//        				$(".thumb_slide_wrap").show();
//        				self.close();
					}else{
//						jex.warning("이미지 파일만 선택 가능합니다.");
						jex.warning($.i18n.prop("lang_slect_file_img_only")); 
					}
    				
    			}
    			//gbox.ui.destroyProgressBar();
    		}
    	});
		
	}, event:function() {
		//--- define event action ---//
		$("#SubmitUpload").click(function(){
			if(!jex.isNull(data)){
				var callbackFn = opener.gbox.popup.callbackFn["pop_gbox_pc_1010"];    				
				callbackFn(data);
				$(".thumb_slide_wrap").show();
				gbox.ui.createProgressBar();
				self.close();
			}else{
//				jex.warning("이미지 파일 선택 합니다.");
				jex.warning($.i18n.prop("lang_pls_select_file_img"));
			};
		});
	}
}))();

function changeLang(lang) {
    jQuery.i18n.properties({
        name: 'gbox_pc_1000',
        path: '/lang/',
        mode: 'both',
        language: lang,
        async: true,
        callback: function () {
        	gbox.ui.setAllLang("body", $.i18n.prop);
        }
    });
}