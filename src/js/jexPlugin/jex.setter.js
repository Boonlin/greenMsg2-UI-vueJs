/*
 */
(function() {
	var JexSetterPlugin = JexPlugin.extend({
		init : function() {
			this.options = {
				source	: "data-jx-setter-source",
				target	: "data-jx-setter-target",
				onload	: "data-jx-setter-onload"
			};
			
			this.source = "body";
			this.target = "body";
		},
		load : function(attr, $jq) {			
			this.$object = $jq;
			this.onload = ("true" == $jq.attr(this.options.onload));
			
			this.setFromOptions("source", $jq.attr(this.options.source));
			this.setFromOptions("target", $jq.attr(this.options.target));
			
			if(this.onload)		this.set();
		},
		execute : function(evt, $jq){
			this.set();
		},
		set : function(){
			jex.setAll(this.target, jex.getAll(this.source));
		},
		setFromOptions : function(key, attr){
			if(attr == null)			return;
			
			if(attr.startsWith("parent")){
				var parents = attr.split(".");
				
				var $object = this.$object;
				for(var i = 0, length = parents.length; i < length; i++){
					var parent = $object.parent();
					if(parent != null)		$object = parent;
				}
				
				this[key] = $object;
			}else{
				this[key] = attr;
			}
		}
	});
	jex.plugin.add("JEX_SETTER",	JexSetterPlugin, "data-jx-setter");
})();