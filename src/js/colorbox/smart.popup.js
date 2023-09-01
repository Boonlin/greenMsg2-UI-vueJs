//;(function($) {
//    var ie     = $.browser.msie && ($.browser.version < 9);
//    var innerH  = window.innerHeight;
//    
//	var colorbox = 'colorbox';
//	var prefix = 'cbox';
//	var  boxElement = prefix + 'Element';
//	var event_open = prefix + '_open';
//	var event_load = prefix + '_load';
//	var event_complete = prefix + '_complete';
//	var event_cleanup = prefix + '_cleanup';
//	var event_closed = prefix + '_closed';
//	var event_purge = prefix + '_purge';
//	var isIE = !$.support.opacity && !$.support.style; // IE7 & IE8
//	var isIE6 = isIE && !window.XMLHttpRequest; // IE6
//	var event_ie6 = prefix + '_IE6';
//	
//	var $overlay;
//	var $box;
//	var $wrap;
//	var $content;
//	var $topBorder;
//	var $leftBorder;
//	var $rightBorder;
//	var $bottomBorder;
//	var $related;
//	var $window;
//	var $loaded;
//	var $loadingBay;
//	var $loadingOverlay;
//	var $title;
//	var $current;
//	var $slideshow;
//	var $next;
//	var $prev;
//	var $close;
//	var $groupControls;
//	
//	
//	// Variables for cached values or use across multiple functions
//	var settings;
//	var interfaceHeight;
//	var interfaceWidth;
//	var loadedHeight;
//	var loadedWidth;
//	var element;
//	var index;
//	var photo;
//	var open;
//	var active;
//	var closing;
//	var loadingTimer;
//	var publicMethod;
//	var div = "div";
//	var init;
//	
//	var arrCallbackFn = new Array();
//	
//    $.smartPop = {
//        opts : {},
//        
//        
//        open : function(options) {
//        	$.smartPop.appendHTML();
//        	$.smartPop.makeSettings(options);
////        	
////        	
////        	open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
//			$box.show();
//			$overlay.css({"opacity":"0.9" , "cursor":"pointer" , "pointer" : "auto"}).show();
//			settings.w = setSize(settings.initialWidth, 'x');
//			settings.h = setSize(settings.initialHeight, 'y');
//			$.smartPop.position();
////			
////			
////			$groupControls.add($title).hide();
////			$close.html("close").show();
////			
////			$related = $("/mngt_003_02.act");
////			$.smartPop.load();
//        },
//        
//        
//        
//        
//        
//        
//        
//        
//        
//        
//        /*Helper Functoin*/
//        
//        appendHTML : function() {
//    		if (document.body) {
//    			$window = $(window);
//    			$box = $.smartPop.tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
//    			$overlay = $.smartPop.tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
//    			$loadingOverlay = $.smartPop.tag(div, "LoadingOverlay").add($.smartPop.tag(div, "LoadingGraphic"));
//    			$wrap = $.smartPop.tag(div, "Wrapper");
//    			$content = $.smartPop.tag(div, "Content").append(
//    				$loaded = $.smartPop.tag(div, "LoadedContent", 'width:0; height:0; overflow:hidden'),
//    				$title = $.smartPop.tag(div, "Title"),
//    				$current = $.smartPop.tag(div, "Current"),
//    				$next = $.smartPop.tag(div, "Next"),
//    				$prev = $.smartPop.tag(div, "Previous"),
//    				$slideshow = $.smartPop.tag(div, "Slideshow").bind(event_open, false),
//    				$close = $.smartPop.tag(div, "Close")
//    			);
//    			
//    			$wrap.append( // The 3x3 Grid that makes up ColorBox
//    				$.smartPop.tag(div).append(
//    					$.smartPop.tag(div, "TopLeft"),
//    					$topBorder = $.smartPop.tag(div, "TopCenter"),
//    					$.smartPop.tag(div, "TopRight")
//    				),
//    				$.smartPop.tag(div, false, 'clear:left').append(
//    					$leftBorder  = $.smartPop.tag(div, "MiddleLeft"),
//    					$content,
//    					$rightBorder = $.smartPop.tag(div, "MiddleRight")
//    				),
//    				$.smartPop.tag(div, false, 'clear:left').append(
//    					$.smartPop.tag(div, "BottomLeft"),
//    					$bottomBorder = $.smartPop.tag(div, "BottomCenter"),
//    					$.smartPop.tag(div, "BottomRight")
//    				)
//    			).find('div div').css({'float': 'left'});
//    			
//    			$loadingBay = $.smartPop.tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
//    			
//    			$groupControls = $next.add($prev).add($current).add($slideshow);
//
//    			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
//    			
//    			
//    			
//				// Cache values needed for size calculations
//				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
//				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
//				loadedHeight = $loaded.outerHeight(true);
//				loadedWidth = $loaded.outerWidth(true);
//				
//				// Setting padding to remove the need to do size conversions during the animation step.
//				$box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth});
//				
//				$close.click(function () {
//					$.smartPop.close();
//				});
//				
//    		}
//    	},        
//        
//        
//    	
//    	position : function (speed, loadedCallback) {
//    		var
//    		css,
//    		top = 0,
//    		left = 0,
//    		offset = $box.offset(),
//    		scrollTop,
//    		scrollLeft;
//    		
//    		$window.unbind('resize.' + prefix);
//
//    		// remove the modal so that it doesn't influence the document width/height
//    		$box.css({top: -9e4, left: -9e4});
//
//    		scrollTop = $window.scrollTop();
//    		scrollLeft = $window.scrollLeft();
//
//    		if (settings.fixed && !isIE6) {
//    			offset.top -= scrollTop;
//    			offset.left -= scrollLeft;
//    			$box.css({position: 'fixed'});
//    		} else {
//    			top = scrollTop;
//    			left = scrollLeft;
//    			$box.css({position: 'absolute'});
//    		}
//
//    		// keeps the top and left positions within the browser's viewport.
//    		if (settings.right !== false) {
//    			left += Math.max(winWidth() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
//    		} else if (settings.left !== false) {
//    			left += setSize(settings.left, 'x');
//    		} else {
//    			left += Math.round(Math.max(winWidth() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
//    		}
//    		
//    		if (settings.bottom !== false) {
//    			top += Math.max(winHeight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
//    		} else if (settings.top !== false) {
//    			top += setSize(settings.top, 'y');
//    		} else {
//    			top += Math.round(Math.max(winHeight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
//    		}
//
//    		$box.css({top: offset.top, left: offset.left});
//
//    		// setting the speed to 0 to reduce the delay between same-sized content.
//    		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
//    		
//    		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
//    		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
//    		// it can invoke an obscure IE bug when using iframes.
//    		$wrap[0].style.width = $wrap[0].style.height = "9999px";
//    		
//    		function modalDimensions(that) {
//    			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
//    			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
//    		}
//
//    		css = {width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: top, left: left};
//    		if(speed===0){ // temporary workaround to side-step jQuery-UI 1.8 bug (http://bugs.jquery.com/ticket/12273)
//    			$box.css(css);
//    		}
//    		
//    		
//    		$box.dequeue().animate(css, {
//    			duration: speed,
//    			complete: function () {
//    				modalDimensions(this);
//    				
//    				active = false;
//    				
//    				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
////    				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
////    				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
//    				if (settings.reposition) {
//    					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
//    						$window.bind('resize.' + prefix, $.smartPop.position);
//    					}, 1);
//    				}
//
//    				if (loadedCallback) {
//    					loadedCallback();
//    				}
//    			},
//    			step: function () {
//    				modalDimensions(this);
//    			}
//    		});
//    	},
//    	
//    	
//        
//    	
//    	load : function () {
//    		var href, setResize, prep = $.smartPop.prep;
//    		
//    		active = true;
//    		
//    		photo = false;
//    		
//    		
//    		
//    		
//    		
//    		settings.h = settings.height ?
//    				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
//    				settings.innerHeight && setSize(settings.innerHeight, 'y');
//    		
//    		settings.w = settings.width ?
//    				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
//    				settings.innerWidth && setSize(settings.innerWidth, 'x');
//    		
//    		settings.mw = settings.w;
//    		settings.mh = settings.h;
//    		
//    		if (settings.maxWidth) {
//    			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
//    			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
//    		}
//    		if (settings.maxHeight) {
//    			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
//    			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
//    		}
//    		
//    		href = settings.href;
//    		
//    		loadingTimer = setTimeout(function () {
//    			$loadingOverlay.show().appendTo($content);
//    		}, 100);
//    		
//    		prep(" ");
//    			
//    		
//    	},
//    	
//    	
//    	
//    	
//    	
//    	
//    	
//    	
//    	prep : function (object) {
//    		
//    		var callback, speed = settings.transition === "none" ? 0 : settings.speed;
//    		
//    		$loaded.remove();
//    		$loaded = $.smartPop.tag(div, 'LoadedContent').append(object);
//    		
//    		function getWidth() {
//    			settings.w = settings.w || $loaded.width();
//    			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
//    			return settings.w;
//    		}
//    		function getHeight() {
//    			settings.h = settings.h || $loaded.height();
//    			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
//    			return settings.h;
//    		}
//    		
//    		$loaded.hide()
//    		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
//    		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
//    		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
//    		.prependTo($content);
//    		
//    		$loadingBay.hide();
//    		
//    		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
//    		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
//    		
//    		$(photo).css({'float': 'none'});
//    		// Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
//    		if (isIE6) {
//    			$('select').not($box.find('select')).filter(function () {
//    				return this.style.visibility !== 'hidden';
//    			}).css({'visibility': 'hidden'}).one(event_cleanup, function () {
//    				this.style.visibility = 'inherit';
//    			});
//    		}
//    		
//    		callback = function () {
//    			var preload,
//    				i,
//    				total = $related.length,
//    				iframe,
//    				frameBorder = 'frameBorder',
//    				allowTransparency = 'allowTransparency',
//    				complete,
//    				src,
//    				img,
//    				data;
//    			
//    			
//    			function removeFilter() {
//    				if (isIE) {
//    					$box[0].style.removeAttribute('filter');
//    				}
//    			}
//
//    			
//    			var iframeName = prefix + (+new Date());
//    			
//				iframe = $.smartPop.tag('iframe')[0];
//				
//    			complete = function () {
//    				clearTimeout(loadingTimer);
//    				// Detaching forces Andriod stock browser to redraw the area underneat the loading overlay.  Hiding alone isn't enough.
//    				$loadingOverlay.detach().hide();
//    				$(iframe).height(settings.height);
//    				
//    			};
//    			
//    			
//    			$title.html(settings.title).add($loaded).show();
//    			
//
//    			$groupControls.hide();
//
//				
//				if (frameBorder in iframe) {
//					iframe[frameBorder] = 0;
//				}
//				if (allowTransparency in iframe) {
//					iframe[allowTransparency] = "true";
//				}
//				// give the iframe a unique name to prevent caching
//				iframe.name = iframeName;
//				
//				$(iframe).one('load', complete);
//				
//				iframe.src = settings.href;
//				
//				iframe.scrolling = "no";
//				
//				$(iframe).addClass(prefix + 'Iframe').appendTo($loaded).one(event_purge, function () {
////					iframe.src = "//about:blank";
//				});
//				
//    			
//    			if (settings.transition === 'fade') {
//    				$box.fadeTo(speed, 1, removeFilter);
//    			} else {
//    				removeFilter();
//    			}
//    		};
//    		if (settings.transition === 'fade') {
//    			$box.fadeTo(speed, 0, function () {
//    				$.smartPop.position(0, callback);
//    			});
//    		} else {
//    			$.smartPop.position(speed, callback);
//    		}
//    	},    	
//    	
//    	
//        close : function() {
//			$window.unbind('.' + prefix + ' .' + event_ie6);
//			
//			$overlay.fadeTo(200, 0);
//			
//			$box.stop().fadeTo(300, 0, function () {
//			
//				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
//				
//				
//				$loaded.remove();
//				$overlay.remove();
//				$box.remove();
//				
//				
//				
//				if(arrCallbackFn.length > 1){
////					arrCallbackFn[arrCallbackFn.length-1]("되는구나.");	
//				}
//				
//				
//				setTimeout(function () {
//					closing = false;
//				}, 1);
//			});
//        },
//    	
//    	makeSettings : function(options) {
//    		settings = $.extend({}, $.smartPop.defaults);
//    		settings.width  = options.width;
//    		settings.height = options.height;
//    		settings.href = options.href;
//    		arrCallbackFn.push(options.callbackFn);
//    	},
//    	
//    	
//    	
//    	
//    	
//    	
//        tag : function(tag, id, css){
//    		var element = document.createElement(tag);
//
//    		if (id) {
//    			element.id = prefix + id;
//    		}
//
//    		if (css) {
//    			element.style.cssText = css;
//    		}
//
//    		return $(element);        	
//        },
//        
//        
//        
//        resize : function() {
//        },
//        log : function(msg) {
//            var log = $('#smartPop_log').html();
//            $('#smartPop_log').html(msg + '<br />' + log);
//        }
//    };
//    
//    
//    
//    
//    function setSize(size, dimension) {
//    	return Math.round((/%/.test(size) ? ((dimension === 'x' ? winWidth() : winHeight()) / 100) : 1) * parseInt(size, 10));
//    }
//    
//    
//	function winWidth() {
//		// $(window).width() is incorrect for some mobile browsers, but
//		// window.innerWidth is unsupported in IE8 and lower.
//		return window.innerWidth || $window.width();
//	}
//	
//	function winHeight() {
//		return window.innerHeight || $window.height();
//	}	
//    
//	
//	
//    $.smartPop.defaults = {
//    		transition: "elastic",
//    		speed: 300,
//    		width: false,
//    		initialWidth: "600",
//    		innerWidth: false,
//    		maxWidth: false,
//    		height: false,
//    		initialHeight: "450",
//    		innerHeight: false,
//    		maxHeight: false,
//    		scalePhotos: true,
//    		scrolling: true,
//    		inline: false,
//    		html: false,
//    		iframe: false,
//    		fastIframe: true,
//    		photo: false,
//    		href: false,
//    		title: false,
//    		rel: false,
//    		opacity: 0.9,
//    		preloading: true,
//
//    		current: "image {current} of {total}",
//    		previous: "previous",
//    		next: "next",
//    		close: "close",
//    		xhrError: "This content failed to load.",
//    		imgError: "This image failed to load.",
//
//    		open: false,
//    		returnFocus: true,
//    		reposition: true,
//    		loop: true,
//    		slideshow: false,
//    		slideshowAuto: true,
//    		slideshowSpeed: 2500,
//    		slideshowStart: "start slideshow",
//    		slideshowStop: "stop slideshow",
//    		onOpen: false,
//    		onLoad: false,
//    		onComplete: false,
//    		onCleanup: false,
//    		onClosed: false,
//    		overlayClose: true,
//    		escKey: true,
//    		arrowKey: true,
//    		top: false,
//    		bottom: false,
//    		left: false,
//    		right: false,
//    		fixed: false,
//    		data: undefined
//    };
//    
//}(jQuery));








