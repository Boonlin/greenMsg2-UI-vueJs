/**

 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : pop_gbox_pc_6010
 * @History      	 : 20140725123158, Choi Si-hwan
 * </pre>
 **/
var pop_gbox_pc_6010 = {};
var thumb=10;
var _oldRec = {};
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions); 
		$("#submitFormLink").validationEngine(gbox.ui.validationEngineOptions);
    /*
		pop_gbox_pc_6010.receiverSelectCallback();
		pop_gbox_pc_6010.setReceiverInput("#RECEIVER", _userRec);
    */
		gbox.ui.setLinkAppCombo("#LINK_CD1");
	
    _userRec = $.map(_userRec, function(item, i) {
			return {id:"HP_" + item.HP_NO, text:"[개인]"+item.USER_NM};
		});
		
		pop_gbox_pc_6010.setReceiverInput("#RECEIVER", _userRec);
//		//관리자인지 확인
//		gbox.session.load(function() {
//			if(gbox.session.hasRole("ADMIN")) {
//				$(".m_rec_alluse").show();
//			}
//		});
		window.resizeTo(640, 670);
//		window.resize();
		
	}, event:function() {
		//--- define event action ---//
		//--- define event action ---//
		
		$("#RegistgerGmsg").click(function(){
//			alert("Go to register and enter Sender Information");
			document.redirectForm.submit();
		});
		
		// close popup
		$("#cancelBtn1" ).live("click", function(){
			var bPopup = $('#SecondPopUP').bPopup();
			bPopup.close();
		});
		
		$("#noBtn" ).live("click", function(){
			var bPopup = $('#SecondPopUP').bPopup();
			bPopup.close();
		});
		
		$("#cancelBtn" ).live("click", function(){
			var bPopup = $('#SecondPopUP').bPopup();
			bPopup.close();
		});
		
		$("#yesBtn").click(function(){
			chrg_pnt();
			var bPopup = $('#SecondPopUP').bPopup();
			bPopup.close();
		});
		
		
		
		$(window).resize(function(){
			//컨텐트를 0픽셀로 이동
			$(".thumb_row ul").css("left", 0);
			
			gbox.ui.initPhotoNavigation("#photoNavigation");
		});
		
		//delete link 
		$(".msg_linkview #linktype a.removeLink").live("click",function(){
			//alert($(this).val());
			$(this).parent("span#linktype").remove();
			$(".link_wrap").removeClass("link_wrapdown");
			var len=$("span#linktype").length;
			//alert(len);
			if(len==0){
				$(".msg_linkview").animate().hide();
			}
		});
		
		
		// add link to div
		$("ul.select_field_cbox_ly li a").live("click",function(){
			$(".msg_linkview").css("display","block");
			//$("#showAddLink").hide();
			var linkNm=$(this).text();
			var linkCD=$(this).data("value");
			//alert(spanvar);
			var txt="<span id=\"linktype\"><a href=\"javascript:\"  data-value="+linkCD+" class=\"linkview\">"+linkNm+"</a><a class=\"removeLink\" href=\"javascript:\"><img src=\"../img/ico/ico_delete.gif\" alt=\"삭제\"></a></span>";
			if($(".thumb_row ul li").length==0){
				$(".link_wrap").removeClass("link_wrapdown");
			}else{
				$(".link_wrap").addClass("link_wrapdown");
			}
			$(".msg_linkview div").empty().append(txt);
		});
		
		$("#MSG_TXT").keyup(function () {
			  var len = $(this).val().length;
			  $("#count").text(len); 
			  
			});
		
		$('html').click(function(e) { 
			
		     if( !$(e.target).hasClass('fwn'))
		     {
		       $(".link_label").fadeOut("fast");
		        
		     }
		    });
		//link button append
		$("#showLink").click(function(){
			$(".select_field_cbox_ly").show();
			$(".link_label").toggle();
		});
		
		
		// link app form
		$("#linkAppFormBtn").click(function() {
			$('#addLinkDetailpopUp').bPopup();
			$(".tbl_ipt_pop2 #APP_NM").focus();
			
//			gbox.popup.linkAppForm(null, function(dat) {
//				gbox.ui.setLinkAppCombo("#LINK_CD", {
//					 defaultValue : dat.APPCD_NO
//				});
//			});
		});
		// close  pop up add link detail
		$("#btnClose,#btnClosePopUp").click(function(){
			$("#addLinkDetailpopUp").hide();
			var bPopup = $('#addLinkDetailpopUp').bPopup();
			bPopup.close();
		});
		//button save link
		$('#btnStorage').click(function(){
			var bPopup = $("#addLinkDetailpopUp").bPopup();
			if(!$("#submitFormLink").validationEngine('validate')) {
				return false;
			}
			
			var jexAjax = jex.createAjaxUtil("pc_link_c001");
			jexAjax.set(jex.getAllData("#submitFormLink"));
			
			jexAjax.execute(function(dat) {
				jex.success("링크 정보가 등록되었습니다.");	    		
				$("#addLinkDetailpopUp").hide();
				$("#submitFormLink")[0].reset();
				bPopup.close();
				gbox.ui.setLinkAppCombo("#LINK_CD");
				//gbox.ui.setLinkAppCombo(".msg_linkview");
				gbox.ui.setappdenLink(".msg_linkview", dat.APPCD_NO);
				
			});		
		});		
		
		// link_gb change event
		// if changed, add or remove attribute conditional
		$(".tbl_ipt_pop2 #LINK_GB").change(function() {
			if($(this).val() == "1") {
				checkValidate("APP");	
			}
			else{					
				
				checkValidate("WEB");
			}							
		});		
		
		//보내기 버튼
		$("#sendBtn").click(function() {
			
			pop_gbox_pc_6010.sendMessage();
			
			/*
			var jexAjax = jex.createAjaxUtil("pc_msg_c001");
			jexAjax.set(jex.getAllData("#submitForm"));
			jexAjax.set("USER_REC", userRec);
			jexAjax.set("GROUP_REC", groupRec);
			jexAjax.set("PHOTO_REC", photoRec);
			
			gbox.ui.createProgressBar();
			
			jexAjax.execute(function(dat) {
				var msg = "총 " + dat.TOT_CNT + "건의 메시지를 보냈습니다.";
				msg += "\n\nGreenMessage " + dat.GREEN_CNT + "건";
				msg += "\nSMS " + dat.SMS_CNT + "건";
				jex.alert(msg);
				location.href = "/gbox_pc_1000.act";
				
			});
			*/
		});
		
		//photo upload event
		/*$("#photoUploadBtn").click(function() {
			gbox.popup.photoUpload(null, function(file) {
				$(".m_thumb_li").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");
			});
		});*/
		//////

//		$("#photoUploadBtn").click(function() {
//			if($("li.m_thumb_li> span").length==5){
//				jex.warning("이미지는 최대 5장까지만 등록 가능합니다.");
//				return;
//			}else{
//				gbox.popup.photoUpload(null, function(file) {	
//					$(".m_thumb_li").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&width=100&height=100&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");							
//					$(".upld_thumb_txt").hide();	
//				});
//			}
//			
//		});
		
		$("#photoUploadBtn").click(function() {
			 thumb1=thumb;
			if($(".thumb_row li").length == 5){
				jex.warning("이미지는 최대 5장까지만 등록 가능합니다."); //"이미지는 최대 5장까지만 등록 가능합니다."
				return;
			}
			else {
				
				var opt = {
			           "ptlId"      	: _ptlId,
			           "chnlId"     	: _chnlId,
			           "useInttId"  	: _useInttId,
			           "cntsId"     	: _cntsId,
			           "userId"     	: _userId,
			           "openType"    	:"P",
			           "maxFileCnt"    	:"5",
			           "maxFileSize"    :"100M",
			           "callBackFn" 	:"fileCallback",
			           "uploadFileProp"	: {
						   "type" : "img",
						   "thumImgSize"  : {
			                           "width"  :98,
			                           "height" :98
			                }
			           }
			    };
				
				_WE_DRIVER.open(opt);
				
				/*
				gbox.popup.photoUpload(null, function(file) {
					var val = file.fileName;
					if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
						$(".thumb_row ul").append("<li><div class=\"thumb_box\"><a href=\"javascript:\" class=\"btn_photo_x\"><img src=\"../img/btn/x_photo2.png\" alt=\"\"></a><img src=\"/upload?cmd=getthumb&width=98&height=98&uid="+file.uid+"\" alt=\"\" data-uid=\""+file.uid+"\"\"></div></li>");
						//$(".thumb_row").append(' <img alt="" src="upload?cmd=getthumb&width=98&height=98&uid='+file.uid+'" /><br /><span class="thumbnail-text">TEST</span></div>');
						//	$(".thumb_row ul").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&width=98&height=98&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");							
//						$(".msg_wrap").animate({"height":"318px"});
						$(".thumb_slide_wrap").animate({"height":"99px"});
						//alert(thumb);
						if($(".msg_linkview div span").length==0){
							$(".link_wrap").removeClass("link_wrapdown");
						}else{
							$(".link_wrap").addClass("link_wrapdown");
							
						}
						//$(".thumb_box .btn_photo_x").show();
						
						$('#photoNavigation').show();
						$("#showUpload").hide();
						gbox.ui.initPhotoNavigation("#photoNavigation");
						$("#stOption").addClass("scrollOption");
					}
						
					else{
						//이미지 파일만 등록 가능합니다.
						jex.warning("이미지 파일만 등록 가능합니다."); 
					}
				});
				*/
			}
		});
		
		// photo delete
		$(".btn_photo_x").live("click", function() {
			$(this).closest("ul li").remove();
			thumb=0;
			aa=$(".thumb_row").width()/100;
			thumb=Math.ceil(aa);
			if ($(".thumb_row li").length<thumb-1){
				$(".thumb_row li").removeClass("hidetbl");
				$(".btn_thum_prev").hide();
				$(".btn_thum_next").hide();
			}
			$.get("/upload?cmd=delete&uid=" + $(this).data("uid"), function(dat) {
			});
			//show 'please insert image'  div
			var len = $('.btn_photo_x').parents('.thumb_row ul').length;
			if(len==0){	
				$(".link_wrap").removeClass("link_wrapdown");
//				$(".msg_wrap").animate({"height":"240px"});
				$(".thumb_slide_wrap").animate({"height":"20px"});
				$("#showUpload").animate().show();
				$('#photoNavigation').hide();
				$("#stOption").removeClass("scrollOption");
			}

			gbox.ui.initPhotoNavigation("#photoNavigation");
		});
		
		//		// photo delete
//		$(".deletePhotoBtn").live("click", function() {
//			$(this).closest("span").remove();
//			$.get("/upload?cmd=delete&uid=" + $(this).data("uid"), function(dat) {
//			});	
//		//show 'please insert image'  div
//			var len = $('.deletePhotoBtn').parents('span.upld_thumb').siblings().length;
//			if(len==0){
//				$(".upld_thumb_txt").show();
//			}
//		});
//		
//		$("#SND_GB").click(function() {
//			var sndGb = $(this).is(":checked");
//			//전체선택이면
//			if(sndGb) {
//				$(".m_rec_wrap").hide();
//			}
//			else {
//				$(".m_rec_wrap").show(); 
//			}
//		});
//		
		/*
		// 2015-July-31 
		$("#receiverParticipantSelectBtn").click(function() {

//			gbox.session.load(function(dat) {
				var options = {
	                    "SECR_KEY"        : _secr_key,
	                    "POST_CALLBACK_PAGE"  : _participantCallbackUrl,
	                    "CHNL_ID"			  :_chnlId,
	                    "PTL_ID"             : _ptlId,
	                    "USE_INTT_ID"         : _useInttId,
	                    "USER_ID"             : _loginId,
	                    "SEARCH_TYPE"         : "J;Y;M",
	                    "POPUP_TYPE"          : "P",	        
	                    "MULT_SEL_YN"         : "Y"	        
	                };
//				console.log(options);
				PartUserSearchLayerPopup(options); //직원/연락처 조회팝업 호출 함수
//			});
           
		});
		*/
		
		//주소록
		$("#receiverSelectBtn").click(function() {
			$("#addBook").slideToggle();
			var input = {};

			input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
			
			gbox.popup.receiverSelect(input, pop_gbox_pc_6010.receiverSelectCallback);

		});
		
	}
}))();
/* 
$.each(dat.USER_REC, function(i, v) {
				receiverData.push({id: "USER_" + v.USER_NO, text: "[개인]" + v.USER_NM});
			});
 */
