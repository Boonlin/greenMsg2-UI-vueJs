/**
 * MENU_ATHT
 * 
 * 메뉴 권한에 의해 화면에 있는 값을 숨겨준다.
 * 
 * 현재는 Jquery를 사용하는데 Jquery를 사용하지 않는 곳도 있을수 있으니 그것을 염두에 두어야 한다.
 * 
 * 일단 Jquery로 코딩
 * 
 * @author 김학길
 */
{
var plugin_mnu_atht = JexPlugin.extend({
	init : function() {
		this._super();
		this.checker	= "data-atht";
		this.key		= "MENU_ATHT_INF";
		this.atht		= {
				 READ	: "R"
				,REG	: "C"
				,DEL	: "D"
		};
	}, apply : function(atht_id) {
		var r	 = this;
		var atht = jex.getRootDom().jex.get(this.key)[atht_id];
		if (atht==this.atht.DEL) return;		// 삭제권한이 있는경우 모든 것을 보여줘도 되니 아무것도 안해도 된다.
		$.each($("["+this.checker+"]"),function() {
			var check = $(this).attr(r.checker);
			jex.printDebug(atht +"::"+check);
			if (atht==r.atht.READ&check!=r.atht.READ) $(this).hide();
			if (atht==r.atht.REG&&check==r.atht.DEL ) $(this).hide();
		});
	}
});
jex.plugin.add("MENU_ATHT", new plugin_mnu_atht());
}