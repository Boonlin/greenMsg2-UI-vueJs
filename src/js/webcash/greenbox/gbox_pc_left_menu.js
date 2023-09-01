/**
 * <pre>
 * GREENMSG PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : chhaeuy chhon ( chheouy@yahoo.com )
 * @Description    : gbox_pc_left_menu
 * @History      	 : 20141002115115, chhaeuy chhon
 * </pre>
 **/
var useType='';
var test=null;
var photo = '';
var profile={};
new (Jex.extend({
	onload:function() {
//		$(".scrollbar").jScrollPane();
		profile.load();
//		WePoint popUp
	// 	_this = this;
		
//		var ajax=jex.createAjaxUtil("pc_profile_r001");
//		ajax.execute(function(dat) {
//			$(".user_view img:first").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + dat.PHOTO);
//			$(".user_view").find("#SEND_NM").text(dat.SEND_NM);
//			$(".user_view").find("#SEND_NM").attr("title", dat.SEND_NM);
//			$("#SAUP_NM").text(dat.SAUP_NM);
//			photo = dat.PHOTO;
//			_useType= dat.USE_TYPE;
//			
//		});
//		var ajax=jex.createAjaxUtil("pop_gbox_pc_r1000");
//		$("div.combo").next("ul").empty();
//		ajax.execute(function(dat) {
//			$.each(dat.REC, function(i, v) {
//				$("div.combo").next("ul").append("<li id='BSNN_SEND' data-BSNN_NO='"+v.BSNN_NO+"'><a href='javascript:'>"+v.BSNN_NM+"</a></li>");
//			});
//		});
//		
		//--- todo onload start ---//
	}, event:function() {
		//--- define event action of we point popup ---//
//		this.addEvent('#btn_chrg', 'click', function(e) {
//			var iframe =  parent.document.getElementById("widgetArea");	
//			alert(1);
//		});
		
		$(".combo").click(function(){
			$(".combo").next("ul").toggle();
		});
		
//		console.log(_inputLink);
		
//		$("#btn_chrg1").live("click",function(){
//			var input = {};
//			input['link'] = _inputLink;
//			gbox.popup.getpoint(input, function(dat) {	
//			});
//			
//		});
		
		$("#BSNN_SEND").live("click", function(){
			$(this).parent("ul").hide();
			$(".combo #SAUP_NM").text($(this).text());
//			var input = {};
//			input["BSNN_NO"] = $(this).data("bsnn_no");
//			input["BSNN_NM"] = $(this).text();
//			$(this).parents(".select_com").hide();
//			$("#edit_orgsaupnm").find("input").val( $(this).text());
//			$("#edit_orgsaupnm").show();
		});
		
//		$("#btnSaveOrgSaupNm").click(function(){
//			
//			if(jex.isNull($("#edit_orgsaupnm").find("input").val())){
//				jex.warning("이름을 입력하세요.");
//				return;
//			}
//			var ajax = jex.createAjaxUtil("pc_profile_u001");	
//			ajax.set("SAUP_NM",$("#edit_orgsaupnm").find("input").val());
//			if(jex.isNull($("#profileForm").find("#PHOTO").val())){
//				ajax.set("PHOTO",  photo);
//			}else{
//				ajax.set("PHOTO",  $("#profileForm").find("#PHOTO").val());
//			}
//			gbox.ui.createProgressBar();
//			ajax.execute(function(dat) {
//				jex.success("수정되었습니다.");
//				gbox.ui.destroyProgressBar();
//				$("#SAUP_NM").text($("#edit_orgsaupnm").find("input").val());
//				$(".select_com").show();
//				$("#edit_orgsaupnm").hide();
//			}); 
//		});		
//		
//		$("#btnClearOrgSaupNm").click(function(){
//			$(".select_com").show();
//			$("#edit_orgsaupnm").hide();
//		});		
//		
	}
//	,
//	excuteChrgPop : function(){	
//	    var	sizeW = parseInt(665, 10);	
//		var	sizeH = parseInt(570, 10);
//		//var	sizeH = 570;
//
//		var nLeft = screen.width/2 - sizeW/2 ;  
//		var nTop  = screen.height/2- sizeH/2 ;
//		var option= ", position:absolute;,toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=yes";
//		var winObj = window.open("", "refund", "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
//
//		//var frm = document.getElementById("frm");
//		var frm = window.parent.document.getElementById('frm').src = whichpic.href;
//		frm.method = "post";
//		frm.target = "refund";
//		frm.action = "https://dev.wepoint.wecontent.co.kr/refund_0001.act";
//		frm.submit();	
//}	
//	end wepoint popup
}))();
profile.load =function(){
	var ajax=jex.createAjaxUtil("pc_profile_r001");
	ajax.execute(function(dat) {
		
		if(jex.null2Void(dat.PHOTO).startsWith("http")) { //20171207
			$(".user_view img:first").attr("src", dat.PHOTO);
		}
		else {
			$(".user_view img:first").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + dat.PHOTO);
		}
		
		$(".user_view").find("#SEND_NM").text(dat.SEND_NM);
		$(".user_view").find("#SEND_NM").attr("title", dat.SEND_NM);
		$("#SAUP_NM").text(dat.SAUP_NM);
		photo = dat.PHOTO;
		useType = dat.USE_TYPE;
		
	});
	var ajax=jex.createAjaxUtil("pop_gbox_pc_r1000");
	$("div.combo").next("ul").empty();
//	$("div.combo").next("ul").toggle();
	ajax.execute(function(dat) {
		$.each(dat.REC, function(i, v) {
			$("div.combo").next("ul").append("<li id='BSNN_SEND' data-BSNN_NO='"+v.BSNN_NO+"'><a href='javascript:'>"+v.BSNN_NM+"</a></li>");
		});
	});	
};