pop_gbox_pc_6010.init = function(dat) {
	//console.log(JSON.stringify(dat));
	
//	var USER_REC = _receiver['USER_REC'];
//	var ttt='';
//	for(var i = 0 ; i<_receiver['USER_REC'].length;i++){
//		ttt +=_receiver['USER_REC'][i]['USER_NM'];
//		ttt += " ";
//	};
//	$("#s2id_autogen1").val(ttt).addClass("select2-search-choice");
	/*
	/*$.each(_receiver.USER_REC, function(i){
		("#s2id_autogen1").val(_receiver.USER_REC[i].USER_NM);
	});*/

 /*var receiverData = [];
$.each(_receiver.USER_REC, function(i,v){
	receiverData.push({ id: v.USER_NO});
	
			});
 $("#s2id_autogen1").val(receiverData);
*/
//JSONArray jsonArray = responseJson.getJSONArray("INQ_REC");

	//var RECEIVER = [{"HP_NO": "01911112222"},{"HP_NO": "01922223333"},{"HP_NO": "01933334444"}];

/*	JSONObject responseJson = JSONObject.fromObject(_receiver);
	
	JSONArray jsonArray = responseJson.getJSONArray("_receiver['USER_REC']");


	for( var i = 0; i < jsonArray.length; i++) {
	JSONObject userInfo = (JSONObject)jsonArray.get(i);
	userInfo.getString("HP_NO"); // 01911112222
	userInfo.getString("USER_NM"); // user_A
	};
	$("#s2id_autogen1").val(userInfo);*/
	
	var s2id_autogen1_val = "";
	
	$.each(dat, function(i, v) {
		
		if(i > 0) {
			s2id_autogen1_val += ";";
		}
		
		s2id_autogen1_val += v.USER_NM;
	});
	
	$("#s2id_autogen1").val(s2id_autogen1_val);
};

