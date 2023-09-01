/**
 * <pre>
 * GREENMSG2 PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : daravuth ( daravuth.sd@gmail.com )
 * @Description    : pop_gbox_pc_cnts
 * @History      	 : 20150102022636, daravuth
 * </pre>
 **/
var pop_gbox_pc_cnts = {};
var _jsonRec = [];
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		
//		if(_userNo == ""){
//			alert("필수값이 누락되었습니다.");
//			return;
//		}
		pop_gbox_pc_cnts.loadContent();
	}, event:function() {
		//--- define event action ---//
		$('#saveBtn').click(function(){
//			console.log(_jsonRec);
			$.each($(".cp_wrap li"), function(i, v) {
				var item = {};
				if($(this).find("a").hasClass("on")){
					item['CNTS_STS'] = "1";
				}
				if($(this).find("a").hasClass("off")){
					item['CNTS_STS'] = "0";
				}
//				item['CNTS_STS'] = dat['INQ_REC'][i].RCVCD_TX_STS;
				item['CNTS_NO'] = $(this).find("a").attr("id");
				_jsonRec.push(item);
				
			});
//			console.log(_jsonRec);
			var ajax = jex.createAjaxUtil("user_cnts_c001");
			gbox.ui.createProgressBar();
			//var json = [{"CNTS_NO":"000000123","CNTS_STS":"1"},{"CNTS_NO":"000000006","CNTS_STS":"1"}];
			ajax.set("REG_REC", _jsonRec);
			ajax.set("USER_NO", _userNo);
			// console.log(_jsonRec);
			ajax.execute(function(dat) {
				_jsonRec = [];
				//jex.success("등록되었습니다.");
				jex.alert("저장되었습니다.");
				gbox.ui.destroyProgressBar();
				
			});				
		});
		
		$('.cp_setting').live("click", function(){
//			console.log($(this).hasClass("on"));
			if($(this).hasClass("on")){
				$(this).removeClass("on").addClass("off");
				return;
			}
			if($(this).hasClass("off")){
//				console.log($(this).attr("id"));
				$(this).removeClass("off").addClass("on");
				return;
			}

			
		});
	}
	
}))();

pop_gbox_pc_cnts.loadContent = function() {
	var ajax=jex.createAjaxUtil("user_cnts_r001");
	ajax.set("USER_NO", _userNo);
	ajax.setAsync(false);
	ajax.execute(function(dat) {
		if(dat['INQ_REC'].length > 0) {
			$.each(dat['INQ_REC'], function(i, v) {
//				var item = {};
//				item['CNTS_STS'] = dat['INQ_REC'][i].RCVCD_TX_STS;
//				item['CNTS_NO'] = dat['INQ_REC'][i].CNTS_NO;
//				_jsonRec.push(item);
				$(".cp_wrap").append("<li><span class='cp_thumb'><img class='cp_thumb_img' src='/upload?cmd=getthumb&width=36&height=32&uid=" + dat['INQ_REC'][i].CNTS_PHOTO + " '/>" +
						"</span>" +"<strong class='cp_tit'><span class='cp_tit_txt' " + "id='CNTS_NM' data-id='CNTS_NM'>" + dat['INQ_REC'][i].CNTS_NM + 
						"</span></strong><a href='javascript:' id='"+dat['INQ_REC'][i].CNTS_NO+"' class='cp_setting'><span class='blind'>활성</span></a> </li>");
				
				if( dat['INQ_REC'][i].RCVCD_TX_STS == '1'){
					$("#"+dat['INQ_REC'][i].CNTS_NO).addClass("on");
				}else{
					$("#"+dat['INQ_REC'][i].CNTS_NO).addClass("off");
				}    
			});
		}
	
	});
	
};