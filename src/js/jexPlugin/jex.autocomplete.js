/**
 * AUTO COMPLETE처리를 위한 Plugin
 * @author 김학길
 */
(function() {
	var plugin_autocomplete = JexPlugin.extend({
		/**
		 * 생성자
		 */
		init:function(inputbox) {
			var r = this;
			this.dataFn;
			this.selectList	= [];
			this.obj		= $("<div></div>");
			this.table		= $("<table></table>");
			this.thead		= $("<thead><tr></tr></thead>");
			this.tbody		= $("<tbody><tr></tr></tbody>");
			this.tfoot		= $("<tfoot><tr></tr></tfoot>");
			this.column		= [{'ID':'RSLT','NAME':'결과','style':'border:1px solid #aaaaaa;text-align:center;width:150px;height:15px'}];
			this.inputbox	= $(inputbox);
			this.checkbox	= false;
			this.obj_css	= {	 "border"	:"1px solid #000000"
								,"z-index"	:20000
								,"height"	:"100px"
								,"position"	:"absolute"
								,"overflow"	:"auto"
								,"background-color"	:"#ffffff"
							  };
			this.table_css	= {"width" : "100%"};
			this.thead_css	= {};
			this.tbody_css	= {};
			this.tfoot_css	= {};
			this.selectCol	= "red";
			
			this.select_css		= {"background-color":"#cccccc"};	// 선택되었을때
			this.unselect_css	= {"background-color":"#ffffff"};	// 선택해지 되었을때
			this.onMouseOver	= false;
			
			this.obj.appendTo	("body");
			this.table.appendTo	(this.obj);
			this.thead.appendTo	(this.table);
			this.tbody.appendTo	(this.table);
			this.selected	;
		
			this.drawObj();
			this.obj.hide();
			this.drawTable();
			this.drawThead();
			this.drawTfoot();
		
			this.inputbox.focusout	(function() {
				if (!r.onMouseOver) r.obj.hide();
			});
			this.obj.mouseover		(function() { r.onMouseOver = true;  });
			this.obj.mouseout		(function() { r.onMouseOver = false; });
			
			this.inputbox.click(function() {
				if (r.obj.is(":visible")) {
					r.obj.hide();
				} else {
					if (!jex.isNull($(this).val())) r.obj.show();
				}
			});
			$(window).resize(function() { r.drawObj(); });
			$(window).scroll(function() { r.drawObj(); });
			
			this.compareFn	= function(dat,key) {
				if (dat.indexOf(key) > -1)	return true;
				else						return false;
			};
		},
		/**
		 * 비교조건 지정
		 * fn's param : dat, key
		 */
		setCompareFn:function(fn) {
			this.compareFn = fn;
		},
		/**
		 * 체크박스 사용여부 지정
		 */
		setCheckbox:function(boolean) {
			this.checkbox = boolean;
		},
		/**
		 * 데이터를 가져오는 Function지정
		 * 
		 * fn's param : key
		 */
		setDataFn:function(fn) {
			this.dataFn = fn;
		},
		/**
		 * InputBox에 포커스를 준다.
		 */
		focus:function() {
			this.inputbox.focus();
		},
		/**
		 * 자동검색창을 숨긴다.
		 */
		hide:function() {
			this.obj.hide();
		},
		/**
		 * 자동검색창을 보인다. 
		 */
		show:function() {
			this.obj.show();
		},
		/**
		 * 선택된 데이터를 받아온다.
		 * @returns {Array}
		 */
		getData:function() {
			return this.selectList;
		},
		/**
		 * Input box에서 Key를 눌렀을때 처리
		 * @param event
		 * @returns {Boolean}
		 */
		evtKeyDown:function(event) {
			r = this;
			/**
			 * 위아래 버튼 정의
			 */
			if (event.keyCode==9) return true;
			if (r.checkbox && event.keyCode==32)	  {							// Space
				if (!jex.isNull(r.selected)) {
					r.selected.find("input").click();
				}
				r.select(r.selected);
				return false;
			}
			if (event.keyCode==13||event.keyCode==27) { r.obj.hide(); return; }	// Enter or Esc
			if (event.keyCode==40||event.keyCode==38) {							// Up or Down
				var sel;
				if (jex.isNull(r.selected))	sel = (event.keyCode==38)?r.tbody.find("tr:last"):r.tbody.find("tr:first");
				else 							{
					if (event.keyCode==38) {
						sel = r.selected.prev();
						if (jex.isNull(sel.find("td").html())) sel = r.tbody.find("tr:last");
					} else {
						sel = r.selected.next();
						if (jex.isNull(sel.find("td").html())) sel = r.tbody.find("tr:first");
					}
				}
				/**
				 * Key up Down 시 scroll처리 이건 천천히 fix해주자. 처음부터 완벽한건 잘 없음.-_-;
				 */
				//if (sel.offset().top < this.obj.offset()) { this.ob.get(0).scrollBy(0,(-1*sel.height()*2));	 }
				var eleoffset = ((sel.offset().top+sel.height()) - (this.obj.offset().top+this.obj.height()));
				var scroffset = this.obj.scrollTop();
				if (eleoffset > 0) { this.obj.scrollTop(scroffset+eleoffset); }
				var bet = sel.offset().top - this.obj.offset().top;
				if (bet < 0) {
					this.obj.scrollTop(scroffset+bet);
				}
				r.selected = sel;
				r.select(sel);
				return false;
			}
			setTimeout(function() {
				var key = r.inputbox.val();
				if (jex.isNull(key)) { r.obj.hide(); return; }
				r.obj.show();
				dataList = r.dataFn.call(r,key);
				jex.printDebug(jex.toStr(dataList));
				r.drawLayer(dataList);
			},0);
			r.drawObj();
			return true;
		},
		/**
		 * INPUT BOX를 지정하고 apply하면 autocomplete가 된다.
		 * @param inputbox
		 */
		apply:function() {
			/**
			 * INPUT BOX에서 키 입력이 있을때 처리
			 */
			var r = this;

			r.inputbox.keydown(function(event) {
				r.evtKeyDown(event);
			});
		},
		/**
		 * Tr이 SELECT 되었을때 처리
		 */
		select:function(selector) {
			var r = this;
			for (var v in this.unselect_css	) { this.tbody.find("tr").css(v, this.unselect_css[v]); }
			if (!jex.isNull(selector)) for (var v in this.select_css	) { selector.css(v, this.select_css[v]); }
			if (!this.checkbox) {
				this.inputbox.val(selector.find("td:last").html().replace(/(<([^>]+)>)/ig,""));
				this.selectList = [selector.find("td:last").html().replace(/(<([^>]+)>)/ig,"")];
			} else {
				var checkedData = this.tbody.find("input:checked");
				var datCnt		= checkedData.length;
				this.selectList = [];
				$.each(checkedData, function() { r.selectList.push($(this).parent().parent().find("td:last").html().replace(/(<([^>]+)>)/ig,"")); });
				if (datCnt>1) 	this.inputbox.val(r.selectList[0] +"외 "+(datCnt-1)+"건");
				else 			this.inputbox.val(selector.find("td:last").html().replace(/(<([^>]+)>)/ig,""));
			}
		},
		/**
		 * 자동 완성 Table을 그려준다.
		 */
		drawObj:function() {
			this.obj_css ['width'] 	= (this.inputbox.width()+3)+"px";
			this.obj_css ['top'	 ]	= (this.inputbox.offset().top+this.inputbox.height()+2)+"px";
			this.obj_css ['left' ]	=  this.inputbox.offset().left +"px";
			for (var v in this.obj_css) { this.obj.css(v, this.obj_css[v]); }
		},
		/**
		 * 자동 완성 Table을 그려준다.
		 */
		drawTable:function() {
			for (var v in this.table_css) { this.table.css(v, this.table_css[v]); }
		},
		/**
		 * 자동완성 Thead를 그려준다.
		 */
		drawThead:function() {
			for (var v in this.thead_css) { this.thead.css(v, this.thead_css[v]); }
		},
		/**
		 * 자동완성 Tbody를 그려준다.
		 */
		drawTbody:function(dataList) {
			this.tbody.find("tr").remove();
			var r = this;
			var inputVal = r.inputbox.val();
			for (var v in this.tbody_css) { this.tbody.css(v, this.tbody_css[v]); }
			for (var i=0; i<dataList.length; i++) {
				var tr = $("<tr><td>"+dataList[i].replace(new RegExp(inputVal,"g"), "<font color='"+r.selectCol+"'>"+inputVal+"</font>")+"</td></tr>");
				if (r.checkbox) $("<td><input type='checkbox' id='chk' /></td>").prependTo(tr);
				tr.appendTo(this.tbody);
				tr.find("td:last").css("cursor","pointer");
				tr.mouseover(function() { r.select($(this)); });
				tr.click(function() {
					r.inputbox.focus();
					r.select($(this));
				});
				tr.find("td:last").click(function() {
					if (r.checkbox) {
						$(this).parent().find("input").click();
					} else	{ 
						r.inputbox.val($(this).html());
						r.obj.hide();
					}
				});
				$(this).parent().find("input").click(function(){ r.select(r.selected); });
	//			if (r.checkbox) $("<td><input type='checkbox' id='chk' /></td>").prependTo(tr);
			}
		},
		/**
		 * Table footerfmf rmfuwnsek.
		 */
		drawTfoot:function() {
			for (var v in this.tfoot_css) { this.tfoot.css(v, this.tfoot_css[v]); }
		},
		/**
		 * 자동완성 Layer를 그려준다.
		 */
		drawLayer:function(dataList) {
			this.drawTbody(dataList);
		}
	});
	$(function() {
		jex.plugin.add("AUTO_COMPLETE",plugin_autocomplete);
	});
})();

	