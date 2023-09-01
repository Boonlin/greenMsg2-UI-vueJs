/**
 	@namespace JexDialogPlugin
 	@desc
  		dialog를 손쉽게 생성할 수 있도록 도와주는 Plugin <br />
 	@dependencies
 		- jquery
 		- jex.core.js
 		- jex.executer.js
 	@example <.. data-jx-dialog="MY_DIALOG" data-jx-dialog-close=".myDialogCloser"> // 최소 필수 옵션
 	@example
 		<.. data-jx-dialog="MY_DIALOG" data-jx-dialog-close=".myDialogCloser"
 			data-jx-dialog-position="@right, 100" data-jx-dialog-modal="true">
 */

/**
	@name data-jx-dialog
 	@desc
 		(필수 옵션) 이 attribute가 적용된 html tag를 dialog로 만든다. <b>data-jx-dialog="DIALOG_ID" </b> <br />

	@example <.. data-jx-dialog="MY_DIALOG">
 /
/**
 	@name data-jx-dialog-close
 	@desc
 		(필수 옵션) dialog를 화면에서 사라지게 할 수 있는 옵션 <b>data-jx-dialog-close=".myDialogCloser"</b> <br />

 	@example <.. data-jx-dialog-close=".myDialogCloser">
 */
/**
 	@name data-jx-dialog-position
 	@desc
 		(선택 옵션) dialog가 나타날 좌표 값을 설정할 수 있다. 생략할 경우 화면 가운데에서 나타난다. <b>data-jx-dialog-position="{left}, {top}"</b> <br />
 		- {number} : 절대좌표로 해당 좌표 위치에서 나타난다. <br />
 		- +{number} or -{number} : dialog 를 실행 시킨 executer의 위치를 기준으로 +- 위치에서 나타난다. <br />
 		- {left = @right or @left or @center}, {top = @top or @bottom or @center} : dialog 창이 윈도우 size보다 작을 경우, 해당 위치로 dialog를 붙인다. <br />

	@example <.. data-jx-dialog-position="@right, 100">
  	@example <.. data-jx-dialog-position=", 200">
 */
/**
	@name data-jx-dialog-modal
 	@desc
 		(선택 옵션) dialog가 modal 형식으로 나타날 것인지 선택할 수 있다. <b>data-jx-dialog-modal="true || false"</b> <br />

	@example <.. data-jx-dialog-modal="true">
 */

