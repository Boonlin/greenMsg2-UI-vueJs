/**
 * File Uploader :: newInstance()로 꺼내야함.
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
{
var plugin_upload = JexPlugin.extend({
	init : function(svc_id) {
		this._super();
		this.isUpload	= false;
		this.ext		= ".act";
        this.addEqualKey= false;
        this.callBack	= [];
		var id	= "id_" + jex.date().getDate('yyyymmdd');
        var div = $('<div id=div_"'+id+'" style="overflow:hidden;width:0px;height:0px"><form action="/'+svc_id+this.ext+'" id="form_'+id+'" target="ifr_' + id + '"  enctype="multipart/form-data" method="post"><input id="sub" type="submit" /></form></div>');
		var ifr = $("<iframe class='ifm_upload_media' id='ifr_" + id + "' name='ifr_" + id + "' src='/none.html' style='display:none;width:0px;height:0px'><form></form></iframe>");
        ifr.appendTo("body");
        div.appendTo("body");
        this.ifr	= ifr;
        this.form	= div.find("form");
	}, setExt : function(e) {
		this.ext = e;
	}, addCallBack : function(fn) {
		this.callBack.push(fn);
	}, executeCallBack : function(fn,val) {
		for (var f in this.callBack) {
			if (typeof(f) == "function") f(val);
		}
		if (typeof(fn) == "function") fn(val);
	}, useEqualKey : function(b) {
		this.addEqualKey = b;
	}, addFile : function(key, fn) {
		var input;
		var r = this;
		if (!this.addEqualKey&&this.form.find("#"+key).length>0)	{
			input = this.form.find("#"+key);
		} else {
			input = $("<input type='file' id='"+key+"' name='"+key+"' />");
			input.appendTo(this.form);
		}
		if ($.browser.msie) { 
			input.click();
			setTimeout  (function() { r.executeCallBack(fn,input.val())},0); 
		} else { 
			input.click();
			input.change(function() { r.executeCallBack(fn,input.val())}); 
		}
	}, upload  : function() {
		this.form.get(0).submit();
	}, getCnts : function() {
		this.ifr.getCnts();
	}
});
jex.plugin.add("IFR_UPLOAD", plugin_upload);
}