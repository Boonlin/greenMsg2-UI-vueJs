/*
 * UI 제어 관련 공통
 */

//document.write('<script type="text/javascript" src="/js/jexPlugin/jex.loading2.js"></script>');
//document.write('<script type="text/javascript" src="/js/jqueryPlugin/jquery.blockUI.js"></script>');
//
//var pf;
//if(!pf) pf={};
//
//if(!pf.array) {
//	document.write('<script type="text/javascript" src="/js/webcash/pf/pf.array.js"></script>');
//}
//
//if(!pf.select) {
//	document.write('<script type="text/javascript" src="/js/webcash/pf/pf.select.js"></script>');
//}
//
//if(!pf.enums) {
//	document.write('<script type="text/javascript" src="/js/webcash/pf/pf.enums.js"></script>');
//}
//
//if(!pf.formatter) {
//	document.write('<script type="text/javascript" src="/js/webcash/pf/pf.formatter.js"></script>');
//}
//
//if(!pf.shortcut) {
//	document.write('<script type="text/javascript" src="/js/webcash/pf/pf.shortcut.js"></script>');
//}
var pf;
if(!pf) pf={};
if(!pf.ui) {
	pf.ui={};
	


	pf.ui.keyCode = {
		BACKSPACE:			8, 
		CAPS_LOCK:			20,
		COMMA:				188,
		CONTROL:			17,
		DELETE:				46,
		DOWN:				40,
		END:				35,
		ENTER:				13,
		ESCAPE:				27,
		HOME:				36,
		INSERT:				45,
		LEFT:				37,
		NUMPAD_ADD:			107,
		NUMPAD_DECIMAL:		110,
		NUMPAD_DIVIDE:		111,
		NUMPAD_ENTER:		108,
		NUMPAD_MULTIPLY:	106,
		NUMPAD_SUBTRACT:	109,
		PAGE_DOWN:			34,
		PAGE_UP:			33,
		PERIOD:				190,
		RIGHT:				39,
		SHIFT:				16,
		SPACE:				32,
		TAB:				9, 
		UP:					38,
		F1:					112,
		F2:					113,
		F3:					114,
		F4:					115,
		F5:					116,
		F6:					117,
		F7:					118,
		F8:					119,
		F9:					120,
		F10:				121,
		F11:				122,
		F12:				123
	};
	
	
	
	
	
	//이벤트에 따른 키 입력 체크
	pf.ui.checkEventKey = function(e, keyCode) {
		return pf.ui.getEventKey(e) == keyCode;
	};
	
	pf.ui.getEventKey = function(e) {
		return (window.netscape) ? e.which : e.keyCode;
	};
	
	pf.ui.cancelEventBubble = function(e) {
		/*
		e.keyCode = 0;
		e.cancelBubble = true;
		e.returnValue = false;
		*/
	
		var evt = e ? e:window.event;
		if (evt.stopPropagation)    evt.stopPropagation();
		if (evt.cancelBubble != null) evt.cancelBubble = true;
		
		return false;
	};
	
};
