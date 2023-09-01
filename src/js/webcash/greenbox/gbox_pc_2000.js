var pop_gbox_pc_4310 = {
    // pop up gbox_pc_4310  SMS전송 설정
    loadSmsTransmission: function () {
        var ajax = jex.createAjaxUtil("pc_smsreg_r001");
        ajax.execute(function (dat) {
            jex.setAllData("#sendForm", dat);
            if (Number(dat.NOTI_GB) == 1) {
                $("#popUp_SMS").height('auto');
                $("#popUp_SMS #timeAmount").css("display", "none");
            }
            else if (Number(dat.NOTI_GB) == 2) {
                $("#popUp_SMS #timeAmount").css("display", "block");
                $("#popUp_SMS #SMSNOTI_TIME").prop('disabled', false);
                //	$("#popUp_SMS").height(260);
                //			$("#popUp_SMS").height(355);
            }
            //if SMS_NOTITIME is null or not 1, 2, 3, 5, 10, default value is 10
            if (jex.null2Void(dat.SMSNOTI_TIME) != "30" &&
                jex.null2Void(dat.SMSNOTI_TIME) != "60" &&
                jex.null2Void(dat.SMSNOTI_TIME) != "120") {
                //$("#sendForm #SMSNOTI_TIME option[value='60']").prop("selected", true);
            }
            if (dat.NOTI_GB == "1") {
                $("#NOTI_GBN").attr("checked", "checked");
                if ($("#popUp_SMS #NOTI_GBN").prop("checked")) {
                    $("#popUp_SMS #SMSNOTI_TIME").prop('disabled', 'disabled');
                    $("#popUp_SMS #timeAmount").css("display", "none");
                    //$("#sendForm #SMSNOTI_TIME option[value='0']").prop("selected", true);
                    $("#sendForm #SMSNOTI_TIME option[value='30']").prop("selected", true);
                }
                //$("#sendForm").style.display="none";
                //$("#sendForm #SMSNOTI_TIME option[value='0']").style.display="none";c
            }
            else {
                $("#NOTI_GBY").attr("checked", "checked");
                //$("#popUp_SMS").height(260);
                //			$("#popUp_SMS").height(355);
            }
            ;
            $("input").on("click", function () {
                if ($("#popUp_SMS #NOTI_GBN").prop("checked")) {
                    $("#popUp_SMS #SMSNOTI_TIME").prop('disabled', 'disabled');
                    $("#popUp_SMS #timeAmount").css("display", "none");
                    //$("#sendForm #SMSNOTI_TIME option[value='0']").prop("selected", true);
                    $("#sendForm #SMSNOTI_TIME option[value='30']").prop("selected", true);
                    $("#popUp_SMS").height('auto');
                }
                else {
                    $("#popUp_SMS #SMSNOTI_TIME").prop('disabled', false);
                    $("#popUp_SMS #timeAmount").css("display", "block");
                    $("#sendForm #SMSNOTI_TIME option[value='30']").prop("selected", true);
                    //$("#popUp_SMS").height(260);
                    //				$("#popUp_SMS").height(355);
                }
            });
        });
    },
    //loadSmsSendSetting
    loadSmsSendSetting: function () {
        var ajax = jex.createAjaxUtil("pc_smsreg_r002");
        ajax.execute(function (dat) {
            if (Number(dat.SMS_GB) == 0) {
                $("#SMS_GBN").val("0");
                $("#SMS_GBN").prop("checked", "checked");
            }
            else {
                $("#SMS_GBY").val("1");
                $("#SMS_GBY").prop("checked", "checked");
            }
            $("input").on("click", function () {
                if ($("#SMS_GBN").prop("checked")) {
                    $("#SMS_GBN").val("0");
                }
                else {
                    $("#SMS_GBY").val("1");
                }
            });
        });
    }
}; // pop_설정_SMS전송설정
var gbox_pc_2010 = {
    loadViewMessage: function (input) {
        //$(".m_cont_wrap").empty();
        $("#photos ul").empty();
        //if(slider != undefined ){
        //slider.destroySlider();
        //}
        var ajax = jex.createAjaxUtil("pc_msg_r002");
        ajax.set(input); //MSG_NO
        ajax.execute(function (dat) {
            var regDate = moment(dat.REG_DT, "YYYYMMDD").format("YYYY-MM-DD");
            var regTime = moment(dat.REG_TM, "HHmmss").format("HH:mm:ss");
            var linkUrl = jex.null2Void(dat.LINK_URL);
            //줄바꿈 처리
            //		dat.MSG_TXT = dat.MSG_TXT.replace(/(?:\r\n|\r|\n)/g, '<br />');
            dat.MSG_TXT = dat.MSG_TXT.replace(/(?:\r\n|\r|\n)/g, '<br>');
            jex.setAll("#TBL_VIEWMESSAGE", dat);
            if (jex.null2Void(dat.ORG_PHOTO).startsWith("http")) {
                $("#ORG_PHOTO").attr("src", dat.ORG_PHOTO);
            }
            else {
                $("#ORG_PHOTO").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + dat.ORG_PHOTO);
            }
            $("#REG_DT1").text(regDate);
            $("#REG_TM1").text(regTime);
            //if MSG_TYPE is link(1)
            if (dat.MSG_TYPE == "1") {
                if (jex.isNull(linkUrl)) {
                    //$("#LINK_NM").attr("href", "javascript:jex.warning('웹 화면에서는 제공되지 않는 기능입니다.');");
                    $("#LINK_NM").attr("href", "javascript:jex.warning($.i18n.prop(\"lang_fncAvailableOnWeb\"))");
                }
                else {
                    $("#LINK_NM").attr("href", linkUrl);
                }
                $("#LINK_NM").show();
            }
            else {
                $("#LINK_NM").hide();
            }
            //첨부이미지가 존재하면
            if (dat["PHOTO_REC"].length > 0) {
                //alert (dat["PHOTO_REC"].length);
                //$("#ShowImgBlock").show();
                $(".thumb_slide_wrap").show();
                $.each(dat["PHOTO_REC"], function (i, v) {
                    //$("li.m_thumbview_li").append("<span class=\"upld_thumb\"><a href=\"/upload?cmd=getimage&uid="+v.PHOTO+"\" target=\"_blank\" data-lightbox=\"example-set\" ><img src=\"/upload?cmd=getthumb&width=100&height=100&uid="+v.PHOTO+"\" alt=\"\"  /></a></span>");
                    //$(".thumb_row").append("<span class=\"upld_thumb\" style=\"width: 100px !important; height:100px\"><a href=\"/upload?cmd=getimage&uid="+v.PHOTO+"\" target=\"_blank\" data-lightbox=\"example-set\" ><img src=\"/upload?cmd=getthumb&width=98&height=98&uid="+v.PHOTO+"\" alt=\"\"  /></a></span>");
                    $("#photos ul").append("<li style='padding: 0px 0px 10px 0px;'><div class=\"thumb_box\"><a href=\"/upload?cmd=getimage&uid=" + v.PHOTO + "\" target=\"_blank\" data-lightbox=\"example-set\" ><img src=\"/upload?cmd=getthumb&width=98&height=98&uid=" + v.PHOTO + "\" alt=\"\" data-uid=\"" + v.PHOTO + "\"\"></a></div></li>");
                    //delete(gbox.ui.photoNavidationPrevBinded);
                    //delete(gbox.ui.photoNavidationNextBinded);
                    //gbox.ui.initPhotoNavigation("#photoNavigation");
                });
                /*
                if($("ul.m_cont_wrap span").length >3){
                    $(".btn_thum_next").show();
                    $(".btn_thum_prev").show();
                    $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum.png");
                    $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum_on.png");
                }else{
                    $(".btn_thum_next").hide();
                    $(".btn_thum_prev").hide();
                    $(".m_cont_wrap").css({"margin-left":"-27px"});
                    $(".m_cont_wrap img").css("margin-left","1px");
                    $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum.png");
                    $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum.png");
                }
                if(dat["PHOTO_REC"].length > 3){
                     slider = $('.m_cont_wrap').bxSlider({
                        slideWidth: 346,
                        minSlides: 3,
                        maxSlides: 3,
                        slideMargin: 2,
                        controls: false,
                        infiniteLoop:false
                        
                        pager: false,
                        slideWidth: 500,
                        minSlides: 3,
                        maxSlides: 3,
                        moveSlides: 2,
                        adaptiveHeight: true,
                        slideMargin: 2,
                        controls: false,
                        infiniteLoop:false
    
                        
                     });
                }
                */
            }
            else {
                //$("li.m_thumbview_li").text(_extLang.noImage); //첨부이미지가 존재하지 않습니다.
                $(".thumb_slide_wrap").hide();
            }
        });
        //$('.phone_scroll').slimScroll({
        //height: '417px'
        //});
    }
}; // view Receives Massage
var gbox_pc_4200 = {};
var gbox_pc_3000 = {
    fillUserTbl: function (input) {
        if (!input)
            input = {};
        //	 Testing pagination error
        if (!jex.isNull(gbox_pc_2000.tbl)) {
            delete (gbox_pc_2000.tbl);
        }
        /*if(!jex.isNull(pop_gbox_pc_2020.tbl)) {
            delete(pop_gbox_pc_2020.tbl);
        }*/
        if (jex.isNull(gbox_pc_3000.tbl)) {
            gbox_pc_3000.tbl = jex.plugin.newInstance("JEX_TBL", "#USR_TBL");
            gbox_pc_3000.tbl.addEvent("onSvrPageChange", function (dat) {
                input["PAGINATION"] = {
                    "PAGE_NO": dat,
                    "PAGE_SIZE": gbox_pc_3000.tbl.getSvrPageSize()
                };
                gbox_pc_3000.fillUserTbl(input);
            });
            /*gbox_pc_3010.tbl.addEvent("onAfterDrawTbl",function(dat){
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0001'))").find("#AppType").text("업체발송(OPEN API)");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0002'))").find("#AppType").text("그린메시지APP");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0003'))").find("#AppType").text("직원APP");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0004'))").find("#AppType").text("연락처APP");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0005'))").find("#AppType").text("오픈보드");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0006'))").find("#AppType").text("택스빌");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0007'))").find("#AppType").text("뱅크노트");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0008'))").find("#AppType").text("sERP");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0009'))").find("#AppType").text("오락");
                gbox_pc_3010.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0010'))").find("#AppType").text("직원선물");
            //	gbox_pc_2000.tbl.obj.find("td:has(abbr[id='SEND_NM'])").attr("title",gbox_pc_2000.tbl.obj.find("td:has(abbr[id='SEND_NM'])").text());
            });*/
        }
        var cmb = $("#cmbo1").val();
        gbox_pc_3000.tbl.setPaging("div:#paging1;per:" + cmb);
        if (jex.isNull(input["PAGINATION"])) {
            var hash = {};
            hash['currentPage'] = "1";
            hash['svrPage'] = "1";
            jex.setHString(hash);
            input["PAGINATION"] = {
                "PAGE_NO": "1",
                "PAGE_SIZE": gbox_pc_3000.tbl.getSvrPageSize()
            };
        }
        var ajax = jex.createAjaxUtil("pc_gruser_r002");
        //ajax.set("USER_NM",$('#USER_NM').val());
        ajax.set("GRP_NO", _grpno);
        ajax.set(input);
        gbox.ui.createProgressBar();
        ajax.execute(function (dat) {
            gbox_pc_3000.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
            gbox_pc_3000.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
            gbox_pc_3000.tbl.setAll(dat['INQ_REC']);
            gbox.ui.destroyProgressBar();
            INQ_REC = dat;
            //if data not exist
            if (dat['INQ_REC'] == "") {
                $("#tfootGroup").show();
                $(".paging_wrap").hide();
            }
            //if data exist
            else {
                $("#tfootGroup").hide();
                $(".paging_wrap").show();
            }
            // gbox_pc_2000.loadGroup(); 
            //$(".lnb_box").css("height",$("#USR_TBL").height()+220 + "px");
        });
    },
    loadProfile: function () {
        var ajax = jex.createAjaxUtil("pc_profile_r001");
        ajax.execute(function (dat) {
            //console.log(dat);
            $("#profileForm").setAllData(dat);
            if (jex.null2Void(dat.PHOTO).startsWith("http")) {
                $("#PHOTO_IMG").attr("src", dat.PHOTO);
            }
            else {
                $("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + dat.PHOTO);
            }
            $("#PHOTO_IMG").data("uid", dat.PHOTO);
            if (jex.null2Void(dat.PHOTO).startsWith("http")) {
                $(".user_view img:first").attr("src", dat.PHOTO);
            }
            else {
                $(".user_view img:first").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + dat.PHOTO);
            }
            $(".user_view").find("#SEND_NM").text(dat.SEND_NM);
            $("#SAUP_NM").text(dat.SAUP_NM);
        });
    }
};
var gbox_pc_2000 = {
    initScroll: function () {
        //특정크기보다 클 경우
        if ($("#scroll")[0].scrollHeight > 200) {
            //스크롤 객체 생성
            $("#scroll").jScrollPane({
                autoReinitialise: true,
                verticalDragMinHeight: 20,
                verticalDragMaxHeight: 20,
                horizontalDragMinWidth: 20,
                horizontalDragMaxWidth: 20,
                hideFocus: true
            });
            //$(".jspContainer").css("height", $(".jspPane").height());
        }
        //특정크기보다 작을 경우
        else {
            //스크롤 객체 제거
            var container = $('#scroll');
            var api = container.data('jsp');
            if (api)
                api.destroy();
            //스크롤 객체 제거
            //const element = $('#scroll').jScrollPane({});
            //const api = element.data('jsp');
            //api.destroy();
        }
    },
    loadCnt: function (json) {
        if (!json)
            json = {};
        var ajax = jex.createAjaxUtil("pc_org_s001");
        ajax.set("SAUP_NO", _strBsnnNo);
        ajax.set("LOGIN_ID", _strUserId);
        ajax.set("PTL_ID", _strPtlId);
        ajax.execute(function (dat) {
            //USE_INTT
            _countFreeCount = Number(dat.FREE_CNT) - Number(dat.FREE_USE_CNT);
            _useIntt.TX_STS = dat.USE_INTT_TX_STS;
            _useIntt.FREE_USE_CNT = dat.FREE_USE_CNT;
            _useIntt.FREE_CNT = dat.FREE_CNT;
            _useIntt.USE_TYPE = dat.USE_TYPE;
            _useIntt.CHRG_GB = dat.CHRG_GB;
            //const test = _useIntt.FREE_CNT - _useIntt.FREE_USE_CNT;
            //ORGCD
            _orgCd.AUTH_GB = dat.AUTH_GB;
            if (dat.AUTH_GB == '1') {
                $("#smsSendSetting").show();
            }
            else {
                $("#smsSendSetting").hide();
            }
            /*_freeUseCnt = dat.FREE_USE_CNT;
             if(_useType==0){
                 $("#smsSendSetting").hide();
                 $("#paidUseSetting").hide();
             }
             if(_useType==1){
                 $("#smsSendSetting").show();
                 $("#paidUseSetting").show();
             }*/
            if (json.callback)
                json.callback();
        });
    },
    visibleView: function () {
        var html = '<li><label for=""><input type="checkbox" ${CHECK} name="tblView" id="${INQ_CD}" value="${INQ_CD}"><span i18nCd="lang_${INQ_CD}">${INQ_NM}</span></label></li>';
        var TCol = '';
        var HCol = '';
        var CCol = '';
        var ajax = jex.createAjaxUtil("pc_scrinq_r001");
        var check = '';
        ajax.execute(function (dat) {
            //	console.log(dat);
            if (dat.INQ_REC.length > 0) {
                $("#tbl_list " +
                    "colgroup").empty();
                $("#tbl_list thead tr").empty();
                $("#tbl_list tbody").empty();
                $(".view_setting_lst ul").empty();
                $.each(dat.INQ_REC, function (i) {
                    if (dat.INQ_REC[i].INQ_GB == "1") {
                        check = 'checked';
                        TCol += eval("T" + dat.INQ_REC[i].INQ_CD);
                        HCol += eval("H" + dat.INQ_REC[i].INQ_CD);
                        CCol += eval("C" + dat.INQ_REC[i].INQ_CD);
                    }
                    else {
                        check = '';
                    }
                    $.tmpl(html, { "INQ_NM": dat.INQ_REC[i].INQ_NM, "INQ_CD": dat.INQ_REC[i].INQ_CD, "CHECK": check }).appendTo(".view_setting_lst ul");
                });
                $("#01").attr("disabled", "disabled");
                $("#02").attr("disabled", "disabled");
                $("#tbl_list colgroup").append(TCol);
                $("#tbl_list thead tr").append(HCol);
                $("#tbl_list tbody").append("<tr>" + CCol + "</tr>");
                gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
                try {
                    gbox.ui.setAllLang("#tbl_list thead tr", $.i18n.prop);
                    gbox.ui.setAllLang(".view_setting_lst ul", $.i18n.prop);
                }
                catch (e) { }
                ;
            }
            else {
                if ($("#tbl_list tbody tr").length == 0) {
                    //$("#tbl_list tbody").append("<tr>"+C01+C02+C03+C04+C05+C06+C07+"</tr>");
                }
                gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
            }
        });
    },
    //function fill data to table
    fillTbl: function (input) {
        if (!input)
            input = {};
        //Testing pagination error
        if (!jex.isNull(gbox_pc_3000.tbl)) {
            delete (gbox_pc_3000.tbl);
        }
        /*if(!jex.isNull(pop_gbox_pc_2020.tbl)) {
            delete(pop_gbox_pc_2020.tbl);
        }
        */
        if (jex.isNull(gbox_pc_2000.tbl)) {
            gbox_pc_2000.tbl = jex.plugin.newInstance("JEX_TBL", "#tbl_list");
            gbox_pc_2000.tbl.addEvent("onSvrPageChange", function (dat) {
                input["PAGINATION"] = {
                    "PAGE_NO": dat,
                    "PAGE_SIZE": gbox_pc_2000.tbl.getSvrPageSize()
                };
                gbox_pc_2000.fillTbl(input);
            });
            gbox_pc_2000.tbl.addEvent("onAfterDrawTbl", function (dat) {
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0001'))").find("#AppType").text("업체발송(OPEN API)");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0002'))").find("#AppType").text("그린메시지APP");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0003'))").find("#AppType").text("직원APP");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0004'))").find("#AppType").text("연락처APP");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0005'))").find("#AppType").text("오픈보드");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0006'))").find("#AppType").text("택스빌");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0007'))").find("#AppType").text("뱅크노트");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0008'))").find("#AppType").text("sERP");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0009'))").find("#AppType").text("오락");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0010'))").find("#AppType").text("직원선물");
                //	gbox_pc_2000.tbl.obj.find("td:has(abbr[id='SEND_NM'])").attr("title",gbox_pc_2000.tbl.obj.find("td:has(abbr[id='SEND_NM'])").text());
                // add 2015-03-20
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0011'))").find("#AppType").text("설문조사");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0012'))").find("#AppType").text("bizplay");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0013'))").find("#AppType").text("sERP 뱅크노트");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0014'))").find("#AppType").text("KB 뱅크노트");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0015'))").find("#AppType").text("sERP 급여명세서");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0016'))").find("#AppType").text("위빌링");
                gbox_pc_2000.tbl.obj.find("td:has(span[id='CHNL_CODE']:contains('0017'))").find("#AppType").text("뱅크노트Single");
                //2015-aug-18
                gbox.session.load(function () {
                    if (gbox.session.hasRole("ADMIN")) {
                        gbox_pc_2000.tbl.obj.find("td[id='col02']").addClass("disablepopup");
                        gbox_pc_2000.tbl.obj.find("td[id='col04']").addClass("disablepopup");
                    }
                    else {
                        gbox_pc_2000.tbl.obj.find("td[id='col02']").removeClass("disablepopup");
                        gbox_pc_2000.tbl.obj.find("td[id='col04']").removeClass("disablepopup");
                    }
                });
            });
            gbox_pc_2000.tbl.onClick("MSG_TXT", function (row) {
                $("#popUPViewMessage").bPopup(slideDown);
                $(".user_view2 #SEND_NM").text('');
                gbox_pc_2010.loadViewMessage(row);
                /*	jex.newWin( "/pop_gbox_pc_2010.act", "pc_msg_r002", 385, 650, row);  520, 700, row */
            });
            //
            gbox_pc_2000.tbl.onClick("CNT", function (row) {
                $("#viewSendPopUpFram").attr("src", "pop_gbox_pc_2020.act?MSG_NO=" + row.MSG_NO);
                $("#viewSendPopUpFram").bPopup(slideDown);
                //gbox.popup.receiverList(row);	
                //pop_gbox_pc_2020.fillUserTbl(row);
                //jex.newWin( "/pop_gbox_pc_2020.act", "pop_gbox_pc_2020", 629, 700, row );
            });
            //REG_DT formatting
            gbox_pc_2000.tbl.addFormatter("REG_DT", function (dat) {
                return moment(dat, "YYYYMMDD").format("YYYY-MM-DD");
            });
            //REG_TM formatting
            gbox_pc_2000.tbl.addFormatter("REG_TM", function (dat) {
                return moment(dat, "HHmmss").format("HH:mm:ss");
            });
            //SMS_CNT formatting
            gbox_pc_2000.tbl.addFormatter("SMS_CNT", function (dat) {
                return dat + '<span i18nCd="lang_Smscnt">' + jex.null2Str($.i18n.prop("lang_Smscnt"), "건") + '</span>';
            });
        }
        //set pagination
        var cmb = $("#cmbo").val();
        gbox_pc_2000.tbl.setPaging("div:#paging;per:" + cmb);
        if (jex.isNull(input["PAGINATION"])) {
            var hash = {};
            hash['currentPage'] = "1";
            hash['svrPage'] = "1";
            jex.setHString(hash);
            input["PAGINATION"] = {
                "PAGE_NO": "1",
                "PAGE_SIZE": gbox_pc_2000.tbl.getSvrPageSize()
            };
        }
        var ajax = jex.createAjaxUtil("pc_msg_r001");
        console.log(input);
        ajax.set(input);
        gbox.ui.createProgressBar();
        ajax.execute(function (dat) {
            /*console.log(gbox_pc_2000.tbl);*/
            gbox_pc_2000.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
            gbox_pc_2000.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
            gbox_pc_2000.tbl.setAll(dat['INQ_REC']);
            if (dat['INQ_REC'].length > 0) {
                $("#tfoot").hide();
                $(".paging_wrap").show();
                $("#tbl_list tbody").show();
            }
            else {
                $("#tfoot").show();
                $("#tfoot td").attr('colspan', $("#tbl_list").find('tr')[0].cells.length);
                $(".paging_wrap").hide();
                $("#tbl_list tbody").hide();
            }
            gbox.ui.destroyProgressBar();
        });
    },
    loadGroup: function () {
        $("#groupName").empty();
        var ajax = jex.createAjaxUtil("pc_group_r001");
        ajax.execute(function (dat) {
            $.each(dat.INQ_REC, function (i) {
                countGroupNm = dat.INQ_REC;
                $.tmpl(tmp, { "GRP_NM": dat.INQ_REC[i].GRP_NM, "GRP_NO": dat.INQ_REC[i].GRP_NO, "GRUSER_CNT": dat.INQ_REC[i].GRUSER_CNT }).appendTo("#groupName");
                /*const test = dat.INQ_REC[i].GRUSER_CNT;
                if(test.length > 3){
                    const a = test.substr(0,3)+("+");
                    $.tmpl( tmp, {"GRP_NM": dat.INQ_REC[i].GRP_NM ,"GRP_NO":dat.INQ_REC[i].GRP_NO,"GRUSER_CNT": a}).appendTo("#groupName");
                }else{
                    $.tmpl( tmp, {"GRP_NM": dat.INQ_REC[i].GRP_NM ,"GRP_NO":dat.INQ_REC[i].GRP_NO,"GRUSER_CNT": dat.INQ_REC[i].GRUSER_CNT}).appendTo("#groupName");
                }*/
            });
            /*$(".jspPane").jScrollPane({
                autoReinitialise: true,
                verticalDragMinHeight: 20,
                verticalDragMaxHeight: 20,
                horizontalDragMinWidth: 20,
                horizontalDragMaxWidth: 20,
                hideFocus: true
            });*/
            gbox_pc_2000.initScroll();
        });
    },
    //showMessageList
    showMessageList: function () {
        $("li").removeClass("on");
        $(".content_wrap:first").show();
        $("#groupSide").hide();
        $("div.group_name").removeClass("on");
        $("#linkhostory").parent("div.group_name").addClass("on");
        $("#hisReceptionTable").css("display", "none");
        $("#linkGroups img").attr("src", "../img/ico/ico_folder.png");
        $("#linkhostory img").attr("src", "../img/ico/ico_book_on.png");
        $("#receptionHistory img").attr("src", "../img/ico/ico_book.png");
        //	gbox_pc_2000.visibleView();
        $("#searchHead").focus();
        $("#block_srch").hide();
        $("#detailD").show();
        $("#detailU").hide();
        $("#totalReportGmsgTable").hide();
        $("#sendCostsGmsgTable").hide();
    }
};
var gbox_pc_3010 = {
    ////25.02.2015 
    showTotalMassageReport: function () {
        var preppend = "<tr class=\"total\">";
        preppend += "<td><div class=\"fwb\">합계</div></td>";
        preppend += "<td><div class=\"tar\">" + greenCntSum + "건</div></td>";
        preppend += "<td><div class=\"tar\">" + sndCntSum + "건</div></td>";
        preppend += "<td><div class=\"tar\">" + smsCntSum + "건</div></td>";
        preppend += "<td><div class=\"tar\">" + lmsCntSum + " 건</div></td>";
        preppend += "<td><div class=\"tar\">" + mmsCntSum + "건</div></td>";
        preppend += "</tr>";
        $("table#TBL_REPORTGMSG tbody").prepend(preppend);
    },
    // 24-02-2015
    /* Event On Load for All tables */
    loadTotalMSGCnt: function (input) {
        if (!input)
            input = {};
        if (!jex.isNull(gbox_pc_3000.tbl)) {
            delete (gbox_pc_3000.tbl);
        }
        if (!jex.isNull(gbox_pc_2000.tbl)) {
            delete (gbox_pc_2000.tbl);
        }
        if (!jex.isNull(pop_gbox_pc_2020.tbl)) {
            delete (pop_gbox_pc_2020.tbl);
        }
        if (jex.isNull(gbox_pc_3010.tbl)) {
            gbox_pc_3010.tbl = jex.plugin.newInstance("JEX_TBL", "#TBL_REPORTGMSG");
            gbox_pc_3010.tbl.addEvent("onSvrPageChange", function (dat) {
                input["PAGINATION"] = {
                    "PAGE_NO": dat,
                    "PAGE_SIZE": gbox_pc_3010.tbl.getSvrPageSize()
                };
                gbox_pc_3010.loadTotalMSGCnt(input);
            });
        }
        /* set pagination and filltbl data gbox_pc_3010 ****************************************************************************************/
        var cmb = $("#cmbo3").val();
        gbox_pc_3010.tbl.setPaging("div:#paging3;per:" + cmb);
        if (jex.isNull(input["PAGINATION"])) {
            var hash = {};
            hash['currentPage'] = "1";
            hash['svrPage'] = "1";
            jex.setHString(hash);
            input["PAGINATION"] = {
                "PAGE_NO": "1",
                "PAGE_SIZE": gbox_pc_3010.tbl.getSvrPageSize()
            };
        }
        var ajax = jex.createAjaxUtil("pc_totalinq_r001");
        //ajax.setAsync(false);
        /* Send Input Pagination obj to act */
        ajax.set(input);
        ajax.set(jex.getAll("#submitTotalMSG"));
        ajax.execute(function (dat) {
            //console.log(dat);
            var jsonRecs = [];
            var notReadedCnt = 0;
            //		console.clear();
            //		console.log("My DATA Server");
            //		console.log(dat);
            $.each(dat['INQ_REC'], function (i, v) {
                v["ROW_DATA"] = jex.toStr(v);
                v["ROW_DATA1"] = jex.toStr(v);
                jsonRecs.push(v);
                if (v.RECV_STS != "1") {
                    notReadedCnt++;
                }
            });
            //		alert(dat["PAGINATION"].TOTAL_ROWS);
            //		alert(dat["PAGINATION"].TOTAL_PAGES);
            gbox_pc_3010.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
            gbox_pc_3010.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
            gbox_pc_3010.tbl.setAll(jsonRecs);
            gbox_pc_3010.tbl.setAll(dat['INQ_REC']);
            //		
            //		gbox_pc_3010.tbl.setAll(dat['INQ_REC']);
            //		$("table#TBL_REPORTGMSG tbody").empty();
            greenCntSum = 0;
            sndCntSum = 0;
            smsCntSum = 0;
            lmsCntSum = 0;
            mmsCntSum = 0;
            if (dat.INQ_REC.length > 0) {
                /* PAGE */
                $.each(dat['INQ_REC'], function (i, v) {
                    v["ROW_DATA"] = jex.toStr(v);
                    v["ROW_DATA1"] = jex.toStr(v);
                    jsonRecs.push(v);
                    if (v.RECV_STS != "1") {
                        notReadedCnt++;
                    }
                });
                //			gbox_pc_3010.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
                //			gbox_pc_3010.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
                //			gbox_pc_3010.tbl.setAll(jsonRecs);
                $.each(dat['INQ_REC'], function (i, v) {
                    //				const preppend1 ="<tr>";
                    //					//preppend1+="<td><div id=\"SEND_DT\" class=\"tar\"> " + dat['INQ_REC'][i].SEND_DT + " </div></td>";
                    //					preppend1+="<td><div id=\"SEND_DT\" style=\"text-align: left !important;\" class=\"tar\"> " + dat['INQ_REC'][i].SEND_DT + " </div></td>";
                    //					preppend1+="<td><div id=\"GREEN_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].GREEN_CNT + " </div></td>";
                    //					preppend1+="<td><div id=\"SEND_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].SEND_CNT + " </div></td>";
                    //					preppend1+="<td><div id=\"SMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].SMS_CNT + " </div></td>";
                    //					preppend1+="<td><div id=\"LMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].LMS_CNT + " </div></td>";
                    //					preppend1+="<td><div id=\"MMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].MMS_CNT + " </div></td>";
                    //					preppend1+="</tr>";
                    //					$("table#TBL_REPORTGMSG tbody").append(preppend1);
                    greenCntSum += parseInt(v.GREEN_CNT, 10);
                    sndCntSum += parseInt(v.SEND_CNT, 10);
                    smsCntSum += parseInt(v.SMS_CNT, 10);
                    lmsCntSum += parseInt(v.LMS_CNT, 10);
                    mmsCntSum += parseInt(v.MMS_CNT, 10);
                });
                $(".paging_wrap").show();
                $("#TBL_REPORTGMSG tbody").show();
            }
            else {
                $(".paging_wrap").hide();
                $("#tbl_list tbody").hide();
            }
            //		gbox_pc_3010.showTotalMassageReport();
        });
    }
};
var gbox_pc_3100 = {
    loadsendCostsGmsg: function () {
        var input = {};
        if (!input)
            input = {};
        if (jex.isNull(gbox_pc_3100.tbl)) {
            gbox_pc_3100.tbl = jex.plugin.newInstance("JEX_TBL", "#TBL_SENDCOSTSGMSG");
        }
        var ajax = jex.createAjaxUtil("pc_costinq_r001");
        ajax.setAsync(false);
        ajax.set(jex.getAll("#submitSendCostGmsg"));
        //	ajax.execute(function(dat) {
        //		$("table#TBL_REPORTGMSG tbody").empty();
        //		console.log(dat);
        //		if(dat.INQ_REC.length > 0){
        //			$.each(dat['INQ_REC'], function(i, v) {
        //					date =  dat['INQ_REC'][i].TR_MONTH + dat['INQ_REC'][i].TR_MONTH;
        //					console.log(date);
        //				const preppend1 ="<tr class=\"no_hover\">";
        //					//preppend1+="<td><div id=\"SEND_DT\" class=\"tar\"> " + dat['INQ_REC'][i].SEND_DT + " </div></td>";
        //					preppend1+="<td rowspan=/"2/"><div id=\"SEND_DT\"  class=\"tar\">" +  dat['INQ_REC'][i].TR_MONTH + dat['INQ_REC'][i].TR_MONTH +" </div></td>";
        //					preppend1+="<td><div>합계</div></td>";
        //					preppend1+="<td><div id=\"SEND_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].SEND_CNT + " </div></td>";
        //					preppend1+="<td><div id=\"SMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].SMS_CNT + " </div></td>";
        //					preppend1+="<td><div id=\"LMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].LMS_CNT + " </div></td>";
        //					preppend1+="<td><div id=\"MMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].MMS_CNT + " </div></td>";
        //					preppend1+="<td><div id=\"MMS_CNT\" class=\"tar\"> " + dat['INQ_REC'][i].MMS_CNT + " </div></td>";
        //					preppend1+="</tr>";
        //				$("table#TBL_SENDCOSTSGMSG tbody").append(preppend1);
        //					
        //				
        //					greenCntSum1	+= parseInt(v.GREEN_CNT,10);
        //					sndCntSum1	+= parseInt(v.SEND_CNT,10);
        //					smsCntSum1	+= parseInt(v.SMS_CNT,10);
        //					lmsCntSum1   +=  parseInt(v.LMS_CNT,10);
        //					mmsCntSum1  +=  parseInt(v.MMS_CNT,10);
        //			});
        //			
        //				const preppend2 ="<tr class=\"no_hover\">";
        //					preppend2+="<td><div>금액</div></td>";
        //					preppend2+="<td><div id=\"SEND_CNT\" class=\"tar\"> " + greenCntSum1 + " </div></td>";
        //					preppend2+="<td><div id=\"SMS_CNT\" class=\"tar\"> " + sndCntSum1 + " </div></td>";
        //					preppend2+="<td><div id=\"LMS_CNT\" class=\"tar\"> " + smsCntSum1 + " </div></td>";
        //					preppend2+="<td><div id=\"MMS_CNT\" class=\"tar\"> " + lmsCntSum1 + " </div></td>";
        //					preppend2+="<td><div id=\"MMS_CNT\" class=\"tar\"> " + mmsCntSum1 + " </div></td>";
        //					preppend2+="</tr>";
        //				$("table#TBL_SENDCOSTSGMSG tbody").append(preppend2);
        //			
        //			
        //		}
        //			
        //	});
    }
};
var gbox_pc_4000 = {
    fillTable: function (page_no) {
    	alert("fillTable...");
        $("#hisTable").empty();
        $("#hisTable").show();
        $("#histfoot").hide();
        $("#hisReceptionTable .paging_wrap").show();
        var input = {};
        input["PAGE_NO"] = (jex.null2Void(page_no) + "").replace(/[^0-9]/gi, '');
        input["PAGE_SIZE"] = $("#hisPageSize").text().replace(/[^0-9]/gi, '');
        if ($("#block_search:visible").length > 0 && !_search_top) {
            if ($("#hisReceptionTable #INQ_DATA").attr("placeholder") != $("#hisReceptionTable #INQ_DATA").val()) {
                input["INQ_DATA"] = jex.null2Void($("#hisReceptionTable #INQ_DATA").val());
            }
            input["INQ_GB"] = jex.null2Void($("#hisReceptionTable #INQ_GB").val());
            input["SEND_FRDT"] = jex.null2Void($("#send_ftdate").val()).replace(/-/g, "");
            input["SEND_TODT"] = jex.null2Void($("#send_todate").val()).replace(/-/g, "");
        }
        else {
            if ($("#searchRece").attr("placeholder") != $("#searchRece").val()) {
                input["INQ_DATA"] = jex.null2Void($("#searchRece").val());
            }
        }
        var ajax = jex.createAjaxUtil("gbox_pc_4000_r001");
        ajax.set(input);
        gbox.ui.createProgressBar();
        ajax.execute(function (dat) {
            if (Number(dat.TOTAL_ROWS) > 0) {
                var html_1 = "";
                //prevent MessageEncrypt Problem 
                if (dat.REC.length > Number(input.PAGE_SIZE)) {
                    var s_page = (Number(dat.PAGE_NO) - 1) * Number(input.PAGE_SIZE);
                    var e_page = Number(dat.PAGE_NO) * Number(input.PAGE_SIZE);
                    dat.REC = dat.REC.slice(s_page, e_page);
                }
                $.each(dat.REC, function (i, v) {
                    var date_time = jex.isNull(v.REG_DT) ? "" : moment(v.REG_DT, "YYYYMMDD").format("YYYY-MM-DD") + ' ' + moment(v.REG_TM, "HHmmss").format("HH:mm:ss");
                    html_1 += '<tr data-msg_no="' + v.MSG_NO + '">';
                    html_1 += '	<td><div>' + date_time + '</div></td>';
                    html_1 += '	<td><div><a href="javascript:" class="msg_cnt recieve_msg_cnt" title="">' + jex.null2Void(v.MSG_TXT) + '</a></div></td>';
                    html_1 += '	<td><div class="msg_cnt" title="' + jex.null2Void(v.SEND_NM) + ' │ ' + jex.null2Void(v.SAUP_NM) + '" style="text-overflow: ellipsis;white-space:nowrap;overflow:hidden;">' + jex.null2Void(v.SEND_NM) + ' │ ' + jex.null2Void(v.SAUP_NM) + '</div></td>';
                    html_1 += '	<td><div>' + v.MSG_GB + '</div></td>';
                    html_1 += '</tr>';
                });
                $("#hisTable").append(html_1);
                gbox.ui.drawTablePaging("hisPaging", gbox_pc_4000.fillTable, dat.PAGE_NO, dat.TOTAL_ROWS, input.PAGE_SIZE);
            }
            else {
                $("#hisTable").hide();
                $("#histfoot").show();
                $("#hisReceptionTable .paging_wrap").hide();
                //TEST
            }
            gbox.ui.destroyProgressBar();
        });
    }
};
var pop_gbox_pc_2020 = {
    //fill data to table 
    fillUserTbl: function (input) {
        if (!input)
            input = {};
        if (!jex.isNull(gbox_pc_3000.tbl)) {
            delete (gbox_pc_3000.tbl);
        }
        if (!jex.isNull(gbox_pc_2000.tbl)) {
            delete (gbox_pc_2000.tbl);
        }
        if (jex.isNull(pop_gbox_pc_2020.tbl)) {
            pop_gbox_pc_2020.tbl = jex.plugin.newInstance("JEX_TBL", "#TBL_SET");
            pop_gbox_pc_2020.tbl.addEvent("onSvrPageChange", function (dat) {
                input["PAGINATION"] = {
                    "PAGE_NO": dat,
                    "PAGE_SIZE": pop_gbox_pc_2020.tbl.getSvrPageSize()
                };
                //pop_gbox_pc_2020.fillTbl(input);
                pop_gbox_pc_2020.fillUserTbl(input);
            });
            pop_gbox_pc_2020.tbl.addFormatter("MSG_GB", function (dat) {
                if (dat == "0") {
                    return "SMS";
                }
                else if (dat == "1") {
                    return "그린메시지";
                }
            });
            //add format on field row data
            pop_gbox_pc_2020.tbl.addFormatter("ROW_DATA", function (dat) {
                var datarow = jex.parse(dat);
                if (datarow.MSG_GB == "0") {
                    return "-";
                }
                else {
                    if (datarow.RECV_STS != "1") {
                        return "<span style='color: red;'>미확인</span>";
                    }
                    else {
                        return moment(datarow.RECV_DATE, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow.RECV_TIME, "HHmmss").format("HH:mm:ss");
                    }
                }
            });
            //add format on field row data1
            pop_gbox_pc_2020.tbl.addFormatter("ROW_DATA1", function (dat) {
                var datarow1 = jex.parse(dat);
                if (datarow1.MSG_GB == "0") {
                    return "-";
                }
                else { }
                if (datarow1.SMS_SND_DATE == "0" || datarow1.SMS_SND_DATE == null) {
                    return "-";
                }
                else {
                    return moment(datarow1.SMS_SND_DATE, "YYYYMMDD").format("YYYY-MM-DD") + " " + moment(datarow1.SMS_SND_TIME, "HHmmss").format("HH:mm:ss");
                }
            });
        }
        //set pagination for data table
        pop_gbox_pc_2020.tbl.setPaging("div:#paging2;per:" + 10);
        if (jex.isNull(input["PAGINATION"])) {
            var hash = {};
            hash['currentPage'] = "1";
            hash['svrPage'] = "1";
            jex.setHString(hash);
            input["PAGINATION"] = {
                "PAGE_NO": "1",
                "PAGE_SIZE": pop_gbox_pc_2020.tbl.getSvrPageSize()
            };
        }
        var ajax = jex.createAjaxUtil("pc_sendcnt_r001");
        ajax.set(input);
        ajax.execute(function (dat) {
            var jsonRecs = [];
            var notReadedCnt = 0;
            //		$.each(dat['INQ_REC'], function(i, v) {
            //			v["ROW_DATA"] = jex.toStr(v);
            //			v["ROW_DATA1"] = jex.toStr(v);
            //
            //			jsonRecs.push(v);
            //			
            //			if(v.RECV_STS != "1") {
            //				notReadedCnt++;
            //			}
            //
            //		});
            //		pop_gbox_pc_2020.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
            //		pop_gbox_pc_2020.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
            //	    pop_gbox_pc_2020.tbl.setAll(jsonRecs);
            if (dat['INQ_REC'].length > 0) {
                $("#tfoot").hide();
            }
            else {
                $("#tfoot").show();
            }
            if (notReadedCnt > 0) {
                $("#sendSmsBtn").show();
            }
        });
    }
};
var jsonRec = [];
var _grpno = 0;
var _Delete = '';
var INQ_REC = {};
var _grpnm = '';
var _gruserCnt = '';
var countGroupNm = {};
var temGrpNm = '';
var _orgCd = {};
var _useIntt = {};
var _countFreeCount = 0;
//26.02.2015
var sndCntSum = 0;
var greenCntSum = 0;
var smsCntSum = 0;
var lmsCntSum = 0;
var mmsCntSum = 0;
var sndCntSum1 = 0;
var greenCntSum1 = 0;
var smsCntSum1 = 0;
var lmsCntSum1 = 0;
var mmsCntSum1 = 0;
var tmp = '<li data-grp_no="${GRP_NO}" data-grp_nm="${GRP_NM}"><div id="group"><a href="javascript:" class="com_sub_item" data-grp_no="${GRP_NO}" data-grp_nm="${GRP_NM}" title="${GRP_NM}" style="width:100px;max-width:41%">${GRP_NM}</a><span style="display: block; text-align: right;right: 50px; top: 0"><strong data-gruser_cnt="${GRUSER_CNT}" id="GRUSER_CNT">${GRUSER_CNT}</strong></span></a><span class="snb_btn"><a href="javascript:" class="ico_edit" id="editGroup" ><span class="blind">edit button</span></a><a href="javascript:" class="ico_del" id="delGroup" data-grp_no="${GRP_NO}"><span class="blind">delete button</span></a></span></div></li>';
tmp += '<div class="edit_group_box" id="edit_group" style="display: none; color: aliceblue;">';
tmp += '<span style="width: 130px;"><input type="text" data-grp_no="${GRP_NO}"  id="GRP_NM" value="${GRP_NM}" style="color: aliceblue;"></a></span><em class="opt"><a href="javascript:" id="btnSaveGr" class="done"><span class="blind">done</span></a><a href="javascript:" id="icon_del" class="ico_del"><span class="blind">cancel</span></a></em></div>';
var _search_top = false;
new (Jex.extend({
    onload: function () {
	//pop_up_info 22.07.2022
			var wind;
		    var jexAjax = jex.createAjaxUtil("user_terms_r001");
					jexAjax.execute(function(data) {
			          	   localStorage.removeItem(data.LOGIN_ID);
							if(data.TERM_STTS == 'N'){
								console.log("data",data.TERM_STTS)
								wind=popupwindow(data.POP_UP_TERMS, "terms", 721, 573);
			                }else if(data.TERM_STTS == ''){
								localStorage.setItem(data.LOGIN_ID, 'E'); // save it form Alert form to check
								localStorage.setItem('login_id', data.LOGIN_ID); // save it form Alert form to check
								var stt = localStorage.getItem('terms'+data.LOGIN_ID);
								if(stt != undefined && stt != null){
									if(stt=='N'){wind=popupwindow(data.POP_UP_TERMS, "terms", 721, 573);}
								}else{
									wind=popupwindow(data.POP_UP_TERMS, "terms", 721, 573);
								}
						   }
					});

        //2015-aug-17
        gbox.session.load(function () {
            if (gbox.session.hasRole("ADMIN")) {
                //$("#smsSendSetting").show();
                $("#paidUseSetting").show();
                C02 = '<td id="col02" class="tal disablepopup"><div><a href="javascript:" class="msg_cnt" id="Ttext" ><span id="MSG_TXT"></span</a></div></td>';
                C04 = '<td id="col04" class="tar disablepopup"><div id="CNT"><a href="javascript:" class="msg_cnt"><strong  class="num_red" id="MI_CNT"></strong>/<span id="TOT_CNT"></span></a></div></td>';
            }
            else {
                C02 = '<td id="col02" class="tal"><div><a href="javascript:" class="msg_cnt" id="Ttext" ><span id="MSG_TXT"></span</a></div></td>';
                C04 = '<td id="col04" class="tar"><div id="CNT"><a href="javascript:" class="msg_cnt"><strong  class="num_red" id="MI_CNT"></strong>/<span id="TOT_CNT"></span></a></div></td>';
                //$("#smsSendSetting").hide();
                $("#paidUseSetting").hide();
            }
        });
        //end 2015-aug-17
        gbox.ui.setDateRangePicker("#sendFrdt", {
            keyTarget: "#SEND_DT",
            startDate: moment().add('month', -1)
        });
        gbox.ui.setDateRangePicker("#sentDt", {
            keyTarget: "#TR_DATE",
            startDate: moment().add('month', -1)
        });
        gbox.ui.setDateRangePicker("#sentDt", {
            keyTarget: "#TR_DATE",
            startDate: moment().add('month', -1)
        });
        //end 2017-oct-11
        gbox.ui.setDateRangePicker("#firstDate", {
            keyTarget: "#send_date",
            startDate: moment().add('month', -1)
        });
        gbox.ui.setDateRangePicker("#", {
            keyTarget: "#tr_date",
            startDate: moment().add('month', -1)
        });
        //		gbox.ui.setDateRangePicker("#reportDate", {
        //			keyTarget: "#TR_DATE",
        //			startDate: moment().add('month', -1)
        //		});
        gbox.ui.setMonthPicker("#FROM_TR_DATE", {
            keyTarget: "#FROM_TR_DATE",
        });
        gbox.ui.setMonthPicker("#TO_TR_DATE");
        //check new cookie using jquery.cookie
        // const _url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        //	const _url = window.location.href;
        //	const _user_cookie =_strPtlId + _strUserId + _strChnlId +"";
        var oldCookieName = _strPtlId + _strUserId + _strChnlId;
        //remove old cookie
        document.cookie = oldCookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        var _user_cookie = "DontOpenPopupFlag";
        var check = cf_getCookie(_user_cookie);
        if (check != _user_cookie) {
            //			$('#userDevidePopUpFram').bPopup({ 
            //				 modalClose: false, 
            //		            opacity: 0.6,
            //					onOpen: function(){
            //					}
            //			});
            //			cf_setCookie(_user_cookie, "" , -14);
            //			$("#colorbox").show();
        }
        else {
            $("#colorbox").css("display", "none");
        }
        //remove using jquery.cookie
        //$("#userDevidePopUpFram").attr("src","https://collabo.appplay.co.kr/colabo_layout.act");
        //$("#userDevidePopUpFram").bPopup(slideDown);
        /*gbox_pc_2000.tbl.onClick("CNT", function(row) {
            $("#userDevidePopUpFram").attr("src","pop_gbox_pc_2020.act?MSG_NO=" + row.MSG_NO);
            $("#userDevidePopUpFram").bPopup(slideDown);
            
            
        });*/
        //$("#sendForm").validationEngine(gbox.ui.validationEngineOptions);
        //function on form load
        //gbox_pc_4310.loadProfile();
        //		gbox_pc_2000.loadCnt();
        //$("#INQ_DATA").attr("placeholder", _extLang.enterSearch);  //검색어를 입력하세요.
        $("#submitForm").validationEngine(gbox.ui.validationEngineOptions);
        gbox_pc_2000.visibleView();
        gbox_pc_2000.loadGroup();
        //gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
        gbox_pc_3000.loadProfile();
        /* 2015-aug-17
         gbox.session.load(function() {
            if(gbox.session.hasRole("ADMIN")) {
                //$("#smsSendSetting").show();
                $("#paidUseSetting").show();
            }
            else{
                //$("#smsSendSetting").hide();
                $("#paidUseSetting").hide();
            }
                
        });
        */
        /*$("#INQ_DATA").focus();
        $("#INQ_DATA").keyz({
            "enter": function(ctrl, sft, alt, event) {
                gbox_pc_2000.tbl.setCurrentPage(1);
                gbox_pc_2000.tbl.setSvrPageNo(1);
                gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
            }
        });*/
        $("#INQ_DATA").focus();
        $(".content_wrap:first .srch_field_wrap").on('keyup', 'input#INQ_DATA', function (e) {
            if (e.keyCode == 13) {
                gbox_pc_2000.tbl.setCurrentPage(1);
                gbox_pc_2000.tbl.setSvrPageNo(1);
                gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
            }
        });
        $("#block_srch").hide();
        $("#detailU").hide();
        $("#detailD").show();
        // 클릭 시 상세조회 화면 펼침   펼침 
        $("#detailUp").hide();
        $("#detailDown").show();
        $("#block_search").hide();
        //jex.plugin.get("JEX_ML").addjob(function() {
        //alert($("#INQ_GB").html());
        gbox.ui.setUiComponent($(".srch_field_cbox"), {
            "component": "select"
        });
        //});
        gbox.ui.setSingleFileUploader("#PHOTO_FILE", {
            keyTarget: "#PHOTO",
            allowedExts: "jpg,png,gif,bmp,jpeg",
            onAfterUpload: function (dat) {
                if (!jex.isNull(dat)) {
                    var val = dat.fileName;
                    if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
                        $("#PHOTO").val(dat.uid);
                        $("#PHOTO_FILENAME").val(dat.fileName);
                        $("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&uid=" + dat.uid);
                    }
                    else {
                        //jex.warning("잘못 선택한 파일.");
                        jex.warning($.i18n.prop("lang_imgRequire"));
                    }
                }
            }
        });
        /*
        $("#PHOTO_FILE").click(function() {
            
            gbox.session.load(function(dat) {
                const opt = {
                       "ptlId"      	:dat.PTL_ID,
                       "chnlId"     	:dat.CHNL_ID,
                       "useInttId"  	:dat.USE_INTT_ID,
                       "cntsId"     	:dat.CNTS_ID,
                       "userId"     	:dat.LOGIN_ID,
                       "openType"    	:"P",
                       "maxFileCnt"    	:"1",
                       "maxFileSize"    :"20M",
                       "callBackFn" 	:"fileCallback",
                       "uploadFileProp"	: {
                           "type" : "img",
                           "thumImgSize"  : {
                                       "width"  :100,
                                       "height" :100
                            }
                       }
                };
                
                _WE_DRIVER.open(opt);
            });
            
        });
        */
        $("#submitFormUser").validationEngine(gbox.ui.validationEngineOptions);
        $("#profileUserForm").validationEngine(gbox.ui.validationEngineOptions);
        $("#USER_NM").focus();
        $("#sortable").sortable({ cursor: "move" });
        //		document.getElementById("searchContact").placeholder = $.i18n.prop("lang_pHSearchContact");
        //		document.getElementById("searchHead").placeholder = $.i18n.prop("lang_pHSearchHead");
        //		document.getElementById("INQ_DATA").placeholder = $.i18n.prop("lang_pHInqData");
        //	    gbox_pc_4000.fillTable();

    }, event: function () {
        //sliding image
        $(".layer_popapp_btnclose").click(function () {
            $("#userDevidePopUpFram").hide();
            var _bPopUp = $('#userDevidePopUpFram').bPopup(slideDown);
            _bPopUp.close();
        });
        //Close onload popup
        $("#layer_popapp_cls").click(function () {
            $(this).parents().find("#colorbox").hide("slow");
            //$(this).parents().find("#colorbox").css("display","none");
            //$(this).parents().find(".layer_popapp_btnclose").css("display","none");
        });
        //-------Functions user add,update,delete in Group-------//
        $("#GROUP_TBL #groupName li .com_sub_item").live("click", function () {
            if ($("#USR_TBL tbody tr").length == 0) {
                var trappend = "<tr>";
                trappend += "<td><div><input type=\"checkbox\" id=\"chkSelect\" class=\"checkbox \" title=\"선택\" style=\"margin-top:6px;\"></div></td>";
                trappend += "<td class=\"tal\"><div id=\"USER_NM\" class=\"txt_ellipsis\"></div></td>";
                trappend += "<td><div id=\"HP_NO\"></div></td>";
                trappend += "<td><div id=\"BIGO\"></div></td>";
                trappend += "<td style=\"display:none;\"><div id=\"USER_NO\"></div></td>";
                trappend += "</tr>";
                $("#USR_TBL tbody").append(trappend);
            }
            $(".content_wrap").css("display", "none");
            $("#groupSide").css("display", "block");
            _grpno = $(this).data("grp_no");
            _grpnm = $(this).data("grp_nm");
            _gruserCnt = $(this).next().find("strong").data("gruser_cnt");
            $(".tit_top_wrap #GRP_NM").text(_grpnm);
            $(".tit_top_wrap #GRUSER_CNT").text(" (" + _gruserCnt + ")");
            //if(_gruserCnt==""){
            //$(".tit_top_wrap #GRP_NM").text(_grpnm);
            //}else{
            //$(".tit_top_wrap #GRP_NM").text(_grpnm+" ("+_gruserCnt+")");
            //$(".tit_top_wrap #GRUSER_CNT").text(" ("+_gruserCnt+")");
            //}
            gbox_pc_3000.fillUserTbl();
            //$("#txtSearchUser").focus();
            $("#searchContact").focus();
            //$("#chkSelectAll").attr("checked",false);
        });
        $("#linkhostory").click(function () {
            gbox_pc_2000.visibleView();
            gbox_pc_2000.showMessageList();
            setTimeout(function () {
                $("#linkGroups img").prop("src", "../img/ico/ico_folder.png");
                $("#linkhostory img").prop("src", "../img/ico/ico_book_on.png");
                $("#receptionHistory img").prop("src", "../img/ico/ico_book.png");
                $("#searchHead").val('');
            }, 100);
        });
        $("#receptionHistory").click(function () {
            $("li").removeClass("on");
            $("#hisReceptionTable #INQ_DATA").val("");
            $("div.group_name").removeClass("on");
            $("#receptionHistory").parent("div.group_name").addClass("on");
            $("#hisReceptionTable").css("display", "block");
            $("#sendCostsGmsgTable").css("display", "none");
            $(".content_wrap:first").css("display", "none");
            $("#groupSide").css("display", "none");
            $("#detailUp").css("display", "none");
            $("#block_search").css("display", "none");
            $("#detailDown").css("display", "inline-block");
            $("#searchRece").val("");
            $("#searchRece").focus();
            setTimeout(function () {
                $("#receptionHistory img").prop("src", "../img/ico/ico_book_on.png");
                $("#linkhostory img").prop("src", "../img/ico/ico_book.png");
                $("#linkGroups img").prop("src", "../img/ico/ico_folder.png");
            }, 100);
            gbox_pc_4000.fillTable();
        });
        // start on 23/02/2015  통계정보 / 전체집계
        $("#statisticsReportGmsg,#totalReportGmsg").click(function () {
            $("div.group_name").removeClass("on");
            $("li").removeClass("on");
            $("#statisticsReportGmsg").parent("div.group_name").addClass("on");
            $("#linkGroups img").attr("src", "../img/ico/ico_folder.png");
            $("#linkhostory img").attr("src", "../img/ico/ico_book.png");
            $("#receptionHistory img").prop("src", "../img/ico/ico_book.png");
            //전체집계 show totalReportGmsgTable's shadow
            $("#totalReportGmsg img").attr("src", "../img/ico/ico_book_on.png");
            $(this).parents().addClass('on');
            $(".content_wrap").hide();
            $("#groupSide").hide();
            $("#searchHead").focus();
            $("#block_srch").hide();
            $("#detailD").hide();
            $("#detailU").hide();
            //전체집계
            $("#totalReportGmsgTable").show();
            gbox_pc_3010.loadTotalMSGCnt();
            //			gbox_pc_3010.showTotalMassageReport();
        });
        $("#sendCostsGmsg").click(function () {
            $("div.group_name").removeClass("on");
            $("li").removeClass("on");
            $("#statisticsReportGmsg").parent("div.group_name").addClass("on");
            $("#linkGroups img").attr("src", "../img/ico/ico_folder.png");
            $("#linkhostory img").attr("src", "../img/ico/ico_book.png");
            $("#receptionHistory img").attr("src", "../img/ico/ico_book.png");
            $("#statisticsReportGmsg img").attr("src", "../img/ico/ico_book_on.png");
            $(this).parents().addClass('on');
            $(".content_wrap").hide();
            $("#groupSide").hide();
            $("#searchHead").focus();
            $("#block_srch").hide();
            $("#detailD").hide();
            $("#detailU").hide();
            $("#totalReportGmsgTable").hide();
            $("#sendCostsGmsgTable").show();
            $("#hisReceptionTable").hide();
            //			$(".").css("display","none");
            gbox_pc_3100.loadsendCostsGmsg();
            /*$( document ).ready(function() {
                $(".ui-datepicker-calendar").css("display","none");
            });*/
            /*$(".ui-datepicker-calendar").hide();*/
        });
        /*$("#hisReception").click(function(){
            
            $("div.group_name").removeClass("on");
            $("li").removeClass("on");
            $("#statisticsReportGmsg").parent("div.group_name").addClass("on");
            $("#linkGroups img").attr("src","../img/ico/ico_folder.png");
            $("#linkhostory img").attr("src","../img/ico/ico_book.png");
            $("#receptionHistory img").attr("src","../img/ico/ico_book.png");
            $("#statisticsReportGmsg img").attr("src","../img/ico/ico_book_on.png");
            $(this).parents().addClass('on');
            $(".content_wrap").hide();
            $("#groupSide").hide();
            $("#searchHead").focus();
            $("#block_srch").hide();
            $("#detailD").hide();
            $("#detailU").hide();
            
            $("#block_search").hide();
            $("#detailDown").hide();
            $("#detailUp").hide();
            
            $("#totalReportGmsgTable").hide();
            $("#sendCostsGmsgTable").hide();
            $("#hisReceptionTable").show();
        });*/
        /* $('.date-picker').datepicker( {
                onClose: function(dateText, inst) {
                    alert(1);
                }
            });*/
        $("#FROM_TR_DATE").focus(function () {
            hidDatepicker();
        });
        $("#TO_TR_DATE").focus(function () {
            hidDatepicker();
        });
        $("#FROM_TR_DATE").focusout(function () {
            hidDatepicker();
        });
        $("#TO_TR_DATE").focusout(function () {
            hidDatepicker();
        });
        function hidDatepicker() {
            $(".ui-datepicker-calendar").css("display", "none");
        }
        $("#detailQ, #detailQuest").click(function () {
            $(".layertype1").toggle();
        });
        $("#schTotalMsgDate").click(function () {
            gbox_pc_3010.loadTotalMSGCnt();
            //			gbox_pc_3010.showTotalMassageReport();
        });
        // end on 23/02/2015
        $(document).live("click", function (e) {
            /*if (!$(e.target).hasClass("white2") */
            if (!$(e.target).hasClass("white1")
                && $(e.target).parents(".srch_field_wrap").length === 0) {
                $("#visibleTable").hide();
                $("#btnVisible").find("img:eq(0)").show();
                $("#btnVisible").find("img:eq(1)").hide();
                var a = $(".view_setting_lst input");
                if (a.filter(":checked").length == 0) {
                    gbox_pc_2000.visibleView();
                }
            }
            if (!$(e.target).hasClass("white1")
                && $(e.target).parents(".frt").length === 0) {
                $(".tit_top_layer").hide();
                $(".tit_top_layer").prev().find("img:eq(1)").show();
                $(".tit_top_layer").prev().find("img:eq(0)").hide();
            }
            if (!$(e.target).hasClass("select_com")
                && $(e.target).parents(".user_r_side").length === 0) {
                $(".combo").next("ul").hide();
            }
        });
        //add new
        $("#btnAdd").click(function () {
            //const input = {};
            //input["GRP_NO"] = _grpno;
            //gbox.popup.contactForm(input, function() {
            //gbox_pc_3000.tbl.setCurrentPage(1);
            //gbox_pc_3000.tbl.setSvrPageNo(1);
            //gbox_pc_3000.fillUserTbl(jex.getAllData("#searchForm"));
            //});
            $('#newUserPopup').bPopup(slideDown);
            $("#submitFormUser #USER_NM").val("");
            $("#submitFormUser #HP_NO").val("");
            $("#submitFormUser #BIGO").val("");
            $("#submitFormUser #USER_NM").focus();
            //$("#newUserPopup #USER_NM").keydown(function () {
            //const len = $(this).val().length;
            //if(len == 40){
            //jex.warning("이름은 최대 40자까지만 입력 가능합니다.");
            //return;
            //}
            //});
            //$("#newUserPopup #BIGO").keyup(function () {
            //const len = $(this).val().length;
            //if(len == 50){
            //jex.warning("비고는 최대 50자까지만 입력 가능합니다.");
            //return;
            //}
            //});
        });
        // Keypress	 newUserPopup updateUserPopup
        $("#newUserPopup #BIGO").keypress(function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode == 13) {
                $('#btnConfirm').click();
            }
        });
        $("#updateUserPopup #BIGO").keypress(function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode == 13) {
                $('#btnUpdateUser').click();
            }
        });
        // Add Group UseR
        $('#btnConfirm').click(function () {
            //if(!$("#submitFormUser").validationEngine('validate')) {
            //return false;
            //}	
            if (jex.isNull($("#submitFormUser #USER_NM").val())) {
                jex.warning($.i18n.prop("lang_nmReq"));
                $("#submitFormUser #USER_NM").focus();
                return;
            }
            if (jex.isNull($("#submitFormUser #HP_NO").val())) {
                jex.warning($.i18n.prop("lang_phoneReq"));
                return;
            }
            //if($("#submitFormUser #HP_NO").val().length < 11){				
            //jex.error("전화번호 형식이 올바르지 않습니다.");
            //return;
            //}
            //if(jex.isNull($("#submitFormUser #BIGO").val())){
            //jex.warning("비고를 입력하세요.");
            //return;
            //}
            var ajax = jex.createAjaxUtil("pc_gruser_c001");
            gbox.ui.createProgressBar();
            ajax.set("GRP_NO", _grpno);
            ajax.set(jex.getAllData("#submitFormUser"));
            ajax.execute(function (dat) {
                gbox.ui.destroyProgressBar();
                jex.success($.i18n.prop("lang_contAdded")); //"연락처가 추가되었습니다.");
                gbox_pc_3000.fillUserTbl();
                $('#newUserPopup').bPopup().close();
                var grUcnt = _gruserCnt;
                var countUserInGr = (grUcnt + +1);
                $(".tit_top_wrap #GRUSER_CNT").text(" (" + countUserInGr + ")");
                gbox_pc_2000.loadGroup();
            });
        });
        // Button Update
        $("#btnUpdate").click(function () {
            var j = 0;
            $("table#USR_TBL tbody tr:has(input:checked)").each(function (i, v) {
                j = j + 1;
            });
            if (j == 1) {
                var cval = $('td input:checked').parents('td').next().find('div').text(); //check value of UNER_NM 
                var pNum = $('td input:checked').parents('td').siblings().find('#HP_NO').text(); //check value of HP_NO 
                var pNo = $('td input:checked').parents('td').siblings().find('#USER_NO').text(); //check value of USER_NO
                var bigo = $('td input:checked').parents('td').siblings().find('#BIGO').text(); //check value of bigo
                var input = {};
                input["USER_NM"] = cval;
                input["HP_NO"] = pNum;
                input["USER_NO"] = pNo;
                input["BIGO"] = bigo;
                //jex.newWin( "/pop_gbox_pc_3050.act", "pop_gbox_pc_3050", 500, 250, input);
                $('#updateUserPopup').bPopup(slideDown);
                jex.setAllData("#updateUserForm", input);
                // validate
                //$("#updateUserPopup #BIGO").keydown(function () {
                //const len = $(this).val().length;
                //if(len == 50){
                //jex.warning("비고를 최대 50자까지만 입력 가능합니다.");
                //}
                //});
                //$("#updateUserPopup #USER_NM").keydown(function () {
                //const len = $(this).val().length;
                //if(len == 40){
                //jex.warning("이름은 최대 40자까지만 입력 가능합니다.");
                //}
                //});
            }
            else {
                jex.warning($.i18n.prop("lang_plsSelectRow")); //한 개의 행을 선택하여 주십시오.//수정하고자 하는 행을 선택하세요.
            }
        });
        $("#btnUpdateUser").click(function () {
            //if(!$("#updateUserForm").validationEngine('validate')) {
            //return false;
            //}
            if (jex.isNull($("#updateUserForm #USER_NM").val())) {
                jex.warning($.i18n.prop("lang_nmReq")); //이름을 입력하세요.;
                return;
            }
            //if(jex.isNull($("#updateUserForm #BIGO").val())){
            //jex.warning("비고를 입력하세요.");
            //return;
            //}
            var ajax = jex.createAjaxUtil("pc_gruser_u001");
            var input = jex.getAllData("#updateUserForm");
            input["BIGO"] = jex.null2Void(input["BIGO"]);
            input["GRP_NO"] = _grpno;
            ajax.set(input);
            ajax.execute(function () {
                jex.success($.i18n.prop("lang_contEdited")); //"연락처가 수정되었습니다.");	//연락처가 수정되었습니다.
                gbox_pc_3000.fillUserTbl();
                $('#updateUserPopup').bPopup().close();
            });
        });
        // Button Delete 
        $("#btndelete").click(function () {
            jsonRec.length = 0;
            var userNameArray = [];
            var userNoArray = [];
            var hp_noArray = [];
            var tex = [];
            $("table#USR_TBL tbody tr:has(input:checked)").each(function (i, v) {
                var jsonItem = {
                    "USER_NO": $(v).find("#USER_NO").text(),
                    "USER_NM": $(v).find("#USER_NM").text(),
                    "HP_NO": $(v).find("#HP_NO").text()
                };
                jsonRec.push(jsonItem);
            });
            $('td input:checked').parents('td').siblings().find('#USER_NO').text();
            if (jsonRec.length == 0) {
                jex.warning($.i18n.prop("lang_itemSelectDel")); //삭제할 항목을 선택하세요.
            }
            else {
                //input["GROUPS"]=jex.toStr(jsonRec);
                //input["GRP_NO"] = _grpno;
                //jex.newWin( "/pop_gbox_pc_3020.act", "pop_gbox_pc_3020", 500, 250, input);
                $('#deleteUserPopup').bPopup({
                    onOpen: function () {
                        //$(document).keypress(function(e) {
                        //if(e.which == 13) {
                        //if($('#deleteUserPopup').css("display") != 'none'){
                        //$('#btnDeleteUser').click();	
                        //}
                        //}
                        //});
                    }
                });
                $.each(jsonRec, function (i, v) {
                    userNameArray.push(v.USER_NM);
                    userNoArray.push(v.USER_NO);
                    hp_noArray.push(v.HP_NO);
                    tex.push(v.USER_NM + "(" + v.HP_NO + ")");
                });
                $('#uName').text(tex);
            }
            //$("#deleteUserPopup #form").keypress(function(e){	
            //const keyCode = e.which || e.keyCode;
            //if (keyCode == 13) {
            //$('#btnDeleteUser').click();
            //}
            //});
        });
        $("#btnDeleteUser").click(function () {
            var ajax = jex.createAjaxUtil("pc_gruser_d001");
            ajax.set("GRP_NO", _grpno);
            ajax.set("DEL_REC", jsonRec);
            ajax.execute(function (dat) {
                jex.success($.i18n.prop("lang_contDeleted")); //"연락처가 삭제되었습니다."
                gbox_pc_3000.fillUserTbl();
                gbox_pc_2000.loadGroup();
                $('#deleteUserPopup').bPopup().close();
                $('#chkSelectAll').prop('checked', false);
            });
        });
        $("#excelUpload").click(function () {
            var input = {};
            input["GRP_NO"] = _grpno;
            gbox.popup.excelUpload(input, function (dat) {
            });
        });
        $("#excelDownload").click(function () {
            var input = {};
            input["GRP_NO"] = _grpno;
            //$("#target").attr("src", "/excel_export.jsp?data=" + jex.toStr(INQ_REC));
            $("#target").attr("src", "/user_excel_export.jsp?GRP_NO=" + _grpno);
        });
        //event select combo box
        $("#cmbo").change(function () {
            gbox_pc_2000.tbl.setCurrentPage(1);
            gbox_pc_2000.tbl.setSvrPageNo(1);
            gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
        });
        //event select combo box
        $("#cmbo1").change(function () {
            gbox_pc_3000.fillUserTbl();
        });
        $("#cmbo3").change(function () {
            gbox_pc_3010.tbl.setCurrentPage(1);
            gbox_pc_3010.tbl.setSvrPageNo(1);
            gbox_pc_3010.loadTotalMSGCnt();
        });
        //enent clik button for search
        $("#btnSearch").click(function () {
            if (!$("#submitForm").validationEngine('validate')) {
                return false;
            }
            gbox_pc_2000.tbl.setCurrentPage(1);
            gbox_pc_2000.tbl.setSvrPageNo(1);
            gbox_pc_2000.fillTbl(jex.getAllData("#submitForm"));
        });
        //Create message button		
        $(".btn_send").click(function () {
            gbox_pc_2000.loadCnt({
                "callback": function () {
                    /*
                    //for free remain 500건
                    if(_useIntt.USE_TYPE == "1" && _countFreeCount>0){//_useIntt.FREE_CNT>0
                        $("#FREE_CNT").text(_countFreeCount); //_useIntt.FREE_CNT
                        $("#freeRemaining").show();
                        $('#freeRemaining').bPopup(slideDown);
                        
                    }else if(_useIntt.USE_TYPE == "1" && _countFreeCount<1){ //_useIntt.FREE_CNT
                        //기관관리자
                        if(_orgCd.AUTH_GB == "1") {
                            $("#RegisterFeeUseForAdmin").show();
                            $('#RegisterFeeUseForAdmin').bPopup(slideDown);
                        }
                        //일반사용자
                        else {
                            $("#RegisterFeeUseForUser").show();
                            $('#RegisterFeeUseForUser').bPopup(slideDown);
                        }
                    }
                    else{
                    */
                    var input = {};
                    input["SAUP_NM"] = $("#SAUP_NM").text();
                    input["SEND_NM"] = $(".user_r_side").find("#SEND_NM").text();
                    input["CHRG_GB"] = _useIntt.CHRG_GB;
                    //						input["ORG_PHOTO"] = $(".user_view img:first").attr("src");
                    jex.newWin("/gbox_pc_1000.act", "pop_gbox_v2", 649, 632, input); // 640, 600		640, 576,
                    //}
                }
            });
        });
        $("#ConfirmFreeRemain").click(function () {
            $("#freeRemaining").hide();
            var _bPopUp = $('#freeRemaining').bPopup(slideDown);
            _bPopUp.close();
            var input = {};
            input["SAUP_NM"] = $("#SAUP_NM").text();
            input["SEND_NM"] = $(".user_r_side").find("#SEND_NM").text();
            input["CHRG_GB"] = _useIntt.CHRG_GB;
            jex.newWin("/gbox_pc_1000.act", "pop_gbox_v2", 640, 600, input); //640 ,600
        });
        $("#CloseFreeRemaning").click(function () {
            $("#freeRemaining").hide();
            var _bPopUp = $('#freeRemaining').bPopup(slideDown);
            _bPopUp.close();
        });
        $("#RigisterFeeForAdmin").click(function () {
            $("#RegisterFeeUseForAdmin").hide();
            var _bPopUp = $('#RegisterFeeUseForAdmin').bPopup(slideDown);
            _bPopUp.close();
            $("#popUp_PaidUseSetting").show();
            $("#popUp_PaidUseSetting").bPopup(slideDown);
            $("#REG_GBR").attr('checked', "checked");
            //	const  selectVal =$("input[type='radio'][name='REG_GB']:checked").val();
        });
        $("#ClsRegisterFeeUseForAdmin,#CancelRigisterFeeForAdmin").click(function () {
            $("#RegisterFeeUseForAdmin").hide();
            var _bPopUp = $('#RegisterFeeUseForAdmin').bPopup(slideDown);
            _bPopUp.close();
        });
        $("#ClsRegisterFeeUseForUser,#CancelRigisterFeeForUser").click(function () {
            $("#RegisterFeeUseForUser").hide();
            var _bPopUp = $('#RegisterFeeUseForUser').bPopup(slideDown);
            _bPopUp.close();
        });
        // visible click function
        $("#btnVisible").click(function () {
            $(".tit_top_layer").hide();
            $("#visibleTable").toggle();
            $(this).find("img").toggle();
        });
        // Button Move Category Up, Down, Top, Bottom
        $("#last,#next,#prev,#first").click(function () {
            var row = $(".view_setting_lst li.on");
            if ($(this).is("#first")) {
                row.insertBefore(".view_setting_lst li:first");
            }
            else if ($(this).is("#next")) {
                row.insertAfter(row.next());
            }
            else if ($(this).is("#prev")) {
                row.insertBefore(row.prev());
            }
            else {
                row.insertAfter(".view_setting_lst li:last");
            }
        });
        $(".view_setting_lst li").live("click", function () {
            $(this).closest("li").addClass('on').siblings().removeClass('on');
        });
        $("#visibleCancel").live("click", function () {
            $(this).parents(".lypopup_wrap").hide();
            $("#btnVisible").find("img:eq(0)").show();
            $("#btnVisible").find("img:eq(1)").hide();
            var a = $(".view_setting_lst input");
            if (a.filter(":checked").length == 0) {
                gbox_pc_2000.visibleView();
            }
        });
        $("#visibleSave").click(function () {
            if (!jex.isNull(gbox_pc_2000.tbl)) {
                delete (gbox_pc_2000.tbl);
            }
            $(this).parents(".popup_wrap").hide();
            var a = $(".view_setting_lst input");
            if (a.filter(":checked").length == 0) {
                jex.warning($.i18n.prop("lang_plsSelectOneCol")); //"적어도 하나의 열을 선택하세요."
                $("#visibleTable").show();
                return;
            }
            $('.view_setting_lst input').each(function (i, v) {
                var item = {};
                if ($(this).is(':checked')) {
                    item["INQ_GB"] = "1";
                    item["INQ_CD"] = $(this).val();
                }
                else {
                    item["INQ_GB"] = "0";
                    item["INQ_CD"] = $(this).val();
                }
                jsonRec[i] = item;
            });
            var ajax = jex.createAjaxUtil("pc_scrinq_u001");
            ajax.set("REG_REC", jsonRec);
            ajax.execute(function () {
                gbox_pc_2000.visibleView();
            });
        });
        $(".btn_add_group").click(function () {
            $(".lnb_box").css("min-height", "640px");
            $(this).prev().slideDown("show");
            $("#GR_NM").focus();
            $("#GR_NM").val('');
            //		const $popup1 = $(this).parents("div#group");
        });
        $(".opt #icon_del").live("click", function () {
            //	$(".btn_add_group").prev().slideToggle();
            $("#GR_NM").val('');
            $(this).parents("div#edit_group").hide().prev("li").find("#group").show();
            $(".lnb_box").css("min-height", "598px");
        });
        $("#editGroup").live("click", function () {
            temGrpNm = $(this).parents("div#group").find("a").data("grp_nm");
            //$(this).parents("div#group").hide().parents("li").next().show();
            var $popup1 = $(this).parents("div#group");
            var $popup = $(this).parents("div#group").hide().parents("li").next();
            $(".edit_group_box").not($popup).hide();
            $("div#group").not($popup1).show();
            $popup.show();
            $("input#GRP_NM").focus();
            $(".select_com").show();
        });
        $(".btn_clear").live("click", function () {
            $("#GR_NM").val('');
        });
        /* Add more groupName  //parents(".opt").prev().find('input').val();
        $("#btnSaveGr").on('click',function(){
            $("#GR_NM").focus();
            const grpNm = $("#GR_NM").val();
            
            for(const i=0;i<countGroupNm.length;i++){
                if(grpNm == countGroupNm[i].GRP_NM){
                    alert("String contain word");
                //	return true;
                }
            }
            
                input['GRP_NM'] = grpNm+"("+(j)+")";
            
            const ajax = jex.createAjaxUtil("pc_group_c001");
            ajax.set(input);
            ajax.execute(function() {
                
                $.tmpl( tmp, { "GRP_NM" : input.GRP_NM ,"GRP_NO":11}).appendTo( "#groupName" );
                    jex.success("그룹 추가되었습니다.");
                    $("#GR_NM").val('');
            });
        });*/
        // Create and Edit Group 
        $("#btnSaveGr").live('click', function () {
            var checkNm = false;
            $("#GR_NM").focus();
            var _this = $(this);
            var grpNo = $(this).parents(".opt").prev().find('input').data("grp_no");
            var grpNm = $(this).parents(".opt").prev().find('input').val();
            var grpNm1 = $("#edit_group #GR_NM").val();
            if (jex.isNull(grpNm1 || grpNm)) {
                jex.warning($.i18n.prop("lang_grpNmReg")); //"그룹명을 입력하세요."
                return;
            }
            var wsvc = null;
            var selector = null;
            if (jex.isNull(grpNo)) {
                wsvc = "pc_group_c001";
                selector = "ul#groupName li";
            }
            else {
                wsvc = "pc_group_u001";
                selector = "ul#groupName li[data-grp_no!='" + grpNo + "']";
            }
            var input = {};
            input['GRP_NM'] = $("#GR_NM").val();
            input['GRP_NM'] = $(this).parents(".opt").prev().find('input').val();
            input['GRP_NO'] = grpNo;
            var j = 1;
            var k = 0;
            var numbers = [];
            $(selector).each(function (i) {
                if (input.GRP_NM == $(this).data("grp_nm")) {
                    k = 1;
                    checkNm = true;
                }
                var stIn = ($(this).data("grp_nm") + "").lastIndexOf('(');
                var lsIn = ($(this).data("grp_nm") + "").lastIndexOf(')');
                if (input.GRP_NM == ($(this).data("grp_nm") + "").substring(0, stIn)) {
                    if (k == 1) {
                        j++;
                        checkNm = true;
                        // Originally
                        var number = ($(this).data("grp_nm") + "").substring(stIn + 1, lsIn);
                        if (!isNaN(number)) {
                            numbers.push(number);
                        }
                    }
                    else {
                        checkNm = false;
                    }
                }
            });
            if (checkNm) {
                var grpNo_1;
                if (numbers.length > 0) {
                    grpNo_1 = Math.max.apply(null, numbers) + 1;
                }
                else {
                    grpNo_1 = 1;
                }
                if (!confirm(input.GRP_NM + "는 이미 존재하는 그룹명입니다. " + input.GRP_NM + "(" + grpNo_1 + ")" + "로 변경 하시겠습니까?")) {
                    return false;
                }
                input['GRP_NM'] = input.GRP_NM + "(" + grpNo_1 + ")";
            }
            var ajax = jex.createAjaxUtil(wsvc);
            ajax.set(input);
            ajax.execute(function () {
                if (jex.isNull(input['GRP_NO'])) {
                    $("#groupName").empty();
                    jex.success($.i18n.prop("lang_grpAdded")); //"그룹이 추가되었습니다.";
                    $("#GR_NM").val('');
                    gbox_pc_2000.loadGroup();
                }
                else {
                    if (grpNm == temGrpNm) {
                        $(".opt #icon_del").parents("div#edit_group").hide().prev("li").find("#group").show();
                    }
                    else {
                        jex.success($.i18n.prop("lang_grpEdited")); //"그룹이 수정되었습니다.");
                        $(".opt #icon_del").parents("div#edit_group").hide().prev("li").find("#group").show();
                        _this.parents("div#edit_group").prev("li").find('a.com_sub_item').text(input.GRP_NM);
                        gbox_pc_2000.loadGroup();
                    }
                }
            });
        });
        $("#GR_NM").keypress(function (e) {
            if (e.which == 13)
                $(this).parents("span").next().find("#btnSaveGr").click();
        });
        $("#GRP_NM").live("keydown", function (e) {
            if (e.which == 13)
                $(this).parents("#edit_group").find('#btnSaveGr').click();
        });
        $("#delGroup").live('click', function () {
            $("#popDelGroup").show();
            _Delete = $(this);
            var grpNm = $(this).parents("li").find('a').data("grp_nm");
            var grpNo = $(this).parents("li").find('a').data("grp_no");
            $("#popDelGroup #GRP_NO").text(grpNo);
            $(".alert_pop_wrap #GRP_NM").text("‘" + grpNm + "’");
            $('#popDelGroup').bPopup(slideDown);
        });
        // Delete groupName
        $("#btnDeleteGroup").live("click", function () {
            var _this = this;
            var bPopup = $('#popDelGroup').bPopup(slideDown);
            var _grpNm = $(this).parents(".popup_cnt").find("#GRP_NM").text();
            var _grpNo = $(this).parents(".popup_wrap").find("#GRP_NO").text();
            var jsonRec = [];
            var jsonitem = {
                "GRP_NO": _grpNo,
                "GRP_NM": _grpNm
            };
            jsonRec.push(jsonitem);
            var input = {};
            input["DEL_REC"] = jsonRec;
            var ajax = jex.createAjaxUtil("pc_group_d001");
            ajax.set(input);
            ajax.execute(function () {
                //_Delete.parents("li").find("div#group").remove();
                _Delete.parents("li").remove();
                _Delete.parents("li").next("div#group").remove();
                //_Delete.parents("ul").find("li").remove();
                jex.success($.i18n.prop("lang_grpDeleted")); //'그룹이 삭제되었습니다.';
                $("#popDelGroup").hide();
                bPopup.close();
                //gbox_pc_2000.fillTbl();
                //$(".content").css("display","none");
                //$(".content_wrap").css("display","block");
                //$(".paging_wrap").show();
                gbox_pc_2000.initScroll();
                /*
                 const container = $('#scroll');
                 const api = container.data('jsp');
                     api.destroy();
                        
                $("#scroll").jScrollPane({
                    autoReinitialise: true,
                    verticalDragMinHeight: 20,
                    verticalDragMaxHeight: 20,
                    horizontalDragMinWidth: 20,
                    horizontalDragMaxWidth: 20,
                    hideFocus: true
                });
                */
                //refresh group after deleted each group name
                /* if($("#tbl_list tbody tr").length==0){
                     gbox_pc_2000.visibleView();
                 }
                 $("#linkGroups img").attr("src","../img/ico/ico_folder.png");
                 $("#linkhostory img").attr("src","../img/ico/ico_book_on.png");
                 $("#searchHead").val('');
                 gbox_pc_2000.showMessageList();
                 $("#linkhostory").parents("div.group_name").addClass("on"); */
                $("#linkGroups img").attr("src", "../img/ico/ico_folderon.png");
                $("#linkhostory img").attr("src", "../img/ico/ico_book.png");
                $("#receptionHistory img").attr("src", "../img/ico/ico_book.png");
                $("div.group_name").removeClass("on");
                $(_this).parents("div.group_name").addClass("on");
                $("#GROUP_TBL #groupName li:first .com_sub_item").click();
                $("#searchContact").val('');
            });
        });
        $("ul#groupName li div#group").live("click", function () {
            $("#linkGroups img").attr("src", "../img/ico/ico_folderon.png");
            $("#linkhostory img").attr("src", "../img/ico/ico_book.png");
            $("#receptionHistory img").attr("src", "../img/ico/ico_book.png");
        });
        $("#linkGroups").click(function () {
            var _this = this;
            setTimeout(function () {
                $("#linkGroups img").prop("src", "../img/ico/ico_folderon.png");
                $("#linkhostory img").prop("src", "../img/ico/ico_book.png");
                $("#receptionHistory img").prop("src", "../img/ico/ico_book.png");
                $("div.group_name").removeClass("on");
                $(_this).parents("div.group_name").addClass("on");
                $("#GROUP_TBL #groupName li:first .com_sub_item").click();
                $("#searchContact").val('');
                $("#detailUp").css("display", "inline-block");
            }, 100);
        });
        $("#setTimeSMS").live("click", function () {
            $(this).parents(".tit_top_layer").hide();
            pop_gbox_pc_4310.loadSmsTransmission();
            $("#popUp_SMS").bPopup(slideDown);
            $("input").on("click", function () {
                if ($("#popUp_SMS #NOTI_GBN").prop("checked")) {
                    $("#popUp_SMS #SMSNOTI_TIME").prop('disabled', 'disabled');
                }
            });
            //	jex.newWin( "/pop_gbox_pc_4310.act","", 1000,680 );
        });
        $("#btnEditSms").click(function () {
            var bPopup = $("#popUp_SMS").bPopup();
            var ajax = jex.createAjaxUtil("pc_smsreg_u001");
            //ajax.set("NOTIGB",$(".sms_box #SMSNOTI_TIME").val());
            //ajax.set("SMSNOTI_TIME",$(".sms_box #SMSNOTI_TIME").val());
            ajax.set(jex.getAllData("#sendForm"));
            ajax.execute(function (dat) {
                jex.success($.i18n.prop("lang_updated")); //"수정되었습니다.";
                $("#popUp_SMS").hide();
                bPopup.close();
            });
        });
        $("#cancelSMS,#closePopUp").click(function () {
            $("#popUp_SMS").hide();
            var bPopup = $('#popUp_SMS').bPopup();
            bPopup.close();
        });
        /*     11-12-2014    */
        // pop_up SMS 발송 설정
        $("#smsSendSetting").live("click", function () {
            $(this).parents(".tit_top_layer").hide();
            pop_gbox_pc_4310.loadSmsSendSetting();
            $("#popUp_SmsSendSetting").bPopup(slideDown);
            //do
        });
        //Update SMS 발송 설정  
        $("#saveSmsSendSetting").click(function () {
            var _bPopUp = $("#popUp_SmsSendSetting").bPopup();
            var ajax = jex.createAjaxUtil("pc_smsreg_u002");
            ajax.set(jex.getAllData("#form_SmsSendSetting"));
            ajax.execute(function (dat) {
                jex.success($.i18n.prop("lang_updated"));
                $("#popUp_SmsSendSetting").hide();
                _bPopUp.close();
            });
        });
        // cancel SMS 발송 설정
        $("#cancelSmsSendSetting").click(function () {
            $("#popUp_SmsSendSetting").hide();
            var _bPopUp = $("#popUp_SmsSendSetting").bPopup();
            _bPopUp.close();
        });
        // pop_up 유료 사용 설정
        $("#paidUseSetting").live("click", function () {
            $(this).parents(".tit_top_layer").hide();
            $("#REG_GBR").attr('checked', "checked");
            $("#popUp_PaidUseSetting").bPopup(slideDown);
            //do
        });
        $("#savePaidUseSetting").click(function () {
            var ajax = jex.createAjaxUtil("pc_use_org_c001");
            ajax.set(jex.getAllData("#popUp_PaidForm"));
            ajax.execute(function (dat) {
                jex.success($.i18n.prop("lang_updated"));
                $("#popUp_PaidUseSetting").hide();
                var _bPopUp = $("#popUp_PaidUseSetting").bPopup();
                _bPopUp.close();
            });
        });
        $("#cancelPaidUseSetting").click(function () {
            $("#popUp_PaidUseSetting").hide();
            var _bPopUp = $("#popUp_PaidUseSetting").bPopup();
            _bPopUp.close();
        });
        /*  // 11-12-2014    */
        $("#cancelDelGroup,#cancelDelGroup1").click(function () {
            $("#popDelGroup").hide();
            var bPopup = $('#popDelGroup').bPopup();
            bPopup.close();
        });
        $("#GROUP_TBL #groupName li").live("click", function () {
            $("div.group_name").removeClass("on");
            $(this).parents("#GROUP_TBL").prev("div.group_name").addClass("on");
            $(this).closest("li").addClass('on').siblings().removeClass('on');
        });
        $("#linKGroup").live("click", function () {
            $(this).parents(".tit_top_layer").hide();
            $("#setting").find("img").toggle();
            jex.newWin("/gbox_pc_4200.act", "gbox_pc_4200", 640, 560);
        });
        $("#editProfile").live("click", function () {
            $(this).parents(".tit_top_layer").hide();
            gbox_pc_3000.loadProfile();
            //$("#PHOTO_FILENAME").val("");
            $('#profileForm').bPopup({
                easing: 'easeOutBack',
                zIndex: 989,
                speed: 450,
                transition: 'slideDown'
            });
        });
        $("#cancelBtn").live("click", function () {
            //			$("#profileForm").hide();
            var bPopup = $('#profileForm').bPopup();
            bPopup.close();
        });
        $("#cancelUserPop").live("click", function () {
            $("#submitFormUser #USER_NM").val("");
            $("#submitFormUser #HP_NO").val("");
            $("#submitFormUser #BIGO").val("");
            $('#newUserPopup').bPopup().close();
        });
        $("#closeUpdateUserPopup").live("click", function () {
            $('#updateUserPopup').bPopup().close();
        });
        $("#closeDeleteUserPopup").live("click", function () {
            $('#deleteUserPopup').bPopup().close();
        });
        $("#closeVieSendPopup").live("click", function () {
            $('#viewSendPopUp').bPopup().close();
        });
        $("#updateBtn").click(function () {
            if (!$("#profileUserForm").validationEngine('validate')) {
                return false;
            }
            /*if(jex.isNull($("#profileForm #SEND_NM").val())){
                jex.warning("발송자명을 입력하세요.");
                return;
            }*/
            var input = jex.getAllData("#profileForm");
            input["UPLOADER"] = "bb";
            input["PHOTO"] = $("#profileForm").find("#PHOTO_IMG").data("uid");
            input["FILENAME"] = $("#profileForm").find("#PHOTO_IMG").data("filename");
            input["FILESIZE"] = $("#profileForm").find("#PHOTO_IMG").data("filesize");
            input["IMGPATH"] = $("#profileForm").find("#PHOTO_IMG").data("imgpath");
            input["THUMBIMGPATH"] = $("#profileForm").find("#PHOTO_IMG").data("thumbimgpath");
            var ajax = jex.createAjaxUtil("pc_profile_u001");
            ajax.set(input);
            gbox.ui.createProgressBar();
            ajax.execute(function (dat) {
                jex.success($.i18n.prop("lang_updated"));
                gbox.ui.destroyProgressBar();
                $(".user_view img:first").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + $("#profileForm").find("#PHOTO_IMG").data("uid"));
                $(".user_view").find("#SEND_NM").text($("#profileForm").find("#SEND_NM").val());
                $('#profileForm').bPopup().close();
            });
        });
        $(".btn_photo_x").click(function () {
            if (!jex.isNull($("#PHOTO_IMG").data("uid"))) {
                $("#PHOTO_IMG").attr("src", "../img/bg/photo_null.jpg");
                $.get("/upload?cmd=delete&uid=" + $("#PHOTO").val(), function (dat) {
                    //					 $("#PHOTO").val("");
                    $("#PHOTO_IMG").data("uid", "");
                    $(".btn_photo_x").hide();
                    jex.warning($.i18n.prop("lang_prlPhotoDeleted")); //"프로필 사진이 삭제되었습니다.");
                });
            }
        });
        $(".thumb_box").mouseover(function () {
            if (!jex.isNull($("#PHOTO_IMG").data("uid"))) {
                if ($('img#PHOTO_IMG').attr('src') != "../img/bg/photo_null.jpg") {
                    $(".btn_photo_x").show();
                }
            }
        });
        $(".thumb_box").mouseleave(function () {
            $(".btn_photo_x").hide();
        });
        /*$("#setting1").click(function(){
                
            $(".tit_top_layer").toggle();
        });*/
        $("#setting").live("click", function () {
            $(".tit_top_layer").toggle();
            $("#visibleTable").hide();
            //$(this).find("img").toggle();
        });
        $("#detailD").click(function () {
            $("#block_srch").slideDown();
            $("#detailD").hide();
            $("#detailU").show();
            $("#INQ_DATA").focus();
        });
        $("#detailU").click(function () {
            $("#block_srch").slideUp();
            $("#detailU").hide();
            $("#detailD").show();
        });
        /*Detail view screen when clicked.*/
        $("#detailDown").click(function () {
            $("#detailDown").hide();
            $("#detailUp").show();
            $("#block_search").slideDown();
        });
        $("#detailUp").click(function () {
            $("#detailUp").hide();
            $("#detailDown").show();
            $("#block_search").slideUp();
        });
        $("detailHis").click(function () {
            $("#bl_srch").slideDown();
            $("#detailHis").hide();
            $("#detailHistory").show();
            $("#INQ_DATA").focus();
        });
        $("#detailHistory").click(function () {
            $("#bl").slideUp();
            $("#detailHis").hide();
            $("#detailHistory").show();
        });
        //		$("#btnSearchHead").click(function(){
        $('.srch_field').on('click', 'a#btnSearchHead', function () {
            $("#searchHead").focus();
            var input = {};
            if ($("#searchHead").attr("placeholder") == $("#searchHead").val()) {
                input["INQ_DATA"] = "";
            }
            else {
                input["INQ_DATA"] = $("#searchHead").val();
            }
            //gbox_pc_2000.tbl.setCurrentPage(1);
            //gbox_pc_2000.tbl.setSvrPageNo(1);
            gbox_pc_2000.fillTbl(input);
        });
        $('.srch_field').on('click', 'a#btnSearchRecep', function () {
            _search_top = true;
            gbox_pc_4000.fillTable(1);
        });
        $("#hisReceptionTable #INQ_DATA").on('keyup', function (e) {
            if (e.keyCode == 13) {
                _search_top = false;
                gbox_pc_4000.fillTable(1);
            }
        });
        //		$("#searchHead").keyz({
        //			"enter": function(ctrl, sft, alt, event) {
        $('.srch_field').on('keyup', 'input#searchHead', function (e) {
            if (e.keyCode == 13) {
                var input = {};
                input["INQ_DATA"] = $("#searchHead").val();
                gbox_pc_2000.tbl.setCurrentPage(1);
                gbox_pc_2000.tbl.setSvrPageNo(1);
                gbox_pc_2000.fillTbl(input);
            }
        });
        //		ReceptionMsgSearch
        $('#searchRece').on('keyup', function (e) {
            if (e.keyCode == 13) {
                _search_top = true;
                gbox_pc_4000.fillTable(1);
            }
        });
        /*------------ search header on gbox_pc_3000 ----------------*/
        //		$("#btnSearchContact").click(function(){
        $('.srch_field').on('click', 'a#btnSearchContact', function () {
            $("#searchContact").focus();
            var input = {};
            input["USER_NM"] = $("#searchContact").val();
            gbox_pc_3000.tbl.setCurrentPage(1);
            gbox_pc_3000.tbl.setSvrPageNo(1);
            gbox_pc_3000.fillUserTbl(input);
        });
        $('.srch_field').on('keyup', 'input#searchContact', function (e) {
            if (e.keyCode == 13) {
                var input = {};
                input["USER_NM"] = $("#searchContact").val();
                gbox_pc_3000.tbl.setCurrentPage(1);
                gbox_pc_3000.tbl.setSvrPageNo(1);
                gbox_pc_3000.fillUserTbl(input);
            }
        });
        /*------------ search header on gbox_pc_4000 ----------------*/
        $('#btn_Search').on('click', function () {
            _search_top = false;
            gbox_pc_4000.fillTable(1);
        });
        /*
        $('#btn_Search').on('keyup', 'a#btn_Search', function(e) {
            if(e.keyCode == 13) {
                const input = {};
                input["INQ_DATA"] = $("#block_search #INQ_DATA").val();
                gbox_pc_4000.fillTable(1);
            }
        });*/
        //		$("#searchContact").keyz({
        //			"enter": function(ctrl, sft, alt, event) {
        //				const input={};
        //				input["USER_NM"]= $("#searchContact").val();
        //				gbox_pc_3000.tbl.setCurrentPage(1);
        //				gbox_pc_3000.tbl.setSvrPageNo(1);
        //				gbox_pc_3000.fillUserTbl(input);
        //				
        //			}
        //		});
        $("#clsePopUPViewMessage").live("click", function () {
            var bPopup = $('#popUPViewMessage').bPopup();
            $("#popUPViewMessage").hide();
            bPopup.close();
        });
        /*
        $(".btn_thum_prev").click(function(){
            if(slider != undefined ){
                slider.goToPrevSlide();
                $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum.png");
                $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum_on.png");
            
                
                
            }
        });
        $(".btn_thum_next").click(function(){
            if(slider != undefined ){
                slider.goToNextSlide();
                $(".btn_thum_prev img").attr("src","../img/btn/btn_prev_thum_on.png");
                $(".btn_thum_next img").attr("src","../img/btn/btn_next_thum.png");
            }
        });
        */
        // input phone Number validate (OnlyNumber allow Copy cut past) for fireFox
        /*$("#submitFormUser #HP_NO").on("keypress blur",function (event) {
            $(this).val($(this).val().replace(/[^\d]+/, ""));
            if ((event.which != 37 || event.which != 39) && (event.which != 8 && event.which != 0) && (event.which !=118 && event.which !=120 && event.which !=99) && (event.which < 48 || event.which > 57)) {
               event.preventDefault();
            }
        });*/
        /*
        $("#submitFormUser #HP_NO").on('keypress', function(ev) {
            const keyCode = window.event ? ev.keyCode : ev.which;
            //$(this).val($(this).val().replace(/[^\d]+/g, ""));
            //codes for 0-9
            if (keyCode < 48 || keyCode > 57) {
                //codes for backspace, delete, enter
                if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {
                    ev.preventDefault();
                }
            //ev.preventDefault();
            }
        });
        */
        //2015-june-22 start
        //		$("#submitFormUser #USER_NM,#updateUserForm #USER_NM,#profileUserForm #SEND_NM").on('keypress', function(ev) {
        //		    const keyCode = window.event ? ev.keyCode : ev.which;
        //		    return ((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57));
        //		
        //		});	
        //end
        $("#tbl_list #SEND_NM").live("mouseover", function () {
            $(this).attr("title", $(this).text());
            //$( this ).text();
        });
        $(".recieve_msg_cnt").live("click", function () {
            $("#popUPViewMessage").bPopup(slideDown);
            $(".user_view2 #SEND_NM").text('');
            gbox_pc_2010.loadViewMessage({ "MSG_NO": $(this).parents("tr").data("msg_no") });
        });
        $(window).on("unload", function () {
            //$.cookie("lang", ""); // delete your cookie here
        });
		$(".newbutton").click(function () {
			var input ={};
			input["LNGG_DSNC"]=_lang;
			var jexAjax = jex.createAjaxUtil("user_terms_r001");
			// var jexAjax = jex.createAjaxUtil("user_policy_r001");
			jexAjax.set(input);
			jexAjax.execute(function(data) {
	           if(data){
					popupwindow(data.TERMS_URL, "terms", 721, 573);
					
				
					
	            }      
			});
		});		
    }
}))();
var slideDown = {
    easing: 'easeOutBack',
    speed: 450,
    transition: 'slideDown'
};
var T01 = '<col style="width:150px;"/>';
var T02 = '<col style=""/>';
var T03 = '<col style="width:135px;"/>';
var T04 = '<col style="width:86px;"/>';
var T05 = '<col style="width:100px;"/>';
var T06 = '<col style="width:80px;"/>';
var T07 = '<col style="width:75px;"/>';
var H01 = '<th scope="col" id="h01"><div i18nCd="lang_01">발송내역</div></th>';
var H02 = '<th scope="col" id="h02"><div i18nCd="lang_02">메시지 내용</div></th>';
var H03 = '<th scope="col" id="h03"><div i18nCd="lang_03">발송구분</div></th>	';
var H04 = '<th scope="col" id="h04" class="bory"><div class="tar" i18nCd="lang_04">미확인/전체</div></th>';
var H05 = '<th scope="col" id="h05"><div i18nCd="lang_05">발송자명</div></th>';
var H06 = '<th scope="col" id="h06"><div i18nCd="lang_06">사업장</div></th>';
var H07 = '<th scope="col" id="h07"><div class="tar" i18nCd="lang_07">SMS건수</div></th>';
var C01 = '<td id="col01"><div id=""><span id="REG_DT"></span>&nbsp;<span id="REG_TM"></span></div> </td>';
var C02 = "";
var C04 = "";
//const C02 = '<td id="col02" class="tal"><div><a href="javascript:" class="msg_cnt" id="Ttext" ><span id="MSG_TXT"></span</a></div></td>';
var C03 = '<td id="col03"><div><span id="CHNL_CODE" style="display:none;"></span><span id="AppType"></span></div></td>';
/*const C03 = '<td id="col03"><div><span id="CHNL_CODE";"></div></td>';*/
//const C04 = '<td id="col04" class="tar"><div id="CNT"><a href="javascript:" class="msg_cnt"><strong  class="num_red" id="MI_CNT"></strong>/<span id="TOT_CNT"></span></a></div></td>';
var C05 = '<td id="col05"><div style="text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"><span id="SEND_NM" data-id="SEND_NM" title="" ></span></div></td>';
var C06 = '<td id="col06"><div style="text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"><span id="SAUP_NM"></span></div></td>';
var C07 = '<td id="col07" class="tar"><div><span id="SMS_CNT"></span><span>건</span></div></td>';
//const C07 = '<td id="col07" class="tar"><div><span id="smsCnt"></span></div></td>';
//---------------------User-------------------//
/*gbox_pc_4200.fillTbl = function(input) {
    if(!input) input = {};
    if(jex.isNull(gbox_pc_4200.tbl)) {
        gbox_pc_4200.tbl = jex.plugin.newInstance("JEX_TBL","#USR_TBL");
        gbox_pc_4200.tbl.addEvent("onSvrPageChange", function(dat) {
            input["PAGINATION"] = {
                "PAGE_NO": dat,
                "PAGE_SIZE": gbox_pc_4200.tbl.getSvrPageSize()
            };
             (input);
        });
        
        //REG_DT formatting
        gbox_pc_4200.tbl.addFormatter("REG_DT", function(dat) {
            return moment(dat, "YYYYMMDD").format("YYYY-MM-DD");
        });
        //LINK_GB formatting
        gbox_pc_4200.tbl.addFormatter("LINK_GB", function(dat) {
            if(dat == "1") {
                return "APP";
            }
            else if(dat == "2") {
                return "URL";
            }
        });
        gbox_pc_4200.tbl.onClick("APP_NM", function(row) {
            
            row["WEB_URL"] = jex.null2Void(row["WEB_URL"]);
            
            gbox.popup.linkAppForm(row, function(dat) {
                gbox_pc_4200.tbl.setCurrentPage(1);
                gbox_pc_4200.tbl.setSvrPageNo(1);
                gbox_pc_4200.fillTbl();
            });
        });
    }
    $("table tbody input:checkbox").on("click", function() {
        if($(this).is(":checked")) {
            $(this).closest("tr").addClass("on");
        }
        else {
            $(this).closest("tr").removeClass("on");
        }
    });
    const cmb = $("#cmbo1").val();
    gbox_pc_4200.tbl.setPaging("div:#paging;per:"+cmb);
    if(jex.isNull(input["PAGINATION"])) {
        const hString = jex.getHString();
        
        if(hString) {
            gbox_pc_4200.tbl.setCurrentPage(hString["currentPage"]);
            gbox_pc_4200.tbl.setSvrPageNo(hString["svrPage"]);
        }
        
        const hash = {};
        hash['currentPage']	=	"1";
        hash['svrPage']		=	"1";
        jex.setHString(hash);
        
        input["PAGINATION"] = {
            "PAGE_NO": "1",
            "PAGE_SIZE": gbox_pc_4200.tbl.getSvrPageSize()
        };
    }
    
    const ajax = jex.createAjaxUtil("pc_link_r001");
    ajax.set(input);
    gbox.ui.createProgressBar();
    ajax.execute(function(dat) {
        ;
        gbox_pc_4200.tbl.setTotalRows(dat["PAGINATION"].TOTAL_ROWS);
        gbox_pc_4200.tbl.setLastSvrPageNo(dat["PAGINATION"].TOTAL_PAGES);
        gbox_pc_4200.tbl.setAll(dat['INQ_REC']);
        
        
        if(dat['INQ_REC'].length > 0) {
            $("#tfoot").hide();
        }
        else {
            $("#tfoot").show();
        }
        gbox.ui.destroyProgressBar();
        //gbox_pc_4200.fillTbl();
    });
};*/
/*---------------------gbox_pc_3000 ----------------------*/


