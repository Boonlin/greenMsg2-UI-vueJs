/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : Choi Si-hwan (  )
 * @Description    : pop_gbox_pc_4011
 * @History      	 : 20140425054929, Choi Si-hwan
 * </pre>
 **/
new (Jex.extend({
	onload:function() {
		//--- todo onload start ---//
		
		var ajax=jex.createAjaxUtil("pc_profile_r001");
		
		ajax.execute(function(dat)
				{    $('#ORG_NM').val(dat.ORG_NM);
					 $('#PHOTO').val(dat.PHOTO);
				});
		
		
	}, event:function() {
		//--- define event action ---//
	}
}))();
