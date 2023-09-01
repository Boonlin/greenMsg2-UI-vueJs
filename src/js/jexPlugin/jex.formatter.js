/**
 * User: kwakyc
 * Date: 13. 4. 30.
 * Time: 오전 9:41
 *
 * @namespace JexMobileFormatter
 *
 * @example <input .. data-jx-formatter="It is yours">
 *
 */
(function () {
	var formatter_attrs = {
		id: "data-jx-formatter"
	};

	var JexFormatterPlugin = JexPlugin.extend({
		init: function () {
		},

		/**
		 * @method load
		 * data-jx-formatter 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			this.$object = $jq;
			this.format = $jq.attr(attr);
		},

		/**
		 * @method setAll
		 * Service 가 호출된 후 data 값이 설정될 때 호출되는 메소드
		 */
		setAll: function (dat) {
			this.$object.setTagValue(getFormattedData(this.format, dat));
		}
	});

	function getFormattedData(format, data){
		return {
			"NUMBER" 	: numberFormatter,
			"NAME"		: nameFormatter
		}[format](data);
	}

	/* 100000 	-> 	no 100000 */
	function numberFormatter(data){
		return "no " + data;
	}

	/* Kwak 	->	 name Kwak */
	function nameFormatter(data){
		return "name " + data;
	}

	// 페이지에 유일한 객체로 만들고 싶다면 new JexFormatterPlugin() 로 저장한다.
	jex.plugin.add("JEX_FORMATTER", JexFormatterPlugin, formatter_attrs.id);
})();