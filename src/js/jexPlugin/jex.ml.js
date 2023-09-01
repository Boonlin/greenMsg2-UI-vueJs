/**

 * 다국어 처리를 위한 Plugin
 * @author 김학길
 */
var _MultiLangattribute ="data-jxln";

window._VIEW_ID = document.URL.split("/");
_VIEW_ID = window._VIEW_ID[window._VIEW_ID.length -1];

if (_VIEW_ID.indexOf("?")) {
	_VIEW_ID = _VIEW_ID.split(".")[0];
}

(function() {
	var plugin_ml = JexPlugin.extend({
		init:function(viewid) {
			var _r = this;
			this.tagAttribute = "data-jxln";
			this.jm                                 = (pageJobs!=undefined)?pageJobs:jex.getJobManager();
			this.dList = [];
			this.iList = [];
			this.lang_KH	  = "KH";
			this.lang_KR	  = "KR";
			this.lang_EN     = "EN";
			this._STR_JEX_LANG= "JEX_LANG";
			this.tmpLn;
			this.tmpLn2;
			this.beforeChangefn = [];
			this.isError = false;
			this.custom = [];
			//jex.addBeforeOnload(function() {
				_r.beforeOnload(viewid);
			//});
			jex.addAfterOnload(function() {
				//_r.onload(viewid);
				//_r.beforeOnload(viewid);
			});
		}, addCustom:function(obj) {
			_ml_this = this;
			var custom = new obj;
			custom.onload();
			var fnList = custom.getFnList();
			for (var key in fnList) {
				_ml_this[key] = fnList[key];
			}
			this.custom.push(custom);
		}, beforeOnload:function(viewid) {
			_ml_this = this;
			
			/**
             * 페이지가 열리면 Session에 있는 언어 설정정보를 받아온다.
             * 각 언어별 필요 DATA도 받아온다.
             */
			this.jm.add(function() {
				var _r = this;
				if (_ml_this.isError) return;
				_r.start();
				var ajax = jex.createAjaxUtil("test_lang");
				ajax.setErrTrx(false);
				ajax.set("COM_ID", _VIEW_ID);
				ajax.execute(function(dat) {
					if (jex.isError(dat)) 
					{
						_ml_this.isError = true;
					} else {
						_ml_this.dList = JSON.parse(dat['DATA']);
					}
					_r.stop();
				});
			});

			//this.jm.add(function(){
			//	var _r   = this;
			//	if (_ml_this.isError) return;
			//	_r.start();
			//	var allImg = $(document.body).getAllImg();
			//	var ajax = jex.createAjaxUtil("jexMLangForImg");
			//	ajax.setErrTrx(false);
			//	ajax.set("IMG",allImg);
			//	ajax.execute(function(dat) {
			//		if (jex.isError(dat)) 
			//		{
			//			_ml_this.isError = true;
			//		} else {
			//			_ml_this.iList = dat['REC'];
			//		}
			//		_r.stop();
			//	});
			//});
		},onload:function(){
			//var _ml_this = this;
			//this.jm.add(function() {
			//	if (_ml_this.isError) return;
			//	if (_ml_this.tmpLn2!=_ml_this.tmpLn) {
			//		//_ml_this.change(_ml_this.tmpLn);//두번씩 나와서 주석처리함
			//	}
			//});
			//this.jm.add(function() {
			//	for (var i=0; i<_ml_this.custom.length; i++) {
			//		//_ml_this.custom[i].onChange();
			//	}
			//});
		}, addBeforeChange:function(fn) {
			this.beforeChangefn.push(fn);
		},	addjob:function(fn) {
			_ml_this.jm.add(fn);
		}, change:function(ln) {
			var _ml_this = this;
			
			_ml_this.jm.add(function() {
				var jmthis = this;
				jmthis.start();
				
				if (!_ml_this.dList) {
					alert("다국어 정보를 읽어오지 못하였습니다.");
					if (jex.plugin.get("JEX_ML_LODING")) jex.plugin.get("JEX_ML_LODING").stop();
					return;
				}
				
				
				jex.setLang(ln);
				var rslt	= {};
	
				if (!(_ml_this.dList['allText'])) _ml_this.dList['allText'] = "";
				
				$.each(_ml_this.dList['allText'], function(i,v) {
					rslt[v[_ml_this._STR_JEX_LANG]] = v[ln];
				});
				
				
				$(document.body).setAllText(rslt);
				$(document.body).setAllImg(_ml_this.iList,ln);
				//$(document).setAllCss(_ml_this.dList['allCss'],ln);
				jmthis.stop();
			});
			_ml_this.jm.add(function() {
				if (!_ml_this.beforeChangefn && !_ml_this.beforeChangefn.length) return;
				for (var i=0; i<_ml_this.beforeChangefn.length; i++) {
					_ml_this.beforeChangefn[i](ln);
				}
			});
			this.jm.add(function() {
				if (!_ml_this.custom && !_ml_this.beforeChangefn.length) return;
				for (var i=0; i<_ml_this.custom.length; i++) {
					if (_ml_this.custom[i].onChange) _ml_this.custom[i].onChange();
				}
			});
		}, 
		getTextData:function(ln, key) {
			var _ml_this = this;
			
			if (!_ml_this.dList['allText']) return;
			if (arguments.length == 2) {
				for (var i=0; i<_ml_this.dList['allText'].length; i++) {
					if (_ml_this.dList['allText'][i][_ml_this._STR_JEX_LANG] == key) {
						return _ml_this.dList['allText'][i][ln];
					}
				}
			} else {
				return _ml_this.dList['allText'];
			}
			return undefined;
		},
		getEtcData:function(ln, key) {
			var _ml_this = this;
			
			if (!_ml_this.dList['allEtc']) return;
			if (arguments.length == 2) {
				for (var i=0; i<_ml_this.dList['allEtc'].length; i++) {
					if (_ml_this.dList['allEtc'][i][_ml_this._STR_JEX_LANG] == key) {
						return _ml_this.dList['allEtc'][i][ln];
					}
				}
			} else {
				return _ml_this.dList['allEtc'];
			}
			return undefined;
		}, 
		getCommonData:function(ln, key) {
			var _ml_this = this;
			
			if (!_ml_this.dList['allCommon']) return;
			if (arguments.length == 2) {
				for (var i=0; i<_ml_this.dList['allCommon'].length; i++) {
					if (_ml_this.dList['allCommon'][i][_ml_this._STR_JEX_LANG] == key) {
						return _ml_this.dList['allCommon'][i][ln];
					}
				}
			} else {
				return _ml_this.dList['allCommon'];
			}
			return undefined;
		}, 
		getLang:function() {
			return jex.lang();
		}
	});
	jex.plugin.add("JEX_ML", new plugin_ml());
})();

