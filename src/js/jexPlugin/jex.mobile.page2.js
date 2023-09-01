/**
 * User: kwakyc
 * Date: 13. 4. 18.
 * Time: 오전 10:23
 *
 * @namespace JexMobilePage
 *
 * @example <div .. data-jx-page="It is yours">
 *
 */
(function () {
    var pageAttrs = {
        id: "data-jx-page",
        service: "data-jx-page-service",
        target: "data-jx-page-service-target",
        execute: "data-jx-page-execute",
        pageidx: "page-idx",
        action: "data-jx-page-action",
        sform: "data-jx-page-addform",
        oform: "data-jx-page-othform"
    };

    var JexMobilePage = JexPlugin.extend({
        init: function () {

        },

        /**
         * @method load
         * pageAttrs.id} 에 해당하는 속성 값이 읽혀질 때 호출되는 메소드
         */
        load: function (attr, $jq) {
        	var _this = this;
        	var _$this = $(this);
            this.$object = $jq;
//            alert($jq.attr(attr)+", "+$jq.attr(pageAttrs.pageHandler)+", "+$jq.attr("id")+", "+$jq.attr("qwer"));
            
            var service = $jq.find("["+pageAttrs.service+"]");
            this.$service = $(service);
//            alert(this.$service);
            
            var target = $jq.find("["+pageAttrs.target+"]");
            this.$target = $(target);
            
            var execute = $jq.find("["+pageAttrs.execute+"]");
            this.$execute = $(execute);
            
            var executerEvent = this.$execute.attr(pageAttrs.execute);
            
            $(execute).bind(executerEvent, function(){
            	var action = $(this).attr(pageAttrs.action);
            	var pageidx = $(this).attr(pageAttrs.pageidx);
            	_this.pageHandler(action, pageidx);
            });
            
            var pageidx = $jq.find("["+pageAttrs.pageidx+"]");
            this.$pageidx = $(pageidx);
            
            var action = $jq.find("["+pageAttrs.action+"]");
            this.$action = $(action);
            
            this.$sform = $(this.$object.attr(pageAttrs.sform));
//            this.loadEvent = this.$sform.attr(pageAttrs.execute);
//            this.$sform.bind(this.loadEvent, function(){
//            });
            this.$oform = $(this.$object.attr(pageAttrs.oform));
        },

        /**
         * @method execute
         * Executer에 의해 호출되는 메소드
         */
        execute: function (evt, $jq) {
//        	alert("function execute");
//        	this.pageHandler();
        },
        
        pageHandler: function(action, pageidx){
//        	alert("function pageHandler");
//        	var currPage = this.$object.attr("page-idx");
//        	var currPage = this.$object.attr(pageAttrs.pageidx);
//        	var currPage = $(this).attr(pageAttrs.pageidx);
        	var currPage = pageidx;
//        	alert(_$this);
//        	var currPage = _$this.attr(pageAttrs.pageidx);
        	
        	var action = action;
//        	var action = this.$object.attr("btn-act");
        	var cal = currPage;
        	if(action == "PRE") if(currPage > 1) cal--;
        	if(action == "NEXT") cal++;
//        	this.$sform.html("");
        	if(action == "LOAD"){
        		var v = "SFORM LOAD<br />"
        			  + "SFORM LOAD<br />"
        			  + "SFORM LOAD";
//        		this.$sform.html(v);	// 1번
        		
        		this.$sform.html(this.$oform.html());	//2번
        		return;
        	}
        	
//        	alert(action+", "+currPage);
        	
        	$("#div0"+currPage).hide();
        	$("#div0"+cal).show();
        },

        /**
         * @method setAll
         * Service 가 호출된 후 data 값이 설정될 때 호출되는 메소드
         */
        setAll: function (dat) {
            // 플러그인에 data 설정이 필요할 경우 사용
        }
    });

    // 페이지에 유일한 객체로 만들고 싶다면 new JexMobilePage() 로 저장한다.
    jex.plugin.add("JEX_MOBILE_PAGE", JexMobilePage, pageAttrs.id);
})();