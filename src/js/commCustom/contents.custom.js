var contents;
if (contents==null || contents==undefined) contents = function(){};

contents.custom = function(){
}, contents.custom.setNowLoding = function(input){
	try{
		var lodingBarYn = contents.custom.null2void(input["_LODING_BAR_YN_"],"N");
		if(lodingBarYn == "Y"){
			var loding = jex.plugin.get("JEX_LODING");
			loding.start();
		}		
	}catch(e){}
}, contents.custom.removeLoding = function(){
	var loding = jex.plugin.get("JEX_LODING");
	if(loding)
		loding.stop();
}, contents.custom.null2void = function(Object , str){
	return (jex.isNull(Object)?str : Object);
},

$(function(){
	try{
		// 로딩바
		jex.setAjaxBeforeData  (contents.custom.setNowLoding);	
		jex.setAjaxCompleteData(contents.custom.removeLoding);
	} catch(e){};
});

/**
 * 팝업 열기
 * @param formId
 * @param options sizeW : 팝업넓이, sizeH: 팝업높이, target: form타켓, action : 웹서비스ID
 * @return
 */
function open_popup(formId, options){
	var	sizeW = parseInt(options.sizeW, 10);	
	var	sizeH = parseInt(options.sizeH, 10);
	var nLeft = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2- sizeH/2 ;
	var option= ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=no";
	var winObj= window.open("", options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );	
	
	try{
		winObj.blur(); 	//크롭에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후 focus()호출하도록 수정함.
		winObj.focus();	//팝업이 이미 열려있는경우 앞으로 나오도록 한다.
	} catch(e){}
	var frm = document.getElementById(formId);

	if(!!frm){
		frm.method = "post";
		frm.target = options.target;
		
		if(!!options.action)	frm.action = options.action;
		
		frm.submit();
	}
	frm.target = "";
}

/**
 * 팝업 열기
 * @param formId
 * @param options sizeW : 팝업넓이, sizeH: 팝업높이, target: form타켓, action : 웹서비스ID
 * @return
 */
