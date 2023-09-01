/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : .
 * @History      	 : 20140508125904, Choi Si-hwan
 * </pre>
 **/

var gbox_pc_5000 = {};
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		/*$('body').live("click",function(){
			$(".select_field_cbox .select_field_cbox_ly)").trigger("click");
		});*/
		$("#MSG_TXT").attr("placeholder", _extLang.enterMessage);  //메시지를 입력하세요.
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);
		
		gbox.ui.setLinkAppCombo("#LINK_CD");
		
		gbox.ui.setReceiverInput("#RECEIVER");
		
		//관리자인지 확인
		gbox.session.load(function() {
			if(gbox.session.hasRole("ADMIN")) {
				$(".m_rec_alluse").show();
			}
		});
	}, event:function() {
		//--- define event action ---//
		
		//보내기 버튼
		$("#sendBtn").click(function() {
			if(!$("#SND_GB").is(":checked")) {
				if(jex.isNull($("#RECEIVER").select2("val"))) {
					jex.warning(_extLang.selectReceiver);    //받는이를 선택하세요.
					return false;
				}
			}
			
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			
			if(jex.isNull($("#LINK_CD").val())) {
				jex.warning(_extLang.choosetheLink);     //링크정보를 선택하세요. 
				return false;
			}
			
			
			var userRec = [];
			var groupRec = [];
			
			//수신자에서 그룹, 사용자 추출
			for(var i = 0; i < $("#RECEIVER").select2("val").length; i++) {
				
				var str = $("#RECEIVER").select2("val")[i];
				
				var splited = str.split('_');
				
				if(splited[0] == "GROUP") {
					groupRec.push({"GROUP_NO":splited[1]});
				}
				else if(splited[0] == "USER") {
					userRec.push({"USER_NO":splited[1]});
				}
			}
			
			var photoRec = [];
			
			$(".deletePhotoBtn").each(function(i, v) {
				var photoItem = {"PHOTO": $(this).data("uid")};
				photoRec.push(photoItem);
			});
			
			var jexAjax = jex.createAjaxUtil("pc_msg_c001");
			jexAjax.set(jex.getAllData(".tbl_send_wrap"));
			jexAjax.set("USER_REC", userRec);
			jexAjax.set("GROUP_REC", groupRec);
			jexAjax.set("PHOTO_REC", photoRec);
			//jexAjax.set("MSG_GB",);
			jexAjax.set("LINK_CD", $("#LINK_CD").val());
			
			gbox.ui.createProgressBar();
			
			jexAjax.execute(function(dat) {
			/*  var msg = _extLang.total + " " + dat.TOT_CNT + " " + _extLang.articleSend;  //총     //건의 메시지를 보냈습니다.
				msg += "\n\nGreenMessage " + " " + dat.GREEN_CNT + " " + _extLang.articles;  //건
				msg += "\nSMS " + dat.SMS_CNT + " " + _extLang.articles;
				alert(msg);				
				location.href = "/gbox_pc_5000.act";*/
				
				if(dat.TOT_CNT > 1){
					var msg = _extLang.total + " " + dat.TOT_CNT + " " + _extLang.articleSends;    //총              //건의 메시지를 보냈습니다.					
					
					msg += "\n\nGreenMessage " + dat.GREEN_CNT + " " +  _extLang.article;     //건
					if(dat.GREEN_CNT >1 ){
						if(_lang == "KH" || _lang == "DF"){
							
						}else{
							msg +="s";
						}
					}
					msg += "\nSMS " + dat.SMS_CNT + " " + _extLang.article;
					if(dat.SMS_CNT > 1){
						if(_lang == "KH" || _lang == "DF"){
							
						}else{
							msg +="s";
						}                 
					}				
					jex.alert(msg);					
				}else{
					var msg = _extLang.total + " " + dat.TOT_CNT + " " + _extLang.articleSend;    //총              //건의 메시지를 보냈습니다.					
					msg += "\n\nGreenMessage " + dat.GREEN_CNT + " " +  _extLang.article;     //건					
					msg += "\nSMS(LMS, MMS) " + dat.SMS_CNT + " " + _extLang.article;                 //건						
					jex.alert(msg);
				}
			
				location.href = "/gbox_pc_5000.act";
				
			});
		});
		// photo upload
		/*$("#photoUploadBtn").click(function() {
			if($("li.m_thumb_li> span").length==5){
				jex.warning("Can upload maximum 5 photo");
				return;
			}else{
				gbox.popup.photoUpload(null, function(file) {
					$(".m_thumb_li").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");
				});
			}
	
		});*/
		$("#photoUploadBtn").click(function() {
			if($("li.m_thumb_li> span").length==5){
				jex.warning(_extLang.youcanOnlyRegister); //"이미지는 최대 5장까지만 등록 가능합니다."
				return;
			}else{
				gbox.popup.photoUpload(null, function(file) {
					var val = file.fileName;
					if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
						$(".m_thumb_li").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&width=100&height=100&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");							
						$(".upld_thumb_txt").hide();
					}
					else{
						jex.warning(_extLang.onlyImage); //이미지 파일만 등록 가능합니다.
					}
				});
			}
			

	});
		
		// photo delete
		$(".deletePhotoBtn").live("click", function() {
			$(this).closest("span").remove();
			
			$.get("/upload?cmd=delete&uid=" + $(this).data("uid"), function(dat) {
			});
		//show 'please insert image'  div
			var len = $('.deletePhotoBtn').parents('span.upld_thumb').siblings().length;
			if(len==0){
				$(".upld_thumb_txt").show();
			}
		});
		
		$('.select_field_cbox_ly').click(function(){
			$("#Data option:selected").text();
			$("ul #mcombo li:even").css("background-color","#F7F6F6");
			
		});
		
		// link app form
		$("#linkAppFormBtn").click(function() {
			gbox.popup.linkAppForm(null, function(dat) {
				gbox.ui.setLinkAppCombo("#LINK_CD", {
					defaultValue : dat.APPCD_NO
				});
				
				//$("#LINK_CD").select2("data", {id: dat.APPCD_NO, text: dat.APP_NM});
			});
		});
		
		
		$("#SND_GB").click(function() {
			var sndGb = $(this).is(":checked");
			
			//전체선택이면
			if(sndGb) {
				$(".m_rec_wrap").hide();
			}
			else {
				$(".m_rec_wrap").show();
			}
		});
		$("#gboxID").click(function() {
			var input = {};
			input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
			
			gbox.popup.receiverSelect(input, gbox_pc_5000.receiverSelectCallback);
		});
		$("#staffID").click(function() {
			var input = jex.getAllData("#emplInfoForm");
			jex.newWin( _emplInfoPopupUrl, "emplinfo_0001_01", 720, 420, input);
		});
		$("#custID").click(function() {
			var input = jex.getAllData("#b2bcCstmInfoForm");
			jex.newWin( _b2bcCstmPopupUrl, "b2bccstm_0001_01", 720, 420, input);
		});
		//주소록
		$("#receiverSelectBtn").click(function() {
			
			$("#addBook").slideToggle();
			/*var input = {};
			input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
			
			gbox.popup.receiverSelect(input, function(dat) {
				
				var selected = $("#RECEIVER").select2("val");
				
				$.each(dat, function(i, v) {
					selected.push(v);
				});
				
				$("#RECEIVER").select2("val", selected);
			});*/
		});
	}
}))();
gbox_pc_5000.receiverSelectCallback = function(dat) {
	
	var selected = $("#RECEIVER").select2("val");
	$.each(dat, function(i, v) {
		selected.push(v);
	});
	$("#RECEIVER").select2("val", selected);
};