/* xgrid 이올라스 적용*/
function gridViewer(appcode) {
	document.write(appcode);
}

// toggle
function toggle(_id) {
	var el = document.getElementById(_id);
	el.style.display = (!el.style || (el.style.display != 'none')) ? 'none' : '';
	if (isIE6() && hasClass(el,"secret-memo")) toggleMemo(el);
}
function togObj(obj) {
	obj.style.display = (obj.style.display != 'none') ? 'none' : '';
}
function togObjYn(obj,dp) {
	obj.style.display = (dp != true) ? 'none' : '';
}
// 비밀메모 토글
function toggleMemo(el) {
	if (!hasClass(el,"generated")) {
		addClass(el,"generated");
		var _iframe = document.createElement("iframe");
		var _div = document.createElement("div");
		_iframe.frameBorder = 0;
		addClass(_iframe,"fix-ie6");
		addClass(_div,"screen");

		var fix_ie6 = el.insertBefore(_iframe,el.firstChild);
		var screen = el.insertBefore(_div,el.firstChild);

		var memo_width = el.offsetWidth;
		var memo_height = el.offsetHeight;

		fix_ie6.style.width = memo_width + "px";
		fix_ie6.style.height = memo_height + "px";
		screen.style.width = (memo_width - 2) + "px";
		screen.style.height = (memo_height - 2) + "px";
	}
}


// toggleClass
function toggleClass(element,value1,value2) {
	if (hasClass(element,value1)) {
		if (value2) {
			addClass(element,value2);
		}
		removeClass(element,value1);
	} else {
		if (value2 && hasClass(element,value2)) {
			removeClass(element,value2);
		}
		addClass(element,value1);
	}
}

//새창 여는 함수
function uf_newWin( url, winName, sizeW, sizeH)
{
	var nLeft  = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2 - sizeH/2 ;

	opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=no";
	window.open(url, winName, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + opt );

}

/* Hsplitter Slide */
function uf_hsplitterOpen() {
	
	document.getElementById('div_hsplitter_left').style.display='block';
	document.getElementById('div_hsplitter_right').style.display='none';

	var objxgrid2 = document.getElementById('xgrid2');
	var objxgrid = document.getElementById('xgrid');

	if ( (objxgrid2 != null )|| (objxgrid2 != undefined) )
	{
		document.getElementById('xgrid2').width="100%";
		document.getElementById('xgrid').style.display='none';
	} else {
		document.getElementById('div_hsplitter_left').style.width = '96%';
	}

	document.getElementById('div_hsplitter_open').style.display='none';
	document.getElementById('div_hsplitter_close').style.display='block';
	
}

function uf_hsplitterClose(varWidth) {
	if (varWidth == "")
	{
		varWidth = 250;
	}

	document.getElementById('div_hsplitter_left').style.display='block';
	document.getElementById('div_hsplitter_right').style.display='block';
	
	var objxgrid2 = document.getElementById('xgrid2');
	var objxgrid = document.getElementById('xgrid');

	if ( (objxgrid2 != null )|| (objxgrid2 != undefined) )
	{
		document.getElementById('xgrid2').width = varWidth;
		document.getElementById('xgrid').style.display='block';
	} else {
		document.getElementById('div_hsplitter_left').style.width = varWidth;
	}


	document.getElementById('div_hsplitter_open').style.display='block';
	document.getElementById('div_hsplitter_close').style.display='none';
}

/* Vsplitter Slide */
function uf_vsplitterOpen() {
	
	document.getElementById('div_vsplitter_top').style.display='none';
	document.getElementById('div_vsplitter_bottom').style.display='block';;

	document.getElementById('xgrid').height="455";
	document.getElementById('xgrid2').style.display='none';;
	document.getElementById('div_vsplitter_open').style.display='none';
	document.getElementById('div_vsplitter_close').style.display='block';
	
}

function uf_vsplitterClose() {
	document.getElementById('div_vsplitter_top').style.display='block';
	document.getElementById('div_vsplitter_bottom').style.display='block';
	document.getElementById('xgrid').height="270";
	document.getElementById('xgrid2').style.display='block';
	document.getElementById('div_vsplitter_open').style.display='block';
	document.getElementById('div_vsplitter_close').style.display='none';
}
/* Filtering Slide */
function uf_filteringOpen() {
	document.getElementById('div_filtering').style.display='block';
	document.getElementById('div_filtering_open').style.display='none';
	document.getElementById('div_filtering_close').style.display='block';
	
}

function uf_filteringClose() {
	document.getElementById('div_filtering').style.display='none';
	document.getElementById('div_filtering_open').style.display='block';
	document.getElementById('div_filtering_close').style.display='none';
}