function open_popup2(formId, options){
	var	sizeW = parseInt(options.sizeW, 10);	
	var	sizeH = parseInt(options.sizeH, 10);
	var nLeft = screen.width/2 - sizeW/2 ;
	var nTop  = screen.height/2- sizeH/2 ;
	var option= ",toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=no";
	
	var winObj= window.open("", options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
	
	try{
		winObj.blur(); 	//크롭에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후 focus()호출하도록 수정함.
		winObj.focus();	//팝업이 이미 열려있는경우 앞으로 나오도록 한다.
	} catch(e){}
	var frm = document.getElementById(formId);
	if(!!frm){
		frm.method = "post";
		frm.target = options.target;
		
		if(!!options.action)	frm.action = options.action;
		
		frm.submit();
	}
	frm.target = "";
}

/**
 * smartPopup Open 함수
 * @param option 
 * @return
 */
function open_smartPop(opt){
	var doc;
	try {
		doc = window.parent;
		doc.smartOpenPop( opt );
	}catch(e){
		smartOpenPop( opt );
	}
	
}

/**
 * smartPopUp Close 함수
 * @param clllback 리턴받을 함수
 * @param data     리턴함수에 전달한 JSON DATA
 * */	
function close_smartPop(callbackFn, data){
	var doc;
	try{
		doc = window.parent;
		doc.smartClosePop(callbackFn , data);
	}catch(e){
		
			window.close();
			//smartClosePop(callbackFn , data); //smartClosePop
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// 삭제될 함수 /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
function blbr_Null2Void(value, str){
	if(value==null || typeof(value)== undefined || value=="null" || value==undefined) {
		return (typeof(str)=="string")?str:"";
	} else {
		return value;
	}
}
function schd_Null2Void(value, str){
	if(value==null || typeof(value)== undefined || value=="null" || value==undefined) {
		return (typeof(str)=="string")?str:"";
	} else {
		return value;
	}
}
function appr_Null2Void(value, str){
	if(value==null || typeof(value)== undefined || value=="null" || value==undefined) {
		return (typeof(str)=="string")?str:"";
	} else {
		return value;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// 삭제될 함수 /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

// 컨텐츠 공통으로 사용한다
/**
 * 값의 null검증
 * @param value 검증데이터
 * @param str 변환될 데이터(선택)
 * @return
 */
function cnts_Null2Void(value, str){
	if(value==null || typeof(value)== undefined || value=="null" || value==undefined || value=="undefined") {
		return (typeof(str)=="string")?str:"";
	} else {
		return value;
	}
}
function cnts_isBlank(value, str){
	if(value==null || value=="" || typeof(value)== undefined || value=="null" || value==undefined || value=="undefined") {
		return (typeof(str)=="string")?str:"";
	} else {
		return value;
	}
}
/**
 * 첨부파일 사이즈 formmat
 */
function fileSizeFormmat(fileSize){
	if(fileSize == null || typeof(fileSize) == undefined || fileSize == "null" || fileSize == undefined) {
		return "0KB";
	}else{

		var intFileSize = Number(fileSize);
		var unit		= "";
		
		intFileSize = intFileSize/1024;
		
		// MB
		if(intFileSize > 1024){
			intFileSize = Math.round((intFileSize / 1024)*10)/10;
			unit = "MB";
		}
		// KB
		else{
			intFileSize = Math.round(intFileSize * 10)/10;
			unit = "KB";
		}
	
		return intFileSize+unit;
	}
}

/**
 * 콤보를 그려줍니다.
 */
function getComCd(input, ptl_id, chnl_id, use_intt_id, sync){
	var code_list = new Array();
	var jexAjax = jex.createAjaxUtil("comm_code");
	jexAjax.set("PTL_ID"	, ptl_id);
	jexAjax.set("CHNL_ID"	, chnl_id);
	jexAjax.set("USE_INTT_ID"	, use_intt_id);
	jexAjax.set("CODE_REC" 		, input);
	if(!!sync){
		jexAjax.setAsync(false);
	}
	//alert(JSON.stringify(jexAjax));
	jexAjax.execute(function(dat) {
		$(dat.RESULT_REC).each(function(ri,rv){
			for(var z = 0; z < input.length; z++){
				var type          = input[z].TYPE;
				var grp_cd        = input[z].ATHR_GRP_CD;
				var target_select = input[z].TARGET_C;
				var selected      = cnts_Null2Void(input[z].SELECTED    ,"");
				var callBackFn    = cnts_Null2Void(input[z].CALLBACK_FNCT ,"");
				var mapTargetC    = cnts_Null2Void(input[z].MAP_TARGET_C,"");
				var key1          = cnts_Null2Void(input[z].KEY1        ,"");
				var key2          = cnts_Null2Void(input[z].KEY2        ,"");
				var key3          = cnts_Null2Void(input[z].KEY3        ,"");
				var key4          = cnts_Null2Void(input[z].KEY4        ,"");
				var key5          = cnts_Null2Void(input[z].KEY5        ,"");
				if(target_select == rv.TARGET_C){					/*그외의 테이블에서 조회시*/	
					var result = JSON.parse(rv.DATA);
					if("select" == rv.TYPE){
						$.each(result , function(){
							$.each(this , function(di,dv){
								var attrSelected="";
								if( cnts_Null2Void(selected,"")  != ""){
									if(dv.KEY==selected){
										attrSelected=" selected='selected' ";
									}
								}else{
									if( dv.DEFAULT_VL_YN == "Y" ){
										attrSelected="selected";
									}
								}
								
								$("#"+target_select).append("<option alt='"+dv.VALUE+"' value='"+dv.KEY+"' "+attrSelected+">"+dv.VALUE+"</option>");			
							});
						});
						$("#"+target_select).val(selected);
					}else if("checkbox" == rv.TYPE){
						$.each(result , function(){
							$.each(this , function(di,dv){
								var attrSelected="";
								if( cnts_Null2Void(selected,"")  != ""){
									if(dv.KEY==selected){
										attrSelected="checked";
									}
								}else{
									if( dv.DEFAULT_VL_YN == "Y" ){
										attrSelected="checked";
									}
								}
								$("#"+target_select).append('<input type="checkbox" class="checkbox" name="'+grp_cd+'" value="'+dv.KEY+'" '+attrSelected+'/> <label for="'+grp_cd+'">'+dv.VALUE+'</label>&nbsp;&nbsp;');
							});
						});
					}else if("checkboxWrap" == rv.TYPE){
						$.each(result , function(){
							$.each(this , function(di,dv){
								var attrSelected="";
								if( cnts_Null2Void(selected,"")  != ""){
									if(dv.KEY==selected){
										attrSelected="checked";
									}
								}else{
									if( dv.DEFAULT_VL_YN == "Y" ){
										attrSelected="checked";
									}
								}
								$("#"+target_select).append('<span style="display:inline-block !important; width:105px;"><input type="checkbox" class="checkbox" name="'+grp_cd+'" value="'+dv.KEY+'" '+attrSelected+'/> <label for="'+grp_cd+'">'+dv.VALUE+'</label></span>');
							});
						});
					}else if("radio" == rv.TYPE){
						var radioString = "";
						$.each(result , function(){
							$.each(this , function(di,dv){
								var attrSelected="";
								if( cnts_Null2Void(selected,"")  != ""){
									if(dv.KEY==selected){
										attrSelected="checked";
									}
								}else{
									if( dv.DEFAULT_VL_YN == "Y" ){
										attrSelected="checked";
									}
								}
								radioString += '<input type="radio" name="'+grp_cd+'" class="radio" value="'+dv.KEY+'"  '+attrSelected+'/><label>'+dv.VALUE+'</label>&nbsp;&nbsp;';
							});
						});
						$("#"+target_select).append('<div style="display: inline">'+radioString+'</div>');
					}else if("combo" == rv.TYPE){
						$.each(result,function(di, dv){
							$.each(this , function(di,dv){
								$("#"+target_select).append("<li><a style='max-width:90%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;' href='#none' value='"+dv.KEY+"' >"+dv.VALUE+"</a></li>");
							});
						});
					}else if("ul" == rv.TYPE){
						$.each(result , function(){
							$.each(this , function(di,dv){
								/*
								var attrSelected="";
								if( null2void(selected,"")  != ""){
									if(dv.KEY==selected){
										attrSelected="selected";
									}
								}else{
									if( dv.DEFAULT_VL_YN == "Y" ){
										attrSelected="selected";
									}
								}*/
								$("#"+target_select).append("<li><a href='javascript>'"+dv.VALUE+'</a></li>');
							});
						});
					}
					
					/*콜백함수가 있다면 렌더링이 된후 콜백 호출*/
					if($.isFunction(callBackFn)){
						callBackFn();
					}
					
					/*맵핑 셀렉트 객체가 존재한다면 이벤트 정의*/
					if(mapTargetC != ""){
						$("#"+target_select).data("key"       ,key1      );
						$("#"+target_select).data("mapTargetC",mapTargetC);
						
						$("#"+target_select).bind("change", function() {
							$("#"+$(this).data("mapTargetC") ).find("option").remove();
							var mapCode = new Array(); 
							mapCode.push( {"TYPE":"select","TARGET_T":"CSP_CD_MAP_ITEM" , "TARGET_C":$(this).data("mapTargetC")+"" , "KEY1":$(this).data("key")+"" , "KEY2":$(this).val()+""} );
							getComCd(mapCode);
						});
					}
				}
			}
		});
	});	
}

/**
 * 파일명을 넘겨 파일확장자에 대한 이미지 스트링을 리턴하는 함수
 * @return
 */
function fileExtImgString(fileName){
	var ext = fileName.split(".").pop().toLowerCase();
	
	var ext_img = "";
	if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) != -1) {
		ext_img = "../../img/ico/ico_img.gif";
	} else if($.inArray(ext, ['ppt', 'pptx']) != -1) {
		ext_img = "../../img/ico/ico_ppt.gif";
	} else if($.inArray(ext, ['xls', 'xlsx']) != -1) {
		ext_img = "../../img/ico/ico_excel.gif";
	} else if($.inArray(ext, ['hwp']) != -1) {
		ext_img = "../../img/ico/ico_hwp.gif";
	} else if($.inArray(ext, ['doc', 'docx']) != -1) {
		ext_img = "../../img/ico/ico_word.gif";
	} else {
		ext_img = "../../img/ico/ico_file.gif";
	}
	return ext_img;
}

/**
 * 파일 사이즈 단위 처리
 * @param fileSize
 * @return
 */
function fileSizeCalc(fileSize){
	var longFileSize = 0;
	var returnFileSize = "";
	longFileSize = fileSize;
	// 몫이 0이면 byte
	if(longFileSize < 1024){
		fileSize = numberFormat(fileSize);
		returnFileSize = fileSize + "byte";
	} else {
		if(longFileSize/1024<1024) {
			// kb
			// mb - 50mb
			//var longT1 = (longFileSize/1024);
			//var longT2 = (longFileSize%1024);
			returnFileSize = numberFormat((longFileSize/1024).toFixed(2)) + "KB";

		} else {
			// mb - 50mb
			//var longT1 = (longFileSize/1048576);
			//var longT2 = (longFileSize%1048576);
			returnFileSize = numberFormat((longFileSize/1048576).toFixed(2)) + "MB";
		}
	}
	return returnFileSize;
}

function numberFormat(dat){
	if(typeof dat == "number")	dat = String(dat);
	
	var reg = /(^[+-]?\d+)(\d{3})/;    				// 정규식(3자리마다 ,를 붙임)
	dat += ''; 										// ,를 찍기 위해 숫자를 문자열로 변환
	while (reg.test(dat)) 							// dat값의 첫째자리부터 마지막자리까지
		dat = dat.replace(reg, '$1' + ',' + '$2');	// 인자로 받은 dat 값을 ,가 찍힌 값으로 변환시킴
	
	return dat; 									// 바뀐 dat 값을 반환.
}

/**
 * 화면해상도 
 * @returns {}
 */
function getDisplayInfo(){
	var size ={
			width: window.screen.width,
			height: window.screen.height
	};
	return size;
}

/**
 * 전화번호 formatter
 */
function setPhoneNo(num){
	if(num==null || typeof(num)== undefined || num=="null" || num==undefined || num=="undefined") {
		return (typeof(num)=="string")?num:"";
	} else {
		return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	}
}

cf_setCookie = function(name, value, expiredays) {
	//alert("쿠키셋팅하기여기에");
	var todayDate  = new Date();
	var strExpOpt  = "";
	var strExpDt   = "";
	if (cnts_Null2Void(expiredays, "") != "") {
		todayDate.setDate( todayDate.getDate() + expiredays );
		strExpOpt = "expires=";
	    strExpDt = todayDate.toGMTString() + ";";
	}
    document.cookie = name + "=" + escape( value ) + "; path=/; "+ strExpOpt + strExpDt; 
};
/**
 *  쿠키 설정값 가져오기
 *  @param  name : 쿠키 설정키
 */
cf_getCookie = function( name ) {
	//alert("쿠키셋팅가져오기여기에");
    var nameOfcookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = (x+nameOfcookie.length);
        if ( document.cookie.substring( x, y ) == nameOfcookie ) {
                if ( (endOfcookie=document.cookie.indexOf( ";", y )) == -1 )
         //     if ( (endOfcookie=document.cookie.indexOf( "; ", y )) == -1 )
                        endOfcookie = document.cookie.length;
                return unescape( document.cookie.substring( y, endOfcookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 ) break;
    }
    return "done";
};
