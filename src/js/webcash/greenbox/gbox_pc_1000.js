/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      :
 * @File path    	 :
 * @author       	 : yonryna ( yonryna123@gmail.com )
 * @Description    : 메시지 보내기 view
 * @History      	 : 20140425054752, yonryna
 * </pre>
 **/
//const _lang = $.cookie("lang"); 
var gbox_pc_1000 = {
    receiverSelectCallback: function (dat) {
        //	const selected = $("#RECEIVER").select2("val");
        //	$.each(dat, function(i, v) {
        //		selected.push(v);
        //	});
        //	$("#RECEIVER").select2("val", selected);
        var oldArray = $("#RECEIVER").select2("data");
        var newArray = $.merge(JSON.parse(dat), oldArray);
        $("#RECEIVER").select2("data", newArray);
        var selectedVal = [];
        $.each(newArray, function (i, v) {
            selectedVal.push(v.id);
        });
        $("#RECEIVER").select2("val", selectedVal);
    },
    setContents: function (dat) {
        $(".select_content_cbox_ly").empty();
        var jexAjax = jex.createAjaxUtil("pc_cnts_r001");
        //		jexAjax.set(jex.getAllData("#submitFormLink"));
        jexAjax.execute(function (dat) {
            var html = '';
            $.each(dat.INQ_REC, function (i, v) {
                html += '<li><a href="javascript:" data-cnts_no="' + v.CNTS_NO + '" \
				style="text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"><span>' + v.CNTS_NM + '</span></a></li>';
            });
            $(".select_content_cbox_ly").append(html);
        });
    },
    sendMessage: function () {
        if ($("#SEND_NM").val() == "") {
            $("#SEND_NM").validationEngine('validate');
            return false;
        }
        if (!$("#SND_GB").is(":checked")) {
            if (jex.isNull($("#RECEIVER").select2("val"))) {
                //alert("받는이를 선택하세요.");
                //jex.warning(jex.null2Void($.i18n.prop("lang_receivercheckval"),"받는이를 선택하세요."));
                jex.warning(jex.null2Void($.i18n.prop("lang_receivercheckval"), $.i18n.prop("lang_receivercheckval")));
                return false;
            }
        }
        //19/11/14
        //	if( $("#s2id_RECEIVER").css("display") != "none"){
        //		if(jex.isNull($("#RECEIVER").select2("val"))) {
        //			jex.warning("받는이를 선택하세요.");		//받는이를 선택하세요.
        //			return false;
        //		}
        //	}
        //	else if(!$("#SND_GB").is(":checked")) {			
        //			if(jex.isNull($("#RECEIVER").select2("val"))) {
        //				//alert("받는이를 선택하세요.");
        //				jex.warning(_extLang.selectReceiver);		//받는이를 선택하세요.
        //				return false;
        //		}
        //	}
        /* }else{
        alert("flase condition");
        if($("#MSG_TXT").val()==""){
            $("#MSG_TXT").validationEngine('validate');
            return false;
        }
    }
    
    if(!$("#submitForm").validationEngine('validate')) {
        return false;
        
    }
    if(!$("#SND_GB").is(":checked")) {
        if(jex.isNull($("#RECEIVER").select2("val"))) {
            //alert("받는이를 선택하세요.");
            jex.warning(_extLang.selectReceiver);		//받는이를 선택하세요.
            return false;
        }
    }
    */
        if (!$("#submitForm").validationEngine('validate')) {
            return false;
        }
        var userRec = [];
        var groupRec = [];
        var cntsNo = '';
        //수신자에서 그룹, 사용자 추출
        for (var i = 0; i < $("#RECEIVER").select2("val").length; i++) {
            var str = $("#RECEIVER").select2("val")[i];
            var splited = str.split('_');
            if (splited[0] == "GROUP") {
                groupRec.push({ "GROUP_NO": splited[1] });
            }
            else if (splited[0] == "USER") {
                userRec.push({ "USER_NO": splited[1] });
            }
            else if (splited[0] == "CNTS") {
                cntsNo = splited[1].substr(0, splited[1].indexOf("@"));
            }
        }
        var photoRec = [];
        // Loop to read photo record
        $(".thumb_row ul li").each(function (i, v) {
            var photoItem = {};
            photoItem["UPLOADER"] = $(this).find(".btn_photo_x").next().data("uploader");
            photoItem["PHOTO"] = $(this).find(".btn_photo_x").next().data("uid");
            if (photoItem["UPLOADER"] == "bb") {
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
        var MSG_TYPE = $(".msg_linkview div span").length;
        if (MSG_TYPE != 0) {
            jexAjax.set("LINK_CD", $(".msg_linkview a").data("value"));
        }
        if (cntsNo != "") {
            jexAjax.set("CNTS_CD", cntsNo);
            jexAjax.set("MSG_TYPE", "2");
        }
        jexAjax.set("CHRG_GB", _chargeGb);
        /*const sendNm = $("#ORG_SAUPNM").val()+"_"+$("#SEND_NM").val();
        if(sendNm.length > 20){
            sendNm = sendNm.substring(0, 19);
        }	*/
        //jexAjax.set("SEND_NM", sendNm);
        jexAjax.set("SEND_NM", $("#SEND_NM").val());
        //	jexAjax.set("SEND_IMG", _orgPhoto);
        jexAjax.set("SAUP_NM", $("#ORG_SAUPNM").val());
        jexAjax.set("USER_REC", userRec);
        jexAjax.set("GROUP_REC", groupRec);
        jexAjax.set("PHOTO_REC", photoRec);
        //	jexAjax.setErrTrx(true);		// handle error by page source
        jex.setAjaxErrFn(function (dat) {
            //check system error
            if (dat.COMMON_HEAD["CODE"] == "BIZPOINT_SVC0001_ERROR") {
                jex.error(jex.null2Void($.i18n.prop("lang_bizpoinsvc001error"), "BIZPOINT 잔액조회 중 오류가 발생했습니다."));
            }
            else if (dat.COMMON_HEAD["CODE"] == "BIZPOINT_SVC0002_ERROR") {
                jex.error(jex.null2Void($.i18n.prop("lang_bizpoinsvc002error"), "BIZPOINT 결제 중 오류가 발생했습니다."));
            }
            //not enough balance
            else if (dat.COMMON_HEAD["CODE"] == "NOT_ENOUGH_BALANCE") {
                //open charge balance popup
                if (_ownerId != _loginId) {
                    $("#FirstPopUP").bPopup();
                }
                else {
                    $("#SecondPopUP").bPopup();
                }
            }
            else {
                jex.error(dat);
            }
        });
        gbox.ui.createProgressBar();
        jexAjax.execute(function (dat) {
            /*const msg = _extLang.total + " " + dat.TOT_CNT + " " + _extLang.articleSend;    //총              //건의 메시지를 보냈습니다.
            msg += "\n\nGreenMessage " + dat.v + " " +  _extLang.article;     //건
            msg += "\nSMS " + dat.SMS_CNT + " " + _extLang.article;                 //건
            jex.alert(msg);
            location.href = "/gbox_pc_1000.act";*/
            if (Number(dat.TOT_CNT) > 1) {
                //			const msg = _extLang.total + " " + dat.TOT_CNT + " " + _extLang.articleSends;    //총              //건의 메시지를 보냈습니다.					
                var msg = $.i18n.prop("alt_total_article_send", dat.TOT_CNT);
                msg += "\n " + $.i18n.prop("alt_total_article", dat.GREEN_CNT); //건	
                //			msg += "\n\n123 " + dat.GREEN_CNT + " " +  _extLang.article;     //건
                if (Number(dat.GREEN_CNT) > 1) {
                    if (_lang == "KH" || _lang == "DF") {
                    }
                    else {
                        msg += "s";
                    }
                }
                //			msg += "\nSMS " + dat.SMS_CNT + " " + _extLang.article;
                msg += "\nSMS(LMS, MMS) " + $.i18n.prop("alt_total_sms", dat.SMS_CNT);
                if (Number(dat.SMS_CNT) > 1) {
                    if (_lang == "KH" || _lang == "DF") {
                    }
                    else {
                        msg += "s";
                    }
                }
                jex.alert(msg);
            }
            else {
                /*const msg = _extLang.total + " " + dat.TOT_CNT + " " + _extLang.articleSend;    //총              //건의 메시지를 보냈습니다.
                msg += "\n\123 " + dat.GREEN_CNT + " " +  _extLang.article;     //건
                msg += "\nSMS(LMS, MMS) " + dat.SMS_CNT + " " + _extLang.article;                 //건	*/
                var msg = $.i18n.prop("alt_total_article_send", dat.TOT_CNT);
                msg += "\n " + $.i18n.prop("alt_total_article", dat.GREEN_CNT); //건					
                msg += "\nSMS(LMS, MMS) " + $.i18n.prop("alt_total_sms", dat.SMS_CNT);
                jex.alert(msg);
            }
            //gbox_pc_4310.loadProfile();
            //gbox_pc_3000.fillUserTbl();
            //window.parent.location.reload(".content");
            //location.href = "/gbox_pc_1000.act";
            gbox.ui.destroyProgressBar();
            //opener.gbox_pc_2000.fillTbl();
            opener.gbox_pc_2000.showMessageList();
            opener.gbox_pc_2000.loadCnt();
            self.close();
        });
    }
};
new (Jex.extend({
    onload: function () {
        //		document.getElementById("MSG_TXT").placeholder = $.i18n.prop("lang_phder_writemsage");//Write a message
        //		document.getElementById("RECEIVER").placeholder = $.i18n.prop("lang_phder_contactreciver");//recive
        //test get sender img
        //		$(window).resize(function() {
        ////		     const wWidth = window.width,
        ////		     wHeight = window.height;
        //		     window.resizeBy(1000, 600);
        //		 });
        //		 
        //--- todo onload start ---//
        //window.resize=false;
        //		$("#MSG_TXT").attr("placeholder", _extLang.enterMessage);  //메시지를 입력하세요.
        $("#submitForm").validationEngine(gbox.ui.validationEngineOptions);
        $("#submitFormLink").validationEngine(gbox.ui.validationEngineOptions);
        gbox.ui.setLinkAppCombo("#LINK_CD1");
        //gbox.ui.setReceiverInput("#RECEIVER");
        gbox.ui.setReceiverInputAjax("#RECEIVER");
        // 2015/jul/09
        //		$(".select2-choices").css({"padding-left":"7px"});
        //		 if($("#RECEIVER").length !=null){
        //			 $(".select2-input").removeAttr("placeholder","");
        //		 }
        $(".select2-input").attr("placeholder", "연락처 검색은 추가를, 그린메시지 그룹과 구성원명은 직접입력 하세요.");
        //관리자인지 확인
        gbox.session.load(function () {
            if (gbox.session.hasRole("ADMIN")) {
                $("#permissPc").hide();
                //	$(".m_rec_alluse").show();
                $("#permissAdm").show();
            }
            else if (gbox.session.hasRole("CONTENT")) {
                $("#permissAdm").hide();
                $("#permissPc").show();
            }
            ;
        });
        $("#ORG_SAUPNM").val(_saupNm);
        $("#SEND_NM").val(_sendNm);
        gbox_pc_1000.setContents();
    }, event: function () {
        //const thumb=10;
        // close popup
        $("#requestOwnerbtn").on("click", function () {
            var bPopup = $('#FirstPopUP').bPopup();
            bPopup.close();
            gbox.ui.destroyProgressBar();
        });
        $("#yesBtn").click(function () {
            chrg_pnt();
            var bPopup = $('#SecondPopUP').bPopup();
            bPopup.close();
            gbox.ui.destroyProgressBar();
        });
        $("#noBtn").on("click", function () {
            var bPopup = $('#SecondPopUP').bPopup();
            bPopup.close();
            gbox.ui.destroyProgressBar();
        });
        $("#cancelBtn").on("click", function () {
            var bPopup = $('#FirstPopUP').bPopup();
            bPopup.close();
            gbox.ui.destroyProgressBar();
        });
        $("#cancelBtn1").on("click", function () {
            var bPopup = $('#SecondPopUP').bPopup();
            bPopup.close();
            gbox.ui.destroyProgressBar();
        });
        $('#MSG_TXT').focus(function () {
            var input = $(this);
            if (input.val() == '메시지를 입력하세요.') {
                $(this).val('').removeClass('placeholder');
                //$(this).data('placeholder', $(this).attr('placeholder'));
            }
        });
        $("#SND_GB").click(function () {
            $("#s2id_RECEIVER").toggle();
            $("#receiverSelectBtn").toggle();
        });
        $(".select_content_cbox_ly a").on("click", function () {
            var selected = $("#RECEIVER").select2("data");
            if (!selected)
                selected = [];
            var newSelected = [];
            newSelected.push({ id: "CNTS_" + $(this).data("cnts_no") + "@C", text: "[콘텐츠]" + $(this).find("span").text() });
            $("#RECEIVER").select2("data", newSelected);
            //update select2 value
            var selectedVal = [];
            $.each(newSelected, function (i, v) {
                selectedVal.push(v.id);
            });
            $("#RECEIVER").select2("val", selectedVal);
            //define array
            //			const newSelected = [];
            //
            //			//add one value
            //			newSelected.push ({id:"GROUP_" + $(this).data("cnts_no") + "@C", text:"[콘텐츠]" + $(this).find("span").text()});
            //			
            //			$("#RECEIVER").select2("data", selected);
            //			//update select2 value
            //			const selectedVal = [];
            //			
            //			$.each(newSelected, function(i, v) {
            //			 selectedVal.push(v.id);
            //			});
            //			
            //			$("#RECEIVER").select2("val", selectedVal);
            //			
            //			if(newSelected.length == 0) {
            //				//jex.warning(_extLang.selectItemAdd);//추가할 항목을 선택하세요.
            //			}
            //			else {
            //				selected.push(newSelected);
            //				$("#RECEIVER").select2("data", selected);
            //			}
            //			
            //			const selectedVal = [];
            //			
            //			$.each(selected, function(i, v) {
            //				selectedVal.push(v.id);
            //			});
            //			$("#RECEIVER").select2("val", selectedVal);
        });
        //const width = $(window).width();
        $(window).resize(function () {
            //컨텐트를 0픽셀로 이동
            $(".thumb_row ul").css("left", 0);
            gbox.ui.initPhotoNavigation("#photoNavigation");
            /*
           if($(this).width() != width){
              
               $(".btn_thum_prev").attr("id", "next");
                $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum_on.png");
                $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum.png");
                $(".thumb_row li").prev().removeClass("hidetbl");
                //$(".thumb_row ul li").hasClass("on").prependTo("div.thumb_row ul");
                $(".thumb_row ul li.on").prependTo("div.thumb_row ul");
                const width = $(window).width();
                
                thumb=0;
                aa=$(".thumb_row").width()/100;
                thumb=Math.ceil(aa);
                const totalli=$(".thumb_row ul li").length;
                if(totalli>thumb){
                    $(".btn_thum_prev").attr("id", "next");
                    $(".btn_thum_prev").show();
                    //$(".btn_thum_next img").attr("src","../img/btn/btn_next_thum_on.png");
                    $("#next").show();
                    $("#prev").show();
                }else{
                    $("#next").hide();
                    $("#prev").hide();
                }
           }
           */
        });
        $(document).on("click", function (e) {
            if (!$(e.target).hasClass("gray_dark")
                && $(e.target).parents(".m_rec_alluse").length === 0) {
                $(".content_label").hide();
            }
        });
        // //window resize
        //		$( window ).resize(function() {
        //			
        //			
        //			//const thumbleng=(".thumb_slide_wrap").width()/10;
        //			//alert(thumbleng);
        //		});
        $(".select2-search-choice-close").on("click", function () {
            alert("test");
        });
        // check line breaking new line 2015-04-14
        /*$(function(){

            $('#MSG_TXT').keypress(function(event){
              
            const len = $(this).val().length;
            if(len==0){
            if (event.keyCode == 13)

             event.preventDefault();
            //alert("leng is 0");

            }else{
               // alert(len);
                  vent.preventDefault();
                
                }
              });

            });*/
        $("#MSG_TXT").on('keydown keypress keyup', 'focus', function (e) {
            var max = 1000;
            var len = String($(this).val()).length;
            if (len < max) {
                $("#count").text(len);
            }
            if (len == max) {
                $("#count").text("1,000");
            }
        });
        //19.11.14
        //		$(document).ready(function(){
        //			  $("#SND_GB").click(function(){
        //			    $("#s2id_RECEIVER").toggle();
        //			    $("#receiverSelectBtn").toggle();
        //			  });
        //			});
        $(document).on('input keypress', 'textarea[maxlength]', function (e) {
            var $this = $(this);
            var maxlength = Number($this.attr('maxlength'));
            if (!!maxlength) {
                var text = $this.val();
                if (text.length > maxlength) {
                    // truncate excess text (in the case of a paste)
                    $this.val(text.substring(0, maxlength));
                    e.preventDefault();
                }
            }
        });
        //sliding image
        //		$("#next,#prev").click(function(e) {
        /*
        thumb;
        const index=$(".thumb_row ul li.on").index();
        const row = $(".thumb_row li.on");
        const totalli=$(".thumb_row ul li").length;
        const totalonindex=$(".thumb_row ul li.on").index();
        if($(this).is("#next")) {
            row.insertAfter(row.next());
            $(".thumb_row li.on").prev().addClass("hidetbl");
            if(totalli-totalonindex==thumb){
                $("#next").removeAttr('id');
                $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum_on.png");
                $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum.png");
                 e.preventDefault();
            }else{
                $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum_on.png");
            }
            
        }
        else  if ($(this).is("#prev")) {
            row.insertBefore(row.prev());
            $(".thumb_row li.on").next().removeClass("hidetbl");
            
            if(totalonindex==1){
                $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum.png");
            }else{
                $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum.png");
            }
            $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum_on.png");
            $(".btn_thum_prev").attr('id', 'next');
        }
        */
        //		});
        //--- define event action ---//
        $('html').click(function (e) {
            if (!$(e.target).hasClass('fwn')) {
                $(".link_label").fadeOut("fast");
            }
        });
        // Select web content
        $("#selectContent").click(function () {
            $(".select_content_cbox_ly").show();
            $(".content_label").toggle();
        });
        //link button append
        $("#showLink").click(function () {
            gbox.ui.setLinkAppCombo("#LINK_CD1");
            $(".select_field_cbox_ly").show();
            $(".link_label").toggle();
        });
        //delete link 
        $(".msg_linkview #linktype a.removeLink").on("click", function () {
            //alert($(this).val());
            $(this).parent("span#linktype").remove();
            $(".link_wrap").removeClass("link_wrapdown");
            var len = $("span#linktype").length;
            //alert(len);
            if (len == 0) {
                $(".msg_linkview").animate({}).hide();
            }
        });
        // add link to div
        $("ul.select_field_cbox_ly li a").on("click", function () {
            $(".msg_linkview").css("display", "block");
            //$("#showAddLink").hide();
            var linkNm = $(this).text();
            var linkCD = $(this).data("value");
            var linkUrl = jex.null2Void($(this).data("url_link"));
            if (jex.isNull(linkUrl)) {
                //linkUrl = "javascript:jex.warning(jex.null2Void($.i18n.prop('lang_weburlcheck'),'웹 화면에서는 제공되지 않는 기능입니다.'));";
                linkUrl = "javascript:jex.warning(jex.null2Void($.i18n.prop('lang_weburlcheck'),$.i18n.prop(\"lang_fncAvailableOnWeb\")));";
            }
            //alert(spanvar);
            var txt = "<span id=\"linktype\"><a href=\"" + linkUrl + "\" target=\"_blank\" data-value=" + linkCD + " class=\"linkview\">" + linkNm + "</a><a class=\"removeLink\" href=\"javascript:\"><img src=\"../img/ico/ico_delete.gif\" alt=\"삭제\"></a></span>";
            if ($(".thumb_row ul li").length == 0) {
                $(".link_wrap").removeClass("link_wrapdown");
            }
            else {
                $(".link_wrap").addClass("link_wrapdown");
            }
            $(".msg_linkview div").empty().append(txt);
        });
        // link app form
        $("#linkAppFormBtn").click(function () {
            $("#addLinkDetailpopUp").bPopup();
            $(".tbl_ipt_pop2 #APP_NM").focus();
            //			<div class="toast-message">URL 형식이 올바르지 않습니다.</div>
            //			gbox.popup.linkAppForm(null, function(dat) {
            //				gbox.ui.setLinkAppCombo("#LINK_CD", {
            //					 defaultValue : dat.APPCD_NO
            //				});
            //			});
        });
        // close  pop up add link detail
        $("#btnClose,#btnClosePopUp").click(function () {
            $("#addLinkDetailpopUp").hide();
            var bPopup = $('#addLinkDetailpopUp').bPopup();
            bPopup.close();
        });
        //button save link
        $('#btnStorage').click(function () {
            var bPopup = $("#addLinkDetailpopUp").bPopup();
            if (!$("#submitFormLink").validationEngine('validate')) {
                return false;
            }
            var jexAjax = jex.createAjaxUtil("pc_link_c001");
            jexAjax.set(jex.getAllData("#submitFormLink"));
            jexAjax.execute(function (dat) {
                jex.success($.i18n.prop("alt_success_addlink"));
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
        $(".tbl_ipt_pop2 #LINK_GB").change(function () {
            if ($(this).val() == "1") {
                checkValidate("APP");
            }
            else {
                checkValidate("WEB");
            }
        });
        //보내기 버튼
        $("#sendBtn").click(function () {
            gbox_pc_1000.sendMessage();
        });
        $("#photoUploadBtn").click(function () {
            //			thumb1=thumb;
            if ($(".thumb_row li").length == 5) {
                //jex.warning(jex.null2Void($.i18n.prop("lang_thumb_row"),"이미지는 최대 5장까지만 등록 가능합니다."));
                jex.warning(jex.null2Void($.i18n.prop("lang_thumb_row"), $.i18n.prop("lang_youcanOnlyRegister")));
                //jex.warning(_extLang.youcanOnlyRegister); //"이미지는 최대 5장까지만 등록 가능합니다."
                return;
            }
            else {
                gbox.session.load(function (dat) {
                    var opt = {
                        "ptlId": dat.PTL_ID,
                        "chnlId": dat.CHNL_ID,
                        "useInttId": dat.USE_INTT_ID,
                        "cntsId": dat.CNTS_ID,
                        "userId": dat.LOGIN_ID,
                        "openType": "P",
                        "maxFileCnt": "5",
                        "maxFileSize": 104857600,
                        "callBackFn": "fileCallback",
                        "uploadFileProp": {
                            "type": "img",
                            "thumImgSize": {
                                "width": 98,
                                "height": 98
                            }
                        }
                    };
                    _WE_DRIVER.open(opt);
                });
                /*
                gbox.popup.photoUpload(null, function(file) {
                    const val = file.fileName;
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
                        window.resizeTo(660, 740);
                    }
                        
                    else{
                        //이미지 파일만 등록 가능합니다.
                        jex.warning(_extLang.onlyImage);
                    }
                });
                */
            }
        });
        // photo delete
        $(".btn_photo_x").on("click", function () {
            $(this).closest("ul li").remove();
            var thumb = 0;
            var aa = Number($(".thumb_row").width()) / 100;
            thumb = Math.ceil(aa);
            if ($(".thumb_row li").length < thumb - 1) {
                $(".thumb_row li").removeClass("hidetbl");
                $(".btn_thum_prev").hide();
                $(".btn_thum_next").hide();
            }
            $.get("/upload?cmd=delete&uid=" + $(this).data("uid"), function (dat) {
            });
            //show 'please insert image'  div
            var len = $('.btn_photo_x').parents('.thumb_row ul').length;
            if (len == 0) {
                $(".link_wrap").removeClass("link_wrapdown");
                //				$(".msg_wrap").animate({"height":"240px"});
                $(".thumb_slide_wrap").animate({ "height": "20px" });
                $("#showUpload").animate({}).show();
                $('#photoNavigation').hide();
                //15-6-9: window.resizeTo(655, 653)
                window.resizeTo(655, 653);
            }
            gbox.ui.initPhotoNavigation("#photoNavigation");
        });
        $("#SND_GB").click(function () {
            var sndGb = $(this).is(":checked");
            //전체선택이면
            if (sndGb) {
                $(".m_rec_wrap").hide();
            }
            else {
                $(".m_rec_wrap").show();
            }
        });
        $("#gboxID").click(function () {
            var input = {};
            input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
            gbox.popup.receiverSelect(input, gbox_pc_1000.receiverSelectCallback);
        });
        $("#staffID").click(function () {
            //			const input = {};
            //			input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
            //			
            //			gbox.popup.receiverSelect(input, function(dat) {
            //				const selected = $("#RECEIVER").select2("val");
            //				$.each(dat, function(i, v) {
            //					selected.push(v);
            //				});
            //				$("#RECEIVER").select2("val", selected);
            //			});
            var input = jex.getAllData("#emplInfoForm");
            jex.newWin(_emplInfoPopupUrl, "emplinfo_0001_01", 720, 420, input);
        });
        $("#custID").click(function () {
            var input = jex.getAllData("#b2bcCstmInfoForm");
            jex.newWin(_b2bcCstmPopupUrl, "b2bccstm_0001_01", 720, 420, input);
        });
        //주소록
        $("#receiverSelectBtn").click(function () {
            //alert("testing add group");	
            $("#addBook").slideToggle();
            var input = {};
            input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
            gbox.popup.receiverSelect(input, gbox_pc_1000.receiverSelectCallback);
            /*
            gbox.popup.receiverSelect(input, function(dat) {
                const selected = $("#RECEIVER").select2("val");
                $.each(dat, function(i, v) {
                    selected.push(v);
                });
                $("#RECEIVER").select2("val", selected);
            });
            */
        });
        /*
        // 2015-July-28
        $("#receiverParticipantSelectBtn").click(function() {
            //alert("testing add group");
            $("#addBook").slideToggle();
            const input = {};

            input["RECEIVER"] = jex.toStr($("#RECEIVER").select2("val"));
//			jex.newWin( _participantCallbackUrl, "gbox_pc_1000.receiverSelectCallback", 720, 420, input);
//			gbox.popup.receiverSelect(input, gbox_pc_1000.receiverSelectCallback);
            
            gbox.session.load(function(dat) {
                const options = {
                        "SECR_KEY"        : _secr_key,
//						"SECR_KEY"        : "de53c8b1-d550-bf96-9123-23bfbe00add5",
//	                    "POST_CALLBACK_PAGE"  : _participantCallbackUrl,
                        "POST_CALLBACK_PAGE"  : "http://192.168.178.83:19600/gateway/emplcstm_0004_01_callback.jsp",
//	                    "PTL_ID"           	  : dat.PTL_ID,
                        "CHNL_ID"             : dat.CHNL_ID,
//	                    "USE_INTT_ID"         : dat.USE_INTT_ID,
//	                    "USER_ID"             : dat.LOGIN_ID,
                        "PTL_ID"             : _ptlId,
                        "USE_INTT_ID"         : _useInttId,
                        "USER_ID"             : _loginId,
//	                    "PTL_ID"           	  : "PTL_3",
//	                    "CHNL_ID"               : "CHNL_1",
//	                    "USE_INTT_ID"       : "UTLZ_1",
//	                    "USER_ID"               : "test_02",
                        "SEARCH_TYPE"         : "J;Y;M",
                        "POPUP_TYPE"          : "P",
                        "MULT_SEL_YN"         : "Y"
                    };
                console.log(options);
                PartUserSearchLayerPopup(options); //직원/연락처 조회팝업 호출 함수
            });
           
        });
        */
    }
}))();
//Function check  validate  
function checkValidate(Type) {
    if (Type == "APP") {
        $(".tbl_ipt_pop2 #AND_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
        $(".tbl_ipt_pop2 #AND_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
        $(".tbl_ipt_pop2 #IPN_LINKURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
        $(".tbl_ipt_pop2 #IPN_ESTBURL").attr("data-validation-engine", "validate[required,maxSize[255]]");
        $(".tbl_ipt_pop2 #WEB_URL").removeAttr("data-validation-engine");
    }
    else if (Type == "WEB") {
        $(".tbl_ipt_pop2 #AND_LINKURL").removeAttr("data-validation-engine");
        $(".tbl_ipt_pop2 #AND_ESTBURL").removeAttr("data-validation-engine");
        $(".tbl_ipt_pop2 #IPN_LINKURL").removeAttr("data-validation-engine");
        $(".tbl_ipt_pop2 #IPN_ESTBURL").removeAttr("data-validation-engine");
        $(".tbl_ipt_pop2 #WEB_URL").attr("data-validation-engine", "validate[required,maxSize[255]]");
    }
}
;
var fileCallback = function (files) {
    for (var i = 0; i < files.length; i++) {
        if ($(".thumb_row li").length == 5) {
            //jex.warning(jex.null2Void($.i18n.prop("lang_thumb_rowlength"),"이미지는 최대 5장까지만 등록 가능합니다."));
            jex.warning(jex.null2Void($.i18n.prop("lang_thumb_rowlength"), $.i18n.prop("lang_youcanOnlyRegister")));
            return;
        }
        var file = files[i];
        var val = file["FILE_NM"];
        if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
            $(".thumb_row ul").append("<li><div class=\"thumb_box\"><a href=\"javascript:\" class=\"btn_photo_x\"><img src=\"../img/btn/x_photo2.png\" alt=\"\"></a><img src=\"" + file["THUM_IMG_PATH"] + "\" alt=\"\" data-uploader=\"bb\" data-uid=\"" + file["FILE_IDNT_ID"] + "\" data-filename=\"" + file["FILE_NM"] + "\" data-filesize=\"" + file["FILE_SIZE"] + "\" data-imgpath=\"" + file["IMG_PATH"] + "\" data-thumbimgpath=\"" + file["THUM_IMG_PATH"] + "\" ></div></li>");
            //$(".thumb_row").append(' <img alt="" src="upload?cmd=getthumb&width=98&height=98&uid='+file.uid+'" /><br /><span class="thumbnail-text">TEST</span></div>');
            //	$(".thumb_row ul").append("<span class=\"upld_thumb\"><img src=\"/upload?cmd=getthumb&width=98&height=98&uid="+file.uid+"\" alt=\"\" /><a href=\"javascript:\" class=\"btn_style btn_lyx deletePhotoBtn\" data-uid=\""+file.uid+"\"\"><span class=\"blind\">이미지첨부 삭제</span></a></span>");							
            //		$(".msg_wrap").animate({"height":"318px"});
            $(".thumb_slide_wrap").animate({ "height": "99px" });
            //alert(thumb);
            if ($(".msg_linkview div span").length == 0) {
                $(".link_wrap").removeClass("link_wrapdown");
            }
            else {
                $(".link_wrap").addClass("link_wrapdown");
            }
            //$(".thumb_box .btn_photo_x").show();
            $('#photoNavigation').show();
            $("#showUpload").hide();
            gbox.ui.initPhotoNavigation("#photoNavigation");
            window.resizeTo(660, 740);
        }
        else {
            //이미지 파일만 등록 가능합니다.
            //			jex.warning(_extLang.onlyImage); 
            jex.warning($.i18n.prop("onlyImage"));
        }
    }
};
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
