/**
 * Define Enter Event
 * 
 * HTML 내용을 Check를 해야 하므로, html attribute를 검증하는것을 염두에 두고 코딩
 * Key의 정의는 data- 라는 prefix를 붙여주어야 한다.
 * 
 * 현재는 Jquery를 사용하는데 Jquery를 사용하지 않는 곳도 있을수 있으니 그것을 염두에 두어야 한다.
 * 
 * 일단 Jquery로 코딩
 * 
 * @author 김학길
 */
{
var plugin_enter = JexPlugin.extend({
	init : function() {
		this._super();
		this.keycode	= 13;
		this.attribute	= "data-enter";
	}, applyForm : function(obj) {
		var r = this;
		$.each($(obj).find("["+this.attribute+"]"),function(i,v) {
			fn = $(this).attr(r.attribute);
			$(this).keypress(function(e) {
				if (typeof(fn)=="string"&&e.which==r.keycode) eval(fn+"()");
			});
		});
	}, applyFrom : function(obj) {
		return this.applyForm(obj);
	}
});
jex.plugin.add("ENTER", new plugin_enter());
}