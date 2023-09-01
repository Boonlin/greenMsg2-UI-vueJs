/**
 * <pre>
 * SPTL PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : contents.js
 * @File path    	 : SPTL_PT_STATIC/web/js/sp/comm
 * @author       	 : 안주희 ( ajh0112@webcash.co.kr )
 * @Description    : 컨텐츠앱
 * @History      	 : 20130828091934, 안주희
 * </pre>
 **/

//_$$(function(){
//});
//
function appExecute(srno, srtxt, as, th){
	// 디바이스 검사
	var info  		 = th.children[2].innerHTML;
	var targ         = "_self";
	var _brow 		 = null;
	var _newWndwExcnYn = "";
	var _excnWndwOpt   = "";
	var _excnWndwWid   = "";
	var _excnWndwHei   = "";
	if(info != null && info != undefined){
		
		info  = JSON.parse(info);
		_brow = info.SUPPORT;
		_newWndwExcnYn = info.NEW_WNDW_EXCN_YN;
		_excnWndwOpt   = info.EXCN_WNDW_OPT;
		_excnWndwWid   = info.EXCN_WNDW_WID;
		_excnWndwHei   = info.EXCN_WNDW_HEI;
	}
	
	
	if(_brow != null && _brow != undefined) {
		var dvc = _brow;
		
		if(dvc != ""){
			var tmp = dvc.split(",");
			
			
			var cnt = 0;
			var _brower = "";
			_brower = getBrowserInfo("BR").toLowerCase();
			_brower = _brower.replace("ie","explorer");
			for(var i = 0; i < tmp.length; i++){
				if(_brower == tmp[i]){
					cnt++;
					break;
				}
			}
			
			if(cnt == 0){
				alert(dvc + " 브라우저에서만 서비스됩니다.");
				return;
			}
		}
	}
	var _div = th.children[1];
	if(_div == null || _div == undefined) {
		return false;
	}
	
	var ud = _div.innerHTML;
	var tempUserData = JSON.parse    (ud);
	var userData     = JSON.stringify(tempUserData.USER_DATA);

	document.getElementById("USER_DATA").value  = encodeURIComponent(userData);
	document.getElementById("APP_SRNO").value   = srno;
	
	if(_newWndwExcnYn == "Y"){
		targ = tempUserData.USER_DATA.CNTS_ID;
	}else{
		targ = "_self";
	}
	
	if(_excnWndwOpt != undefined ){
		if(_excnWndwOpt == "F" && _excnWndwWid != undefined && _excnWndwHei != undefined ){
			_topWinPop ("frmStnd", {"sizeW": _excnWndwWid, "sizeH":_excnWndwHei, "action":as,"target":tempUserData.USER_DATA.CNTS_ID});
			return;
		}
	} 

	document.frmStnd.action = as;
	document.frmStnd.method = "post";
	document.getElementById("frmStnd").target = targ;
	document.frmStnd.submit();
	
	/*if(_newWndwExcnYn == "Y"  &&  _excnWndwOpt != undefined ){
		if(_excnWndwOpt == "F" && _excnWndwWid != undefined && _excnWndwHei != undefined ){
			_topWinPop (document.frmStnd, {"sizeW": _excnWndwWid, "sizeH":_excnWndwHei, "action":as,"target":tempUserData.USER_DATA.CNTS_ID});
			return;
		} else if(_excnWndwOpt == "D"){
			target = tempUserData.USER_DATA.CNTS_ID;
		}
	}
	document.frmStnd.action = as;
	document.frmStnd.method = "post";
	document.frmStnd.target = target;
	document.frmStnd.submit();*/
	
	//{"EXCN_WNDW_HEI":"300","EXCN_WNDW_OPT":"F","SUPPORT":"explorer,chrome,firefox,safari","EXCN_WNDW_WID":"500"}
	
	

//	document.getElementById("titH").innerHTML = srtxt;
//	document.title = srtxt;
//	document.getElementById("hederbox_mnList").style.display = "none";
	
}

function toggle(n){
	var tg = document.getElementById(n);
	if (tg.style.display == 'block') {
		tg.style.display = 'none';
    } else {
    	tg.style.display = 'block';
    }
};