// Select Links
function linkAct()	{
	var tgtList = document.getElementById('woringurl');
	if(tgtList.style.display)	{
		hideLayer('woringurl');
		tgtList.style.display = "";
		if (navigator.userAgent.indexOf("MSIE")!=-1&&document.getElementById('container')) document.getElementById('container').style.zIndex = "20";
	} else	{
		showLayer('woringurl');
		if (navigator.userAgent.indexOf("MSIE")!=-1&&document.getElementById('container')) document.getElementById('container').style.zIndex = "35";
	}
}
function selectLinks(tgtEl)	{
	var tgtList = document.getElementById(tgtEl);
	if(tgtList.style.display)	{
		hideLayer(tgtEl);
		tgtList.style.display = "";
	} else	{
		showLayer(tgtEl);
	}
}
function showSelectLayer(tgtEl)    {
	document.getElementById(tgtEl).style.display = "block";
	if ( navigator.userAgent.indexOf("MSIE") !=-1 && document.getElementById('container') ) 
		document.getElementById('container').style.zIndex = "601";
}

function hideSelectLayer(tgtEl)    {
	document.getElementById(tgtEl).style.display = "none";
	if (navigator.userAgent.indexOf("MSIE")!=-1&&document.getElementById('container')) 
		document.getElementById('container').style.zIndex = "0";
}
/* 인풋박스배경 */
function clrImg(obj){obj.style.backgroundImage="";obj.onkeydown=obj.onmousedown=null;} 

// Roll over
function menuOver(obj) { obj.src = obj.src.replace("_off.gif", "_on.gif");}
function menuOut(obj) { obj.src = obj.src.replace("_on.gif", "_off.gif");}

function showLayer(tgtEl)    {    document.getElementById(tgtEl).style.display = "block"; }
function hideLayer(tgtEl)    {    document.getElementById(tgtEl).style.display = "none"; }

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();}
document.omfocusin=bluring;


/* left메뉴 슬라이딩 */

function uf_hsplitter_init() { 
	document.getElementById('div_leftbox').style.cssText = "background:url('../img/00/menu/img_leftmenubg_hsplitter.gif') no-repeat left top;";
}

function uf_lefthsplitter_open () {

	document.getElementById('div_btn_hsplitter_close').style.display='none';
	document.getElementById('div_btn_hsplitter_open').style.display='block';
	
	document.getElementById('div_snb').style.display='none';

	document.getElementById('header').style.cssText = "z-index:5;";
	document.getElementById('content').style.cssText = "border-left:1px solid #a7a7a7;";
	//document.getElementById('bank_logo').style.cssText = "display:none;";
	document.getElementById('container').style.cssText = "width:100%;padding-left:8px;background:#fff url('../../img/00/menu/img_leftmenubg_hsplitter.gif') no-repeat left top;height:auto;z-index:650;";

}

function uf_lefthsplitter_close () {
	document.getElementById('div_btn_hsplitter_close').style.display='block';
	document.getElementById('div_btn_hsplitter_open').style.display='none';
	
	document.getElementById('div_snb').style.display='block';

	document.getElementById('header').style.cssText = "";
	//document.getElementById('bank_logo').style.cssText = "display:block;";
	document.getElementById('container').style.cssText = "";
	document.getElementById('content').style.cssText = "border-left:none;";

}


/* 확장조회 Slide */
function uf_expandDown() {
	document.getElementById('div_ts_expend').style.display='none';
	document.getElementById('div_btn_expand_down').style.display='block';
	document.getElementById('div_btn_expand_up').style.display='none';
	
}

function uf_expandUp() {
	document.getElementById('div_ts_expend').style.display='block';
	document.getElementById('div_btn_expand_down').style.display='none';
	document.getElementById('div_btn_expand_up').style.display='block';
}

/* 확장조회 Slide2(deve_0005_02 밑에 테이블 height변함) */
function uf_expandDown2() {
	document.getElementById('mp_div_expend').style.display='none';
	document.getElementById('mp_btn_expand_down').style.display='inline-block';
	document.getElementById('mp_btn_expand_up').style.display='none';
	document.getElementById('mp_div_expend2').style.height='407';
}

function uf_expandUp2() {
	document.getElementById('mp_div_expend').style.display='block';
	document.getElementById('mp_btn_expand_down').style.display='none';
	document.getElementById('mp_btn_expand_up').style.display='inline-block';
	document.getElementById('mp_div_expend2').style.height='167';
}


/* Vsplitter Slide */
function uf_vsplitterOpen() {
	
	document.getElementById('div_vsplitter_top').style.display='none';
	document.getElementById('div_vsplitter_bottom').style.display='block';;

	document.getElementById('div_vsplitter_open').style.display='none';
	document.getElementById('div_vsplitter_close').style.display='block';
	
}

