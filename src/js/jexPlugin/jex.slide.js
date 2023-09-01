(function() {
	var jexSlidePlugin = JexPlugin.extend({
		init : function() {
		},
            load : function(attr, $jq) {
			this.object		= $jq;
			this.device		= $jq.attr(attr);
			this.container	= $jq.children(":first");
			
			var checkDevice	= jex.checkDevice(this.device);
			var jqWidth		= $jq.width();
			var conWidth		= jqWidth * this.length();
			
			if (!checkDevice)		return;
			
			this.object.css("overflow-x","hidden");
			this.container.width(conWidth +"px");
			//this.container.height("100%");
		
			$.each(this.container.children(), function(i,v) {
				$(this).show();
				$(this).css		("float","left");
				$(this).width		(jqWidth+"px");
				$(this).height	("100%");
			});
			
			this.container.bind('touchstart mousedown',					this.evtTouchStart	);
			this.container.bind('touchmove mousemove',					this.evtTouchMove	);
			this.container.bind('touchend touchout mouseup mouseout',	this.evtTouchEnd		);
		},
		evtTouchStart : function(evt) {
			$(this).data("ontouch",true);
			
			var offsetX = evt.pageX;
			if (!offsetX) offsetX = event.touches[0].pageX;
			
			$(this).data("StartTM",	jex.getMicroTime());
			$(this).data("StartL",	$(this).offset().left);
			$(this).data("StartEL",	offsetX);
		},
		evtTouchMove : function(evt) {
			if (!$(this).data("ontouch")) return;
		
			var offsetX = evt.pageX;
			if (!offsetX) offsetX = event.touches[0].pageX;
			
			var startEL 	= $(this).data("StartEL");
			var startL 	= $(this).data("StartL");
			var evtL		= offsetX;
			var betL		= evtL - startEL;
			var moveCnt	= $(this).data("MoveCnt");
			moveCnt = (!moveCnt)?1:(moveCnt+1);
			$(this).data("MoveCnt",moveCnt);
		
			/* 상하 이동에 대한 처리 */
			if (moveCnt<2 && Math.abs(betL) < 8) {
				$(this).data("ontouch", false);
			} else {
				evt.preventDefault();
				$(this).offset({left:startL+betL});
			}
			
		},
		evtTouchEnd	: function(evt) {
			if (!$(this).data("ontouch")) return;
			$(this).data("ontouch", false);
			$(this).data("MoveCnt", 0);
		
			var eleWidth	= $(this).children(":first").width();
			var startL		= $(this).data("StartL");
			var page		= $(this).data("page");
			var offsetL	= $(this).offset().left;
			var betL		= offsetL - startL;
			var strTM		= $(this).data("StartTM");
			var endTM		= jex.getMicroTime();
			var betTM		= endTM-strTM;
			
			var speed		= Math.abs(betL)/betTM*100;
		
			page = (!page)?1:page;
			
			if (((eleWidth/2) < Math.abs(betL)) || speed > 30) {
				page = (betL>0)?page-1:page+1;
				if (page < 1 || page > $(this).children().length) {
					page = (betL>0)?page+1:page-1;
				}
				$(this).data("page",page);
				jex.printDebug(" JEX SLIDE :: 페이지 전환 :: " + page);
			}
			
			if (startL != offsetL) $(this).animate({"left":((page-1)*eleWidth*-1)+"px"},"fast");
		},
		length : function() {
			return this.container.children().length;
		}
	});
	jex.plugin.add("JEX_SLIDE",jexSlidePlugin,"data-jx-slide");
})();