/*
 * 
 * <div class="topWrap" data-jx-view='all'>
 * 
 * pad
 * pad,phone
 * 
 * group1
 * 
 */
(function() {
	var JexClearPlugin = JexPlugin.extend({
		init : function() {
			this.options = {
				id	: "data-jx-clear",
				no	: "data-jx-clear-no"
			};
		},
		load : function(attr, $jq) {
			this.$object = $($jq.attr(attr));
		},
		execute : function(evt, $jq){
			var self = this;
			var objList = this.$object.find("[id]");
			$.each(objList, function(key, value){
				if($(value).attr(self.options.no) != null)		return true;
				
				$(value).val("");
			});
		}
	});
	jex.plugin.add("JEX_CLEAR",	JexClearPlugin, "data-jx-clear");
})();