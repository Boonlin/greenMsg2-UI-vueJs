/**
 * User: kwakyc
 * Date: 13. 5. 2.
 * Time: 오전 10:31
 *
 * @namespace JexPositionPlugin
 *
 * @example <div .. data-jx-position="It is yours">
 *
	@name data-jx-dialog-position
 	@desc
	 (선택 옵션) dialog가 나타날 좌표 값을 설정할 수 있다. 생략할 경우 화면 가운데에서 나타난다. <b>data-jx-dialog-position="{left}, {top}"</b> <br />
 	- {number} : 절대좌표로 해당 좌표 위치에서 나타난다. <br />
 	- +{number} or -{number} : 가장 마지막에 발생한 executer의 위치를 기준으로 +- 위치에서 나타난다. <br />
    - {left = left : 기존 입력 값 or right : 기존 입력 값}, {top = top : 기존 입력 값 or bottom : 기존 입력 값} : 입력 값에 key: value 포맷을 추가하여 right, bottom 의 절대 값으로도 position이 지정될 수 있다.
 	- {left = @right or @left or @center}, {top = @top or @bottom or @center} : dialog 창이 윈도우 size보다 작을 경우, 해당 위치로 dialog를 붙인다. <br />

 	@example <.. data-jx-dialog-position="@right, 100">
 	@example <.. data-jx-dialog-position=", 200">
 */
(function () {
	var position_attrs = {
		id: "data-jx-position"
	};

	var JexPositionPlugin = JexPlugin.extend({
		init: function () {
		},

		/**
		 * @method load
		 * data-jx-position 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			this.$object = $jq;

			this.dialogPosition = new DialogPosition(
				this.$object,
				this.$object.attr(position_attrs.id)
			);
		},

		/**
		 * @param event [Mouse Event]
		 */
		set: function(event) {
			this.dialogPosition.reset(event);
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

	DialogPosition.prototype = {
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

				var tmpPosition = -1;
				if (typeof this.data[direct] === "object" &&
                        this.isNumber(this.data[direct]["position"])) {
					tmpPosition = this.data[direct]["position"];
				}

				if (tmpPosition != -1 && this.isDefaultPosition(direct)){
					position = tmpPosition;
				} else {
					position = this.getPosition(direct);
				}

				if (this.isRelative(direct)) {
					var $lastExecuter = jex.get("_jex_last_evt");
					position += parseInt($lastExecuter.offset()[direct]);
				} else {
					position += this.getScrollOffset(direct);
				}

				this.$object.css(direct, position + "px");
			}
		}
	};

	DialogPosition.prototype.parse = function(userData){
		if ( typeof userData !== 'string' || userData.length == 0 )		    throw new Error("입력 값이 ${left}, ${top} 형식이 아닙니다.");

		var arrUserData = userData.split(",");
		if ( arrUserData.length != 2 )				throw new Error("입력 값이 ${left}, ${top} 형식이 아닙니다.");

		this.setPosition("left", $.trim(arrUserData[0]));
		this.setPosition("top", $.trim(arrUserData[1]));
	};

	DialogPosition.prototype.setPosition = function(direct, data){
		if ( this.data[direct] == null )	this.data[direct] = {};

        var keyValue = data.split(":"),
            location = "";

        if (keyValue.length == 2) {
            var align = $.trim(keyValue[0]);
            location = $.trim(keyValue[1]);

            if (this.isAllowAlign(direct, align)) {
                location = "@" + align + ":" + location;
            }
        } else {
            location = data;
        }

        var prefix = location.charAt(0);

        /**
        *   TODO
        *    - 기본적으로 입력 값에 align -> left, top 으로 주게 되면 setDefaultPosition 이 그 기능을 상실할 수 있다.
        *   - 혹은 이름상 setAlignPosition 을 제거하고 setDefaultPosition 에서 align 에 대한 처리를 해주도록 수행할 수 있을 것 같다.
        */
		if ( "+" === prefix || "-" === prefix ) {
			this.setRelativePosition(direct, location);
		} else if ( "@" === prefix ){
			this.setAlignPosition(direct, location);
		} else {
			this.setDefaultPosition(direct, location);
		}
	};

	DialogPosition.prototype.setRelativePosition = function(direct, data){
		var position = parseInt(data);
		if (this.isNumber(position)) {
			this.data[direct].position = position;
			this.data[direct].relative = true;
		}
	};

	DialogPosition.prototype.setAlignPosition = function(direct, data){
		var keyValue = data.substring(1).split(":"),
            align = $.trim(keyValue[0]),
            position = 0;

        if (keyValue.length == 2) {
            position = parseInt($.trim(keyValue[1]));
        }

		if (this.isAllowAlign(direct, align)) {
            this.data[direct].align = align;
            this.data[direct].position = position;
        }
	};

	DialogPosition.prototype.setDefaultPosition = function(direct, data){
		var position = parseInt(data);
		if (this.isNumber(position)) {
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

    DialogPosition.prototype.isDefaultPosition = function(direct) {
        var isReverseOrRelative = this.isReverse(direct) || this.isRelative(direct);
        if (!isReverseOrRelative)        return true;
        return false;
    };

    DialogPosition.prototype.isReverse = function(direct) {
        var reverse = {
            "left"  : "right",
            "top"   : "bottom"
        }[direct];

        return !!(this.data[direct]["align"] === reverse);
    };

    DialogPosition.prototype.isRelative = function(direct) {
        return !!this.data[direct]["relative"];
    };


    DialogPosition.prototype.isNumber = function(data) {
        return !isNaN(data);
    };

	DialogPosition.prototype.getPosition = function(direct){
		var align = this.data[direct]["align"];

		if ( !this.isAllowAlign(direct, align) ) {
			align = "center";
		}

        if ("right" === align || "bottom" === align) {
            var position = this.data[direct].position;
            var weight = (this.isNumber(position))? position : 0;

            return this.getWindowInner(direct) - this.getObjectSize(direct) - weight;
        } else if ("center" === align) {
            return this.getCenterPosition(direct);
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

	// 페이지에 유일한 객체로 만들고 싶다면 new JexPositionPlugin() 로 저장한다.
	jex.plugin.add("JEX_POSITION", JexPositionPlugin, position_attrs.id);
})();