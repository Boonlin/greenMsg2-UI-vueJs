/**
 * @author Gil
 */
_jex.prototype.getFullMsg = function(obj, msg){
	var fullMsg = "";
	var code = "";
	
	if(typeof(obj) == "object") {
		code = obj.COMMON_HEAD["CODE"];
		msg = obj.COMMON_HEAD["MESSAGE"];
		
		fullMsg = msg;
	}
	else {
		code = obj;
		
		fullMsg = code;
	}
	
	/*
	if(!_jex.getInstance().isNull(code))
	{
		fullMsg = _jex.getInstance().getMsg(code);
	}
	else
	{
		fullMsg = msg;	
	}
	*/
	
	return fullMsg;
};


_jex.prototype.error = function(obj, msg){
	if(typeof(parent.toastr) != "undefined") {
		parent.toastr.error(_jex.getInstance().getFullMsg(obj, msg));
	}
	else {
		toastr.error(_jex.getInstance().getFullMsg(obj, msg));
	}
	
//	if(console) {
//		throw new Error("[ERROR] " + _jex.getInstance().getFullMsg(obj, msg));
//	}
	
	$.unblockUI();
};

_jex.prototype.info = function(obj, msg){
	if(typeof(parent.toastr) != "undefined") {
		parent.toastr.info(_jex.getInstance().getFullMsg(obj, msg));
	}
	else {
		toastr.info(_jex.getInstance().getFullMsg(obj, msg));
	}
	
	$.unblockUI();
};

_jex.prototype.warning = function(obj, msg){
	if(typeof(parent.toastr) != "undefined") {
		parent.toastr.warning(_jex.getInstance().getFullMsg(obj, msg));
	}
	else {
		toastr.warning(_jex.getInstance().getFullMsg(obj, msg));
	}
	
	$.unblockUI();
};

_jex.prototype.success = function(obj, msg){
	if(typeof(parent.toastr) != "undefined") {
		parent.toastr.success(_jex.getInstance().getFullMsg(obj, msg));
	}
	else {
		toastr.success(_jex.getInstance().getFullMsg(obj, msg));
	}
	
	$.unblockUI();
};


_jex.prototype.alert = function(obj, msg) {
	alert(_jex.getInstance().getFullMsg(obj, msg));
};

//새창 여는 함수
_jex.prototype.newWin =  function( url, winName, sizeW, sizeH, jsonValue) {	
	var pos = _jex.prototype.getWinPos(sizeW, sizeH);
	var nLeft = pos.left;
	var nTop = pos.top;

	_jex.prototype.createFormObj("generatedSubmitForm", "post", jsonValue);
	
	opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no, resizable = yes";
	
//	try {
    	winObj = window.open("", winName, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + opt );
//	}
//	catch(e) {
//		
//	}
    
    if (winObj == null) {
        jex.warning("팝업차단 기능을 해지 하시기 바랍니다..\n\n[ 도구->인터넷옵션->개인 정보->팝업차단] 체크해지");
        return;
    }
    
    var userFrm = document.getElementById("generatedSubmitForm");
    userFrm.target = winName;
    userFrm.action = url;
    //jex.web.doSubmit("generatedSubmitForm", false);
    userFrm.submit();
    _jex.prototype.removeFormObj("generatedSubmitForm");

};



/********************************************************************
 * 특정 폼 동적 생성
 * - param1: 폼ID
 * - param2: 객체ID
 * - param3: 객체값
 *********************************************************************/
_jex.prototype.createFormObj = function(formId, formMethod, jsonValue, target) {
	
	var targetStr = "";
	
	if(typeof(target) != "undefined") {
		targetStr = " target='"+target+"' ";
	}
	
	$("body").append("<form id='"+formId+"' method='"+formMethod+"' "+targetStr+"></form>");
	
	if(typeof(jsonValue) !== "undefined") {
		$.each(jsonValue, function(i, v) {
			_jex.prototype.createHiddenFormObj(formId, i, v);
		});
	}
};

/********************************************************************
 * 특정 폼 동적 생성
 * - param1: 폼ID
 * - param2: 객체ID
 * - param3: 객체값
 *********************************************************************/
_jex.prototype.removeFormObj = function(formId) {
	$("form#"+formId).remove();
};

/********************************************************************
 * 특정 폼에 임시 값을 만들자
 * - param1: 폼ID
 * - param2: 객체ID
 * - param3: 객체값
 *********************************************************************/
_jex.prototype.createHiddenFormObj = function(formId, objId, objValue) {
	$("<textarea class='"+formId+"GeneratedObj' id='"+objId+"' name='"+objId+"' style='display: none;'>"+objValue+"</textarea>").appendTo($("#" + formId));
	//$("<input class='"+formId+"GeneratedObj' id='"+objId+"' name='"+objId+"' type='hidden' value='"+objValue+"'/>").appendTo($("#" + formId));
};

