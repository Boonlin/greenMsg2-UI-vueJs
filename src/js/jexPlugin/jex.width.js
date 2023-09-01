(function() {
	var JexWidthPlugin = JexPlugin.extend({
		init : function() {
		},
		load : function(attr, $jq) {
			this.$object		= $jq;
			this.attr			= attr;
			this.device			= $jq.attr(attr);
			
			this.changeWidth();
		},
		changeWidth : function(){
			var checkDeviceList = this.device.split(",");
			
			if(!checkDeviceList || checkDeviceList.length == 0) 	return;
			
			for(var i = 0, length = checkDeviceList.length; i < length; i++){
				var checkDevice = checkDeviceList[i].split(":");
				if(!checkDevice || checkDevice.length != 2)		return;
				
				var deviceName = checkDevice[0];
				var width = parseInt(checkDevice[1]);
				if(deviceName.length == 0 || !width)		return
			
				var checkDevice	= jex.checkDevice(deviceName);
			
				if (checkDevice) {
					this.$object.css("width", width + "px");
				}
			}	
		}
	});
	jex.plugin.add("JEX_WIDTH",	new JexWidthPlugin(), "data-jx-width");
})();