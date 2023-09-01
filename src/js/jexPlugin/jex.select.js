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
var plugin_selectbox = JexPlugin.extend({
	init : function() {
		this._super();
		this.objName			= "select";
		this.objSubName		= "select";
		this.attribute		= "data-code";
		this.attributeTp		= "data-code-tp";
		this.attributeIn		= "data-code-In";
		this.attributenodel	= "data-code-no-del";
		this.attributecode	= "data-attr-code";
		this.attributevalue	= "data-attr-value";
		this.sortFn			= {};
		this.datacode			= "KEY";
		this.datavalue		= "CODE";
	},setAttCode	  : function(code) {
		this.datacode = code;
	},setAttValue   : function(value) {
		this.datavalue = value;
	},addSortFn	  : function(key, fn) {
		this.sortFn[key] = fn;
	},getCodeList : function(code) {
		var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
		var rslt;
		jexAjax.setAsync(false);
		jexAjax.set("DV_CD",	"3");
		jexAjax.set("GROUP",	code);
		jexAjax.execute(function(dat) { rslt = dat;});
		return rslt;
	}, getDataList : function(svc,input) {
		var jexAjax = jex.createAjaxUtil(svc);	// AJAX전송모듈 생성
		var rslt;
		jexAjax.setAsync(false);
		jexAjax.set(input);
		jexAjax.execute(function(dat) { 
			rslt = dat;
		});
		return ( jex.isNull(rslt.REC))?[]:rslt.REC;
	}, set : function(obj,code,tp,inp) {
		var valueList;
		if ($.trim(tp)=="SVC")	valueList = this.getDataList(code, inp);
		else 						valueList = this.getCodeList(code)['RESULT'];
		if (!jex.isNull(this.sortFn[code])&&typeof(this.sortFn[code])=="function") valueList.sort(this.sortFn[code]);

		var datacode  = $(obj).attr(this.attributecode);
		var datavalue = $(obj).attr(this.attributevalue);
		
		if (!datacode ) datacode = this.datacode;
		if (!datavalue) datavalue= this.datavalue;
		
		for (var i=0; i<valueList.length; i++)
		{
			var option = "";
			if($(obj).attr('data-default')==valueList[i][datacode])
				option = "<option value='"+valueList[i][datacode]+"' selected>"+valueList[i][datavalue]+"</option>";
			else
				option = "<option value='"+valueList[i][datacode]+"'>"+valueList[i][datavalue]+"</option>";
			$(obj).append(option);
		}
	}, applyForm : function(obj) {
		var r = this;
		$.each($(obj).find("select["+this.attribute+"]"), function(i,v) {
			var tp = $(this).attr(r.attributeTp); 
			var inp= $(this).attr(r.attributeIn);
			inp = (jex.isNull(inp))?"{}":inp;
			r.set(this,$(this).attr(r.attribute),tp,JSON.parse(inp));
		});
	}, remove : function(obj) {
		$.each($(obj).find(this.objSubName),function() {
			if(jex.isNull($(this).attr(this.attributenodel))||$(this).attr(this.attributenodel)) $(this).remove();
		});
	}
});
jex.plugin.add("SELECT_BOX", new plugin_selectbox());

