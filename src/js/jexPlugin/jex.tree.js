jQuery.fn.extend({
	jexTree: function(cmd, opt) {
		var $r		= $(this);
		var jexTreeFn={
						make	 :function(opt)	{
							var dfltopt = {
									folderClickFold : true,
									namePrefix		: "",
									speed			: 200,
									movable			: true,
									movableFn		: null,
									showId			: true,
									subTreePadding	: 20
							};
							jexTreeFn['unfoldAll'](opt);
							$button = $r.find("button");
							$button.click(function() {	foldUnfold($(this)); });
							if (opt!=null || opt!=undefined) { $.each(opt, function(i,v) { dfltopt[i] = v; }); }
							$r.data("tree_opt", dfltopt);
							$r.css("font-size","9pt");
						},
						foldAll	 :function(opt) {
							$button = $r.find("button");
							for (var i=0; i<$button.length; i++) {
								if ($button.eq(i).attr("fold") == "on") $button.eq(i).click();
							}
						},
						moveUp :function(opt) {
							if ($r.index() == 0) return false;
							$r.prev().before($r);
							return true;
						},
						moveDown:function(opt) {
							if ($r.parent().find("> li").length-1 == $r.index()) return false;
							$r.next().after($r);
							return true;
						},
						unfoldAll :function(opt) {
//							var $ul = $r.find("ul");
//							$.each($ul, function() { $(this).show(); });
							$button = $r.find("button");
							for (var i=0; i<$button.length; i++) {
								if ($button.eq(i).attr("fold") == "off") $button.eq(i).click();
							}
						},
						getParent:function(opt) {
							return getParentItm($r.parent());
						},
						add		 :function(opt) {
							if (opt['id']==undefined) opt['id'] = opt['NAME'];
							if (opt['name'] == undefined) opt['name'] = opt['NAME'];
							var $li = $("<li id='"+opt.id+"'></li>");
							$li.data("cRow", opt); 
							if (opt.type==undefined) opt['type'] = opt['TYPE'];
							if (opt.type=="folder" || opt.type=="dir") {
								$li.attr("class","nav_tree_on nav_tree_last");
								if (getOpt($r)['showId']) $li.append("<button type='button' class='btn_tree_on' fold='on'>&nbsp;</button><a class='nav_tree_label' style=\"cursor:pointer\"><img src='/img/tree/ftv2folderopen.gif' alt='folder' />"+getOpt($r).namePrefix+"</a><a style=\"cursor:pointer\">"+opt.id+" ("+opt.name+")</a><ul style='padding-left:"+getOpt($r).subTreePadding+"px' class=\"connectedSortable\"></ul>");
								else $li.append("<button type='button' class='btn_tree_on' fold='on'>&nbsp;</button><a class='nav_tree_label' style=\"cursor:pointer\"><img src='/img/tree/ftv2folderopen.gif' alt='folder' />"+getOpt($r).namePrefix+"</a><a style=\"cursor:pointer\">"+opt.name+"</a><ul style='padding-left:"+getOpt($r).subTreePadding+"px' class=\"connectedSortable\"></ul>");
								
								$li.find("button").click(function() {
									foldUnfold($(this));
								});
								if (getOpt($r).folderClickFold) {
									$li.find("a:first").click(function() { foldUnfold($(this).parent().find("button")); });
									$li.find("a:eq(1)").click(function() { foldUnfold($(this).parent().find("button")); });
								}
								if (!getOpt($r).folderClickFold) {
									$li.find("a:first").click(function() {  var $this=$(this);  if (getOpt($r).onclick!=null && getOpt($r).onclick!=undefined) getOpt($r).onclick(opt, $this); });
									$li.find("a:eq(1)").click(function() {  var $this=$(this);  if (getOpt($r).onclick!=null && getOpt($r).onclick!=undefined) getOpt($r).onclick(opt, $this); });
								}
							} else {
								$li.attr("class","nav_tree_off");
								if (getOpt($r)['showId'])
									$li.append("<a class='nav_tree_label' style=\"cursor:pointer\"><img src='/img/tree/ftv2doc.gif' alt='doc' />"+getOpt($r).namePrefix+"</a><a style=\"cursor:pointer\">"+opt.id+" ("+opt.name+")</a>");
								else
									$li.append("<a class='nav_tree_label' style=\"cursor:pointer\"><img src='/img/tree/ftv2doc.gif' alt='doc' />"+getOpt($r).namePrefix+"</a><a style=\"cursor:pointer\">"+opt.name+"</a>");
								$li.find("a").click(function() { var $this=$(this); if (getOpt($r).onclick!=null && getOpt($r).onclick!=undefined) getOpt($r).onclick(opt, $this); });
							}
							
							$li.appendTo($r);
							$li.data('dat', opt);
							if (getOpt($r).movable) {
								$li.parent().find("img:first").css("cursor","move");
								$li.parent().sortable({	handle		:'img:first',
														items		:'> li',
														axis		:'y',
														connectWith	:".connectedSortable",
														update		: function(e,ui) {
																		if (typeof(getOpt($r).movableFn)=="function") return getOpt($r).movableFn(e,ui,$(this));
																	}
													}); 
							}
						},
						addList	 :function(opt) {
							addTree(opt, $r);
						},
						remove	 :function(opt) {
							$r.remove();
						}
					 };
		
		function getParentItm($c) {
			if ($c.parent().data("tree_opt")!=null&&$c.parent().data("tree_opt")!=undefined) return "root";
			if ($c.parent().get(0).tagName.toLowerCase()=="li") {
				return $c.parent();
			}
			else return getParentItm($c.parent());
		};
		function getOpt($d) {
			if ($d.data("tree_opt")==null||$d.data("tree_opt")==undefined) return getOpt($d.parent());
			return $d.data("tree_opt");
		};
		function addTree(json, $prnt) {
			if (json == undefined) return; 
			$.each(json, function(i,v) {
				$prnt.jexTree('add',v);
				if (v['type']==undefined) v['type'] = v['TYPE'];
				if (v.type=="folder"||v.type=="dir") addTree(v.sub, $prnt.find("#"+v.id).find("ul"));
			});
		}; 
		function foldUnfold($r) {
			var stat = $r.attr("fold");
			var opt	 = getOpt($r);
			
			// unfold
			if (stat=="on") {
				$r.attr("fold", "off");
				$r.parent().attr("class","nav_tree_off nav_tree_last");
				$r.attr("class", "btn_tree_off");
				$r.parent().find("UL:first").slideUp(opt.speed);
			}
			// fold
			if (stat=="off") {
				$r.attr("fold", "on");
				$r.parent().attr("class","nav_tree_on nav_tree_last");
				$r.attr("class", "btn_tree_on");
				$r.parent().find("UL:first").slideDown(opt.speed);
			}
		};
		return jexTreeFn[cmd](opt);
	}
});