function popupwindow(url, title, w, h) {
    var y = window.outerHeight / 2 + window.screenY - ( h / 2)
    var x = window.outerWidth / 2 + window.screenX - ( w / 2)
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x);
} 

// All checked of checkbox
$("#chkSelectAll").live("click", function () {
    $("table#USR_TBL > tbody > tr input:checkbox").prop("checked", $(this).is(":checked"));
    //$("table#USR_TBL tbody tr:has(input:checked)").not($(this)).prop('checked', "checked");	
    if ($(this).is(":checked")) {
        $("table thead tr").addClass("on");
    }
    else {
        $("table thead tr").removeClass("on");
    }
});
//const slider;
/* End set pagination and filltbl data gbox_pc_3010 */
var date = "";
// set cookies
function fn_checkBox() {
    var _url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    //const _url = window.location.href;
    //const _user_cookie =_strPtlId + _strUserId + _strChnlId + _url+""; 
    var _user_cookie = "DontOpenPopupFlag";
    var checked = document.getElementById("intro_chk").checked;
    if (checked) {
        checked = true;
        cf_setCookie(_user_cookie, _user_cookie, 14);
        // close_smartPop();
        var _bPopUp = $('#userDevidePopUpFram').bPopup(slideDown);
        _bPopUp.close();
        $("#colorbox").hide();
        //	$("#colorbox").fastToggle(30);
    }
    else {
        checked = false;
        cf_setCookie(_user_cookie, "", -14);
    }
}
;
var fileCallback = function (files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var val = file["FILE_NM"];
        if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
            //$("#PHOTO").val(file["FILE_IDNT_ID"]);
            //$("#PHOTO_FILENAME").val(file["FILE_NAME"]);
            //$("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&uid=" + file["FILE_IDNT_ID"]);
            $("#PHOTO_IMG").attr("src", file["THUM_IMG_PATH"]);
            $("#PHOTO_IMG").data("uploader", "bb");
            $("#PHOTO_IMG").data("uid", file["FILE_IDNT_ID"]);
            $("#PHOTO_IMG").data("filename", file["FILE_NM"]);
            $("#PHOTO_IMG").data("filesize", file["FILE_SIZE"]);
            $("#PHOTO_IMG").data("imgpath", file["IMG_PATH"]);
            $("#PHOTO_IMG").data("thumbimgpath", file["THUM_IMG_PATH"]);
        }
        else {
            jex.warning($.i18n.prop("lang_imgRequire")); //"이미지파일 형식만 선택 가능합니다. (허용포맷: jpg, png, gif, bmp, jpeg)");
        }
    }
};
function changeLang(lang) {
    jQuery.i18n.properties({
        name: 'gbox_pc_2000',
        path: '/lang/',
        mode: 'both',
        language: lang,
        async: true,
        callback: function () {
            gbox.ui.setAllLang("body", $.i18n.prop);
        }
    });
}
