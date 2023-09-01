/**
 * LodingBar
 */
$(function() {
	var _JexMLLoding = JexPlugin.extend({
		init : function() {
			this.queue = [];
			
			this.className = "jexMLLoading";
			var $mainDiv = $("<div id='jexMLLoading_main' style='display:none;position:absolute;top:0px;left:0px;width:100%;height:100%;z-index: 30000;'>");
			$mainDiv.addClass(this.className);
			
			var $backDiv = $("<div style='display:none;position:absolute;width:100%;height:100%;background-color:#ffffff;'></div>");
			$backDiv.addClass(this.className);
			
//`			var $imgDiv = $("<div id='jexMLLoading_img' style='display:none;margin-left: 0 !important;position: absolute;text-align: center;top: 30%;width: 100%;'><img alt='잠시만 기다려주세요.' src='/img/loading/ajax-loading.gif' ></div>");
//			$imgDiv.addClass(this.className);
			
			$mainDiv.append($backDiv);
//			$mainDiv.append($imgDiv);
		
			$(document.body).append($mainDiv);
		},start : function() {
			if(this.queue.length == 0)
			{
				$("."+this.className).fadeIn(0);
			}
			
			this.queue.push( this.queue.length );
		},stop	: function() {
			this.queue.pop();
			
			if(this.queue.length == 0)
			{
				$("."+this.className).fadeOut(500);
			}
		}
	});
	var jexmlLoadingObj = new _JexMLLoding();
	jexmlLoadingObj.start();
	jex.plugin.add("JEX_ML_LODING", jexmlLoadingObj);
});
