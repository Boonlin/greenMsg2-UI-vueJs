/**
 * User: kwakyc
 * Date: 13. 4. 18.
 * Time: 오전 10:23
 *
 * @namespace JexPagePlugin
 *
 * @example <div .. data-jx-page="It is yours">
 *
 */
(function () {
    var pageAttrs = {
        id: "data-jx-page"
    };

    var JexPagePlugin = JexPlugin.extend({
        init: function () {

        },

        /**
         * @method load
         * pageAttrs.id} 에 해당하는 속성 값이 읽혀질 때 호출되는 메소드
         */
        load: function (attr, $jq) {
            this.$object = $jq;
            alert($jq.attr(attr));
        },

        /**
         * @method execute
         * Executer에 의해 호출되는 메소드
         */
        execute: function (evt, $jq) {

        },

        /**
         * @method setAll
         * Service 가 호출된 후 data 값이 설정될 때 호출되는 메소드
         */
        setAll: function (dat) {
            // 플러그인에 data 설정이 필요할 경우 사용
        }
    });

    // 페이지에 유일한 객체로 만들고 싶다면 new JexPagePlugin() 로 저장한다.
    jex.plugin.add("JEX_PAGE", JexPagePlugin, pageAttrs.id);
})();