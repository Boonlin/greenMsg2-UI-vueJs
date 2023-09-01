/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : yonryna ( yonryna123@gmail.com )
 * @Description    : (팝업)메시지 송신내역별 수신내역 목록조회 view
 * @History      	 : 20140425063135, yonryna
 * </pre>
 **/
var _lang = $.cookie("lang");
new (Jex.extend({
	onload:function() {
		
		var ajax=jex.createAjaxUtil("pc_msg_r002");
		ajax.set("MSG_NO", _msgNo);
		
		ajax.execute(function(dat) {
			var regDate = moment(dat.REG_DT, "YYYYMMDD").format("YYYY.MM.DD");
			var regTime = moment(dat.REG_TM, "HHmmss").format("HH:mm:ss");
			
			//줄바꿈 처리
			dat.MSG_TXT = dat.MSG_TXT.replace(/(?:\r\n|\r|\n)/g, '<br />');
			jex.setAll("#TBL_SET", dat);
			$("#REG_DT").text(regDate);
			$("#REG_TM").text(regTime);
			$("#LINK_URL").attr("href",dat.LINK_URL);
			
			//메시지 형태에 따라 다르게 출력하자.
			var msgTypeStr = "";
			
			if(dat.MSG_TYPE == "0") {
				msgTypeStr += _extLang.generalSMS; //일반메시지
			}
			else if(dat.MSG_TYPE == "1") {
				msgTypeStr +=  _extLang.linkSMS + "-" + dat.LINK_NM; //링크메시지
			}
			
			$("#MSG_TYPE_STR").text(msgTypeStr);
			var recvNmStr = "";
			if(parseInt(dat.RECV_CNT, 10) > 1) {
				if(_lang == "EN"){
					recvNmStr = dat.RECV_NM + " ," + (parseInt(dat.RECV_CNT, 10) - 1) + _extLang.more + _extLang.people;//외      //명
				}else if(_lang == "KH"){
					recvNmStr = dat.RECV_NM + " ," + _extLang.people + (parseInt(dat.RECV_CNT, 10) - 1) + _extLang.more;//외      //명
				}else if(_lang == "DF"){
					recvNmStr = dat.RECV_NM + " ," + _extLang.more + (parseInt(dat.RECV_CNT, 10) - 1) + _extLang.people;//외      //명
				}
				
			}
			else if(parseInt(dat.RECV_CNT, 10) == 1) {
				recvNmStr = dat.RECV_NM;
			}
			
			$("#RECV_NM_STR").html("<a href='javascript:' id='recvListBtn'>" + recvNmStr + "</a>");
			
			//첨부이미지가 존재하면
			if(dat["PHOTO_REC"].length > 0) {
				//alert (dat["PHOTO_REC"].length);
				$(dat["PHOTO_REC"]).each(function(i, v) {
					$("li.m_thumbview_li").append("<span class=\"upld_thumb\"><a href=\"/upload?cmd=getimage&uid="+v.PHOTO+"\" target=\"_blank\" data-lightbox=\"example-set\" ><img src=\"/upload?cmd=getthumb&width=100&height=100&uid="+v.PHOTO+"\" alt=\"\"  /></a></span>");
				});
				$(".thumb_slide_wrap").animate({"height":"99px"});
			}
			else {
				// $("li.m_thumbview_li").text(_extLang.noImage); //첨부이미지가 존재하지 않습니다.
				jex.warning(_extLang.onlyImage); //이미지 파일만 등록 가능합니다.
			}
		});
	}, event:function() {
		//--- define event action ---//
		//받는이 목록
		$("#recvListBtn").live("click", function() {
			var input = {};
			input["MSG_NO"] = _msgNo;
			gbox.popup.receiverList(input);
		});
	}
}))();