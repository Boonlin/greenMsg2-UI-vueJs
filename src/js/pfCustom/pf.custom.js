
var _PROGRESS_CHECK = false;
/****************Document OnLoad Process****************/

$(function(){
	var _url = document.URL;
    if(_url.indexOf("imore.co.kr") > -1){
    	//document.oncontextmenu = new Function('return false');   	// 우클릭방지
    	//document.onselectstart = new Function('return false');      // 복사 방지
    }
	
	try{
		/*로딩바*/
		jex.setAjaxBeforeData  (pf.setNowLoding);	
		jex.setAjaxCompleteData(pf.removeLoding);
		
		
		
//		$(document).keydown(function(e){
//			if (e.keyCode == 27) {
//				if( pf.popIsOpen() ){
//					pf.closePop();
//				}
//			}
//		});

	}catch(e){};
	
	$("#myInfoChangeBtn").click(function(){
		pf.openPop({href: "comm_0008_01.act", width: 740, height: 495, target : window , frm:$("#frm")});
	});
});
/****************Document OnLoad Process****************/






/****************Custom Plugin****************/

/**
 * 해당 화면을 초기화 합니다.
 */
$.fn.clearForm = function() {
	var ele = $(this).find("input");
	$.each( ele , function(i,v){
		if( $(v).attr("type") == "text" ){
			$(v).val("");
		}else if( $(v).attr("type") == "radio" ){
			$(v).attr("checked" , false);
		}else if( $(v).attr("type") == "checkbox" ){
			$(v).attr("checked" , false);
		}else if( $(v).attr("type") == "password" ){
			$(v).val("");
		}
	});
	
	var ele = $(this).find("select");
	$.each( ele , function(i,v){
		$(v).find("option:first").attr("selected" , true);
	});	
};


/**
 * 해당 화면을 초기화 합니다.
 */
$.fn.calender = function(method , opt) {
	var calenderObject = this;
	
	
	if( method == "" || method == null || method == undefined || method == "init")
	{
		$( calenderObject ).datepicker();
		$( calenderObject ).datepicker( "option", "dateFormat", "yy-mm-dd" );
		if(opt == null || opt == undefined){
			$(calenderObject).val(formatter.date(pf.getToDay()));
		}
	}
	
	else if(method == "get"){
		var date = $(calenderObject).val();
		return date.replaceAll("-","");
	}
};
/****************Custom Plugin****************/







