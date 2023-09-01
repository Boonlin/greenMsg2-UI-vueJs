/**
 * <pre>
 * BIZPOINT PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : widget_0001.js
 * @File path    	 : BIZPOINT_PT_STATIC/web/js/bizpoint/api/view/widget
 * @author       	 : 김상묵 (  )
 * @Description    : API > 화면API > 포인트 위젯 > 포인트 위젯 - 잔액정보
 * @History      	 : 20141219094219, 김상묵
 * </pre>
 **/

new (Jex.extend({
	onload:function() {
		_this = this;
		//--- todo onload start ---//
		
		//selRfndPnt();				
	}, event:function() {
		//--- define event action ---//
		this.addEvent('#btn_chrg', 'click', function(e) {
			_this.excuteChrgPop();			
		});
		
		/*
		 * 숫자를 클릭하면 최신으로 업데이트 된다.
		 * */
		this.addEvent('#chrgPnt', 'click', function(e) {
			//selRfndPnt();	   	  	
		});
	}, 
		/*
		 * 충전 Popup
		 * */
		excuteChrgPop : function(){	
			    var	sizeW = parseInt(665, 10);	
				var	sizeH = parseInt(570, 10);
				//var	sizeH = 570;

				var nLeft = screen.width/2 - sizeW/2 ;  
				var nTop  = screen.height/2- sizeH/2 ;
				var option= ", position:absolute;,toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=yes";
				var winObj = window.open("", "refund", "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );
	
				var frm = document.getElementById("frm");
				frm.method = "post";
				frm.target = "refund";
//				frm.action = "http://dev.wepoint.wecontent.co.kr/refund_0001.act";
				frm.action = "https://wepoint-dev.bizplay.co.kr/refund_0000.act";
//				frm.action = "/refund_0001.act";
				frm.submit();	
	}	
}))();
/*
 * 위젯 컨트롤에 호출되는 콜백함수
 * */
function Callback(){
	//selRfndPnt();	
}

/*
 * 잔여포인트  업데이트 
 * */
function selRfndPnt(){
	var jsonResData;
	var strRsltCd; 
	var strRsltMsg;
	var strRmngPnt;
	var objRespData;
	/* json 개별부 */
	var jsonDtltRec = {
			  "PTL_ID"        : $("#PTL_ID").val()
			, "CHNL_ID"       : $("#CHNL_ID").val()
			, "USE_INTT_ID"   : $("#USE_INTT_ID").val()
			, "OWNER_ID"      : "useruser"//$("#OWNER_ID").val()
			, "BSNN_NO"	      : "1234567891"//$("#BSNN_NO").val()
			, "USR_ID"        : $("#USR_ID").val()
			, "USR_NM"        : $("#USR_NM").val()
	};
	/* json 공통부 */
	var jsonHead  = {
			 "KEY"           : "svc_0001" 	  				
		    , "SECR_KEY"      : "BIZPOINT"
			, "REQ_DATA"      : jsonDtltRec
		};
	/* json format*/
	var jsonString = JSON.stringify(jsonHead);
	  //jsonString =  encodeURIComponent(jsonString);
	/* Ajax 통신 */

	//console.log(jsonString);

	jQuery.ajax({type		 : "POST",
				 url		 : $("#GATEWAY_URL").html(),
				 data		 : {"JSONData":jsonString},
				 contentType : "application/x-www-form-urlencoded;charset=utf-8",
				 cache		 : true,
				 async		 : true,
				 error		 : function(){},
				 beforeSend: function (){},	                 
				 success	 : function(jsonObj) {
					//console.log(jsonObj);
					jsonResData = JSON.parse(jsonObj);
					strRsltCd   = jsonResData.RSLT_CD;
					strRsltMsg  = jsonResData.RSLT_MSG;
					jsonDtlData = jsonResData.RESP_DATA;
					strRmngPnt  = jsonDtlData.RMNG_PNT;
					if(strRsltCd == "0000"){
						if(jsonDtlData.PNT_USE_YN == "N" ){
							//$("#chrgPnt").html("<S>"+formatter.number(strRmngPnt)+"</S>");	
							$("#chrgPnt").html("<S>"+strRmngPnt+"</S>");
						}else{
							//$("#chrgPnt").html(formatter.number(strRmngPnt));
							$("#chrgPnt").html(strRmngPnt);
						}												
					}else{
						alert("error : "+strRsltMsg);
					}
				}
			
	});
}
