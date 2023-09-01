/**
 * menu v2
 * @author 김학길
 **/
(function() {

	/**
	 * Data를 관리하는 Class
	 */
	var plugin_menu_dataMgr = Class.extend({
		init:function() {
			this.menuData	= {};
			this.strConst	= {
									PRNTID :"PRNT_PKG",
									ID		:"PKG",
									NAME	:"PKG",
									CHILD	:"_CHILD",
									PATH	:"_PATH",
									ROOT	:"ROOT"
								};
			this.menuData[this.strConst.ID] = this.strConst.ROOT;
		}, find:function(path,key) {
			var paths = (path+"/"+key).split("/");
			var data = this.menuData[this.strConst.CHILD];
			for (var i=0; i<paths.length; i++) {
				if (jex.isNull(paths[i])) continue;
				if (paths[i]==this.strConst.ROOT) continue;
				
				for (var i=0; i<data.length; i++) {
					if (data[i][this.strConst.ID] == paths[i]) data = data[i][this.strConst.ID][this.strConst.CHILD];
				}
			}
			return data;
		}, put:function(data) {
			var _pt_this = this;
			/**
			 * DATA Format 
			 * [{ID:XXX, NAME:XXX, PRNT_ID:XXX ...}]
			 */
			if (!data||!data.length) return;
		
			function makeMenuData(data, prnt) {
				for (var i=0; i<data.length; i++) {
					var item = data[i];
					if (item[_pt_this.strConst.PRNTID] != prnt[_pt_this.strConst.ID]) continue;
				
					/**
					 * Path를 잡아준다.
					 */
					if (!prnt[_pt_this.strConst.PATH]) prnt[_pt_this.strConst.PATH] = "";
					item[_pt_this.strConst.PATH] = prnt[_pt_this.strConst.PATH]+"/"+prnt[_pt_this.strConst.ID];
					
					if (!prnt[_pt_this.strConst.CHILD]) prnt[_pt_this.strConst.CHILD] = [];
					prnt[_pt_this.strConst.CHILD].push(item);
					item = makeMenuData(data, item);
				}
				return prnt;
			}
			
			/**
			 * JSON을 재정렬해서 저장한다.
			 */
			this.menuData = makeMenuData(data,this.menuData);
		}, clear:function() {
			this.menuData = {};
		}
	});
	
	
	

	/**
	 * simple-menu
	 * <ul class="simplemenu_ul_main" id="group_menu"><li class="simplemenu_li" id="simplemenu_group_menu_group1"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">group : group1</div><ul class="simplemenu_ul_sub"><li class="simplemenu_li" id="simplemenu_group_menu_box1"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">box : box1</div><ul class="simplemenu_ul_sub"><li class="simplemenu_li" id="simplemenu_group_menu_asdf"><div class="float_left simplemenu_leaf"></div><div class="float_left simplemenu_text">container : asdf</div></li><li class="simplemenu_li" id="simplemenu_group_menu_dd"><div class="float_left simplemenu_leaf"></div><div class="float_left simplemenu_text">container : dd</div></li><li class="simplemenu_li" id="simplemenu_group_menu_dddddd"><div class="float_left simplemenu_leaf"></div><div class="float_left simplemenu_text">container : dddddd</div></li></ul></li><li class="simplemenu_li" id="simplemenu_group_menu_box2"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">box : box2</div><ul class="simplemenu_ul_sub"><li class="simplemenu_li" id="simplemenu_group_menu_gds"><div class="float_left simplemenu_leaf"></div><div class="float_left simplemenu_text">container : gds</div></li></ul></li><li class="simplemenu_li" id="simplemenu_group_menu_box3"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">box : box3</div></li><li class="simplemenu_li" id="simplemenu_group_menu_box4"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">box : box4</div></li><li class="simplemenu_li" id="simplemenu_group_menu_box5"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">box : box5</div></li></ul></li><li class="simplemenu_li" id="simplemenu_group_menu_group2"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">group : group2</div></li><li class="simplemenu_li" id="simplemenu_group_menu_group3"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">group : group3</div></li><li class="simplemenu_li" id="simplemenu_group_menu_group4"><div class="float_left simplemenu_elbow minus"></div><div class="float_left simplemenu_folder open"></div><div class="float_left simplemenu_text">group : group4</div></li></ul>
	 */
	var plugin_menu_templete = Class.extend({
		init:function() {
			this.menu_container	= '<div class="depth1"> <div class="depth1_tit"><a class="mnu"></a></div><ul class="depth2"></ul></div>'; 
			this.back_container	= '<div class="titbg"> <a class="txt_back"></a> </div>';
			this.sub_contianer	= '<li><a id="textContainer" style="cursor:pointer"></a></li>';
				
			this.container		= {
										 back					:".titbg"
										,menu					:".simplemenu_li"
										,root					:".menu_box"
										,textContainer		:".mnu"
										,subTextContainer		:"#textContainer"
										,textBackContainer	:".txt_back"
										,subMnuContainer		:".depth2"
										,containerOn			:"on"
										,containerOff			:"off"
									   };
		}
	});
	
	var plugin_slide_l_menu = JexPlugin.extend({
		init:function(menu) {
			_draw_this		= this;
			this.parent	= "ROOT";
			this.templete	= new plugin_menu_templete();
			this.$menu	= $(menu);
			this.$menu.css("overflow-x","hidden");
			this.all;
		},
		_drawMenuItem:function(data,$prnt) {
			var $menuElement;
			if ($prnt) {
				$menuElement = $(this.templete.sub_contianer);
				$menuElement.appendTo($prnt.find(this.templete.container.subMnuContainer));
				$menuElement.find(this.templete.container.subTextContainer).html(data['NAME']);
			} else {
				$menuElement = $(this.templete.menu_container);
				$menuElement.appendTo(this.$menu.find(this.templete.container.root));
				$menuElement.find(this.templete.container.textContainer).html(data['NAME']);
			}
			
			if (data['URL']) {
			
				if (document.URL.indexOf(data['URL'].substring(0,8)) > 0) {
					if ($prnt) $prnt.addClass(_draw_this.templete.container.containerOn);
					$menuElement.addClass(_draw_this.templete.container.containerOn);
				}
				
				$menuElement.click(function() { location.href = data['URL']; });
			}
			if (data['CHILD']&&data['CHILD'].length) 
				
				for (var i=0; i<data['CHILD'].length;i++) {
					this._drawMenuItem(data['CHILD'][i], $menuElement);
				}
			
				$menuElement.toggle(function() {
					var t_this = this;
					$(t_this).addClass(_draw_this.templete.container.containerOn);
					/*
					$(this).find(_draw_this.templete.container.subMnuContainer).slideDown(300,function() {
					});
					*/
				},function() { 
					//_draw_this.draw(data['CHILD'],data['NAME']);
					var t_this = this;
					$(t_this).removeClass(_draw_this.templete.container.containerOn);
					/*
					$(this).find(_draw_this.templete.container.subMnuContainer).slideUp(300,function() {
					});
					*/
				});
		},
		_draw:function(data) {
			if (!data) return;
			var _draw_this = this;
			$.each(data, function(i,v) {
				_draw_this._drawMenuItem(data[i]);
			});
		},
		draw:function(data,b) {
			this.$menu.find(this.templete.container.root).find("*").remove();
			if (!b) {
				this.all = data;
			} else {
				var $backContainer = $(this.templete.back_container);
				$backContainer.appendTo(this.$menu.find(this.templete.container.root));
				$backContainer.find(this.templete.container.textBackContainer).html(b);
				$backContainer.css("cursor","pointer");
				$backContainer.click(function() {
					_draw_this.draw(_draw_this.all);
				});
			}
			this._draw(data);
		}
	});
	jex.plugin.add("JEX_SLIDE_L_MENU", plugin_slide_l_menu);
})();