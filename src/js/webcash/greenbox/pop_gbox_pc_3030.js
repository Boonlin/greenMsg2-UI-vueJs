/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      :
 * @File path    	 :
 * @author       	 : Long Bunna ( long_bunna@ymail.com )
 * @Description    : (팝업)엑셀 가져오기 view
 * @History      	 : 20140425090946, Long Bunna
 * </pre>
 **/
var gbox_pc_3030 = {};
var REG_REC = {};
var INQ_REC = {};
new (Jex.extend({
    onload: function () {
        gbox.ui.setSingleFileUploader("#EXCELUPLOAD", {
            keyTarget: "#EXCELUPLOAD_UID",
            allowedExts: "xls,xlsx",
            onAfterUpload: function (dat) {
                var val = dat.fileName;
                if (val.match(/(?:xls|xlsx)$/gi)) {
                    gbox.ui.createProgressBar();
                    //	    			$("#TBL_USER tbody").show();
                    if (jex.isNull(gbox_pc_3030.userTbl)) {
                        gbox_pc_3030.userTbl = jex.plugin.newInstance("JEX_TBL", "#TBL_USER");
                    }
                    var jexAjax = jex.createAjaxUtil("pc_grexelsnd_r001");
                    jexAjax.set("FILE_ID", dat.uid);
                    jexAjax.execute(function (json) {
                        REG_REC = json;
                        if (json.REC.length == 0) {
                            //jex.warning("데이터가 없습니다.");
                            jex.warning($.i18n.prop("lang_noData"));
                            $("#TBL_USER tbody").hide();
                            $("#FILENAME").val("");
                        }
                        else {
                            $("#FILENAME").val(dat.fileName);
                            $("#btnExcelDelete").css("display", "inline-block");
                            gbox_pc_3030.userTbl.setAll(json.REC);
                            $("#TBL_USER tbody").show();
                        }
                        gbox.ui.destroyProgressBar();
                    });
                }
                else {
                    //					jex.warning("Import Excel File invalid (supported only xls,xlsx formats) ");
                    //jex.warning("엑셀파일 형식만 선택 가능합니다. (허용포맷: xls,xlsx)");
                    jex.warning($.i18n.prop("lang_formatAllow"));
                }
            }
        });
        //--- todo onload start ---//
    }, event: function () {
        //--- define event action ---//
        $("#btnExcelPattern").click(function () {
            //			$("#target").attr("src", "/excel_export.jsp");
            location.href = "/download/Contact.xls";
        });
        $("#btnSave").click(function () {
            if (!jex.isNull(REG_REC.REC)) {
                var ajax = jex.createAjaxUtil("pc_gruser_c001");
                ajax.set("REG_REC", REG_REC.REC);
                gbox.ui.createProgressBar();
                ajax.set("GRP_NO", _gNo);
                ajax.execute(function (dat) {
                    self.close();
                    //opener.jex.success("연락처가 추가되었습니다.");
                    opener.jex.success($.i18n.prop("lang_contactAdded"));
                    window.opener.gbox_pc_3000.tbl.setCurrentPage(1);
                    window.opener.gbox_pc_3000.tbl.setSvrPageNo(1);
                    window.opener.gbox_pc_3000.fillUserTbl();
                    window.opener.gbox_pc_2000.loadGroup(); //change from LoadGroup() to loadGroup() / letter 'L' to letter 'l'
                    //						gbox.ui.destroyProgressBar();
                });
            }
            else {
                jex.warning($.i18n.prop("lang_noRec"));
            }
            //				if(v.RSLT_CD == "0000") {
            //					successCnt++;
            //					
            //					USER_REC.push(v);
            //				}
            //				else {
            //					errorCnt++;
            //				}
            //			});
            //			if(!jex.isNull(rec)) {
            //				const  ajax1 = jex.createAjaxUtil("pc_user_c001");
            //				ajax1.set("USER_REC", rec);
            //				ajax1.execute(function(data) {	
            //					const errorCnt = 0;
            //					const successCnt = 0;
            //					const USER_REC = [];
            //					
            //					$.each(data.USER_REC, function(i, v) {
            //						if(v.RSLT_CD == "0000") {
            //							successCnt++;
            //							
            //							USER_REC.push(v);
            //						}
            //						else {
            //							errorCnt++;
            //						}
            //					});
            //					if(errorCnt > 0) {
            //						if(confirm("총 " + data.USER_REC.length + "건 중 " + successCnt + "건의 신규 연락처가 추가되었습니다.")) {
            //						}
            //					}					
            //					const ajax = jex.createAjaxUtil("pc_gruser_c001");
            //					//gbox.ui.createProgressBar();
            //					ajax.set("GRP_NO",_gNo);						
            //					ajax.set("REG_REC", USER_REC);					
            //					ajax.execute(function(dat) {
            //						jex.success("연락처가 추가되었습니다.");
            //						opener.gbox_pc_3000.fillUserTbl();
            //						self.close();
            //					});			
            //					
            //				});
            //			}
            //			else{
            //				alert("No record.");
            //			}
            //			//gbox.ui.destroyProgressBar();
        });
        $("#btnCancel").click(function () {
            //			$("#FILENAME").val("");
            //			$("#TBL_USER tbody").hide();
            self.close();
        });
        $("#btnExcelDelete").click(function () {
            $("#FILENAME").val("");
            $("#TBL_USER tbody").hide();
            $("#btnExcelDelete").css("display", "none");
        });
    }
}))();
function changeLang(lang) {
    jQuery.i18n.properties({
        name: 'pop_gbox_pc_3030',
        path: '/lang/',
        mode: 'both',
        language: lang,
        async: true,
        callback: function () {
            gbox.ui.setAllLang("body", $.i18n.prop);
        }
    });
}