/**
 * 브라우저 정보 추출하기
 * @param gb
 * @returns
 */
function getBrowserInfo(gb) {
    var appName = navigator.appName;
    var userAgent = navigator.userAgent;
    var platform = navigator.platform;
    var OS;
    var BrowserName;
    var BrowserVersion;
    var rtnVal;

    // OS정보
    if(platform.toLowerCase().indexOf('win32') != -1 || platform.toLowerCase().indexOf('win64') != -1 ){
        OS = 'window';
    }
    if(OS == 'window'){
        OS = 'win9x';
        if(userAgent.indexOf('Windows 98') != -1 || userAgent.indexOf('Win98') != -1){
            OS = 'window98';
        }
        if(userAgent.indexOf('Windows ME') != -1){
            OS = 'winME';
        }
        if(userAgent.indexOf('Windows NT 5.0') != -1){
            OS = 'win2000';
        }
        if(userAgent.indexOf('Windows NT 5.1') != -1){
            OS = 'winXP';
        }
        if(userAgent.indexOf('Windows NT 6.0') != -1){
            OS = 'winVista';
        }
        if(userAgent.indexOf('Windows NT 6.1') != -1){
            OS = 'win7';
        }
        if(userAgent.indexOf('Windows NT 6.2') != -1){
            OS = 'win8';
        }
    }

    if(userAgent.indexOf('Mac') != -1){
        OS = 'Mac';
    }
    if(userAgent.indexOf('Linux') != -1 || userAgent.indexOf('x86_64') != -1 || userAgent.indexOf('ia_64 ME') != -1 || userAgent.indexOf('ppc_64') != -1){
        OS = 'linux64';
    }
    if((userAgent.indexOf('Linux') != -1) && ((userAgent.toLowerCase().indexOf('i386') != -1) || (userAgent.toLowerCase().indexOf('i686') != -1))){
        OS = 'linux32';
    }

    // 브라우저정보 (IE 6~10)
    if(appName == 'Microsoft Internet Explorer' ) {
        BrowserName = 'Explorer';
        BrowserVersion = userAgent.substring(userAgent.indexOf('MSIE'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf(' ')+1, BrowserVersion.indexOf(';'));
    
    }
    
    //IE 11
    if(!!navigator.userAgent.match(/Trident\/7\./)) {
        BrowserName = 'Explorer';
        
        //rv가 버전 정보가 맞는지 확실치는 않음..
        BrowserVersion = userAgent.substring(userAgent.indexOf("rv"));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf(":")+1, BrowserVersion.indexOf(')'));
    
    }
    
    if(userAgent.indexOf('Firefox') != -1){
        BrowserName = 'Firefox';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Firefox'));
        if(OS.indexOf('win') > -1){
            BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/')+1, BrowserVersion.indexOf(' '));
        }else{
            BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/')+1);
        }
    }
    if(userAgent.indexOf('Opera') != -1){
        BrowserName = 'Opera';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Version'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/')+1);
    }
    if(userAgent.indexOf('Chrome') != -1){
        BrowserName = 'Chrome';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Chrome'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/')+1, BrowserVersion.indexOf(' '));
    }
    if(userAgent.indexOf('Safari') != -1 && userAgent.indexOf('Chrome') == -1){
        BrowserName = 'Safari';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Version'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/')+1, BrowserVersion.indexOf(' '));
    }

    if(gb == "OS"){
    	rtnVal = OS;
    }else if(gb == "BR"){
    	rtnVal = BrowserName;
    }else if(gb == "BR_VER"){
    	rtnVal = BrowserVersion;
    }

    return rtnVal;
}