/********************************************************************
 * 특정 폼에 생성된 임시데이터 삭제
 * - param1: 폼ID
 *********************************************************************/
_jex.prototype.removeHiddenFormObj = function(formId) {
	$("#" + formId + " > textarea."+formId+"GeneratedObj").remove();
};


_jex.prototype.getWinPos = function(width, height) {
	var a = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
    var i = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
    var g = typeof window.outerWidth!='undefined' ? window.outerWidth : document.documentElement.clientWidth;
    var f = typeof window.outerHeight != 'undefined' ? window.outerHeight: (document.documentElement.clientHeight - 22);
    var h = (a < 0) ? window.screen.width + a : a;
    var left = parseInt(h + ((g - width) / 2), 10);
    var top = parseInt(i + ((f-height) / 2.5), 10);
    
    //return {"left":left, "top":top}; 
    return {"left":left, "top":0}; 
};

_jex.prototype.resizeIframe = function(json) {
	parent.$("iframe").each(function(iel, el) {
		if(el.contentWindow == window) {
			
//			//iframe name이 cbox로 시작할 경우
//			if(window.name.startsWith("cbox")) {
//				//iframe의 height를 무조건 100%로 설정
//				$(this).height("100%");
//			}
//			else {
//			}

			if(jex.isNull(json)) {
				var doch = jex.getDocHeight();
				var ifrh = $(this).height();
				
				if (doch>ifrh) $(this).height(doch);
				if (parent.document !== document) parent.jex.resizeIframe();
			}
			else {
				$(this).height(json.height);
			}

		
		}
	});	
};


_jex.prototype.isError			= function(dat) { 
	var flag = false;
	
	try {
		flag = dat['COMMON_HEAD']['ERROR']; 			
	} catch (e) {
	}
	
	return flag;
};


_jex.prototype.clearAllData = function(dat, _formatter) {
	_formatter = (_jex.getInstance().isNull(_formatter))?{}:_formatter;
	$.each($(this).find("[data-id]"),function() {
		var o = $(this).attr("data-id");
		if (_jex.getInstance().isNull(o)) return true;
//		var d = dat[o];
		var f = _formatter[o];
		if (!_jex.getInstance().isNull(f)&&typeof(f)=="function") d=f(d,dat);
//		if (d!=undefined)  $(this).setTagValue(d);
		$(this).setTagValue("");
	});
	
	return this;
};

jex.setAjaxErrFn(function(dat) {
	
	var errorCode = dat.COMMON_HEAD["CODE"];
	var errorMessage = dat.COMMON_HEAD["MESSAGE"];
	var errorCodeText = "";
	
	if(!jex.isNull(errorCode)) {
		
		if(errorCode == "SESSION_IS_DISCONNECTED") {
			jex.alert("세션이 종료되었습니다.");
			self.close();
//			if(window.confirm("세션이 종료되었습니다.")) {
//				self.close();
//			}
		}
		else if(errorCode == "SC_FORBIDDEN") {
			jex.error("접근이 허용되지 않았습니다. 관리자에게 문의하시기 바랍니다.");
		}
		else if(errorCode == "JEXS3000001") {
			jex.error("서비스가 존재하지 않습니다. 관리자에게 문의하시기 바랍니다.");
		}
		else if(errorCode == "JAVA.SQL.SQLEXCEPTION.23505") {
			jex.error("중복된 데이터가 존재합니다.");
		}
		else if(errorCode == "JAVA.SQL.SQLEXCEPTION.23503") {
			jex.error("연관된 데이터가 존재합니다.");
		}
		else {
			errorCodeText = "[" + errorCode + "] ";
			
			if(jex.isNull(errorMessage)) {
				errorMessage = "System error is occured";
			}
			
			//errorMessage = window.lang.convert(errorMessage);
			jex.error(errorCodeText + errorMessage);
		}
	}
	else {
		//errorMessage = window.lang.convert(errorMessage);
		jex.error(errorMessage);
	}
	
	//clearInterval(kosign.ui.progressBarTimer);
	
});


_jex.prototype.submit = function(action, input) {
	
	var $form = $("<form id='jexSubmitForm'></form>").attr("action", action).attr("method", "post");

	$.each(input, function(name, value) {
		$form.append("<textarea name='"+name+"' style='display: none;'>"+value+"</textarea>");
	});
	
	$("body").append($form);
	
	$("#jexSubmitForm")[0].submit();
	
//	$("#jexSubmitForm").remove();
	
};