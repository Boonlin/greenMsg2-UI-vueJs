/**
 * User: kwakyc
 * Date: 13. 6. 20.
 * Time: 오후 7:56
 *

 @namespace : JexTabsPlugin
 @description :

 */

(function () {
	var tabsAttrs = {
		id: "data-jx-tabs"
	};

	var JexTabsPlugin = JexPlugin.extend({
		init: function () {
		},

		/**
		 * @method load
		 * data-jx-tabs 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			this.$object = $jq;
			alert("test " + $jq.attr(attr));
		},

		/**
		 * @method execute
		 * Executer에 의해 callback 되는 메소드
		 */
		execute: function (evt, $jq) {
			//TODO Executer에 의해 event 발생 후 실행되는 경우 사용
		},

		/**
		 * @method setAll
		 * Service 플러그인이 호출된 후, 결과 data 값이 넘어올 callback 메소드
		 */
		setAll: function (dat) {
			//TODO 플러그인에 data 설정이 필요할 경우 사용
		}
	});

	// 페이지에 유일한 객체로 만들고 싶다면 new JexTabsPlugin() 로 저장한다.
	jex.plugin.add("JEX_TABS", JexTabsPlugin, tabsAttrs.id);

	jQuery.fn.extend({
		jexTabs: function(cmd, opt) {
			var $r		= $(this);
			if ($r==null||$r==undefined||$r.length==0) return null;
			var jexTabsFn={
				make	 : function(opt)	{
					if (opt==null||opt==undefined) opt={};
					var dfltopt = {
						select_class	:"selected",
						unselect_class	:"",
						ul_class		:"tab_1 mgt10 mgb10",
						li_templete		:"<li style='cursor:pointer' id='%ID%' data-target='%TARGET%'><a>%NAME%</a></li>",
						closeBtn		:false,
						tab_body		:"tab_body",
						selectFn		:function() {},
						movable			:false
					};
					$.each(opt, function(i,v) { dfltopt[i] = v; });
					$r.data("opt", dfltopt);
					if ($r.find("ul").length==0)				 $r.append("<ul name='tab'></ul>");
					if ($r.find("#"+dfltopt.tab_body).length==0) $r.append("<div id='"+dfltopt.tab_body+"'></div>");
					if (!jex.isNull(dfltopt.ul_class)) 			 $r.find(">ul:first").attr("class",dfltopt.ul_class);
					if (dfltopt['movable']) {
						$r.find("ul").sortable();
						$r.find("ul").disableSelection();
					}
					$r.find("UL:first").find(">li").click(function() {
						$r.jexTabs('select',{id:$(this).attr("id")});
					});
					if (dfltopt['closeBtn']) {
						$r.find("ul").find(">li").find("#close").click(function() {
							alert("죄송해요..ㅠ_ㅜ 구현 할께요.");
						});
					}
				},
				add		 :function(opt) {
					if ($r.find("UL").find("#"+opt.id).length > 0) {
//								var yn = confirm("이미 존재하는 TAB입니다. 해당 TAB으로 이동 하시겠습니까?");
						var yn = true;
						if (yn) $r.jexTabs('select',opt);
						return;
					}

					var targetId= "tar_"+opt.id;
					var liStr 	= $r.data("opt").li_templete.replace(/%NAME%/g, opt.name).replace(/%ID%/g, opt.id).replace(/%TARGET%/g, targetId);
					var div		= "<div id='"+targetId+"'></div>";

					$r.find("UL:first").append(liStr);
					$r.find("#"+$r.data("opt").tab_body).append(div);
					if (!jex.isNull(opt.url)) {
						if (jex.isNull(jex.getRootDom().jex.get("IFR_LAYOUT"))) {
							var $target = $r.find("#" + $r.data("opt").tab_body).find("#" + targetId);

							var $iframeLayout = $("<iframe></iframe>").attr("src", "")
								.attr("scrolling", "auto")
								.attr("frameborder", "0")
								.attr("marginheight", "0")
								.attr("marginwidth", "0")
								.attr("id", "ifr")
								.attr("name", "about")
								.css("width", "100%")
								.css("height", "800px");

							$target.append($iframeLayout);
							jex.getRootDom().jex.set("IFR_LAYOUT", $iframeLayout);
							$(this).find("iframe").attr("src", opt.url);
							$r.find("UL:first").find("#"+opt.id).click(function() { $r.jexTabs('select',{id:opt.id}); });
							$r.jexTabs('select',{id:opt.id});
							if ($r.data("opt")['closeBtn']) $r.find("UL:first").find("#"+opt.id).find("#close").click(function(){$r.jexTabs('remove',opt);});
							if (typeof(opt.fn)=="function") opt.fn();

//							$r.find("#"+$r.data("opt").tab_body).find("#"+targetId).load("/jex/studio/layout/loadIfr.html", function(dat) {
//								jex.getRootDom().jex.set("IFR_LAYOUT",dat);
//								$(this).find("iframe").attr("src",opt.url);
//								$r.find("UL:first").find("#"+opt.id).click(function() { $r.jexTabs('select',{id:opt.id}); });
//								$r.jexTabs('select',{id:opt.id});
//								if ($r.data("opt")['closeBtn']) $r.find("UL:first").find("#"+opt.id).find("#close").click(function(){$r.jexTabs('remove',opt);});
//								if (typeof(opt.fn)=="function") opt.fn();
//							});
						} else {
							$r.find("#"+$r.data("opt").tab_body).find("#"+targetId).html(jex.getRootDom().jex.get("IFR_LAYOUT"));
							var $r2 = $r.find("#"+$r.data("opt").tab_body).find("#"+targetId);
							$r2.find("iframe").attr("src",opt.url);
							$r.find("UL:first").find("#"+opt.id).click(function() { $r.jexTabs('select',{id:opt.id}); });
							$r.jexTabs('select',{id:opt.id});
							if ($r.data("opt")['closeBtn']) $r.find("UL:first").find("#"+opt.id).find("#close").click(function(){$r.jexTabs('remove',opt);});
							if (typeof(opt.fn)=="function") opt.fn();
						}
					} else {
						$r.find("UL:first").find("#"+opt.id).click(function() { $r.jexTabs('select',{id:opt.id}); });
						$r.jexTabs('select',{id:opt.id});
						if ($r.data("opt")['closeBtn']) $r.find("UL:first").find("#"+opt.id).find("#close").click(function(){$r.jexTabs('remove',opt);});
						if (typeof(opt.fn)=="function") opt.fn();
					}
					return targetId;
				},
				get		 :function(opt) {
					return $r.find("#"+$r.data("opt").tab_body).find("#"+$r.find("UL").find("#"+opt.id).attr("data-target"));
				},
				selected :function(opt) {
					return $r.find("UL").find(">LI[class="+$r.data("opt")['select_class']+"]:first").attr("id");
				},
				remove	 :function(opt) {
					$r.find("#"+$r.data("opt").tab_body).find("#"+$r.find("UL").find("#"+opt.id).attr("data-target")).remove();
					$r.find("UL").find("#"+opt.id).remove();
					$r.find("UL").find("li:last").click();
					if (jex.isRootDom()) {
						if( $("#multitab ul li:visible").length <= 0) {
							$("#scrollRight").click();
						}
					}
				},
				getIfr		:function(opt) {
					return $("#"+$r.find("#"+opt['id']).attr("data-target")).find("iframe").get(0).contentWindow;
				},
				select	 :function(opt,fn) {
					//탭이동후 그리드 스크롤 처리관련
					if(window.JGM)
					{
						JGM.grids.forEach(function(g){
							var _t = g.view.getScrollTop();
							if(_t)
							{
								g.tempScrollTop = _t;
							}
						});
						var f = window.frames;
						for(var i=0 ; i<f.length ; i++)
						{
							if(!!f[i].JGM)
							{
								f[i].JGM.grids.forEach(function(g){
									var _t = g.view.getScrollTop();
									if(_t)
									{
										g.tempScrollTop = _t;
									}
								});
							}
						}
					}


					hideAll($r);
					if (opt.idx!=null&&opt.idx!=undefined) {
						var tab	 = $r.find("UL").find("li:"+opt.idx);
						var div	 = $r.find("#"+$r.data("opt").tab_body).find("DIV");
						var divId= tab.attr("data-target");
						$r.find("UL").find(">li:first").attr("class", $r.data("opt").select_class);
						$r.find("#"+$r.data("opt").tab_body).find("#"+divId).show();
					} else {
						var tab	 = $r.find("UL").find("#"+opt.id);
						var div	 = $r.find("#"+$r.data("opt").tab_body).find("DIV");
						var divId= tab.attr("data-target");
						$r.find("UL").find("#"+opt.id).attr("class", $r.data("opt").select_class);
						$r.find("#"+$r.data("opt").tab_body).find("#"+divId).show();
					}
					if (typeof($r.data("opt").selectFn)=="function")	$r.data("opt").selectFn();
					if (typeof(fn)=="function")							fn();
					if (typeof(opt['fn'])=="function")					opt['fn']();
					try {	// 귀찮음의 상징 try-catch 에러처리하기 귀찮다는 이야기임.
						var ifrResize = $r.find("#"+$r.data("opt").tab_body).find("#"+divId).find("iframe").get(0).contentWindow.resizeIframe;
						if (typeof(ifrResize)=="function")					ifrResize();
					} catch (e) {
						;
					}
					finally{
						//탭이동후 그리드 스크롤 처리관련
						if(window.JGM)
						{
							JGM.grids.forEach(function(g){
								g.view.setScrollTop( g.tempScrollTop );
							});
							var f = window.frames;
							for(var i=0 ; i<f.length ; i++)
							{
								if(!!f[i].JGM)
								{
									f[i].JGM.grids.forEach(function(g){
										g.view.setScrollTop( g.tempScrollTop );
									});
								}
							}
						}
						$(window).resize();
					}
				}
			};

			function hideAll($div) {
				var $menuList	= $div.find("UL:first").find(">LI");
				var $divList	= $div.find("#"+$r.data("opt").tab_body+">DIV");
				$.each($menuList,	function(i,v){ $(this).attr("class", $r.data("opt").unselect_class); });
				$.each($divList,	function(i,v){ $(this).hide(); });
			};
			return jexTabsFn[cmd](opt);
		}
	});











})();
