(function() {
	/**
	 * 서비스 여러개를 호출할 수 있도록 해주는 플러그인입니다.
	 *
	 * 사용 방법 : 현재 jex.svc.js 에 대해서만 작동
	 *   <div data-jx-procedure="" data-jx-procedure-onload="true"
	 *   	data-jx-procedure-svc1="svc: actionUrl; onload: true; source: #source; source-direct: {a:1, b:2}; target: #target; formcheck: true"
	 *   	data-jx-procedure-svc2="svc: actionUrl; source: #source; target: #target; handleIn: myMethod(); handleOut: myMethod2();"
	 *   ></div>
	 *
	 */
	this.procedure_attr = {
		 "id"		: "data-jx-procedure",
		 "onload"	: "data-jx-procedure-onload",			// procedure onload 여부 true/false
		 "svc"		: "data-jx-procedure-svc"				// svc에 대한 모든 설정값이 들어있는 attribute. svc의 개수대로 뒤에 1,2,3... 숫자를 붙여진 attribute에 각 svc의 설정을 해줍니다.
	};
	
	this.svc_attr = {
		"id"			: "data-jx-svc"
		,"onload"		: "data-jx-svc-onload"				//[option] onload시 처리 여부 true/false
		,"source"		: "data-jx-svc-source"				//[option]SVC 호출 전 input
		,"sourceDirect" : "data-jx-svc-source-direct"		//[option]SVC 호출 전 input (JSON)
		,"taskPackage"	: "data-jx-svc-package"				// SVC 호출시 package 명 ex)inq
		,"target"		: "data-jx-svc-target"				// SVC 호출후 data settnig 영역
		,"formcheck"	: "data-jx-svc-formcheck"		
		,"executer"		: "data-jx-svc-execute"				//[option] SVC 호출후 처리사항
		,"handlerIn"	: "data-jx-svc-handler-in"			//[option] SVC 수행전 처리사항을 처리합니다. ajax input data 셋팅
		,"handlerOut"   : "data-jx-svc-handler-out"			//[option] SVC 호출 후 값을 넣어주기 전에 처리할 사항이 있는 경우 사용합니다. ex) ajax output 값 셋팅
		,"saveKey"		: "data-jx-svc-save-key"			//SVC 호출 후 결과값을 GIUP_GLOVAL_DATA[key]로 저장합니다.
		,"sync"			: "data-jx-svc-sync"				// SVC가 여러개인 경우 sync 여부 true/false
	};
	
	var JexProcedurePlugin = JexPlugin.extend({
		init : function() {
			this.svcList = [];
		}, 
		load : function(attr, $jq) {
			this.$object = $jq;
			this.jobManager = new _JexJobManager();
			
			this.initSvc();
			
			if ("true" == $jq.attr(procedure_attr.onload)){
				this.execute();
			}
		},
		execute : function(){
			var self = this;
			
			$.each(this.svcList, function(i, v){
				
				var service = function(){
					self.jobManager.start();
					self.clear();
					self.parse(svc_attr.id, v);
					var plugin		= jex.plugin.get("JEX_SVC");
					if (typeof(plugin) == "function") plugin = jex.plugin.newInstance("JEX_SVC");
					
					if (typeof(plugin.load) == "function"){
						plugin.load(svc_attr.id, self.$object, self.jobManager);
					}
				};

				self.jobManager.add(service);
			});
		},
		initSvc : function(){
			var i = 1;
			while (true) {
				var svc = this.$object.attr(procedure_attr.svc + i);
				if (null == svc)		break;
				
				this.svcList.push(svc);
				
				i = i + 1;
			}
		},
		parse : function(prefix, userInput){
			var attrList = userInput.split(";");
			var self = this;
			
			for (var indexOfAttrList = 0, lengthOfAttrList = attrList.length; indexOfAttrList < lengthOfAttrList; indexOfAttrList++ ){
				var item = $.trim(attrList[indexOfAttrList]);
				
				var attr = [];
				if (item.startsWith("source-direct")){
					var index = item.indexOf(":");
					attr.push("source-direct");
					attr.push($.trim(item.substring(index + 1)));
				} else {
					attr = item.split(":");
				}
				
				if (attr.length != 2)	continue;
				
				var attrKey = $.trim(attr[0]);
				var attrValue = $.trim(attr[1]);
				
				if ("svc" == attrKey) {
					attrKey = prefix;
				} else {
					attrKey = prefix + "-" + attrKey;
				}
				
				self.$object.attr(attrKey, attrValue);
			}
			
			self.$object.attr(prefix + "-sync", "true");
			self.$object.attr(prefix + "-onload", "true");
		},
		service : function(tmp){
			var plugin		= jex.plugin.get("JEX_SVC");
			if (typeof(plugin) == "function") plugin = jex.plugin.newInstance("JEX_SVC");
			
			if (typeof(plugin.initLoad) == "function"){
				plugin.load(svc_attr.id, this.$object, tmp);
			}
		},
		clear : function(){
			var self = this;
			for (key in svc_attr) {
				var attr = svc_attr[key];
				self.$object.removeAttr(attr);
			}
		}
	});
	
	jex.plugin.add("JEX_PROCEDURE",	JexProcedurePlugin, procedure_attr.id);
})();
