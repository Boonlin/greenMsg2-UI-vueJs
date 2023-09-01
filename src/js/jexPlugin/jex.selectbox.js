/**
 * SelectBox Maker
 * 
 * HTML 내용을 Check를 해야 하므로, html attribute를 검증하는것을 염두에 두고 코딩
 * Key의 정의는 data- 라는 prefix를 붙여주어야 한다.
 * 
 * 현재는 Jquery를 사용하는데 Jquery를 사용하지 않는 곳도 있을수 있으니 그것을 염두에 두어야 한다.
 * 
 * 일단 Jquery로 코딩
 * 
 * @author 김학길
 */
(function() {
	var plugin_selectbox = JexPlugin.extend({
		init : function() {
			this._super();
			this.objName		= "select";
			this.objSubName		= "select";
			this.attribute		= "data-code";
			this.attributeTp	= "data-code-tp";
			this.attributeIn	= "data-code-In";
			this.attributeView	= "data-code-view";
			this.attributenodel	= "data-code-no-del";
			this.sortFn			= {};
			
			/* new */
			this.attr 					= "data-jx-select";
			
			this.attributeSelectType 	= "data-jx-select-type";
			this.allowedSelectType 		= ["SVC"];
			this.selectType 			= this.allowedSelectType[0];
			
			this.attributeInput 		= "data-jx-select-input";
			this.input					= {};
		},
		load : function(attr, $jq){
			this.$object = $jq;
			this.code = this.$object.attr(attr);
			this.selectType = this.$object.attr(this.attributeSelectType);
			
			this.setInput(this.$object.attr(this.attributeInput));
			
			var message = this.checkAttributes();
			
			if(message && message.length > 0){
				alert(message);
				return false;
			}
			
			this.set();
		},
		setInput : function(userInput){
			if(!userInput || userInput.length == 0)		return;
			
			var dataList = userInput.split(",");
			for(var i = 0, length = dataList.length; i < length; i++){
				var data = dataList[i];
				
				var result = data.split(":");
				if(!result || result.length != 2)		continue;
				
				var key = $.trim(result[0]);
				var value = $.trim(result[0]);
				
				if(!key || key.length == 0 || !value || value.length == 0)		continue;
				
				this.input[key] = value;
			}
		},
		checkAttributes : function(){
			var message = "";
			if(!this.code || this.code.length == 0)		message += this.attr + "의 값이 정의되지 않았습니다.\n";
			
			if(!this.selectType || this.selectType.length == 0){
				message += this.attributeSelectType + "속성이 정의되지 않았습니다.\n";
			}else{
				var allow = false;
				for(var i = 0, length = this.allowedSelectType.length; i < length; i++){
					var checkSelectType = this.allowedSelectType[0];
					
					if(this.selectType == checkSelectType){
						allow = true;
						break;
					}
				}
				
				if(!allow){
					message += this.attributeSelectType + "속성에 잘못된 값이 설정되어 있습니다.\n";
					message += "  value = " + this.selectType + "\n";
					message += "  allowed = " + this.allowedSelectType + "\n";
				}
			}
			
			return message;
		},
		addSortFn	  : function(key, fn) {
			this.sortFn[key] = fn;
		},
		getCodeList : function(code) {
			var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
			var rslt;
			jexAjax.setAsync(false);
			jexAjax.set("DV_CD",	"3");
			jexAjax.set("GROUP",	code);
			jexAjax.execute(function(dat) { rslt = dat; });
			return rslt;
		}, 
		getDataList : function() {
//			var sampleResult = {
//				REC: [{KEY:"kwakyc87", CODE:"곽영철"}, {KEY:"honggd", CODE:"홍길동"}, {KEY:"super", CODE:"마리오"}]
//			};
			
			var result = [];
			
			var jexAjax = jex.createAjaxUtil(this.code);
			jexAjax.setAsync(false);
			jexAjax.set(this.input);
			jexAjax.execute(function(dat){
				result = dat.REC;
			});
			
			return result;
		}, 
		set : function(view) {
			var valueList;
			if ($.trim(this.selectType) == "SVC")		valueList = this.getDataList();
			else 										valueList = this.getCodeList(this.code)['RESULT'];
			
			if (!jex.isNull(this.sortFn[this.code])&&typeof(this.sortFn[this.code])=="function") valueList.sort(this.sortFn[this.code]);
			for (var i=0; i<valueList.length; i++)
			{
				var option = "";
				var opView = valueList[i]['CODE'];
				if (view) {
					opView= view.replace(/%KEY%/,valueList[i]['KEY']);
					opView= opView.replace(/%CODE%/,valueList[i]['CODE']);
				}
				if(this.$object.attr('data-default')==valueList[i]['KEY'])	option = "<option value='"+valueList[i]['KEY']+"' selected>"+opView+"</option>";
				else														option = "<option value='"+valueList[i]['KEY']+"'>"+opView+"</option>";
				
				this.$object.append(option);
			}
		}, applyForm : function(obj) {
			var r = this;
			$.each($(obj).find("select["+this.attribute+"]"), function(i,v) {
				var tp = $(this).attr(r.attributeTp);
				var inp= $(this).attr(r.attributeIn);
				var view= $(this).attr(r.attributeView);
				inp = (jex.isNull(inp))?"{}":inp;
				r.set(this,$(this).attr(r.attribute),tp,JSON.parse(inp),view);
			});
		}, remove : function(obj) {
			$.each($(obj).find(this.objSubName),function() {
				if(jex.isNull($(this).attr(this.attributenodel))||$(this).attr(this.attributenodel)) $(this).remove();
			});
		}
	});
	jex.plugin.add("JEX_SELECT_BOX", new plugin_selectbox(), "data-jx-select");
}());
