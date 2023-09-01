{
	/**
	 * Debugger 정의
	 * 동적으로 table을 만들어주기 위하여 JSON2Tbl을 구현해주자.
	 * 
	 * Debugger를 구현하기 위해서는 JexDebugger를 상속 받아야 한다.w
	 * 
	 * jex.getDebugData			<-- function 구현
	 * jex.makeTbl(json,opt) 	<-- function 구현
	 */
	var _JexDebugger = JexDebugger.extend({
		init:function() {
			this.buffer 		= [];
			this.bufferMax 	= 50;
			this.bufferView	= 10;
			this.isOnload		= false;
			this.object		= undefined;
			this.debugId		= "_JexMobileDebugger";
		
			/**
			 * 주기적으로 Server에 모아놓은 메시지를 전달한데
			 */
		},getBuffer:function(){
			return this.buffer;
		},addMsg:function(msg){
			if (msg['MSG'] && typeof(msg['MSG']) == "string" && msg['MSG'].indexOf("msg_0001_01") > -1) {
				;
			} else {
				msg['URL'] = document.URL;
				msg['NOW'] = jex.date().getDate("yyyy-mm-dd hh:mi:ss:ms");
				this.buffer.push(msg);
			}
		},printDebug:function(msg){
			var m = {};
			m['TYPE'] = "DEBUG";
			m['CODE'] = "";
			m['MSG' ] = msg;
			this.addMsg(m);
		},printInfo	:function(code,msg){
			var m = {};
			m['TYPE'] = "INFO";
			m['CODE'] = code;
			m['MSG' ] = jex.getMsg(code) + "::" + jex.null2Void(msg);
			this.addMsg(m);
		},printError:function(code,msg){
			var m = {};
			m['TYPE'] = "ERROR";
			m['CODE'] = code;
			m['MSG' ] = jex.getMsg(code) + "::" + jex.null2Void(msg);
			this.addMsg(m);
		}
	});
	jex.setDebugger(new _JexDebugger());	
}
