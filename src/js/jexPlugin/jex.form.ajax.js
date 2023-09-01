/**
 * Iframe + Form을 활용하여 AJAX를 사용하는 Plug-in
 * Safari에서 AJAX Long time거래시 간혈적으로 응답을 받지 못하는 문제가 발생하여.
 * Ajax를 Iframe+Form을 활용하여 우회 구현 하는 방법으로 구현한 PLUG-IN이다.
 */
var _jex_form_fn_ = function() {
	
};
(function() {
var plugin_form_ajax = JexPlugin.extend({
	init : function(svc_id) {
		/**
		 * 전역변수 선언
		 */
		this.ext	= ".act";			// 호출 확장자
		this.input	= {};				// INPUT값
		this.fn		= {};
		this.method	= "post";
		this.svc	= "";

	/**
	 * METHOD방식 변경
	 */
	}, setMethod : function(s) {
		this.method = s;
	/**
	 * 서비스 ID설정
	 */
	}, setSvc	 : function(s) {
		this.svc	= s;
	/**
	 * 확장자 변경
	 */
	}, setExt : function(s) {
		this.ext = s;
	/**
	 * 입력값 추가
	 */
	}, addInput : function(key, value) {
		if (typeof(value)==undefined) {
			for (var k in key) { this.input[k] = key[k]; }
		} else {
			this.input[key] = value;
		}
	/**
	 * 실행
	 */
	}, execute  : function(fn) {
		// iframe생성
		var action	= this.svc + this.ext;
		var id		= "_JEX_FORM_AJAX_001";
		var ifr		= $("#ifr_"+id);
		if (ifr.length==0) ifr = $("<iframe id='ifr_" + id + "' name='ifr_" + id + "' style='display:none;width:0px;height:0px'><form></form></iframe>");
		var form	= $("<div style='display:none;width:0px;height:0px'><form target='ifr_"+id+"' action='"+action+"' method='"+this.method+"'><input type='submit' id='_submit_' value='submit'></input></form></div>");
		var r		= this;
        ifr.appendTo	("body");
        form.appendTo	("body");
        var ifrcnts	= ifr.contents();
        for (var key in this.input) {
        	var value	= this.input[key];
        	if (typeof(value) != "string") value = JSON.stringify(value);
        	var input	= $("<input type='text' name='"+key+"' value='"+value+"' ></input>");
        	input.appendTo(form.find("form"));
        }
        form.find("form").submit();
        _jex_form_fn_ = function(dat) {
        	r.init();
        	fn(dat);
        	form.remove();
//        	ifr.remove();
        };
	}
});
jex.plugin.add("FORM_AJAX", plugin_form_ajax);
})();