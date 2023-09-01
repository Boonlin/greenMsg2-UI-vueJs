/*
 * 
 */
(function() {
	var JexBadgePlugin = JexPlugin.extend({
		init : function() {
			this.option = {
					'COL' : 'data-jx-badge-col'
			};
		},
		load : function(attr, $jq) {			
			this.svc		= $jq.attr(attr);
			this.$object	= $jq;
			this.makeBadge();
		},
		makeBadge : function() {			
			var _this = this;
			this.$object.hide();
			var ajax	= jex.createAjaxUtil(this.svc);
			
			ajax.execute(function(dat) {
				if (dat['BOD_CMT_NOT_READ_COUNT'] && dat['BOD_CMT_NOT_READ_COUNT'] > 0) {
					_this.$object.show();
					_this.$object.html(dat['BOD_CMT_NOT_READ_COUNT'] );
				}
			});
		}
	});
	jex.plugin.add("JEX_BADGE",	new JexBadgePlugin(), "data-jx-badge");
})();