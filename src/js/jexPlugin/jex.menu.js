(function() {
	/**
	 * 
	 */
	var jexMenuPlugin = JexPlugin.extend({
		init : function() {
			
		}, 
		load : function(attr, $jq) {
			
			this.$object = $jq;
			
			var self = this;
			
			var jexAjax = jex.createAjaxUtil("JEX_MOB_MNU_INF_0000");
			jexAjax.execute(function(dat){
				if(dat.MENU_LIST == null || dat.MENU_LIST.length == 0)	return;
				
				var menuList = dat.MENU_LIST;
				for(var i = 0; i < menuList.length; i++){
					var menu = menuList[i];
					
					self.append(menu);
				}
				
				jex.setJexObj(self.$object);
			});
		},
		execute : function(event, $jq) {			
		},
		append : function(menu){
			var $root = $("<a>").addClass("iconBox").attr("href", "#none");
			
			if(menu["LINK"] != null && menu["LINK"].length > 0){
				$root.attr("data-jx-execute", "click").attr("data-jx-execute-target", menu["LINK"]);
			}
			
			var keyValue = this.parse(menu["DEVICE_TYPE"]);
			if (keyValue["checker"] != null) 		$root.attr("data-jx-execute-checker", keyValue["checker"]);
			
			if (keyValue["view"] != null) 			$root.attr("data-jx-view", keyValue["view"]);
			
			/* badge first */
			if(keyValue["badge"] != null){
				var $numberIcon = $("<span>").addClass("noIcon");
				var values = keyValue["badge"].split("@");
				
				$numberIcon.attr("id", values[0]).attr("data-jx-badge", values[1]).attr("data-jx-badge-col", values[2]).appendTo($root);
			}
			
			/* icon second */
			var $icon = $("<span>").addClass("icon");
			$("<img>").attr("src", menu["ICON_URL"]).attr("alt", menu["MNU_NM"]).appendTo($icon);
			$icon.appendTo($root);
			
			/* text last */
			$("<span>").addClass("txt").html(menu["MNU_NM"]).appendTo($root);
			
			$root.appendTo(this.$object);
			
			if (keyValue["ln"] != null){
				$root.find(".txt").attr("data-jxln", keyValue["ln"]);
			}
		},
		parse : function(data){
			var keyValue = {};
			
			var arrData = data.split(',');
			
			for(var i = 0; i < arrData.length; i++){
				var item = arrData[i];
				var arrItem = item.split(":");
				
				if(arrItem == null || arrItem.length != 2)		return true;
				
				keyValue[arrItem[0]]  = arrItem[1];
			}
			
			return keyValue;
		}
	});
	jex.plugin.add("JEX_MENU",	jexMenuPlugin, "data-jx-menu");
})();