/****************Util Function****************/
var pf={
		
	session       : {},
	gridList      : {},
	enterIndexArr : [],
	currentFocus  : 0,
	ozPirntList   : [],
	
	docEventBind : function(obj){
		/**
		* 엔터 이벤트를 부여한다.
		* 1. Document 내에 사용자 정의 속성인 enterIndex에 대한 값을 추출합니다.
		* 2. 추출 후 enterIndex순번에 맞게 정렬 합니다.
		* 3. element에 Enter이벤트를 부여 합니다.
		**/
		/*Document 내에 사용자 정의 속성인 enterIndex에 대한 값을 추출합니다.*/
		var $inList;
		if( jex.isNull(obj) ){
			$inList = $(document).find("[enterIndex]");
			
		}else{
			$inList = $(obj).find("[enterIndex]");
		}
		var current       ="";
		$.each($inList, function(i,v){
			var idx    = $(v).attr("enterIndex").split(/ /g);
	    
			if( v.tagName == "INPUT" || v.tagName == "SELECT" || v.tagName == "DIV" ||  v.tagName == "TEXTAREA" ){
				var map = {};
				map["tagName"] = v.tagName;							//tag명
				map["idx"]     = idx;								//순번
				map["object"]  = v;									//개체
	    
				/*엘리먼트 안에 그리드, 라디오, 체크박스가 있는지 확인한다.*/
				if(map["tagName"] == "DIV"){
					/*그리드 존재*/
					if( $(v).find(".jgrid").length > 0){
						map["type"]  = "grid";
						for(var g in pf.gridList){
							if(g == $(v).find(".jgrid").attr("id")){
								map["gridUtil"]  = pf.gridList[g];							
							}
						}
						pf.enterIndexArr.push(map);
					}
				}else if(map["tagName"] == "INPUT"){
					map["type"]  = $(v).attr("type");
					pf.enterIndexArr.push(map);
				}else if(map["tagName"] == "SELECT"){
					map["type"]  = "select";
					pf.enterIndexArr.push(map);
				}else if(map["tagName"] == "TEXTAREA"){
					map["type"]  = "textarea";
					pf.enterIndexArr.push(map);
				}
					
			} 
		});
	    
		/*index순번에 맞게 정렬 합니다.*/
		pf.enterIndexArr.sort(function(a,b){
			return (Number(a["idx"]) < Number(b["idx"])) ? -1 : (Number(a["idx"]) > Number(b["idx"])) ? 1 : 0;
		});
		
		
		
		
		
		/*element에 이벤트를 부여 합니다.*/
		for(var i = 0; i < pf.enterIndexArr.length; i++){
			var element  = pf.enterIndexArr[i]["object" ];
			var tagName  = pf.enterIndexArr[i]["tagName"];
			var type     = pf.enterIndexArr[i]["type"];
			$(element).data("entIdx", i);
			if(type != "grid"){
				if(type != "textarea"){
					$(element).keydown(function(e){
						if (e.keyCode == 13) {
							var idx = $(this).data("entIdx");
							pf.currentFocus = idx;
							pf.nextFocus();
						}
					});
					
					/*if(i == 0)
						$(element).focus();*/
				}
			}
		}
	},
	
	docEventUnBind : function(){
		for(var i = 0; i < pf.enterIndexArr.length; i++){
			var element  = pf.enterIndexArr[i]["object" ];
			var type     = pf.enterIndexArr[i]["type"];
			$(element).data("entIdx", null);
			if(type != "grid"){
				$(element).unbind("keydown");				
			}
		}
	},
	
	docEventReBind : function(obj){
		pf.docEventUnBind();
		pf.docEventBind(obj);
	},
	
	
	nextFocus : function(idx){
		/**
		* 다음 포커스를 찾는다.
		* 1. 다음 엘리먼트에 상태를 확인한다.(hidden,disabled 등,) 재귀적
		**/
		var nextIdx;
		
		if(!jex.isNull(idx))
		{
			nextIdx = idx;	
		}
		else
		{
			nextIdx = pf.currentFocus+1;
		}
		
		var nextElement;
		try{
			nextElement = pf.enterIndexArr[nextIdx]["object"];
		}catch(e){
			return false;
		}
			
		
		/*다음 엘리먼트가 존재 하지 않다면, 첫번째 엘리먼트로 이동*/
		if( jex.isNull(pf.enterIndexArr[nextIdx]) ){
			pf.nextFocus(0);
		}
		
		/*다음엘리먼트가 읽기 상태이면, 다음 엘리먼트로 이동*/
		else if( $(nextElement).attr("readonly") ){
			pf.nextFocus(nextIdx+1);
		}	
			
		/*다음엘리먼트가 비활성화 상태이면, 다음 엘리먼트로 이동*/
		else if( $(nextElement).attr("disabled") ){
			pf.nextFocus(nextIdx+1);
		}
		
		/*다음엘리먼트가 숨김 상태이면, 다음 엘리먼트로 이동*/
		else if( $(nextElement).is(":hidden") ){
			pf.nextFocus(nextIdx+1);
		}
		
		/*다음엘리먼트가 그리드라면.*/
		else if(pf.enterIndexArr[nextIdx]["type"] == "grid"){
			if(!jex.isNull(pf.enterIndexArr[nextIdx]["gridUtil"])){
				pf.enterIndexArr[nextIdx]["gridUtil"].nextEditCell(0);
				pf.currentFocus = nextIdx;
			}
		}
		
		else{
			try{
				if(nextElement["tagName"] == "INPUT" && nextElement.type == "text"){
					if( nextElement.createTextRange ){
						if( !jex.isNull(nextElement.value) ){
							var txtRange=nextElement.createTextRange();
							txtRange.findText(nextElement.value);
							txtRange.select();						
						}
					}
				}
			}catch(e){}
			
			nextElement.focus();	
		}
		
	},
		
	/**
	 * Code Data를 SelectBox , CheckBox , Radio로 option에 맞게 그려준다.
	 * @param input   옵션
	 * @param callback   콜백함수
	 * */
	renderCode : function(input, fnCallBack){
		var jexAjax = jex.createAjaxUtil("code_0001_01_r001");
		jexAjax.set("REC" , input);
		jexAjax.execute(function(dat) {
			var jsonData = JSON.parse(dat.DATA);
			$.each(jsonData , function(si , sv){
				
				for(var z = 0; z < input.length; z++){
					var type           = input[z].TYPE;
					var target_element = input[z].T_ELE;
					var mode           = pf.null2void(input[z].MODE        ,"");
					var selected       = pf.null2void(input[z].SELECTED    ,"");
					var callBackFn     = pf.null2void(input[z].CALLBACK_FN ,"");
						if( target_element == si ){
							if("select" == type){								
								$.each(sv , function(i,v){
									var attrSelected="";
									if( selected != ""){
										if(v.KEY==selected){
											attrSelected="selected";
										}
									}
									$("#"+target_element).append('<option  value="'+v.KEY+'" '+attrSelected+'>'+v.VALUE+'</option>');
								});
							}
							
							else if("checkbox" == type){
								$.each(sv , function(i,v){
									var attrSelected="";
									if( selected != ""){
										var temp = selected.split(",");
										$.each(temp, function(index,value){
											if(v.KEY==value){
												attrSelected="checked";
											}
										});
									}
									
									var enterIndex = "";
									if( !jex.isNull( $("#"+target_element).attr("enterIndex") ) ) {
										enterIndex = "enterIndex="+$("#"+target_element).attr("enterIndex")+"."+(i+1);
									}
									
									$("#"+target_element).append('<input type="checkbox" class="checkbox" '+enterIndex+'  id="c_'+v.KEY+'" name="c_'+target_element+'" value="'+v.KEY+'" '+attrSelected+'/> <label for="c_'+v.KEY+'">'+v.VALUE+'</label>&nbsp;&nbsp;');
								});
							}
							
							else if("radio" == type){
								var radioString = "";
								$.each(sv , function(i,v){
									var attrSelected="";
									if( selected  != ""){
										if(v.KEY==selected){
											attrSelected="checked";
										}
									}
									
									var enterIndex = "";
									if( !jex.isNull( $("#"+target_element).attr("enterIndex") ) ) {
										enterIndex = "enterIndex="+$("#"+target_element).attr("enterIndex")+"."+(i+1);
									}									
									
									radioString += '<input type="radio" '+enterIndex+' id="r_'+v.KEY+target_element+'" name="r_'+target_element+'" class="radio" value="'+v.KEY+'"  '+attrSelected+'/><label for="r_'+v.KEY+target_element+'">'+v.VALUE+'</label>&nbsp;&nbsp;';
								});	
								$("#"+target_element).append('<div style="display: inline">'+radioString+'</div>');
							}
							// 컨텐츠 센터에서만 사용
							else if("li" == type){
								$.each(sv , function(i,v){
									$("#"+target_element).find(".combo_sel").append("<a style=\"cursor:pointer;\"  value="+v.KEY+" >"+v.VALUE+"</a>");
								});
							}
							// 컨텐츠 센터에서만 사용
							else if("ptl" == type){
								var $div = $("<div class=\"combo_box bulstyle1\"></div>");
								var $ul; 
								$.each(sv , function(i,v){
									if(i == 1){
										$ul = $("<ul style=\"display:none;\"></ul>"); 
									}
									if( selected != ""){
										if(i == 0){
											$("#"+target_element).html("");
										}
										if(v.KEY == selected){
											$("#STORE_PTL_ID").val(v.KEY);
											$div.append("<a class=\"txt\" style=\"cursor:pointer;\" value="+v.KEY+" >"+v.VALUE+"</a>");
										}else{
											$ul.append("<li><a style=\"cursor:pointer;\" value="+v.KEY+" >"+v.VALUE+"</a>");
										}
									}else{
										if(i == 0){
											$("#STORE_PTL_ID").val(v.KEY);
											$div.append("<a class=\"txt\" style=\"cursor:pointer;\" value="+v.KEY+" >"+v.VALUE+"</a>");
										}else{
											$ul.append("<li><a style=\"cursor:pointer;\" value="+v.KEY+" >"+v.VALUE+"</a>");
										}
									}
								});
								$div.append($ul);
								$("#"+target_element).append($div);
							}
							// 컨텐츠 센터에서만 사용
							else if("tablngg" == type){
								var $ul = $("<ul></ul>");
								
								for(var i = 0 ; i < sv.length ; i++){
									var v = sv[i];
									if(i == 0){
										$ul.append("<li class=\"on\" name=\"tabLngg\" key="+v.KEY+"><a style=\"cursor:pointer;\">"+v.VALUE+"</a></li>");
									}else{
										$ul.append("<li name=\"tabLngg\" key="+v.KEY+"><a style=\"cursor:pointer;\">"+v.VALUE+"</a></li>");
									}
									if(mode == "C"){
										break;
									}
								}

								$("."+target_element).append($ul);
							}
							
							
							/*콜백함수가 있다면 렌더링이 된후 콜백 호출*/
							if($.isFunction(callBackFn))
							{
								callBackFn();
							}
						}						
				}	
				
				//	전체 콜백함수 추가 
				if($.isFunction(fnCallBack))
				{
					fnCallBack();
				}
				
			});
		});
	},
	
	/**
	 * code조회 액션으로 부터, JSON Data를 취득합니다.(※Ajax전송시 싱크방식으로 거래 합니다.)
	 * @param  input
	 * @return json
	 * */
	getCode : function(input){
	    var jsonData;
		var jexAjax = jex.createAjaxUtil("code_0001_01_r001");
		jexAjax.setAsync(false);
		jexAjax.set("REC" , input);
		jexAjax.execute(function(dat) {
			jsonData = JSON.parse(dat.DATA);
		});
		return jsonData;
	},
	
	renderLangList : function(elementId , changeFn){
		var codeList = new Array();
		codeList.push( {"T_IDO":"CODE" , "T_ELE":"LANG", "PARAM1":"AA01000"} );
		var jexAjax = jex.createAjaxUtil("code_0001_01_r001");
		jexAjax.set("REC" , codeList);
		jexAjax.execute(function(dat) {
			var temp = JSON.parse(dat.DATA).LANG;
			for(var i = 0; i < temp.length; i++){
				if(temp[i]["KEY"] == jex.lang()){
					$("li[name="+elementId+"]").append("<a class=\"txt bulstyle2\" style=\"cursor:pointer;\" id=\"selected\">"+temp[i]["VALUE"]+"</a>");
					$("li[name="+elementId+"]").find("a").data("lang",temp[i]["KEY"]);
					$("li[name="+elementId+"]").find("a").bind("click" , function(e){
						if($("#"+elementId).is(":hidden")){
							$("#"+elementId).show();
						}else{
							$("#"+elementId).hide();
						}
						if(!e.stopPropagation){
							e.cancelBubble=true;
						}else{
							e.stopPropagation();
						}
					});
					break;
				}
			}
			$("#"+elementId).append("<ul></ul>");
			for(var i = 0; i < temp.length; i++){
				if(temp[i]["KEY"] != jex.lang()){
					$("#"+elementId).find("ul").append("<li><a style=\"cursor:pointer;\">"+temp[i]["VALUE"]+"</a></li>");
					$("#"+elementId).find("ul").find("a :last").data("lang",temp[i]["KEY"]);
					$("#"+elementId).find("ul").find("a :last").bind("click" , function(){
						var chLangKey = $(this).data("lang");
						var chLangVal = $(this).text();
						var langKey = $("#selected").data("lang");
						var langVal = $("#selected").text();						
						
						$(this).html(langVal);
						$(this).data("lang" , langKey);
						
						$("#selected").html(chLangVal);
						$("#selected").data("lang" , chLangKey);
						jex.plugin.get("JEX_ML").change(chLangKey);
						
						if( $.isFunction(changeFn) ){
							changeFn();
						}
					});
				}
			}			
		});
		
		$("body").click(function(){
			if(!$("#"+elementId).is(":hidden")){
				$("#"+elementId).hide();
			}
		});
		
	},
	renderPtlList : function(elementId , changeFn){
		var codeList = new Array();
		codeList.push( {"T_IDO":"MNG_PORTAL"} );
		var jexAjax = jex.createAjaxUtil("code_0001_01_r001");
		jexAjax.set("REC" , codeList);
		jexAjax.execute(function(dat) {
			var temp = JSON.parse(dat.DATA).DATA;
			for(var i = 0; i < temp.length; i++){
				
				if(i == 0){
					$("li[name="+elementId+"]").append("<a class=\"txt bulstyle1\" style=\"cursor:pointer;\" id=\"selected\">"+temp[i]["VALUE"]+"</a>");
					$("li[name="+elementId+"]").find("a").data("ptlId",temp[i]["KEY"]);
					$("li[name="+elementId+"]").find("a").bind("click" , function(e){
						if($("#"+elementId).is(":hidden")){
							$("#"+elementId).show();
						}else{
							$("#"+elementId).hide();
						}
						if(!e.stopPropagation){
							e.cancelBubble=true;
						}else{
							e.stopPropagation();
						}
					});
					$("#STORE_PTL_ID").val(temp[i]["KEY"]);
					break;
				}
			}
			if(temp.length > 1){
				$("#"+elementId).append("<ul></ul>");
			}
			for(var i = 0; i < temp.length; i++){
				if(0 != i){
					$("#"+elementId).find("ul").append("<li><a style=\"cursor:pointer;\">"+temp[i]["VALUE"]+"</a></li>");
					$("#"+elementId).find("ul").find("a :last").data("ptlId",temp[i]["KEY"]);
					$("#"+elementId).find("ul").find("a :last").bind("click" , function(){
						var chPtlKey = $(this).data("ptlId");
						var chPtlVal = $(this).text();
						var ptlKey = $("#selected").data("ptlId");
						var ptlVal = $("#selected").text();						
						
						$(this).html(ptlVal);
						$(this).data("ptlId" , ptlKey);
						
						$("#selected").html(chPtlVal);
						$("#selected").data("ptlId" , chPtlKey);
						if( $.isFunction(changeFn) ){
							changeFn(chPtlKey);
						}
					});
				}
			}			
		});
		
		$("body").click(function(){
			if(!$("#"+elementId).is(":hidden")){
				$("#"+elementId).hide();
			}
		});
		
	},
	logout : function(){
		var url = document.URL;
		if( jex.confirm("WAI00001") ){
			var jexAjax = jex.createAjaxUtil("logout_0001_01");
			jexAjax.execute(function(dat) {
				location.href = "/main.act";
			});			
		}
	},
	
	/**
	 * From ~ To 달력 형식을 그려주는 함수
	 * @param opt - from 만 있는 달력인지 from ~ to 달력인지 옵션
	 * */
	createDatePicker : function(opt, fromDay , toDay){
		opt = (typeof opt == "undefined")?1:opt;	// 옵션이 안넘오 오면 기본 값(1)로 설정한다.
		$.datepicker.setDefaults( $.datepicker.regional[ "ko" ] );
		/*$.datepicker.setDefaults({
			maxDate : "+0"
		});*/
		datePicker.createHtml(opt);
		today = new Date();
		datePicker.init(today.getFullYear(), today.getMonth() , undefined , fromDay , toDay);
	},
	
	
	/**
	 * 현재 팝업이 열리 있는지 확인 합니다.
	 * @param opt
	 * */	
	isOpenPop : function(){
		var doc;
		try{
			doc = window.parent;
			return doc._popList.length > 0 ? true : false;
		}catch(e){
			return _popList.length > 0 ? true : false;
		}
	},
	
	/**
	 * 현재 팝업의 크기를 변경 합니다.
	 * @param opt
	 * */	
	popReSize : function(opt){
		var doc;
		try{
			doc = window.parent;
			doc.smartPopReSize( opt );
		}catch(e){
			smartPopReSize( opt );
		}
	},
	
	
	/**
	 * smartPopUp Open 함수
	 * @param opt
	 * */	
	openPop : function(opt){
		var doc;
		
		$(window.parent.document).find("body").css("overflow","hidden");
		$(window.parent.document).find("body").data("OPEN_POP","true");
		try{
			doc = window.parent;
			doc.smartOpenPop( opt );
		}catch(e){
			smartOpenPop( opt );
		}
	},
	
	/**
	 * smartPopUp Open 함수
	 * @param clllback 리턴받을 함수
	 * @param data     리턴함수에 전달한 JSON DATA
	 * */	
	closePop : function(callbackFn , data){
		if( pf.getPopSize() == 1 ){
			$(window.parent.document).find("body").css("overflow","");	
		} 
		if(callbackFn == "daumeditorfileCallBack"){
			opener[callbackFn](data);
			self.close();
		}else{
			var doc;
			try{
				doc = window.parent;
				doc.smartClosePop(callbackFn , data);
			}catch(e){
				smartClosePop(callbackFn , data);
			}
		}
	},
	
	/**
	 * parent 창 함수에 접근 하는 함수
	 * @param clllback 리턴받을 함수
	 * @param data     리턴함수에 전달한 JSON DATA
	 * */	
	parentPop : function(callbackFn , data){
		var doc;
		try{
			doc = window.parent;
			return doc.parentConnect(callbackFn , data);
		}catch(e){
			return parentConnect(callbackFn , data);
		}
	},	

	/**
	 * smartPopUp현재 Open되어 있는지 확인 하는 함수.
	 * @return boolean
	 * */
	popIsOpen : function (){
		var doc , isOpen = false;
		try{
			doc = window.parent;
			isOpen = doc.smartIsOpen();
		}catch(e){
			isOpen = smartIsOpen();
		}
		return isOpen; 
	},
	
	getPopSize : function (){
		var doc , size = 0;;
		try{
			doc = window.parent;
			size = doc.getPopSize();
		}catch(e){
			size = getPopSize();
		}
		return size; 
	},	
	
	
	
	
	/**
	 * winPop함수 form객체를 이용한 popUp열기 
	 * @param formId 
	 * @param options
	 * */		
	winPop : function(formId, options){
		var	sizeW = parseInt(options.sizeW, 10);	
		var	sizeH = parseInt(options.sizeH, 10);
		var nLeft = screen.width/2 - sizeW/2 ;
		var nTop  = screen.height/2- sizeH/2 ;
		var option= ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
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
		
	},	
	
	/**
	 * winOpen함수 window.open  
	 * */	
	winOpen : function(options){
		var	sizeW = parseInt(options.sizeW, 10);	
		var	sizeH = parseInt(options.sizeH, 10);
		var nLeft = screen.width/2 - sizeW/2 ;
		var nTop  = screen.height/2- sizeH/2 ;
		var option= ",toolbar=yes,menubar=yes,location=yes,scrollbars=yes,status=yes,resizable=1";
		var winObj;
		
		if(navigator.userAgent.indexOf("Chrome/")>0){
			window.detwin = window.open('', options.target);
			window.detwin.focus();
		}else{
			winObj = window.open(options.action, options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
			try{
				winObj.blur();
				winObj.focus();
			}catch(e){
			}
		}
	},
	
	
	getDpFromDate : function(){
		return $("#yearFrom").text()+$("#dateFrom .month").text()+$("#dateFrom .day").text();
	},
	
	
	getDpToDate : function(){
		return $("#yearTo").text()+$("#dateTo .month").text()+$("#dateTo .day").text();
	},
	
	/**/
	getDp : function(ele){
		return $(ele).val().replaceAll("-","");
	},		
	
	/**
	 * Value가 (null,undefined)일경우 사용자 정의 값으로 치환해 줍니다.
	 * @param null값을 검사할 객체
	 * @param 치환문자열
	 */
	null2void : function(Object , str){
		return (jex.isNull(Object)?str : Object);
	},
	
	/**
	 * 페이지 이동 처리를 합니다.
	 * @param form
	 * @param action ID
	 */
	pageMove : function(f , p){
		if(f){
			var doc;
			try{
				doc = window.parent;
				doc.frameMove(f , p);
			}catch(e){
				var $form = f;
				$form.attr("method" ,"post"        );
				$form.attr("target" ,"_self"        );
				$form.attr("action" , p);
				$form.submit();
			}
		}
	},
	
	/**
	 * 상세조회 Box를 내립니다.
	 * @param height
	 */
	setDsBox : function(h){
		var speed = 400;
		var schBox = $("#sch_box");
		var scStat="open";
		var opBox = schBox.find(".opView");
		var viewBtn = schBox.find(".scMore");
		var heCall  = (jex.isNull(h)?"95px" : h);
		
		viewBtn.click(openSCbox);
		function openSCbox() {
			if(scStat=="open"){
				schBox.animate( {height:heCall }, 'slow' ,function(){
					schBox.css("overflow","");
//					pf.frameReSize();
				});
				opBox.css({display:"block"});
				viewBtn.find("img").attr("src",viewBtn.find("img").attr("src").replace("_dn.gif", "_up.gif"));
				scStat="close";
			}else{
				schBox.animate( {height:"58px" }, 'slow' ,function(){
					schBox.css("overflow","");
//					pf.frameReSize();
				});
				opBox.css({display:"none"});
				viewBtn.find("img").attr("src",viewBtn.find("img").attr("src").replace("_up.gif", "_dn.gif"));
				scStat="open";
			}
		}
	},
	
	/**
	 * Ajax 거래시 로딩바 올리기
	 * @param input
	 */	
	setNowLoding : function( input ){
		//jexLoading
		try{
			var scrollTop = $(window.parent.document).scrollTop();
			var docHeight = $(window.parent.document).height();
//			console.log("height::"+$(window.parent.document).height());
//			console.log("top:"    +$(window.parent.document).scrollTop());				
			if(scrollTop > 0){
				$(window.parent.document).find(".jexLoading"    ).css("height" , docHeight+100+"px");
				$(window.parent.document).find("#jexLoading_img").css("top"    , scrollTop+200+"px");
				$(window.parent.document).find("#jexLoading_img").css("height" , 0+"px");
			}
			else{
				$(window.parent.document).find(".jexLoading"    ).css("height" , docHeight+"px");
				$(window.parent.document).find("#jexLoading_img").css("height" , 0+"px");
			}
//			$(window.parent.document).find("body").css("overflow","hidden");
		}catch(e){
			var scrollTop = $(window.document).scrollTop();
			var docHeight = $(window.document).height();
//			console.log("height::"+$(window.document).height());
//			console.log("top:"    +$(window.document).scrollTop());				
			if(scrollTop > 0){
				$(window.document).find(".jexLoading"    ).css("height" , docHeight+100+"px");
				$(window.document).find("#jexLoading_img").css("top"    , scrollTop+200+"px");
				$(window.parent.document).find("#jexLoading_img").css("height" , 0+"px");
			}
			else{
				$(window.parent.document).find(".jexLoading"    ).css("height" , docHeight+"px");
				$(window.parent.document).find("#jexLoading_img").css("height" , 0+"px");
			}
			
			
//			$(window.document).find("body").css("overflow","hidden");
			
		}

		
		
		try{
			var lodingBarYn = pf.null2void(input["_LODING_BAR_YN_"],"N");
			if(lodingBarYn == "Y"){
				var loding = jex.plugin.get("JEX_LODING");
				loding.start();
			}		
		}catch(e){}
		
		
	},
	
	/**
	 * Ajax 거래시 로딩바 삭제
	 * @param input
	 */	
	removeLoding : function ( input ){
		try{
			if($(window.parent.document).find("body").data("OPEN_POP") != "true"){
				$(window.parent.document).find("body").css("overflow","");	
			}
		}catch(e){
			if($(window.parent.document).find("body").data("OPEN_POP") != "true"){
				$(window.parent.document).find("body").css("overflow","");	
			}
		}
		
		
		_PROGRESS_CHECK = false;
		var loding = jex.plugin.get("JEX_LODING");
		if(loding)
			loding.stop();
	},
	
	/**
	 * 현재일자 조회 yyyymmddmiss
	 * @return currentDate
	 */
	getToDay : function (opt){
		 var now  =new Date(); 
		 var year =now.getFullYear();
		 var month=now.getMonth();
		 var date =now.getDate();
		 var hour =now.getHours(); 
	     var min  =now.getMinutes();
	     var sec  =now.getSeconds();
		 var m    = (month+1>9) ? month+1 : '0'+(month+1);
		 var d    = (date>9) ? date : '0'+date;
		 var currentDate=year+""+(m)+""+(d)+"";//+(hour>9?hour:'0'+hour)+(min>9?min:'0'+min)+(sec>9?sec:'0'+sec);
		 if(typeof(opt) != "undefined") currentDate += String(hour>9?hour:'0'+hour)+String(min>9?min:'0'+min)+String(sec>9?sec:'0'+sec);
		 
		 return currentDate;
	},
	
	/**
	 * 현재월의 첫째날 조회 yyyymmdd
	 * @return currentDate
	 */
	getFirstDay : function(yyyymmdd){

		if(yyyymmdd.length == 8){
			first= yyyymmdd.substring(0,6)+"01";
		}else
			first="";
		return first;
	},
	

	/**
	 * 마지말 일을 조회 합니다. 
	 * @param  year+month : yyyymm형식의 날짜 
	 * @return Day        : 마지막 일
     */
	getLastDay : function (yyyymm){
		var strDay = "";
		if( yyyymm.length == 6 ){
			var year  = Number(yyyymm.substring(0,4));
			var month = Number(yyyymm.substring(4,6));
			var lastDate = new Date(year,month,0);
			strDay = lastDate.getDate();
		}
		return strDay;
	},
	/**
	 * 마지말 일자를 조회 합니다. 
	 * @return Day        : 마지막 일자
	 */
	getNowMonLastDay : function (){
		var toDay = getToDay();
		var lastDay = getLastDay(toDay.substring(0,6));
		var year  = toDay.substring(0,4);
		var month = toDay.substring(4,6);
		return year+""+month+""+lastDay; 
	},

	/**
	 * 현재요일 조회
	 * @param  year+month+day : yyyymmdd형식의 날짜  
	 * @return week
	 */
	getWeek : function (yyyymmdd){
		var week;
		if( jex.lang() == "DF" )
			week = new Array("일","월","화","수","목","금","토");
		else
			week = new Array("日","月", "火", "水", "木", "金", "土");
		
		var strYear   = yyyymmdd.slice(0,4);
		var strMonth  = yyyymmdd.slice(4,6);
		var strDay    = yyyymmdd.slice(6,8);
		strDay = parseFloat(strDay);
		
		var tmpDate = new Date(strYear+"/"+strMonth+"/"+strDay);
		var nWeek   = tmpDate.getDay();
		return week[nWeek]; 
	},

	/**
	 * 날짜에 일수 더하기
	 * @param  sDate , nDays  
	 * @return date
	 */
	date_add : function(sDate, nDays) {
	    var yy = parseInt(sDate.substr(0, 4), 10);
	    var mm = parseInt(sDate.substr(4, 2), 10);
	    var dd = parseInt(sDate.substr(6,2), 10);
	    d = new Date(yy, mm - 1, dd + nDays);
	    yy = d.getFullYear();
	    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	    return '' + yy + '' +  mm  + '' + dd;
	},

	/**
	 * 날짜에 일수 빼기
	 * @param  sDate , nDays  
	 * @return date
	 */
	date_minus : function(sDate, nDays) {
	    var yy = parseInt(sDate.substr(0, 4), 10);
	    var mm = parseInt(sDate.substr(4, 2), 10);
	    var dd = parseInt(sDate.substr(6,2), 10);
	    d = new Date(yy, mm - 1, dd - nDays);
	    yy = d.getFullYear();
	    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	    return '' + yy + '' +  mm  + '' + dd;
	},	
	
	/**
	 * 날짜에 월 더하기
	 * @param  sDate , nMon  
	 * @return date
	 */
	month_add : function (sDate, nMon) {
	    var yy = parseInt(sDate.substr(0, 4), 10);
	    var mm = parseInt(sDate.substr(4, 2), 10);
	    var dd = parseInt(sDate.substr(6, 2), 10);
	    d = new Date(yy, (mm - 1) + nMon, dd);
	    yy = d.getFullYear();
	    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	    return '' + yy + '' +  mm  + '' + dd;
	},

	/**
	 * 날짜에 월 빼기
	 * @param  sDate , nMon  
	 * @return date
	 */
	month_minus : function (sDate, nMon) {
	    var yy = parseInt(sDate.substr(0, 4), 10);
	    var mm = parseInt(sDate.substr(4, 2), 10);
	    var dd = parseInt(sDate.substr(6, 2), 10);
	    d = new Date(yy, (mm - 1) - nMon, dd);
	    yy = d.getFullYear();
	    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	    return '' + yy + '' +  mm  + '' + dd;
	},

	/**
	 * 날짜와 날짜 차이 계산
	 * @param  fromDate , toDate  
	 * @return 차이일수
	 */
	remainder_day : function (fromDate , toDate){
	    var Fyy = parseInt(fromDate.substr(0, 4), 10);
	    var Fmm = parseInt(fromDate.substr(4, 2), 10);
	    var Fdd = parseInt(fromDate.substr(6, 2), 10);
	    var Tyy = parseInt(toDate.substr(0, 4), 10);
	    var Tmm = parseInt(toDate.substr(4, 2), 10);
	    var Tdd = parseInt(toDate.substr(6, 2), 10);
	    var startDay = new Date(Fyy , Fmm-1 , Fdd);
	    var lastDay   = new Date(Tyy , Tmm-1 , Tdd);
	    var dat_calc = (lastDay.getTime() - startDay.getTime())/(24*60*60*1000);
	    return dat_calc+"";
	},
	/**
	 * 목록을 받아와 select 태그의 options을 채워준다.
	 * @param  target 	- option이 채워질 select 태그  
	 * @param  rec 		- 데이터 REC 
	 * @param  input 	- 데이터가 KEY, CODE가 아닐 경우 해당 데이터 항목(ex. {"KEY":"ID","CODE":"NM"})
	 * @return option 태그 
	 */
	setOptions : function (target, rec, input) {
		$(target).find("option.generated").remove();
		
		var html = "";
		
		if(jex.isNull(input)) input = {"KEY":"KEY","CODE":"CODE"};
		
		if(jex.isNull(input.KEY)) input.KEY = "KEY";
		if(jex.isNull(input.CODE)) input.CODE = "CODE";
		
		$.each(rec, function(i, v) {
			if(jex.isNull(v[input.KEY]) || jex.isNull(v[input.CODE])) {
				alert("KEY, CODE값이 유효하지 않습니다.");
				return false;
			}
			
			var attr = "";
			
			for(var attrKey in v) {
				if(
					attrKey != "class" && attrKey != "selected" && attrKey != "value" && attrKey != "KEY" && attrKey != "CODE"
					&& !jex.isNull(v[attrKey]) && v[attrKey] != "null" && v[attrKey] != "undefined"
				) {
					attr += " "+attrKey+" = '"+v[attrKey]+"' ";
				}
			}
			
			if(v[input.KEY] == input.SELECTED) {
				html += "<option class='generated' selected='selected' value='"+v[input.KEY]+"' "+attr+">"+v[input.CODE]+"</option>";
			}
			else {
				html += "<option class='generated' value='"+v[input.KEY]+"' "+attr+">"+v[input.CODE]+"</option>";
			}
		});
		$(target).append(html);
	}, 
	
	/**
	 * 문자열에서 유효한 산출식 추출하여 계산하는 함수
	 * @param  str 	- 문자열  
	 */
	calcExtraction : function (str) {
		if( !jex.isNull(str) ){
			var Re = /[^0-9 \(\)*+-/]/g;
			var temp = str.replace(Re,'');
			temp = temp.replaceAll(",","");
			try{
				if(temp.substring(0,1) =="0"){
					temp =temp.substring(1);
					
				}
					return eval(temp)+"";
				
			}catch(e){
				return "유효한 산출식이 아닙니다.";
			}
		}
	}, 
	
	/**
	 * iframe Resize를 합니다.
	 */
	frameReSize : function () {
		try{
			window.parent.docReSize();
		}catch(e){
		}
	},
	/**
	 * grid의 데이터를 엑셀로 저장 합니다.
	 */
	gridExcelDown : function( gu , title ){
		var excelGrid = gu.getGrid();
		excelGrid["fileTitle"] = {"title": title};
		window._saveTargetJgrid = excelGrid;
		var winObj = window.open("/js/jexGrid/file/newDownload.jsp", "jgridFileDownload", "width=" + 850 + ",height=" + 700);
		winObj.blur();
		winObj.focus();
	},
	
	log : function(Object){
		try{
			if(console){
				
			}			
		}catch(e){}
	}
};
/****************Util Function****************/





/**
 * replaceAll
 * param1 치환될 문자
 * param2 치환할 문자
 * */
String.prototype.replaceAll = function( str1, str2 )
{
	var temp_str = this;
	if(temp_str == null || temp_str == "undefined" || temp_str == ""){
		return "";
	}else{
		 temp_str = temp_str.replace(/(^\s*)|(\s*$)/gi, "");
		 temp_str = temp_str.replace(eval("/" + str1 + "/gi"), str2);
		 return temp_str;		
	}
}

/**
 * 특정위치에 문자를 제거 합니다.
 * param1 위치
 * param2 문자
 * */
String.prototype.removeChar = function( idx )
{
	var temp     = "";
	if(this == null || this == "undefined" || this == ""){
		return "";
	}else{
		for( var i= 0; i <  this.length; i++ ){
			if(i == idx-1){
				continue;
			}else{
				temp +=  this.charAt(i);
			}
				
		}
		return temp;
	}
}