pop_gbox_pc_6010.receiverSelectCallback = function(dat) {
	
//	var selected = $("#RECEIVER").select2("val");
//	$.each(dat, function(i, v) {
//		selected.push(v);
//	});
//	$("#RECEIVER").select2("val", selected);
	
	var oldArray = $("#RECEIVER").select2("data");
	
	var newArray = $.merge(JSON.parse(dat), oldArray);
	
	$("#RECEIVER").select2("data", newArray);
	
	/*
	var selectedVal = [];
	
	$.each(newArray, function(i, v) {
		selectedVal.push(v.id);
	});
	
	$("#RECEIVER").select2("val", selectedVal);
	*/
};


pop_gbox_pc_6010.setReceiverInput = function(target, receiverData) {
	
//	var receiverData = [];
	
//	$.each(dat, function(i, v) {
//		receiverData.push({id: v.HP_NO, text: "[개인]" + v.USER_NM});
//	});
	
//	$.each(dat.GROUP_REC, function(i, v) {
//		receiverData.push({id: "GROUP_" + v.GROUP_NO, text: "[그룹]" + v.GROUP_NM});
//	});
	
	
	$(target).select2({
		multiple: true,
		data: receiverData,
		formatNoMatches: null
	});
	
	var selected = $(target).select2("val");
	$.each(receiverData, function(i, v) {
		selected.push(v.id);
	});
	
	_oldRec = receiverData;
	$(target).select2("val", selected);
};

