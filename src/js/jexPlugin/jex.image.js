(function() {
	/**
	 * Message 정의
	 */
	var _JexImg = JexPlugin.extend({
		init:function() {
			this.cachedImg = {};
		},add:function(url) {
			var img = new Image();
			img.src = url;
			this.cachedImg[url] = img;
		},get:function(url) {
			return this.cachedImg[url];
		}
	});
	jex.plugin.add("IMAGE",_JexImg);	
})();