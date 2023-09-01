var _jextype	= "data-jextype";
var _jexinit	= "data-init";

var _jexDefine	= {
					 "calendar" : {"plugin":"jexCalendar",	"func":"make", "init": {}}
					,"div" 	    : {"plugin":"jexDiv",		"func":"make", "init": {}}
                    };
$(function() {
	_jexConnectorFuncs($(document.body));
});

function _jexConnectorFuncs($r) {
	$.each($r.find("["+_jextype+"]"), function() {
		_jexConnectorFunc($(this));
	});
}

function _jexConnectorFunc($this) {
	if ($this.attr(_jextype)=="execute") {
		$this.click(function() {
			var define = {};
			eval("define="+$this.attr(_jexinit));
			var define2= _jexDefine[$("#"+define.target).data("jextype")];
			if (define.target==undefined) return;
			if (define2==undefined) return;
			if (typeof(define.init) == "string") {
   				eval("$(\"#"+define.target+"\")."+define2.plugin+"(\""+define.exec+"\",$("+define.init+"))");
			} else {
   				eval("$(\"#"+define.target+"\")."+define2.plugin+"(\""+define.exec+"\","+JSON.stringify(define.init)+")");
			}
		});
	} else {
		var define = _jexDefine[$this.attr(_jextype)];
		$this.data("jextype",$this.attr(_jextype));

		if ($this.attr(_jexinit) != null) eval("define[\"init\"]="+$this.attr(_jexinit));
		eval("$this."+define.plugin+"(\""+define.func+"\","+JSON.stringify(define.init)+")");
	}

};
