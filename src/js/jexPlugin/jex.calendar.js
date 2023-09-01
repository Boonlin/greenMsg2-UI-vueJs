(function() {
	/**
	 * 이건 고민좀 해보자.
	 */
	var jexCalendarPlugin = JexPlugin.extend({
		init : function() {
		}, load : function(attr, $jq) {
			$jq.jexCalendar();
		}
	});
	jex.plugin.add("JEX_CALENDAR",	jexCalendarPlugin, "data-jx-calendar");
})();