(function() {
	var dialogAttrs = {
		id 			: "data-jx-dialog",
        close 		: "data-jx-dialog-close",
		position 	: "data-jx-dialog-position",
		modal 		: "data-jx-dialog-modal"
	};

    var externPlugin = {
        effect      : "JEX_EFFECT",
		position	: "JEX_POSITION",

        get : function($object, pluginId){
            var obj = jex.getJexObj($object, pluginId);

            if ( obj != null )           return obj;
            else                         return $object;
        }
    };

	var JexDialogPlugin = JexPlugin.extend({
		init : function() {
			this.modalId = "_jex_dialog_modal_div_";
			this.isModal = false;

			this.formatter		= jex.getSetAllFormatter();

			var $modal = $("body").find("#" + this.modalId);
			if ( $modal.length == 0 )		this.createModal();
		},
		load : function(attr, $jq) {
			this.$object = $jq;

            var isModal = $jq.attr(dialogAttrs.modal);
			if ( isModal && isModal === "true" )       this.isModal = true;

            this.initDialog();

			this.strCloseObject = $jq.attr(dialogAttrs.close);
		},
		initDialog : function(){
            this.$object.hide();

			this.dialogPosition = new DialogPosition(
				this.$object,
				this.$object.attr(dialogAttrs.position)
			);

            if ( this.isModal ) {
                var z_index = this.$object.css("z-index");
                if (z_index == null) {
                    this.$object.css("z-index", "1000");
                } else {
                    var int_z_index = parseInt(z_index);
                    if ( isNaN(int_z_index) || int_z_index < 1000 ) {
                        this.$object.css("z-index", "1000");
                    }
                }
            }
		},
		execute : function(event, $jq) {
			this.show(event);
		},
		setAll : function(dat){
			jex.setAll(this.$object, dat, this.formatter, false);
			this.execute(null, jex.get("_jex_last_evt"));
		},
		close : function(){
            var effectPlugin = externPlugin.get(this.$object, externPlugin.effect);
            effectPlugin.hide();

            var $modal = $("body").find("#" + this.modalId);
            if ( $modal.length == 1 )						$modal.hide();


			var self = this;
			var $closeObject = undefined;
			if ( this.strCloseObject && this.strCloseObject.length > 1 && this.strCloseObject.startsWith("@") ) {
				if (this.strCloseObject == "@modal") $closeObject = $("body").find("#_jex_dialog_modal_div_");
			} else {
				$closeObject = self.$object.find(this.strCloseObject);
			}

//			<tr executer="click" target="func@functionName" setter="oneSetter">

			$closeObject.unbind("click");
		},
		show : function(event){
			//this.dialogPosition.reset(event);
			var position_plugin = externPlugin.get(this.$object, externPlugin.position);
			if(position_plugin != undefined && typeof position_plugin.set == "function") {
				position_plugin.set(event);
			}

			this.drawModal();

            var effectPlugin = externPlugin.get(this.$object, externPlugin.effect);
            effectPlugin.show();

			var self = this;
			var $closeObject = undefined;
			if ( this.strCloseObject && this.strCloseObject.length > 1 && this.strCloseObject.startsWith("@") ) {
				if ( this.strCloseObject == "@modal" )      $closeObject = $("body").find("#_jex_dialog_modal_div_");
			} else {
				$closeObject = self.$object.find(this.strCloseObject);
			}

			$closeObject.click(function() {
				self.close();
			});

			var firstInputObject = this.$object.find("input")[0];
			if ( firstInputObject != null )		firstInputObject.focus();
		},

		drawModal : function(){
			if ( !this.isModal )		return;

			var $modal = $("body").find("#" + this.modalId);
			if ( $modal.length == 0 )		    this.createModal();
			else						        $modal.show();
		},
		createModal : function(){
			var $modal = $("<div>");

			var documentHeight = Math.max($(document).height(), $(window).height(), document.documentElement.clientHeight);

			$modal	.attr("id",				this.modalId)
					.css("display",			"none")
					.css("width",				"100%")
					.css("height",			"100%")
//					.css("height",			documentHeight+"px")
					.css("background-color",	"#000")
					.css("opacity",			"0.5")
					.css("position",			"absolute")
					.css("left",				$(window).scrollLeft())
					.css("top",				$(window).scrollTop())
					.css("z-index",			"999") /* TODO customizing 지원 필요 */
					.appendTo($("body"));

			$(window).scroll(function(){
				var scrollLeft = $(window).scrollLeft();
				var documentWidth = Math.max($(document).width(), $(window).width(), document.documentElement.clientWidth);
				var modalWidth = $modal.width();

				var left = ((scrollLeft + modalWidth) > documentWidth)? documentWidth - modalWidth : scrollLeft;
				if(left < 0)	left = 0;


				var documentHeight = Math.max($(document).height(), $(window).height(), document.documentElement.clientHeight);
				var scrollTop = $(window).scrollTop();
				var modalHeight = $modal.height();

				var top = ((scrollTop + modalHeight) > documentHeight)? documentHeight - modalHeight : scrollTop;
				if ( top < 0 )		top = 0;

				$modal.css("left", left + "px");
				$modal.css("top", top + "px");
			});
		}
	});

	/**
	 *	@constructor
	 *	@desc DialogPoistion 생성자
	 *
	 *	@param {object} object dialog 대상 객체
	 *	@param {string} userData 사용자가 입력한 위치 데이터.
	 *
	 */
	var DialogPosition = function(object, userData){
		this.$object = object;
		this.data = {
			left 	: {},
			top 	: {}
		};

		this.init(userData);
	};

	/* public interface */
	DialogPosition.prototype = {
		/* public interface */
		init : function(userData){
			this.$object.css("position", "absolute");

			this.parse(userData);
		},
		reset : function(event, direct){
			if ( direct == null ) {
				this.reset(event, "left");
				this.reset(event, "top");
			} else {
				var position = 0;

				var tmpPosition = undefined;
                if ( this.data[direct] != null && !isNaN(this.data[direct]["position"]) ) {
                    tmpPosition = this.data[direct]["position"];
                }

				if ( tmpPosition != null && tmpPosition != -1 ) {
					position = tmpPosition;

				} else {
					position = this.getPosition(direct);
				}

				if (this.data[direct].relative) {
					var $lastExecuter = jex.get("_jex_last_evt");
					position += parseInt($lastExecuter.offset()[direct]);
				} else {
					position += this.getScrollOffset(direct);
				}

				this.$object.css(direct, position + "px");
			}
		}
		/* /public interface */
	};

	DialogPosition.prototype.parse = function(userData){
		if ( userData == null || userData.length == 0 )		    return;

		var arrUserData = userData.split(",");
		if ( arrUserData == null || arrUserData.length != 2 )	return;

		this.setPosition("left", $.trim(arrUserData[0]));
		this.setPosition("top", $.trim(arrUserData[1]));
	};

	DialogPosition.prototype.setPosition = function(direct, data){
		var prefix = data.charAt(0);

		if ( this.data[direct] == null )	this.data[direct] = {};

		if ( "+" === prefix || "-" === prefix ) {
			this.setRelativePosition(direct, data);
		} else if ( "@" === prefix ){
			this.setAlignPosition(direct, data);
		} else {
			this.setDefaultPosition(direct, data);
		}
	};

	DialogPosition.prototype.setRelativePosition = function(direct, data){
		var position = parseInt(data);
		if ( typeof(position) == "number" ) {
			this.data[direct].position = position;
			this.data[direct].relative = true;
		}
	};

	DialogPosition.prototype.setAlignPosition = function(direct, data){
		var value = data.substring(1);

		if ( value == null || value.length == 0 )		return;
		value = $.trim(value);

		if ( this.isAllowAlign(direct, value) )		this.data[direct].align = value;
	};

	DialogPosition.prototype.setDefaultPosition = function(direct, data){
		var position = parseInt(data);
		if ( typeof(position) == "number" ) {
			this.data[direct].position = position;
		}
	};

    DialogPosition.prototype.isAllowAlign = function(direct, align){
		if ( align == null || align.length == 0 )		return false;

		var allowedAlign = {
			"left" : {"center":"center", "left":"left", "right":"right"},
			"top" : {"center":"center", "top":"top", "bottom":"bottom"}
		};

		var allowed = allowedAlign[direct];
		if ( allowed == null )			return false;

		if ( allowed[align] != null && allowed[align] === align )		return true;

		return false;
	};

	DialogPosition.prototype.getPosition = function(direct){
		var align = this.data[direct]["align"];

		if ( !this.isAllowAlign(direct, align) ) {
			align = "center";
		}

		if ( "center" === align ){
			return this.getCenterPosition(direct);
		} else if ( "right" === align ) {
			return this.getWindowInner(direct) - this.getObjectSize(direct);
		}

		return 0;
	};

	DialogPosition.prototype.getCenterPosition = function(direct){
		if ( direct == null )		return 0;

		var windowSize = this.getWindowInner(direct);
		var objectSize = this.getObjectSize(direct);

		var position = (windowSize - objectSize);

		if ( position > 0 ) {
			position = position / 2;
		} else {
			position = 0;
		}

		if ( this.$object.parent().offset() != null ) {
			position = position - this.$object.parent().offset()[direct];
		}

		return position;
	};

	DialogPosition.prototype.getWindowInner = function(direct){
		return {
			"left" 	: window.innerWidth,
			"top" 	: window.innerHeight
		}[direct];
	};

	DialogPosition.prototype.getObjectSize = function(direct){
		var object = this.$object;

		return {
			"left" 	: object.width(),
			"top" 	: object.height()
		}[direct];
	};

	DialogPosition.prototype.getScrollOffset = function(direct){
		if ( direct == null )		return 0;

		if ( "left" === direct ) {
			var scrollLeft = $(window).scrollLeft();

			if ( scrollLeft > 0 )		return scrollLeft;
			else					return 0;
		} else if ( "top" === direct ){
			var scrollTop = $(window).scrollTop();

			if ( scrollTop > 0 )		return scrollTop;
			else					    return 0;
		}
	};
	/* /private interface */

	
	jex.plugin.add("JEX_DIALOG",	JexDialogPlugin, dialogAttrs.id);
})();