pop_gbox_pc_6010.receiverSelectCallbackEmp = function(dat) {
	
	// add new user record to _userRec
	$.each(dat, function(i, v) {
		_userRec.push({'HP_NO': v.id, 'USER_NM': v.text});
	});
	
	var tmpRec = [];
	for(var i = 0; i < $("#RECEIVER").select2("val").length; i++) {
		var str = $("#RECEIVER").select2("val")[i];
		$.each(_oldRec, function(i, v) {
			if(v.id == str) {
				tmpRec.push(v);
			}
		});
	}
	_oldRec = tmpRec;
	
	var newArray = [];
	if(_oldRec){
		newArray = $.merge(dat, _oldRec);
	}else{
		newArray = dat;
	}
	
	$("#RECEIVER").select2({
		multiple: true,
		data: newArray
	});
	
	var selectedVal = [];
	
	$.each(newArray, function(i, v) {
		selectedVal.push(v.id);
	});
	_oldRec = newArray;
	$("#RECEIVER").select2("val", selectedVal);
};

/*
pop_gbox_pc_6010.setReceiverInputAjax = function(target, initData, callbackFn) {
	
	$(target).select2({
		multiple: true,
        minimumInputLength: 2,
        maximumInputLength: 20,
		ajax: {
            url: "/pc_receiver_r001.jct",
            dataType: 'json',
            data: function(term, page) {
                return {
                	"_JSON_":encodeURIComponent(JSON.stringify({"INQ_KEYWORD":term}))
                };
            },
            results: function(dat) {
            	
            	var receiverData = [];
            	
            	$.each(dat.USER_REC, function(i, v) {
        			// receiverData.push({id: "USER_" + v.USER_NO, text: "[개인]" + v.USER_NM});
        			
        			var label;
        			
        			if(/\@J$/.test(v.USER_NO)) {
        				label = "[직원]";
        			}
        			else if(/\@Y$/.test(v.USER_NO)) {
        				label = "[연락처]";
        			}
        			else {
        				label= _extLang.privates;
        			}
        			
        			receiverData.push({id: "USER_" + v.USER_NO, text: label + v.USER_NM});
        		});
        		
        		$.each(dat.GROUP_REC, function(i, v) {
        			//receiverData.push({id: "GROUP_" + v.GROUP_NO, text: "[그룹]" + v.GROUP_NM});
        			
        			var label;
        			
        			if(/\@J$/.test(v.GROUP_NO)) {
        				label = "[직원그룹]";
        			}
        			else if(/\@Y$/.test(v.GROUP_NO)) {
        				label = "[연락처그룹]";
        			}
        			else {
        				label= _extLang.group;
        			}
        			
        			receiverData.push({id: "GROUP_" + v.GROUP_NO, text:  label  + v.GROUP_NM});
        		});
            	
                return {
                    results: receiverData
                };
                
                
                if(callbackFn) callbackFn(receiverData);
            }
        },
        initSelection: function(element, callback) {
//        	var data = $(target).select2("data");
        	
        	callback(initData);
        }
	});
	
};
*/