var _popList = [];
$.fn.smartPop = function(opt) {
	var colorbox = 'colorbox';
	var prefix = 'cbox';
	var boxElement = prefix + 'Element';
	var event_open = prefix + '_open';
	var event_load = prefix + '_load';
	var event_complete = prefix + '_complete';
	var event_cleanup = prefix + '_cleanup';
	var event_closed = prefix + '_closed';
	var event_purge = prefix + '_purge';
	var isIE = !$.support.opacity && !$.support.style; // IE7 & IE8
	var isIE6 = isIE && !window.XMLHttpRequest; // IE6
	var event_ie6 = prefix + '_IE6';

	var $overlay;
	var $box = this;
	var $wrap;
	var $content;
	var $topBorder;
	var $leftBorder;
	var $rightBorder;
	var $bottomBorder;
	var $related;
	var $window;
	var $loaded;
	var $loadingBay;
	var $loadingOverlay;
	var $title;
	var $current;
	var $slideshow;
	var $next;
	var $prev;
	var $close;
	var $groupControls;
	
	var iframeObject;
	var settings;
	var interfaceHeight;
	var interfaceWidth;
	var loadedHeight;
	var loadedWidth;
	var element;
	var index;
	var photo;
	var open;
	var active;
	var closing;
	var loadingTimer;
	var publicMethod;
	var div = "div";
	var init;
	var defauleOpt = {
    		transition: "elastic",
    		speed: 300,
    		width: false,
    		initialWidth: "600",
    		innerWidth: false,
    		maxWidth: false,
    		height: false,
    		initialHeight: "450",
    		innerHeight: false,
    		maxHeight: 800,
    		scalePhotos: true,
    		scrolling: true,
    		inline: false,
    		html: false,
    		iframe: false,
    		fastIframe: true,
    		photo: false,
    		href: false,
    		title: false,
    		rel: false,
    		opacity: 0.9,
    		preloading: true,

    		current: "image {current} of {total}",
    		previous: "previous",
    		next: "next",
    		close: "close",
    		xhrError: "This content failed to load.",
    		imgError: "This image failed to load.",

    		open: false,
    		returnFocus: true,
    		reposition: true,
    		loop: true,
    		slideshow: false,
    		slideshowAuto: true,
    		slideshowSpeed: 2500,
    		slideshowStart: "start slideshow",
    		slideshowStop: "stop slideshow",
    		onOpen: false,
    		onLoad: false,
    		onComplete: false,
    		onCleanup: false,
    		onClosed: false,
    		overlayClose: true,
    		escKey: true,
    		arrowKey: true,
    		top: false,
    		bottom: false,
    		left: false,
    		right: false,
    		fixed: false,
    		data: undefined,
    		target: undefined,
    		param: undefined,
    		sendMethod: "post",
    		frm: undefined
			};
	
	var smartPop={
			open : function(options) {
	        	smartPop.appendHTML();
	        	smartPop.makeSettings(options);
        	
				$box.show();
				$overlay.css({"opacity":"0.9" , "cursor":"pointer" , "pointer" : "auto"}).show();
				settings.w = smartPop.setSize(settings.initialWidth, 'x');
				settings.h = smartPop.setSize(settings.initialHeight, 'y');
				smartPop.position();
			
			
				$groupControls.add($title).hide();
				$close.html("close").show();
				
				smartPop.load();
        	},
        	
        	
        	
          appendHTML : function() {
    		if (document.body) {
    			$window = $(window);
    			
    			$overlay = smartPop.tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
    			$loadingOverlay = smartPop.tag(div, "LoadingOverlay").add(smartPop.tag(div, "LoadingGraphic"));
    			$wrap = smartPop.tag(div, "Wrapper");
    			$content = smartPop.tag(div, "Content").append(
    				$loaded = smartPop.tag(div, "LoadedContent", 'width:0; height:0; overflow:hidden'),
    				$title = smartPop.tag(div, "Title"),
    				$current = smartPop.tag(div, "Current"),
    				$next = smartPop.tag(div, "Next"),
    				$prev = smartPop.tag(div, "Previous"),
    				$slideshow = smartPop.tag(div, "Slideshow").bind(event_open, false),
    				$close = smartPop.tag(div, "Close")
    			);
    			
    			$wrap.append(
    				smartPop.tag(div).append(
    					smartPop.tag(div, "TopLeft"),
    					$topBorder = smartPop.tag(div, "TopCenter"),
    					smartPop.tag(div, "TopRight")
    				),
    				smartPop.tag(div, false, 'clear:left').append(
    					$leftBorder  = smartPop.tag(div, "MiddleLeft"),
    					$content,
    					$rightBorder = smartPop.tag(div, "MiddleRight")
    				),
    				smartPop.tag(div, false, 'clear:left').append(
    					smartPop.tag(div, "BottomLeft"),
    					$bottomBorder = smartPop.tag(div, "BottomCenter"),
    					smartPop.tag(div, "BottomRight")
    				)
    			).find('div div').css({'float': 'left'});
    			
    			$loadingBay = smartPop.tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
    			
    			$groupControls = $next.add($prev).add($current).add($slideshow);

    			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
    			
    			
    			
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);
				
				$box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth});
				
				$close.click(function () {
					smartPop.close();
				});
				
    		}
    	},
    	
    	
    	position : function (speed, loadedCallback) {
			var
			css,
			top = 0,
			left = 0,
			offset = $box.offset(),
			scrollTop,
			scrollLeft;
			
			$window.unbind('resize.' + prefix);
	
			$box.css({top: -9e4, left: -9e4});
	
			scrollTop = $window.scrollTop();
			scrollLeft = $window.scrollLeft();
	
			if (settings.fixed && !isIE6) {
				offset.top -= scrollTop;
				offset.left -= scrollLeft;
				$box.css({position: 'fixed'});
			} else {
				top = scrollTop;
				left = scrollLeft;
				$box.css({position: 'absolute'});
			}
	
			if (settings.right !== false) {
				left += Math.max(smartPop.winWidth() - settings.w - loadedWidth - interfaceWidth - smartPop.setSize(settings.right, 'x'), 0);
			} else if (settings.left !== false) {
				left += smartPop.setSize(settings.left, 'x');
			} else {
				left += Math.round(Math.max(smartPop.winWidth() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
			}
			
			if (settings.bottom !== false) {
				top += Math.max(smartPop.winHeight() - settings.h - loadedHeight - interfaceHeight - smartPop.setSize(settings.bottom, 'y'), 0);
			} else if (settings.top !== false) {
				top += smartPop.setSize(settings.top, 'y');
			} else {
				top += Math.round(Math.max(smartPop.winHeight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
			}
	
			$box.css({top: offset.top, left: offset.left});
	
			speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
			
			$wrap[0].style.width = $wrap[0].style.height = "9999px";
			
			function modalDimensions(that) {
				$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
				$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
			}
	
			css = {width: settings.w + loadedWidth, height: settings.h /*+ loadedHeight*/, top: top, left: left};
			if(speed===0){ 
				$box.css(css);
			}
			
			
			$box.dequeue().animate(css, {
				duration: speed,
				complete: function () {
					modalDimensions(this);
					
					active = false;
					
					if (settings.reposition) {
						setTimeout(function () {  
							$window.bind('resize.' + prefix, smartPop.position);
						}, 1);
					}
	
					if (loadedCallback) {
						loadedCallback();
					}
				},
				step: function () {
					modalDimensions(this);
				}
			});
    	},    	
    	
    	
    	
    	load : function () {
			var href, setResize, prep = smartPop.prep;
			
			
			settings.h = settings.height ?
					smartPop.setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
					settings.innerHeight && smartPop.setSize(settings.innerHeight, 'y');
			
			settings.w = settings.width ?
					smartPop.setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
					settings.innerWidth && smartPop.setSize(settings.innerWidth, 'x');
			
			settings.mw = settings.w;
			settings.mh = settings.h;
			
			if (settings.maxWidth) {
				settings.mw = smartPop.setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
				settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
			}
			if (settings.maxHeight) {
				settings.mh = smartPop.setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
				settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
			}
			
			href = settings.href;
			
			loadingTimer = setTimeout(function () {
				$loadingOverlay.show().appendTo($content);
			}, 100);
			
			prep(" ");
			
		
    	},
	
		prep : function (object) {
			
			var callback, speed = settings.transition === "none" ? 0 : settings.speed;
			
			$loaded.remove();
			$loaded = smartPop.tag(div, 'LoadedContent').append(object);
			
			function getWidth() {
				settings.w = settings.w || $loaded.width();
				settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
				return settings.w;
			}
			function getHeight() {
				settings.h = settings.h || $loaded.height();
				settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
				return settings.h;
			}
			
			$loaded.hide()
			.appendTo($loadingBay.show())
			.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
			.css({height: getHeight()})
			.prependTo($content);
			
			$loadingBay.hide();
			
			//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
			
			$(photo).css({'float': 'none'});
			if (isIE6) {
				$('select').not($box.find('select')).filter(function () {
					return this.style.visibility !== 'hidden';
				}).css({'visibility': 'hidden'}).one(event_cleanup, function () {
					this.style.visibility = 'inherit';
				});
			}
			
			callback = function () {
				var preload,
					i,
					iframe,
					frameBorder = 'frameBorder',
					allowTransparency = 'allowTransparency',
					complete,
					src,
					img,
					data;
				
				
				function removeFilter() {
					if (isIE) {
						$box[0].style.removeAttribute('filter');
					}
				}
	
				
				var iframeName = prefix + (+new Date());
				
				
				if(!settings.scrolling){
					iframe = $("<iframe name="+iframeName+" frameBorder=0 scrolling=\"no\" style=\"overflow:hidden;\"></iframe>");//smartPop.tag('iframe')[0];
				}else{
					iframe = $("<iframe name="+iframeName+" frameBorder=0></iframe>");//smartPop.tag('iframe')[0];
				}
				
				
				//iframe.name  = iframeName;
				iframeObject = iframe; 
				
				complete = function () {
					clearTimeout(loadingTimer);
					$loadingOverlay.detach().hide();
					$(iframe).height(settings.height-70);
				};
				
				
				$title.html(settings.title).add($loaded).show();
				
	
				$groupControls.hide();
	
				
				if (frameBorder in iframe) {
					iframe[frameBorder] = 0;
				}
				if (allowTransparency in iframe) {
					iframe[allowTransparency] = "true";
				}
				
				
				$(iframe).one('load', complete);
				
				
				var paramQuery = "";
				if(settings.sendMethod == "post"){
					if(settings.frm){
						$form = settings.frm.clone();
//						$form.attr("name" , $form.attr("id") );
						var test = "<form method='post' id='"+$form.attr("id")+"' name="+$form.attr("id")+" action='"+settings.href+"' target='"+iframeName+"'>"+$form.html()+"</form>";
						$loaded.append(test);
						$(iframe).addClass(prefix + 'Iframe').appendTo($loaded);											
//						$form.attr("method" ,"post"        );
//						$form.attr("action" , settings.href);
//						$form.attr("target" , iframeName);
//						$form.submit();
//						$form.remove();
						$loaded.find("#"+$form.attr("id")).submit();
						$loaded.find("#"+$form.attr("id")).remove();
					}else{
						$form = smartPop.tag("form", "form");
						$form.attr("name" , $form.attr("id") );
						if(settings.param){
							$.each(settings.param , function(i,v){
					    		var $element = $(document.createElement("input"));
					    		$element.attr ("type" ,"hidden");
					    		$element.attr ("id"   ,i       );
					    		$element.attr ("name" ,i       );
					    		$element.val  (v               );
								$form.append($element);
							});
						}
						$loaded.append($form);
						$(iframe).addClass(prefix + 'Iframe').appendTo($loaded);
						$form.attr("method" ,"post"        );
						$form.attr("action" , settings.href);
						$form.attr("target" , iframeName);
						$form.submit();
						$form.remove();
					}
				}else{
					if(settings.param){
						paramQuery +="?"; 
						var tempQuery = "";
						$.each(settings.param , function(i,v){
							tempQuery +=i+"="+v+"&";
						});
						paramQuery+= tempQuery;
					}
					iframe.src = encodeURI(settings.href+paramQuery);					
				}
					
				
				iframe.scrolling = "no";
				
//				$(iframe).addClass(prefix + 'Iframe').appendTo($loaded).one(event_purge, function () {
//					iframe.src = "//about:blank";
//				});
				
				
				if (settings.transition === 'fade') {
					$box.fadeTo(speed, 1, removeFilter);
				} else {
					removeFilter();
				}
			};
			if (settings.transition === 'fade') {
				$box.fadeTo(speed, 0, function () {
					$.smartPop.position(0, callback);
				});
			} else {
				smartPop.position(speed, callback);
			}
		},
    	
		resize : function (options) {
				if (options.width) {
					settings.w = smartPop.setSize(options.width, 'x') - loadedWidth - interfaceWidth;
				}
				if (options.innerWidth) {
					settings.w = smartPop.setSize(options.innerWidth, 'x');
				}
				$loaded.css({width: settings.w});
				if (options.height) {
					settings.h = smartPop.setSize(options.height, 'y') - loadedHeight - interfaceHeight;
				}
				if (options.innerHeight) {
					settings.h = smartPop.setSize(options.innerHeight, 'y');
					$(iframeObject).height(options.innerHeight);
				}
				if (!options.innerHeight && !options.height) {
					$loaded.css({height: "auto"});
					settings.h = $loaded.height();
				}
				$loaded.css({height: settings.h});
				
				smartPop.position(settings.transition === "none" ? 0 : settings.speed);
			

		},
		
		
		close : function() {
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
			
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				
				$loaded.remove();
				$overlay.remove();
				$box.remove();
				
				if(_popList.length > 0){
					_popList.pop();
					if(_popList.length > 0){
//						alert(_popList[_popList.length-1]);
//						_popList[_popList.length-1].iframeTouch();
					}
				}
				
				
				
				setTimeout(function () {
					closing = false;
				}, 1);
			});
		},
		
		
		completeClose : function() {
			$window.unbind('.' + prefix + ' .' + event_ie6);
			$overlay.fadeTo(200, 0);
			$box.stop().fadeTo(300, 0, function () {
			
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				
				$loaded.remove();
				$overlay.remove();
				$box.remove();
				
				
				
				
				setTimeout(function () {
					closing = false;
				}, 1);
			});
		},		
		
    	
    	tag : function(tag, id, css){
    		var element = document.createElement(tag);

    		if (id) {
    			element.id = prefix + id;
    		}

    		if (css) {
    			element.style.cssText = css;
    		}

    		return $(element);        	
    	},
    	

    	
    	makeSettings : function(options) {
    		settings           = $.extend({}, defauleOpt);
			settings.width     = options.width;
			settings.height    = options.height;
			settings.href      = options.href;
			settings.target    = options.target;
			settings.param     = options.param;
			settings.frm       = options.frm;
			if(options.scrolling == undefined){
				settings.scrolling = true;
			}else{
				settings.scrolling = options.scrolling;	
			}
			
    	},    	

    	getSettings : function() {
    		return settings;
    	},
    	
    	iframeTouch : function(){
    		$(iframeObject).height(settings.height-70);
    	},
    	
    	setSize : function(size, dimension) {
    		return Math.round((/%/.test(size) ? ((dimension === 'x' ? smartPop.winWidth() : smartPop.winHeight()) / 100) : 1) * parseInt(size, 10));
    	},        	
        	
    	winWidth : function () {
    		return window.innerWidth || $window.width();
    	},
	
    	winHeight : function() {
    		return window.innerHeight || $window.height();
    	}	        	
        	
        	
	};
	
	
	smartPop.open(opt);
	
	
	return smartPop;
};