function _topWinPop (formId, options){
	var	sizeW = parseInt(options.sizeW, 10);	
	var	sizeH = parseInt(options.sizeH, 10);
	var nLeft = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2- sizeH/2 ;
	var option= ",toolbar=no,menubar=no,location=no,status=no";
	
	if(!!options.scroll){
		option+=",scrollbars="+options.scroll;
	}else{
		option+=",scrollbars=yes";
	}
	
	if(options.resize==undefined || options.resize==null){
		option += ",resizable=yes";
	}else {
		option += ",resizable="+options.resize;
	}
	var frm = document.getElementById(formId);
	
	var winObj;
	if(!!frm){
		winObj = window.open('', options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
	}else{
		winObj = window.open(options.action, options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );	
	}
	
	
	try{
		winObj.blur();//크롭에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후 focus()호출하도록 수정함.
		winObj.focus();//팝업이 이미 열려있는경우 앞으로 나오도록 한다.
	}catch(e){
	}
	
	
	if(!!frm){
		frm.method = "post";
		frm.target = options.target;
		
		if(!!options.action)	frm.action = options.action;
		
		frm.submit();
	}
	
}

//원격상담 팝업 (하나로 실버케어)
function remotePop(ptlUrl){
	_topWinPop ("frmStnd", {"sizeW": "755", "sizeH":"450", "action":ptlUrl+"intr_0003_01.act","target":"remote"});
	
}

//고객센터(자주하는질문) 바로가기 (하나로 실버케어)
function customerService(sendPage, userData, cntsNm){

	//document.getElementById("USER_DATA").value = userData;
	//document.getElementById("BLBR_ID").value   = "2";
	document.frmStnd.USER_DATA.value = userData;  
	document.frmStnd.BLBR_ID.value 	 = "2";  
	document.frmStnd.CNTS_NM.value   = cntsNm;  
	//$("#CNTS_NM").val(sp.null2void(cntsNm,""));
	
	document.frmStnd.action = sendPage+"article.act";
	document.frmStnd.method = "post";
	document.frmStnd.target = "custom";
	document.frmStnd.submit();
	
}

// 스마트 앱 다운로드
function cttn_event_smartApp(ptlUrl){
	_topWinPop("frmStnd", {"sizeW": "595", "sizeH":"245", "action":ptlUrl+"stor_0004_01.act","target":"smartAppDown", "scroll":"no"});
}

// 앱 소개
function cttn_event_smartInfo(ptlUrl, srno){
	document.frmStnd.APP_SRNO.value = srno;
	cttn_setCookie("cttn_chk_info", "Y", 365);
	_topWinPop("frmStnd", {"sizeW": "925", "sizeH":"625", "action":ptlUrl+"stor_0004_02.act","target":"smartAppInfo", "scroll":"no"});
	//cttn_cookieChkLoad();
}

//커뮤니티 연결 배찬중 작업영역
function cttn_event_community(url){
	//cttn_setCookie("c_tootip", "clck", 365);
	//document.getElementById('tooltipCommunity').style.display='none';
	_topWinPop("frmStnd", {"sizeW": "800", "sizeH":"600", "action":url+"/cuy/cuy_com/cuy_gate.jsp","target":"community","resize":"no"});
}

function cttn_cookieChkLoad(){
	//앱 소개 확인
	/*var info = cttn_getCookie("cttn_chk_info");
	
	if(info == "Y"){
		document.getElementById("cttn_info").src = document.getElementById("cttn_info").src.replace("btn_infoC.png","btn_infoG.png");
	}*/
	
	//커뮤니티 확인
	var c_tootip = cttn_getCookie("c_tootip");
	//alert(c_tootip);
	if(c_tootip != "clck"){
		document.getElementById('tooltipCommunity').style.display='block';
	}
}

function cttn_setCookie(key, value, express){
	var date = new Date();
	
	if(!!express){
		date.setDate(date.getDate() + express);
		express = ";expires="+date.toUTCString();
	}else{
		express = "";
	}
	
	value = encodeURIComponent(value);
	
	document.cookie = key+"="+value+express;
}

function cttn_getCookie(key){
	var cookieValue = document.cookie.replace(/ /g,"");
	var keySIndex   = cookieValue.indexOf(key);
	
	if(keySIndex == -1){
		return undefined;
	}
	
	cookieValue = cookieValue.substring(keySIndex);
	
	var cookieValArr = cookieValue.split(";")
    var value;
	
    for(var i  in  cookieValArr){
       if(cookieValArr[i].search(key) >= 0){
    	   value =  cookieValArr[i].replace(key+"=",  "");
    	   break;
      }
   }
	
	return decodeURIComponent(value);
}


function tooltipHide(){
	cttn_setCookie("c_tootip", "clck", 365);
	document.getElementById('tooltipCommunity').style.display='none';
}