/*
pop_gbox_pc_6010.sendMessage = function() {
	
	if(!$("#submitForm").validationEngine('validate')) {
		return false;
	}
	
	var userRec = [];
	
	//수신자에서 그룹, 사용자 추출
	for(var i = 0; i < $("#RECEIVER").select2("val").length; i++) {
		var str = $("#RECEIVER").select2("val")[i];
		
		$.each(_userRec, function(i, v) {
			if(v.HP_NO == str) {
				userRec.push(v);
			}
		});
	}
	
	//var photoRec = [];
	//
	//$(".deletePhotoBtn").each(function(i, v) {
	//	var photoItem = {"PHOTO": $(this).data("uid")};
	//	photoRec.push(photoItem);
	//});
	var photoRec = [];
	// Loop to read photo record
	$(".thumb_row ul li").each(function(i, v) {
		var photoItem = {};
		photoItem["UPLOADER"] = $(this).find(".btn_photo_x").next().data("uploader");
		photoItem["PHOTO"] = $(this).find(".btn_photo_x").next().data("uid");
		
		if(photoItem["UPLOADER"] == "bb") {
			photoItem["FILENAME"] = $(this).find(".btn_photo_x").next().data("filename");
			photoItem["FILESIZE"] = $(this).find(".btn_photo_x").next().data("filesize");
			photoItem["IMGPATH"] = $(this).find(".btn_photo_x").next().data("imgpath");
			photoItem["THUMBIMGPATH"] = $(this).find(".btn_photo_x").next().data("thumbimgpath");
		}
		
		photoRec.push(photoItem);
	});
	
	var jsonData = {};
	
	//create REQ_DATA
	var reqDataJson = jex.getAllData("#submitForm");
	reqDataJson.SEND_NM = "";
	reqDataJson.SAUP_NO = _saupNo;
	reqDataJson.SAUP_NM=_saupNm;
	reqDataJson.MSG_TYPE = _msgType;
	reqDataJson.USER_REC = userRec;
	reqDataJson.PHOTO_REC = photoRec;
	reqDataJson.CHNL_CODE= _chnlCode;
	reqDataJson.PTL_ID = _ptlId;
	reqDataJson.CHNL_ID = _chnlId;
	reqDataJson.USE_INTT_ID = _useInttId;
	
	var MSG_TYPE=$(".msg_linkview div span").length;
	if(MSG_TYPE != 0 ){
		reqDataJson.LINK_CD = $(".msg_linkview a").data("value");
	}
	 
	jsonData.KEY = "green_msg_ptlsend";
	jsonData.USER_ID = _userId;
	jsonData.APP_TYPE = "0";
	//jsonData.TR_TIME = "20141122112233";		//hint : use moment.js
	jsonData.TR_TIME = moment().format("YYYYMMDDHHmmss");
	jsonData.REQ_DATA = reqDataJson;
	//29.01.2015
	
	var posting = $.post( "/gateway/gauus_api.jsp", {
		"JSONData": jex.toStr(jsonData)
	});
	
	posting.done(function( data ) {
		//{"RSLT_CD":"0000","RSLT_MSG":"정상적으로 처리되었습니다.","RESP_DATA":{"TOT_CNT":"3","SMS_CNT":"3","GREEN_CNT":"0"}}
		var returnJson = jex.parse(data);
		//console.log(returnJson);
		//if error
		 if(returnJson.RSLT_CD != "0000") {
				//alert(returnJson.RSLT_MSG);
			 if(returnJson.RSLT_CD == "BIZPOINT_C0001"){
				 jex.error("BIZPOINT 잔액조회 중 오류가 발생했습니다.");
			 }
			 else if(returnJson.RSLT_CD == "0920"){
				 $("#SecondPopUP" ).bPopup();
			 }
			 else if(returnJson.RSLT_CD == "BIZPOINT_B0001"){
			 	jex.error("BIZPOINT 포인트 정보가 존재하지 않습니다.포인트 정보가 존재하지 않습니다.");
			 }
			 //else if(returnJson.RSLT_CD == "BIZPOINT_SVC0001_ERROR"){
			 	//jex.error("알수없는 오류가 발생했습니다.");
			 //}
			 else{
				 jex.error(returnJson.RSLT_MSG);
			 }
		 }
		else {
			var respDataJson = returnJson.RESP_DATA;
			var msg = "총" + respDataJson.TOT_CNT + "건의 메시지를 보냈습니다.";
			msg += "\n\nGreenMessage " + respDataJson.GREEN_CNT + "건";
			msg += "\nSMS(LMS, MMS) " + respDataJson.SMS_CNT + "건";
			alert(msg);
			self.close();
		}
		
	});
	
};
*/

