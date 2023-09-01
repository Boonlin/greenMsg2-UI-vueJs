/**
 *
 * 	
 * 
 */
(function() {
	var JexLoginPlugin = JexPlugin.extend({
		init : function() {
			this.loggedIn = false;
			this.$objectList = [];
			this.isPush	= false;
			
			this.checkLogin();
			
		},
		/**
		 * @param attr
		 * @param $jq
		 */
		load : function(attr, $jq){
			var item = {};
			item.$object 		= $jq;
			item.action		= this.parse($jq.attr(attr));
			var _this 			= this;
			
		
			/**
			 * PUSH Message가 있는지 확인한다.
			 */
			setTimeout(function() {

				window._VIEW_ID = document.URL.split("/");
				_VIEW_ID = window._VIEW_ID[window._VIEW_ID.length -1];

				if (_VIEW_ID.indexOf("?")) {
					_VIEW_ID = _VIEW_ID.split(".")[0];
				}
				if (window.Cordova) {
					window.plugins.JfmStorage.appPushMessageGet(function(value) {
						if (_VIEW_ID!="mobile_0001_01") return;
						if (value=="" || value.length < 5) return;
						jex.printDebug("push message :: "+value);
						if (!_this.loggedIn) {
							if (value.indexOf("05.html") > -1) _this.isPush = true;
							jex.bindExecuter("#bindExecuter", "push", _this.$objectList[0]);
						} else {
							jex.bindExecuter("SVC@mobile_0004_01","push",_this.$objectList[0]);
						}
					}, function(error) {
					});
				}
			},3000);

			this.executeByLogin(item);
			
			this.$objectList.push(item);
		},
		push : function(){
			if (this.isPush) jex.bindExecuter("SVC@mobile_0004_01","push",_this.$objectList[0]);
		},
		execute : function(){
			
		},
		refresh : function(){
			this.checkLogin();
			
//			for(var i = 0; i < this.$objectList.length; i++){
//				this.executeByLogin(this.$objectList[i]);
//			}
		}
		,executeByLogin : function(item){
			if(this.isLogin()){
				var param = item.action["login"].param;
				if(param == null)		param = "";
				item.$object[item.action["login"].fn](param);
			}else{
				var param = item.action["logout"].param;
				if(param == null)		param = "";
				item.$object[item.action["logout"].fn](param);
			}
		},
		isLogin : function(){
			return this.loggedIn;
		}
		,check : function(){
			if(!this.loggedIn)		throw new JexException("WE0000", "로그인이 필요합니다.");
		}
		,checkLogin : function(){
			var self = this;
			
			var jexAjax = jex.createAjaxUtil("DEMO_BANK_IS_LOGIN");
//			jexAjax.setAsync(false);
			jexAjax.execute(function(dat){
				if(dat.RESULT == "true")	self.loggedIn = true;
				else						self.loggedIn = false;
				
				for(var i = 0; i < self.$objectList.length; i++){
					self.executeByLogin(self.$objectList[i]);
				}
			});
		}
		,parse : function(userOrder){
			var action = {};
			
			var arrUserOrder = userOrder.split("@");
			if(arrUserOrder == null || arrUserOrder.length != 2)			return action;
			
			action.login = {};		action.logout = {};
			
			/* set login / logout function */
			var methodNames = arrUserOrder[0].split("/");
			action.login.fn = methodNames[0];
			
			if(methodNames[1] == null)		action.logout.fn = methodNames[0];
			else							action.logout.fn = methodNames[1];
			
			
			/* set login / logout function's parameter */
			var parameters = arrUserOrder[1].split("/");
			if(parameters == null || parameters.length != 2)		return action;
			
			action.login.param = parameters[0];
			actoin.logout.param = parameters[1];
		}
	});
	
	jex.plugin.add("JEX_TOGGLE",	new JexLoginPlugin(), "data-jx-login");
})();



