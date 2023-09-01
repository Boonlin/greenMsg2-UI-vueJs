/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : chhaeuy chhon ( chheouy@yahoo.com )
 * @Description    : (팝업)공지사항 상세조회 view
 * @History      	 : 20140507061916, chhaeuy chhon
 * </pre>
 **/

var myWindow;

function openWin() {
    myWindow = window.open("http://192.168.178.83:18800/pop_gbox_pc_4201.act", "_blank", "width=500, height=500");
    
}

function closeWin() {
    myWindow.close();
}
gbox_pc_4201 ={};
new (Jex.extend({
	onload:function() {
		var ajax = jex.createAjaxUtil("pc_noti_r002");
		ajax.set("NOTI_NO",_notiNo);
		ajax.execute(function(dat) {
			
			//줄바꿈 처리
			dat.NOTI_TXT = dat.NOTI_TXT.replace(/(?:\r\n|\r|\n)/g, '<br />');
			
			jex.setAllData("#form",dat);
			
		});
		
	}, event:function() {
		
	}
}))();