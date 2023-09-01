/*
 */
(function() {
	var JexCERTPlugin = JexPlugin.extend({
		init		: function() {
		}, load	: function(attr, $jq) {
			this.target		= $jq.attr(attr);
			this.defaultUSR	= "090800";
			this.defaultPWD	= "1111";
		}, execute	: function(evt, $jq){
			var _this = this;
		
			if (!window.Cordova) {
				jex.printError("WM0095", "본 기능은 Smart Phone/PAD전용 기능입니다.");
			} else {
				Certcall();
				window.plugins.Cert.CertCalling(
						function(value) {
							var ajax = jex.createAjaxUtil("demo_login");
							ajax.set("USR_ID", _this.defaultUSR);
							ajax.set("USR_PW", _this.defaultPWD);
							ajax.execute(function(dat) {
								jex.bindExecuter(_this.target,evt,$jq);
							});
						}, function() {
						}
				);
			}
		}
	});
	jex.plugin.add("JEX_CERT",	JexCERTPlugin, "data-jx-cert");
})();