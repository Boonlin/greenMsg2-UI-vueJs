if (!jex) var jex = new _jex();
var _jexMLCustomVari = {extVar:{}};

(function() {
	/**
	 * 다국어를 사용자 정의에 맞도록 수정해주는 기능.
	 */
	var jexMlCustom = JexCustom.extend({
		/**
		 * Page load 및 언어 change 발생 시 아래 함수가 실행된다.
		 */
		onChange: function(ln) {
			var _typeMatch = {"jexGridH":"changeGridHeader", "jexGridF":"changeGridFooter"};

			/**
			 * ExtVal에 대한 처리
			 */
			_jexMLCustomVari.extVar = jex.plugin.get("JEX_ML").setExtVar(_jexMLCustomVari.extVar);
			
			/**
			 * ETC에 jexGridH, jexGridF 등의 형태로 등록한 녀석들을 처리한다.
			 * jexGridH/#id == key
			 * jexGridF/#id == key
			 * jex.plugin.get("JEX_ML").chageGridHeader(key, jsonValue);
			 * jex.plugin.get("JEX_ML").chageGridFooter(key, jsonValue);
			 */
			for (var key in _jexMLCustomVari.extVar) {
				for (var typeKey in _typeMatch) {
					if (key.startsWith(typeKey)) {
						jex.plugin.get("JEX_ML")[_typeMatch[typeKey]](key, _jexMLCustomVari.extVar[key]);
					}
				}
			}
			if (jex.plugin.get("JEX_ML_LODING")) jex.plugin.get("JEX_ML_LODING").stop();
		}
		/**
		 * 다국어가 load되면서 아래 함수가 실행된다.
		 */
		,onload: function(ln) {
			/**
			 * addFunction을 통해 다국어에 존재하지 않는 함수를 생성할 수 있다.
			 * 사용예 )
			 * 		jex.plugin.get("JEX_ML").fnName();
			 */
			this.addFunction('setExtVar', function(vari) {
				vari = _jexMLCustomVari.extVar;
				
				/**
				 * ETC데이터를 읽어서 해당 데이터에 맞게 변환
				 */
				var etcData = jex.plugin.get("JEX_ML").getEtcData();
				if (!etcData) etcData=[];
				for (var i=0; i<etcData.length; i++) _jexMLCustomVari.extVar[etcData[i]["JEX_LANG"]] = etcData[i][jex.lang()];
				
				return _jexMLCustomVari.extVar;
			});
			
			this.addFunction('changeGridHeader', function() {

				var mlKey; 	 	// { jexGridH/#jexGrid }
				var headDat; 	// { "계좌번호,거래일자,거래순번,거래시간,입출금구분,입출금금액" }
				var gridDiv;		// { "#jexGrid" }
				if (arguments.length ==2) { // arguments = {"0":"jexGridH/#jexGrid","1":"계좌번호,거래일자,거래순번,거래시간,입출금구분,입출금금액"}
					/**
					 * mlKey, headDat
					 */
					mlKey 		= arguments[0];
					headDat 	= arguments[1];
					gridDiv		= mlKey.split("/")[1];
				} else if (arguments.length ==3) {
					/**
					 * div, ln, mlKey
					 */
					gridDiv		= arguments[0];
					mlKey 		= arguments[2];
					var ln 		= arguments[1];
					headDat 	= jex.plugin.get("JEX_ML").getEtcData(ln,mlKey);
				}
				
				if (!headDat) return;
					
				var newName = headDat.split(",");
				var gridObj = JGM.getGridByElementId($(gridDiv).attr("id"));    // grid 객체를 가져옴
				var colDefs = gridObj.colDefMgr.getAll();

				var chkMgr  = gridObj.checkMgr;
				var chkKey	= undefined;
				if (chkMgr) chkKey = chkMgr.getKey();
				
				var j=0;
				for (var i=0; i<colDefs.length; i++) {
					if (chkKey == colDefs[i].key) j++;
					else colDefs[i].name = newName[i-j];
				}
				
				gridObj.header.rerender();
			});
			
			this.addFunction('getGridHeader', function(gridContainer) {
				var key = "jexGridH/"+gridContainer;
				return _jexMLCustomVari.extVar[key].split(",");
			});
			
			this.addFunction('getCountTemplete', function(gridContainer) {
				var key		= "jexGridF/"+gridContainer;
				var templete = "%0% <span name='shownCount'></span> %1% <span name='totalCount'></span> %2%";
				var tplvar	= _jexMLCustomVari.extVar[key].split(",");
				for (var i=0; i<3; i++) {
					regExp = new RegExp("%"+i+"%");
					templete = templete.replace(regExp, tplvar[i]);
				}
				return templete;
			});
			
			this.addFunction('changeGridFooter', function() {
			
				var mlKey;
				var footerdat;
				var gridDiv;
				if (arguments.length ==2) {
					/**
					 * mlKey, headDat
					 */
					mlKey 		= arguments[0];
					footerdat 	= arguments[1];
					gridDiv		= mlKey.split("/")[1];
				} else if (arguments.length ==3) {
					/**
					 * div, ln, mlKey
					 */
					gridDiv		= arguments[0];
					mlKey 		= arguments[2];
					var ln 		= arguments[1];
					footerdat 	= jex.plugin.get("JEX_ML").getEtcData(ln,mlKey);
				}
				
				if (!footerdat) return;
				if (!gridDiv) 	return;
				
				var mlGridVal = footerdat.split(",");
				var footerDiv = $(gridDiv).find(".footer-cell");
				var nowCnt = $("[name=shownCount]").html();
				var totCnt = $("[name=totalCount]").html();
				var shownCntHTML	= "<span name=\"shownCount\">"+nowCnt+"</span>";
				var totCntHTML		= "<span name=\"totalCount\">"+totCnt+"</span>";
				
				footerDiv.html(""+mlGridVal[0]+" "+shownCntHTML+" "+mlGridVal[1]+" " +totCntHTML +" "+mlGridVal[2]);
			});
		}
	});	
	jex.plugin.get("JEX_ML").addCustom(jexMlCustom);
})();
