/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : chhaeuy chhon ( chheouy@yahoo.com )
 * @Description    : 데이터 view
 * @History      	 : 20140429043319, chhaeuy chhon
 * </pre>
 **/
new (Jex.extend({
	onload:function() {
		var qstr = jex.parse(jex.getQString()['data']);
		jex.setAll("#forms", qstr);
		//--- todo onload start ---//
	}, event:function() {
		//--- define event action ---//
		$("#update").click(function() {
			var ajax = jex.createAjaxUtil("pc_user_u001");
			ajax.set(jex.getAll("#forms"));
			ajax.execute(function() {
				jex.alert("수정되었습니다.");
				location.href = "/List_WSVC_131JN10.act";
			});
		});
		
		$("#delete").click(function() {
			var ajax = jex.createAjaxUtil("Delete_WSVC_A_131JN10");
			ajax.set(jex.getAll("#forms"));
			ajax.execute(function() {
				jex.alert("삭제되었습니다.");
				location.href = "/List_WSVC_131JN10.act";
			});
		});
		
		$("#cancle").click(function() {
			location.href = "/List_WSVC_131JN10.act";
		});
	}
}))();