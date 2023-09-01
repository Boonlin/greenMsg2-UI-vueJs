var gbox;
if (!gbox) gbox = {};

if(!gbox.session) {
	gbox.session={};
	gbox.session.roles = [];
	
	//세션 정보 조회
	gbox.session.load = function(callbackFn) {
		//역할 세팅
		var jexAjax = jex.createAjaxUtil("comm_0001_01_r001");
		jexAjax.setAsync(false);
		jexAjax.execute(function(dat) {
			
			gbox.session.roles = dat.ROLE;
			
			if($.isFunction(callbackFn)) {
				callbackFn(dat);
			}
		});
	};
	
	//역할을 가지고 있는지 확인
	gbox.session.hasRole = function(rolename) {
		var has = false;
		
		$.each(gbox.session.roles, function(i, v) {
			if(v.NAME == rolename) {
				has = true;
			}
		});
		
		return has;
	};
	
}