pop_gbox_pc_6010.sendMessage = function() {
	if ($("#SEND_NM").val()=="") {			
		$("#SEND_NM").validationEngine('validate');
		return false;
	}

	if(!$("#SND_GB").is(":checked")) {
		if(jex.isNull($("#RECEIVER").select2("val"))) {
			jex.warning("받는이를 선택하세요.");
			return false;
		}
	}
	
	if(!$("#submitForm").validationEngine('validate')) {
		return false;
		
	}
	
	var userRec = [];
	var groupRec = [];
	var cntsNo = '';
	
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
		else if(splited[0] == "HP") {
			userRec.push({"HP_NO":splited[1]});
		}
		else if(splited[0] == "CNTS"){
			cntsNo = splited[1].substr(0,splited[1].indexOf("@"));
		}
	}
	var photoRec = [];
	// Loop to read photo record
	$(".thumb_row ul li").each(function(i, v) {
		var photoItem = {};
		photoItem["UPLOADER"] = $(this).find(".btn_photo_x").next().data("uploader");
		photoItem["PHOTO"] = $(this).find(".btn_photo_x").next().data("uid");
		
		if(photoItem["UPLOADER"] == "bb") {
			photoItem["FILENAME"] = $(this).find(".btn_photo_x").next().data("filename");
			photoItem["FILESIZE"] = $(this).find(".btn_photo_x").next().data("filesize");
			photoItem["IMGPATH"] = $(this).find(".btn_photo_x").next().data("imgpath");
			photoItem["THUMBIMGPATH"] = $(this).find(".btn_photo_x").next().data("thumbimgpath");
		}
		
		photoRec.push(photoItem);
	});
			
	var jexAjax = jex.createAjaxUtil("pc_msg_c001");
	jexAjax.set(jex.getAllData("#submitForm"));
	//console.log(jex.getAllData("#submitForm"));
	var MSG_TYPE=$(".msg_linkview div span").length;
	if(MSG_TYPE != 0 ){
		jexAjax.set("LINK_CD",$(".msg_linkview a").data("value"));
	}
	if(cntsNo != ""){
		jexAjax.set("CNTS_CD",cntsNo);
		jexAjax.set("MSG_TYPE","2");
	}
	
