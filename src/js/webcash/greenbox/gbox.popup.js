var gbox;
if(!gbox) gbox={};

if(!gbox.popup) {
	gbox.popup={};

	//gbox.popup.layerId = "";
	gbox.popup.callbackFn = {};
	//gbox.popup.layerTitle = "";
	//gbox.popup.isRadio = true;
	//gbox.popup.editable = false;
	//gbox.popup.layer = {};
	//gbox.popup.jsonValue = {};
//	gbox.popup.getpoint = function (input, callbackFn) {
//		gbox.popup.callbackFn["refund_0001"] = callbackFn;
//		
//		if(!input) input = {};
//		input["uiMode"] = "POPUP";
//		jex.newWin( "http://dev.wepoint.wecontent.co.kr/refund_0001.act" + input['link'], "refund_0001", 665, 570, input); /* 팝업사이즈 400*240*/
//	};

	 
	gbox.popup.photoUpload = function (input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_1010"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_1010.act", "pop_gbox_pc_1010", 500, 190, input); /* 팝업사이즈 400*240*/
	};
	
	gbox.popup.excelUpload = function (input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_3030"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_3030.act", "pop_gbox_pc_3030", 680, 690, input); /* 680, 710, */
//		//edited
//		jex.newWin( "/pop_gbox_pc_3030.act", "pop_gbox_pc_3030", 680, 690, {resizable:"no"}); /* 680, 710, */
	};
	
	gbox.popup.excelDownload = function (input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_3040"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_3040.act", "pop_gbox_pc_3040", 500, 250, input);
	};
	
	
	//링크정보등록
	gbox.popup.linkAppForm = function (input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_4210"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_4210.act", "pop_gbox_pc_4210", 620, 700, input);
	};
	
	
	//수신자 목록
	gbox.popup.receiverList = function(input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_2020"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_2020.act", "pop_gbox_pc_2020", 620, 700, input);
	};
	
	
	//받는이 선택
	gbox.popup.receiverSelect = function(input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_1020"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_1020.act", "pop_gbox_pc_1020", 900, 652, input);
	};
	
	
	//add contact
	gbox.popup.contactForm = function (input, callbackFn) {
		gbox.popup.callbackFn["pop_gbox_pc_3010"] = callbackFn;
		
		if(!input) input = {};
		input["uiMode"] = "POPUP";
		jex.newWin( "/pop_gbox_pc_3010.act", "pop_gbox_pc_3010", 500, 224, input);
	};
	
}

