/**
 * tree v2
 * @author 김학길
 a*/
(function() {

	var plugin_tree_item = Class.extend({
		init:function(id) {
			this.isLeaf = false;
		}, setLeaf: function() {
			this.isLeaf = true;
		}
	});
	
	var plugin_tree_dataMgr = Class.extend({
		init:function() {
			this.treeData	= {};
			this.strConst	= {
									PRNTID:"PRNT_ID",
									ID		:"COM_ID",
									NAME	:"COM_ID",
									CHILD	:"_CHILD",
									PATH	:"_PATH",
									ROOT	:"ROOT"
									};
			this.treeData[this.strConst.ID] = this.strConst.ROOT;
		}, find:function(path,key) {
			var paths = (path+"/"+key).split("/");
			var data = this.treeData[this.strConst.CHILD];
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
		
			function makeTreeData(data, prnt) {
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
					item = makeTreeData(data, item);
				}
				return prnt;
			}
			
			/**
			 * JSON을 재정렬해서 저장한다.
			 */
			this.treeData = makeTreeData(data,this.treeData);
		}, clear:function() {
			this.treeData = {};
		}
	});
	
	var plugin_tree_event = Class.extend({
		init:function() {
			this.branch = {};
			this.leaf 	= {};
			this.all 	= {};
		},bind:function(target, evt, fn) {
				this[target][evt]=fn;
		}
	});

	/**
	 * simple-tree
	 * <ul class="simpletree_ul_main" id="group_tree"><li class="simpletree_li" id="simpletree_group_tree_group1"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">group : group1</div><ul class="simpletree_ul_sub"><li class="simpletree_li" id="simpletree_group_tree_box1"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">box : box1</div><ul class="simpletree_ul_sub"><li class="simpletree_li" id="simpletree_group_tree_asdf"><div class="float_left simpletree_leaf"></div><div class="float_left simpletree_text">container : asdf</div></li><li class="simpletree_li" id="simpletree_group_tree_dd"><div class="float_left simpletree_leaf"></div><div class="float_left simpletree_text">container : dd</div></li><li class="simpletree_li" id="simpletree_group_tree_dddddd"><div class="float_left simpletree_leaf"></div><div class="float_left simpletree_text">container : dddddd</div></li></ul></li><li class="simpletree_li" id="simpletree_group_tree_box2"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">box : box2</div><ul class="simpletree_ul_sub"><li class="simpletree_li" id="simpletree_group_tree_gds"><div class="float_left simpletree_leaf"></div><div class="float_left simpletree_text">container : gds</div></li></ul></li><li class="simpletree_li" id="simpletree_group_tree_box3"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">box : box3</div></li><li class="simpletree_li" id="simpletree_group_tree_box4"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">box : box4</div></li><li class="simpletree_li" id="simpletree_group_tree_box5"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">box : box5</div></li></ul></li><li class="simpletree_li" id="simpletree_group_tree_group2"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">group : group2</div></li><li class="simpletree_li" id="simpletree_group_tree_group3"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">group : group3</div></li><li class="simpletree_li" id="simpletree_group_tree_group4"><div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text">group : group4</div></li></ul>
	 */
	var plugin_tree_templete = Class.extend({
		init:function() {
			this.root_container		= '<ul class="simpletree_ul_main"></ul>';
			this.tree_container		= '<li class="simpletree_li"></li>';	// 여기에 id를 넣어서 유일하게 구분
			this.branch					= '<div class="float_left simpletree_elbow minus"></div><div class="float_left simpletree_folder open"></div><div class="float_left simpletree_text"></div><ul class="simpletree_ul_sub"></ul></div>';
			this.leaf					= '<div class="float_left simpletree_leaf"></div><div class="float_left simpletree_text"></div>';
			this.formatter;
		
			/**
			 * click action이 일어날때
			 * 아래 class를 찾아 open/close일 경우 class를 제거하고 해당 action을 class를 지정해준다.
			 */
			this.changeClass	= {
					open : {
						".simpletree_elbow":"minus",
						".simpletree_folder":"open"
					}, close : {
						".simpletree_elbow":"plus",
						".simpletree_folder":"close"
					}
			};

			/**
			 * 하위 컴포넌트를 찾아 넣을 대상을 지정한다.
			 * _text는 name을 넣어준다.
			 */
			this.container		= {
					root			:".simpletree_ul_main",
					tree			:".simpletree_li",
					branch		:".simpletree_ul_sub",
					leaf			:".simpletree_leaf",
					branch_text	:".simpletree_text",
					leaf_text	:".simpletree_text",
					evt_fold		:".simpletree_elbow"
			};
		}
	});
	
	var plugin_tree = JexPlugin.extend({
		init:function(tree) {
			this.$tree		= $(tree);
			this.dataMgr	= new plugin_tree_dataMgr();
			this.templete	= new plugin_tree_templete();
			this.evtMgr	= new plugin_tree_event();
			this.isLeaf		= function() { return false; };
		},
		/**
		 * 
		 * @param fn
		 */
		setFormatter:function(fn) {
			this.formatter = fn;
		},
		add:function(item) {
		}, setAll:function(data) {
			this.dataMgr.put(data);
		}, createItem:function(id) {
			return new plugin_tree_item(id);
		},
		/**
		 * Tree를 그려준다.
		 */
		setLeafCheckFn:function(fn) {
			this.isLeaf = fn;
		},
		drawBrach:function($target, data) {
			var _draw_this = this;
			var $tree_container= $(this.templete.tree_container);
			var $branch			 = $(this.templete.branch);

			$tree_container.appendTo($target);
			$tree_container.attr("id", data[this.dataMgr.strConst.PATH]+"/"+data[this.dataMgr.strConst.ID]);
			$branch.appendTo($tree_container);																						// 차후에 templete변경시 target이 하위에 있는경우 처리를 해주어야 한다.
			
			var name = data[this.dataMgr.strConst.NAME];
			if (this.formatter) name = this.formatter(data);
			
			$tree_container.find(this.templete.container.branch_text).html(name+$tree_container.find(this.templete.container.branch_text).html());
	
			/**
			 * 최초에는 열려있다.
			 */
			$tree_container.find(this.templete.container.evt_fold).toggle(function() {
				var removeClass = _draw_this.templete.changeClass.open;
				$.each(removeClass, function(i,v) {
					$tree_container.find(i).first().removeClass(v);
				});
				
				var changeClass = _draw_this.templete.changeClass.close;
				$.each(changeClass, function(i,v) {
					$tree_container.find(i).first().addClass(v);
				});
				
				$tree_container.find("ul:first").slideUp(300);
			},function() {
				var removeClass = _draw_this.templete.changeClass.close;
				$.each(removeClass, function(i,v) {
					$tree_container.find(i).removeClass(v);
				});
				
				var changeClass = _draw_this.templete.changeClass.open;
				$.each(changeClass, function(i,v) {
					$tree_container.find(i).addClass(v);
				});
				$tree_container.find("ul:first").slideDown(300);
			});
			
			$tree_container.find(this.templete.container.branch_text).css("cursor","pointer");
			$.each(this.evtMgr.branch,function(i,v) {
				$tree_container.find(_draw_this.templete.container.branch_text).bind(i,data,v);
			});
			$.each(this.evtMgr.all,function(i,v) {
				$tree_container.find(_draw_this.templete.container.branch_text).bind(i,data,v);
			});
			
			return $tree_container.find(this.templete.container.branch);
		},
		drawLeaf:function($target, data) {
			var _draw_this = this;
			var $tree_container= $(this.templete.tree_container);
			var $leaf			 = $(this.templete.leaf);

			$tree_container.appendTo($target);
			$tree_container.attr("id", data[this.dataMgr.strConst.PATH]+"/"+data[this.dataMgr.strConst.ID]);
			$leaf.appendTo($tree_container);
			
			var name = data[this.dataMgr.strConst.NAME];
			if (this.formatter) name = this.formatter(data);
			
			$tree_container.find(this.templete.container.branch_text).html(name+$tree_container.find(this.templete.container.branch_text).html());
			
			$tree_container.find(this.templete.container.branch_text).css("cursor","pointer");
			$.each(this.evtMgr.leaf,function(i,v) {
				$tree_container.find(_draw_this.templete.container.branch_text).bind(i,data,v);
			});
			$.each(this.evtMgr.all,function(i,v) {
				$tree_container.find(_draw_this.templete.container.branch_text).bind(i,data,v);
			});
		},
		_draw:function($target, data) {
			if (!data) return;
			var _draw_this = this;
			$.each(data, function(i,v) {
				if (_draw_this.isLeaf(v)) {
					_draw_this.drawLeaf($target, v);
				} else {
					$arg_target = _draw_this.drawBrach($target, v);
					_draw_this._draw($arg_target, v[_draw_this.dataMgr.strConst.CHILD]);
				}
			});
		},
		draw:function(data) {
			this.dataMgr.put(data);
			this.$tree.html(this.templete.root_container);
	
			this._draw(this.$tree.find(this.templete.container.root), this.dataMgr.treeData[this.dataMgr.strConst.CHILD]);
			
			/*
			var $root_container = this.templete.$root_container.clone().appendTo(this.tree);
			var $tree_contianer = this.templete.$tree_container.clone().appendTo($root_container);
			var $branch = this.templete.$branch.clone().appendTo($tree_contianer);
			$branch.find(this.templete.container.branch_text);
			*/
		
//			this.$tree.html(jex.toStr(this.dataMgr.treeData));
		}
	});
	jex.plugin.add("JEX_TREE", plugin_tree);
})();