//	jexAjax.set("CHRG_GB",_chargeGb);
	jexAjax.set("SEND_NM", $("#SEND_NM").val());
	jexAjax.set("SAUP_NM", $("#ORG_SAUPNM").val());
	jexAjax.set("USER_REC", userRec);
	jexAjax.set("GROUP_REC", groupRec);
	jexAjax.set("PHOTO_REC", photoRec);		
//	jexAjax.setErrTrx(true);		// handle error by page source
	
	jex.setAjaxErrFn(function(dat) {
		//check system error
		if(dat.COMMON_HEAD["CODE"] == "BIZPOINT_SVC0001_ERROR") {
			jex.error("BIZPOINT 잔액조회 중 오류가 발생했습니다.");
		}
		else if(dat.COMMON_HEAD["CODE"] == "BIZPOINT_SVC0002_ERROR") {
			jex.error("BIZPOINT 결제 중 오류가 발생했습니다.");
		}
		//not enough balance
		else if (dat.COMMON_HEAD["CODE"] == "NOT_ENOUGH_BALANCE") {
			//open charge balance popup
			if(_ownerId != _loginId){
				$("#FirstPopUP" ).bPopup();
			}else{
				$("#SecondPopUP" ).bPopup();
			}
		}
		else {
			jex.error(dat);
		}
	});
	 
	gbox.ui.createProgressBar();
	jexAjax.execute(function(dat) {
		/*var msg = "총 " + dat.TOT_CNT + " 건"Send;    //총              //건의 메시지를 보냈습니다.					
		msg += "\n\nGreenMessage " + dat.v + " 건";     //건					
		msg += "\nSMS " + dat.SMS_CNT + " 건";                 //건						
		jex.alert(msg);
		location.href = "/gbox_pc_1000.act";*/				
		if(dat.TOT_CNT > 1){
			var msg = "총 " + dat.TOT_CNT + " 건의 메시지를 보냈습니다.";    //총              //건의 메시지를 보냈습니다.					
			
			msg += "\n\nGreenMessage " + dat.GREEN_CNT + " 건";     //건
			if(dat.GREEN_CNT >1 ){
				if(_lang == "KH" || _lang == "DF"){
					
				}else{
					msg +="s";
				}
			}
			msg += "\nSMS(LMS,MMS) " + dat.SMS_CNT + " 건";
			if(dat.SMS_CNT > 1){
				if(_lang == "KH" || _lang == "DF"){
					
				}else{
					msg +="s";
				}                 
			}				
			jex.alert(msg);					
		}else{
			var msg = "총 " + dat.TOT_CNT + " 건의 메시지를 보냈습니다.";    //총              //건의 메시지를 보냈습니다.					
			msg += "\n\nGreenMessage" + dat.GREEN_CNT + " 건";     //건					
			msg += "\nSMS(LMS, MMS) " + dat.SMS_CNT + " 건";                 //건						
			jex.alert(msg);
		}
		//gbox_pc_4310.loadProfile();
		//gbox_pc_3000.fillUserTbl();
		  //window.parent.location.reload(".content");
		//location.href = "/gbox_pc_1000.act";
		gbox.ui.destroyProgressBar();	
		//opener.gbox_pc_2000.fillTbl();
		
		self.close();
		
	});
};