function smartOpenPop(option){
	var isIE  = !$.support.opacity && !$.support.style; // IE7 & IE8
	var isIE6 = isIE && !window.XMLHttpRequest; // IE6	
	var element = document.createElement("div");
	$(element).attr({id: "colorbox", 'class': isIE ? "smartPop" + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
	var smartPop = $(element).smartPop(option);
	_popList.push(smartPop);
}

function smartClosePop(callbackFn , data){
	if(_popList.length > 0){
		var targetDocument = _popList[_popList.length-1].getSettings().target;
//		alert(targetDocument);
		if(targetDocument != undefined || targetDocument != null){
			if(callbackFn != undefined || callbackFn != null){
				var callbackFn = targetDocument[callbackFn];
				if($.isFunction(callbackFn)){
					callbackFn(data);
				}
			}
		}
		_popList[_popList.length-1].completeClose();
		_popList.pop();
		
	//	if(_popList.length > 0){
	//		_popList[_popList.length-1].iframeTouch();
	//	}
	}
}

function parentConnect(fn , data){
	if(_popList.length > 0){
		var targetDocument = _popList[_popList.length-1].getSettings().target;
		if(targetDocument != undefined || targetDocument != null){
			if(fn != undefined || fn != null){
				var callbackFn = targetDocument[fn];
				if($.isFunction(callbackFn)){
					return callbackFn(data);
				}
			}
		}
	}
}

function smartPopReSize(option){
	_popList[_popList.length-1].resize(option);
}

function getPopSize(){
	return _popList.length;
}

function smartIsOpen(){
	if(_popList.length > 0)
		return true;
	else
		return false;
}