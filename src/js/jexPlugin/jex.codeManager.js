{
	/**
	 * 다음 PLUG-IN은 서버에 등록되어 있는 RSPS-CD를 받아 놓고 Cache하는 PLUG-IN이다.
	 * 다음 PLUG-IN을 사용하기 위해서는 ${DOC_ROOT}/WEB-INF/jex/plugins/pt/codePlugIn.jar 를 추가해주어야 한다.
	 */
	var _JexCodeManager = JexPlugin.extend({
		init:function() {
			this.codeList 	= {};
			this.cache		= true;
		},setAllMsg			:function() {					// 만약 cash가 true인 경우 전체 코드를 cash한다. :: 업무에 맞게 처음에 전체 로드를 원하면 이걸 쓰면 된다.
			if (!this.cache) return;
			var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
			var rslt;
			var r = this;
			jexAjax.set("DV_CD",	"3"			);
			jexAjax.set("GROUP",	"RSPS_CD"	);
			jexAjax.execute(function(dat) {
				jex.printDebug(jex.toStr(dat));
				for (var i=0; i<dat['RESULT'].length; i++) {
					var v = dat['RESULT'][i];
					r.codeList[dat['RESULT'][i]['KEY']] = dat['RESULT'][i]['CODE'];
					jex.printDebug(jex.toStr(v));
				}
			});
		},getMsg			:function(key) {				// 각 코드를 불러놓고 cache할지 말지 결정한다. 만약 cache되어 있음 말구.
			if (jex.isNull(key)) return "";
			if (this.cache && !jex.isNull(this.codeList[key])) return this.codeList[key];
			var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
			var rslt;
			jexAjax.setAsync(false);
			jexAjax.set("DV_CD",	"1"			);
			jexAjax.set("GROUP",	"RSPS_CD"	);
			jexAjax.set("KEY",		key			);
			jexAjax.execute(function(dat) { rslt = dat;});
			if (jex.isNull(rslt) || jex.isNull(rslt['RESULT'])) return key;
			if (this.cache) this.codeList[key] = rslt['RESULT'];
			return rslt['RESULT'];
		}
	});
	jex.plugin.add("CODE_MANAGER",new _JexCodeManager());
}	
$(function() {
	jex.plugin.add("CODE_MANAGER",jex.getRootDom().jex.plugin.get("CODE_MANAGER"));
	jex.setMsgFn(function(key) { return jex.plugin.get("CODE_MANAGER").getMsg(key);});
});