/**
 * jquery plug-in형태로 setAll/getAll 구현
 * %ID%
 */
(function($) {
	$.fn.setAllImg = function(dat,ln) {
		if (!dat) return;
		for (var i=0; i<dat.length; i++) {
			var key = dat[i]["KEY"];
			var img = dat[i][ln];
			var selStr = "["+_MultiLangattribute+"=\""+key+"\"]";
			$(this).find(selStr).attr("src",img);
		}
	};
	$.fn.setAllCss = function(dat,ln) {
		var linklist = $(this).find("link");
		if (!dat) return;
		$.each(linklist, function(i,v) {
			if (!dat[i]) return ;
			if (dat[i][ln]!=$(this).attr("href")) {
				$(this).attr("href", dat[i][ln]);
			}
		});
	};
	$.fn.setAllText = function(dat, formatter) {
    	formatter = (jex.isNull(formatter))?{}:formatter;
		$.each($(this).find("["+_MultiLangattribute+"]"),function() { var o = $(this).attr(_MultiLangattribute);
			if (jex.isNull(o)) return true;
			var d = dat[o];
			var f = formatter[o];
			if (!jex.isNull(f)&&typeof(f)=="function") d=f(d,dat);
			$(this).setTagString(d);
		});
		return this;
	};
	$.fn.getAllImg = function(dat, formatter) {
		var rslt = {};
		$.each($(this).find("img["+_MultiLangattribute+"]"),function() {
			var o = $(this).attr(_MultiLangattribute);
			if (jex.isNull(o)) return true;
			var d = $(this).attr("src");
			rslt[o]=d;
		});
		jex.printDebug(jex.toStr(rslt));
		return rslt;
	};
	$.fn.setTagValue = function(dat) {
		var tag = $(this).get(0).tagName;
		var type= $(this).attr("type");
		switch (tag.toLowerCase()) {
        	case "textarea":
        	case "input":
        		if (type=="radio"||type=="checkbox"&&!_jex.getInstance().isNull(dat))	$(this).attr("checked", true);
        		else if($(this).attr("i18n-placeholder"))								$(this).attr("placeholder", dat);
        		else 																	$(this).val(dat);
        	break;
        	case "select":
        		$(this).val(dat);
        	break;
        	case "img" :
        		if (!_jex.getInstance().isNull(dat)) $(this).attr("src", dat);
        		else if (_jex.getInstance().isNull($(this).attr("src"))) $(this).remove();
        	break;
        	default :
        		$(this).html(dat);
           	break;
    	};
	};
	$.fn.setTagString = function(dat) {
		var tag = $(this).get(0).tagName;
		var type= $(this).attr("type");
		switch (tag.toLowerCase()) {
        	case "textarea":
        	case "input":
        		$(this).attr("alt",dat);
        		$(this).attr("title",dat);
        		break;
        	case "select":
        		$(this).val(dat);
        		break;
        	case "img" :
        		if (!_jex.getInstance().isNull(dat)) $(this).attr("alt", dat);
        		break;
        	default :
				if(dat != null && ( jex.lang() == undefined ||jex.lang()=='DF' || jex.lang()=='KR') ){
	        		dat = dat.replace("<!---","");
	        		dat = dat.replace("--->","");
	        		dat = dat.replace("<!--","");
	        		dat = dat.replace("-->","");
        		}
        		$(this).html(dat);
        		break;
    	};
	};
	$.fn.getTagString = function() {
		var tag = $(this).get(0).tagName;
		var type= $(this).attr("type");
		var rslt= "";
		switch (tag.toLowerCase()) {
        	case "input":
        		rslt = $(this).attr("alt");
        		if (!rslt) rslt = $(this).attr("title");
        	break;
        	case "select" :
        	case "textarea" :
        		rslt = $(this).val();
        	break;
        	case "img" :
        		rslt = $(this).attr("alt");
        		if (_jex.getInstance().isNull(rslt)) rslt = $(this).attr("title");
        	break;
        	default :
        		rslt = $(this).html();
           	break;
    	};
    	return rslt;
	};
 })(jQuery);

	
