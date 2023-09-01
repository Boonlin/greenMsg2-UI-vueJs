function includeJs(defaultUrl, iosUrl) {
	if(iosUrl != null && iosUrl.length > 0){
		var os = "iPhone";
		var os2= "iPad";
		var agent		= navigator.userAgent;
		var checker = new RegExp(os);
		var checker2 = new RegExp(os2);
		if (checker.test(agent) || checker2.test(agent)){
			document.write("<script type='text/javascript' src='" + iosUrl + "'></script>");
			return;
		}
	}
	
	var jScript = "<script type='text/javascript' src='" + defaultUrl + "'></script>";
	document.write(jScript); 
}

//includeJs("../js/lib/cordova-2.5.0.js",'android');
//includeJs("../js/lib/cordova-ios.js",'iPhone');
includeJs("../js/lib/cordova-2.5.0.js", "../js/lib/cordova-ios.js");

includeJs("../js/lib/json2.js");
includeJs("../js/lib/jfm-1.0.0.js");
includeJs("../js/lib/jquery-1.9.1.js");
includeJs("../js/lib/jquery-ui-1.10.2.nonwidget.min.js");
includeJs("../js/jex/jex.core.js");
includeJs("../js/jexCustom/demo.custom.js");
includeJs("../js/jexPlugin/jex.debugger.js");
includeJs("../js/jexPlugin/jex.msg.js");
includeJs("../js/jexPlugin/jex.executer.js");
includeJs("../js/jexPlugin/jex.svc.js");
includeJs("../js/jexPlugin/jex.effect.js");
includeJs("../js/jexPlugin/jex.view.js");
includeJs("../js/jexPlugin/jex.list.js");
includeJs("../js/jexPlugin/jex.dialog.js");
includeJs("../js/jexPlugin/jex.position.js");
includeJs("../js/jexPlugin/jex.width.js");
includeJs("../js/jexPlugin/jex.slide.js");
includeJs("../js/jexPlugin/jex.badge.js");
includeJs("../js/jexPlugin/jex.login.js");
includeJs("../js/jexPlugin/jex.cert.js");
includeJs("../js/jexPlugin/jex.menu.js");
includeJs("../js/jexPlugin/jex.setter.js");
includeJs("../js/jexPlugin/jex.tbl.js");
includeJs("../js/jexPlugin/jex.clear.js");
includeJs("../js/jexPlugin/jex.ml.js");
includeJs("../js/jexPlugin/jex.ml.loading.js");
