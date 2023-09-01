{
	/**
	 * Debugger 정의
	 * 동적으로 table을 만들어주기 위하여 JSON2Tbl을 구현해주자.
	 * 
	 * Debugger를 구현하기 위해서는 JexDebugger를 상속 받아야 한다.w
	 * 
	 * jex.getDebugData			<-- function 구현
	 * jex.makeTbl(json,opt) 	<-- function 구현
	 */
	var _JexDebugger = JexDebugger.extend({
		init:function() {
			/**
			 * Page가 로드되기전에 init이 실행되므로 잘 고민하고 코딩해야 한다.
			 */
			this._super();
			this.obj 			= $("#"+jex.getDebuggerId());
			this.tblSize		= 1;
			this.view_data_min	= 1;
			this.view_data_max	= 10;
			this.bufferSize		= 50;
			this.opacity 		= 70;
			this.opacity2		= this.opacity/100;
			this.head		= [
			         		    {'ID':'NOW',	'NAME':'시간',		'style':'border:1px solid #aaaaaa;text-align:center;width:150px;height:15px'}
			         		   ,{'ID':'TYPE',	'NAME':'구분',		'style':'border:1px solid #aaaaaa;text-align:center;width:50px;height:15px'}
			         		   ,{'ID':'CODE',	'NAME':'코드',		'style':'border:1px solid #aaaaaa;text-align:center;width:50px;height:15px;'}
			         		   ,{'ID':'MSG',	'NAME':'메시지',		'style':'border:1px solid #aaaaaa;text-align:left;overflow:hidden;'}
			         		   ,{'ID':'PTM',	'NAME':'처리시간',	'style':'border:1px solid #aaaaaa;text-align:center;width:70px;height:15px;'}
			         		   ,{'ID':'ETC',	'NAME':'기타',		'style':'border:1px solid #aaaaaa;text-align:center;width:50px;height:15px'}
			         		   ];
			this.dat 		= [];
			this.table;
			this.thead;
			this.tbody;
			this.width	= "70%";
			this.height = 32;
			this.pObj;
			try {
				this.left		= 0;
				this.top		= $(window).height() - this.height+2;
			} catch(e) {
				this.left		= 1000;
				this.top		= 700;
			}
			if (this.obj.length==0) {
				/**
				 * Debug DIV에 TABLE을 만든다.
				 */
				this.obj	= $("<div></div>");
				this.table	= $("<table></table>");
				this.thead	= $("<thead><tr></tr></thead>");
				this.tbody	= $("<tbody></tbody>");
				
				this.obj.attr("id",		jex.getDebuggerId()	);
				this.setDivStyle();
				this.obj.show();
			
				this.table.appendTo(this.obj);
				this.thead.appendTo(this.table);
				this.tbody.appendTo(this.table);
				var r = this;
				$(window).scroll(function() { r.setPosition(); });
				$(window).resize(function() { r.setPosition(); });


			}
		},setPosition:function() {
			this.pObj = "#cc";
			this.height = this.table.height();
			this.obj.css("height",this.height+"px");
			this.top	= $(this.pObj).offset().top + $(this.pObj).height()-(this.height + 2);
			this.obj.stop().animate({"left":"30px","top":this.top+"px"},1000);
		},setDivStyle:function() {
			this.divStyle	= {
					 "z-index"			:"31000"
					,"position"			:"absolute"
					,"overflow"			:"hidden"
					,"top"				:this.top	+"px"
					,"left"				:this.left	+"px"
					,"border"			:1			+"px solid #000000"
					,"width"			:this.width
					,"height"			:this.height
					,"background-color"	:"#ffffff"
					,"FILTER"			:"filter:alpha(opacity="+this.opacity+")"
					,"-khtml-opacity"	:this.opacity2
					,"-moz-opacity"		:this.opacity2
					,"opacity"			:this.opacity2
			};		
			for (var v in this.divStyle) { this.obj.css(v, this.divStyle[v]); }
		},setOpacity:function(o) {
			this.opacity = o;
			this.opacity2= o/100;
			this.setDivStyle();
		},addMsg:function(m) {
			var r = this;
			if ($("#"+this.obj.attr("id")).length ==0) {
				this.obj.appendTo("body");
				this.setDivStyle();
				this.table.css("width","100%");
				/**
				 * TABLE 헤더 정의
				 */
				var thtr = this.thead.find("tr");
				for (var i=0;i<this.head.length;i++) {
					var v = this.head[i];
					var td = $("<td></td>");
					td.appendTo(thtr);
					td.attr("id",	v['ID'	 ]);
					td.attr("style",v['style']);
					td.html(v['NAME']);
				}
				this.thead.unbind('toggle').unbind('click');
				this.thead.css("cursor","pointer");
				this.thead.toggle(function() {
					r.tblSize	= r.view_data_max;
					r.reDrawTbl();
					r.setPosition();
				},function() {
					r.tblSize	= r.view_data_min;
					r.reDrawTbl();
					r.setPosition();
				});
			}
			m['NOW'] = jex.date().getDate("yyyy-mm-dd hh:mi:ss:ms");
			this.dat.push(m);
			if (this.dat.length > this.bufferSize) this.dat.shift();
			var tr = $("<tr></tr>");
			tr.prependTo(this.tbody);
			for (var i=0;i<this.head.length;i++) {
				var v = this.head[i];
				var td = $("<td><div></div></td>");
				td.appendTo(tr);
				td.attr("id",		v['ID'	 ]);
				td.attr("style",	v['style']);
				td.find("div").attr("style","width:100%;height:15px;overflow:hidden;");
				td.find("div").html(m[v['ID']]);
				if (v['ID']=="MSG") {
					td.css("cursor","pointer");
					td.dblclick(function(e) {
						var x = e.pageX - this.offsetLeft;
						var y = e.pageY - this.offsetTop;
						r.makeToolTip($(this).find("div").html(), x, y);
					});
				}
			}
			if (this.tbody.find(">tr").length>this.tblSize) this.tbody.find(">tr:last").remove();
			else											this.setPosition();
		},reDrawTbl:function(){
			var r = this;
			this.tbody.find("tr").remove();
			var idx = this.dat.length - this.tblSize;
			idx = (idx>0)?idx:0;
			for (var j=idx; j<this.dat.length; j++) {
				var m = this.dat[j];
				var tr = $("<tr></tr>");
				tr.prependTo(this.tbody);
				for (var i=0;i<this.head.length;i++) {
					var v = this.head[i];
					var td = $("<td><div></div></td>");
					td.appendTo(tr);
					td.attr("id",		v['ID'	 ]);
					td.attr("style",	v['style']);
					td.find("div").attr("style","width:100%;height:15px;overflow:hidden;");
					td.find("div").html(m[v['ID']]);
					if (v['ID']=="MSG") {
						td.css("cursor","pointer");
						td.dblclick(function(e) {
							var x = e.pageX - this.offsetLeft;
							var y = e.pageY - this.offsetTop;
							r.makeToolTip($(this).find("div").html(), x, y);
						});
					}
				}
			}
		},makeToolTip:function(msg,l,t){
			if (jex.isNull(this.tooltipDiv)||this.tooltipDiv.length == 0) {
				this.tooltipDiv = $("<div id='_jexDebuggerTooltip'>"+msg+"</div>");
				this.tooltipDiv.appendTo("body");
				this.tooltipDivHeight = 200;
				this.tooltipDiv.attr("style","z-index:32768;background-color:#ffffff;position:absolute;min-height:"+this.tooltipDivHeight+"px;width:98%;top:"+(t-this.tooltipDivHeight)+"px;left;"+(l+this.tooltipDiv.width())+"px;border:1px solid #000000;");
				var r = this;
				this.tooltipDiv.dblclick(function() { r.tooltipDiv.hide(); });
			} else {
				this.tooltipDiv.html(msg);
				this.tooltipDiv.show();
			}
			
		},setHeader:function(h){
			this.head = h;
		},printDebug:function(msg){
			var m = {};
			m['TYPE'] = "DEBUG";
			m['CODE'] = "";
			m['MSG' ] = msg;
			this.addMsg(m);
		},printInfo	:function(code,msg){
			var m = {};
			m['TYPE'] = "INFO";
			m['CODE'] = code;
			m['MSG' ] = jex.getMsg(code) + "::" + jex.null2Void(msg);
			this.addMsg(m);
		},printError:function(code,msg){
			var m = {};
			m['TYPE'] = "ERROR";
			m['CODE'] = code;
			m['MSG' ] = jex.getMsg(code) + "::" + jex.null2Void(msg);
			this.addMsg(m);
		}
	});
	jex.setDebugger(new _JexDebugger());	
}