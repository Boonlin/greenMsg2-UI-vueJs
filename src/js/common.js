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

includeJs("/js/lib/json2.js");
includeJs("/js/lib/jfm-1.0.0.js");
includeJs("/js/lib/jquery-1.10.2.min.js");
includeJs("/js/lib/jquery-ui-1.10.2.nonwidget.min.js");
includeJs("/js/jex/jex.core.js");
includeJs("/js/jexPlugin/jex.msg.js");
includeJs("/js/jexPlugin/jex.executer.js");
includeJs("/js/jexPlugin/jex.svc.js");
includeJs("/js/jexPlugin/jex.effect.js");
includeJs("/js/jexPlugin/jex.view.js");
includeJs("/js/jexPlugin/jex.list.js");
includeJs("/js/jexPlugin/jex.tbl.js");