//2015-jun-30
//Function check  validate  
function checkValidate(Type){
	if(Type=="APP"){
					
		$(".tbl_ipt_pop2 #AND_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #AND_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #IPN_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #IPN_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
		$(".tbl_ipt_pop2 #WEB_URL").removeAttr("data-validation-engine");	
		
	}
	else if(Type=="WEB"){
		$(".tbl_ipt_pop2 #AND_LINKURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #AND_ESTBURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #IPN_LINKURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #IPN_ESTBURL").removeAttr("data-validation-engine");
		$(".tbl_ipt_pop2 #WEB_URL").attr("data-validation-engine", "validate[required,maxSize[255]]");		
	}
};

var fileCallback = function(files) {
	
	for(var i = 0; i < files.length; i++) {
		
		if($(".thumb_row li").length==5){
			jex.warning("이미지는 최대 5장까지만 등록 가능합니다.");
			return;
		}
		
		var file = files[i];
		
		var val = file["FILE_NM"];
		if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
			$(".thumb_row ul").append("<li><div class=\"thumb_box\"><a href=\"javascript:\" class=\"btn_photo_x\"><img src=\"../img/btn/x_photo2.png\" alt=\"\"></a><img src=\""+file["THUM_IMG_PATH"]+"\" alt=\"\" data-uploader=\"bb\" data-uid=\""+file["FILE_IDNT_ID"]+"\" data-filename=\""+file["FILE_NM"]+"\" data-filesize=\""+file["FILE_SIZE"]+"\" data-imgpath=\""+file["IMG_PATH"]+"\" data-thumbimgpath=\""+file["THUM_IMG_PATH"]+"\" ></div></li>");
			//$(".thumb_row").append(' <img alt="" src="upload?cmd=getthumb&width=98&height=98&uid='+file.uid+'" /><br /><span class="thumbnail-text">TEST</span></div>');
			//	$(".thumb_row ul").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&width=98&height=98&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");							
	//		$(".msg_wrap").animate({"height":"318px"});
			$(".thumb_slide_wrap").animate({"height":"99px"});
			//alert(thumb);
			if($(".msg_linkview div span").length==0){
				$(".link_wrap").removeClass("link_wrapdown");
			}else{
				$(".link_wrap").addClass("link_wrapdown");
			}
			//$(".thumb_box .btn_photo_x").show();
			$("#stOption").addClass("scrollOption");
			$('#photoNavigation').show();
			$("#showUpload").hide();
			gbox.ui.initPhotoNavigation("#photoNavigation");
		}
			
		else{
			jex.warning("이미지 파일만 등록 가능합니다."); 
		}
		
	}
};