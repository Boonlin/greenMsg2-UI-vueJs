/**
 * LodingBar를 정의한다.
 */
(function() {
	var _JexLoding = JexPlugin.extend({
		init : function() {
			this.id	= "JexLoding";
//			this.img = new image();
//			this.img.src = '/img/loading/ajax-loader.gif';
			this.div = $("<div id='"+this.id+"'></div>");
			this.obj;
			this.opacity 		= 50;
			this.opacity2		= this.opacity/100;
			this.height			= jex.getDocHeight();
			this.queue			= [];
			this.queuekey		= "1";
			this.divCss 		= {
									"background"		:"url('/img/loding/ajax-loader.gif') no-repeat scroll center 30%"
							 		,"z-index"			:"30000"
							 		,"display"			:"none"
							 		,"position"			:"absolute"
									,"top"				:0
									,"left"				:0
									,"width"			:"100%"
									,"text-align"		:"center"
									,"vertical-align"	:"middle"
									,"height"			:this.height+"px"
									,"background-color"	:"#000000"
									,"FILTER"			:"filter:alpha(opacity="+this.opacity+")"
									,"-khtml-opacity"	:this.opacity2
									,"-moz-opacity"		:this.opacity2
									,"opacity"			:this.opacity2				
								};
			for (var v in this.divCss) this.div.css(v,this.divCss[v]);
		},start : function() {
			this.queue.push(this.queuekey);
			if (jex.isNull(this.obj)) {
				this.obj = $("#"+this.id);
				this.div.appendTo("body");
			}
			this.height			= jex.getDocHeight();
			this.div.css("vertical-align",	"middle");
			this.div.css("text-align",		"center");
			this.div.css("height",this.height);
			this.div.show();
			return this;
		},stop	: function() {
			this.div.hide();
			/*
			this.queue.pop();
			if (this.queue.length == 1) {
				this.div.hide();
			} else {
				//this.queue.push(this.queuekey);
				//setTimeout(this.stop(), 1000);		// 0.5초에 한번씩 감지해서 닫을수 있는지 확인한다.
			}
			*/
			return this;
		}
	});
	jex.plugin.add("JEX_LODING", new _JexLoding());
})();

$(function() {
	//jex.plugin.add("JEX_LODING",top.jex.plugin.get("JEX_LODING"));
});