function uf_vsplitterClose() {
	document.getElementById('div_vsplitter_top').style.display='block';
	document.getElementById('div_vsplitter_bottom').style.display='block';

	document.getElementById('div_vsplitter_open').style.display='block';
	document.getElementById('div_vsplitter_close').style.display='none';
}


/* Div Show-Hidden */
function uf_divShow(varobj) {
	document.getElementById(varobj).style.display='block';
}

function uf_divHidden(varobj) {
	document.getElementById(varobj).style.display='none';
}

function uf_ifrmShow(ifrmUrl, ifrmWidth, ifrmHeight, jsonValue) {

	var nLeft  = document.body.clientWidth/2 - ifrmWidth/2 -120;
	var nTop  = 10 ;


	document.getElementById('ifrm').style.width = ifrmWidth + "px";
	document.getElementById('ifrm').style.height = ifrmHeight + "px";
//	document.getElementById('ifrm').src = ifrmUrl;
	
	createFormObj("generatedSubmitForm", "post", jsonValue);
	
	var userFrm = document.getElementById("generatedSubmitForm");
    userFrm.target = "ifrm";
    userFrm.action = ifrmUrl;
    userFrm.submit();
    removeFormObj("generatedSubmitForm");
    
	document.getElementById('div_ifrm').style.left = nLeft ;
	document.getElementById('div_ifrm').style.top = nTop ;

	//document.getElementById('div_ifrm').style.left = nLeft + "px";
	//document.getElementById('div_ifrm').style.top = nTop + "px";
	
	document.getElementById('div_ifrm').style.display='block';

	
}

function uf_ifrmHidden() {
	
	//$('#div_ifrm', window.parent.document).hide();
	//alert( window.parent.document.getElementById('div_ifrm') );
	window.parent.document.getElementById('div_ifrm').style.display='none';
}

function uf_popFooter() {

		var winHeight = document.getElementById('p-wrap').offsetHeight;
		var headHeight = document.getElementById('p-title').offsetHeight;
		var footHeight = document.getElementById('p-close').offsetHeight;
		var contArea = document.getElementById('pcpcont');

		/* IE 버젼체크 처리 */
		if (navigator.appName == "Microsoft Internet Explorer"){

			if(navigator.appName.match(/Explorer/i)) {
				versionCode = navigator.appVersion.match(/MSIE \d+.\d+/)[0].split(" ")[1];					
			}
		}

		contArea.style.height = ( winHeight - (headHeight + footHeight + 10) ) + "px";
		/*
		if ( versionCode != "8.0") { 
			contArea.style.height = ( winHeight - (headHeight + footHeight + 10) ) + "px";
		} else {
			contArea.style.height = ( winHeight - (headHeight + footHeight + 10) ) + "px";
		}
		*/
}

function uf_main_open () {

	document.getElementById('div_snb').style.display='none';
	document.getElementById('multitab').style.cssText = "";
	document.getElementById('footer').style.cssText = "background:#d9d9d9 url('../../img/00/menu/img_footerbg_splitter.gif') no-repeat left top";
	document.getElementById('header').style.cssText = "z-index:5;height:123px;background:url('../../img/00/menu/top_bg_splitter.gif') repeat-x left top;";
	document.getElementById('container').style.cssText = "margin:0 0 0 0px;padding-left:20px;background:url('../../img/00/menu/img_leftmenubg_hsplitter.gif') no-repeat left top;height:auto;z-index:650;";

}



/* jquery */
$(document).ready(function(){
	/* deve_0022_01~deve_0025_01에 펼쳤다 접었다-_-; */
	$(".box_width").toggle(
		function(){
			$(".left_box").css("display","none");
			$(".right_box").css("width","97%");
			$(".img_close").css("display","none");
			$(".img_open").css("display","block");
		},
		function(){
			$(".left_box").css("display","block");
			$(".right_box").css("width","67%");
			$(".img_close").css("display","block");
			$(".img_open").css("display","none");
		}
	);
	/* //deve_0022_01~deve_0025_01에 펼쳤다 접었다-_-; */
});


createFormObj = function(formId, formMethod, jsonValue, target) {
	
	var targetStr = "";
	
	if(typeof(target) != "undefined") {
		targetStr = " target='"+target+"' ";
	}
	
	$("body").append("<form id='"+formId+"' method='"+formMethod+"' "+targetStr+"></form>");
	
	if(typeof(jsonValue) !== "undefined") {
		$.each(jsonValue, function(i, v) {
			createHiddenFormObj(formId, i, v);
		});
	}
};

createHiddenFormObj = function(formId, objId, objValue) {
	$("<textarea class='"+formId+"GeneratedObj' id='"+objId+"' name='"+objId+"' style='display: none;'>"+objValue+"</textarea>").appendTo($("#" + formId));
};


removeFormObj = function(formId) {
	$("form#"+formId).remove();
};