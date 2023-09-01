/**
 * <pre>
 * GREENBOX PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : 
 * @File path    	 : 
 * @author       	 : yonryna ( yonryna123@gmail.com )
 * @Description    : 발신자 정보 등록 view
 * @History      	 : 20140425081604, yonryna
 * </pre>
 **/

var pop_gbox_pc_0000 = {};

new (Jex.extend({
	onload:function() {
		$("#submitForm").validationEngine(gbox.ui.validationEngineOptions);
		//--- todo onload start ---//
		//$("#SAUP_NO").val("2148635102");
		//$("#LOGIN_ID").val("webcash");
		 $("#photoDeleteBtn").hide();
		 pop_gbox_pc_0000.setBusinessCombo("#SAUP_NM");
		 
		 /*
		 var jexAjax = jex.createAjaxUtil("pop_gbox_pc_r1000");
			jexAjax.execute(function(dat) {
				if(dat.REC.length > 0){
					$("#SAUP_NM").text(dat.REC[0].BSNN_NM);
					$.each(dat.REC, function(i, v) {				
						$(".gbox_combo_layer ul").append("<li data-SAUP_NO ='"+dat.REC[i].BSNN_NO+"'><a href='javascript:'>"+dat.REC[i].BSNN_NM+"</a></li>");			
					});
				}
			});
			*/
		 
		gbox.ui.setSingleFileUploader("#PHOTO_FILE", {
    		keyTarget: "#PHOTO",
    		allowedExts: "jpg,png,gif",
    		onAfterUpload: function(dat) {
    			if(!jex.isNull(dat)) {
    				var val = dat.fileName;
					if (val.match(/(?:gif|jpg|png|bmp)$/gi)) {
						$("#PHOTO").val(dat.uid);
	    				$("#PHOTO_FILENAME").val(dat.fileName);
	    				// $("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&uid=" + dat.uid);
	    				 $("#PHOTO_IMG").attr("src", "/upload?cmd=getthumb&width=100&height=100&uid=" + dat.uid);
	    				$("#photoDeleteBtn").show();
					}					    				
    				else{
						//
						jex.warning("이미지 파일만 등록 가능합니다 (gif,jpg,png,bmp).");
					}
    				 
    			}
    		}
    	});
		
	}, event:function() {
		//--- define event action ---//
		
		 $(".pop_gbox_close").click(function() {
			 
		 });
		 
		 $(".btn_x_field").click(function() {
			 $("#SEND_NM").val("");
		 });
		 
		 /*
		 $("#SAUP_NM").click(function() {
			 $(".gbox_combo_layer").toggle();
		 });
		 
		 
		 $(".gbox_combo_layer li").live("click" , function() {
			$(".gbox_combo_layer").hide();
			//$("#SAUP_NO").val($(this).data("saup_no"));
			$("#SAUP_NM").text($(this).find("a").text());
		 });
		 */
		 
		//photo delete
		 $("#photoDeleteBtn").click(function() {
			 if(!jex.isNull($("#PHOTO").val())) {
				 $("#PHOTO_IMG").attr("src", "/img/bg/photo_null.jpg");				
				 $.get("/upload?cmd=delete&uid=" + $("#PHOTO").val(), function(dat) {
					 //$(this).removeAttr("data-uid");
					 $("#PHOTO").val("");
					 $("#photoDeleteBtn").hide();
					 $("#PHOTO_FILENAME").val("");
					 jex.warning("프로필 사진이 삭제되었습니다.");
				 });
				
			 }
		 });
			
			
		$("#submitBtn").click(function(){
			if(!$("#submitForm").validationEngine('validate')) {
				return false;
			}
			
			gbox.ui.createProgressBar();
			var jexAjax = jex.createAjaxUtil("pc_cont_r001");
			var data = {};
			data["SEND_NM"] = $("#SEND_NM").val(); 
			data["PHOTO"] = $("#PHOTO").val();
			jexAjax.set(data);
			jexAjax.set(jex.getAllData("#submitForm"));
			jexAjax.execute(function(dat) {
				//사용자 정보가 없으면
				if(jex.isNull(dat.USER_NO)) {
					pop_gbox_pc_0000.createOrg(dat);
				}
				gbox.ui.destroyProgressBar();
			});
		});
		
		//when select combo box, change SAUP_NO value
		$("#SAUP_NM").change(function() {
			//var saupNo = $(this).find("option:selected").data("saup_no");
			//$("#SAUP_NO").val(saupNo);
		});
	}
}))();


pop_gbox_pc_0000.createOrg = function(dat) {
	
	var jexAjax = jex.createAjaxUtil("pc_org_c001");
	jexAjax.set(jex.getAllData("#submitForm"));
	jexAjax.execute(function(dat) {
	
		//var msg = $("#ORG_NM").val() + "의 발신자 정보가 등록되었습니다.";
		var msg = $("#SEND_NM").val() + " 님의 발신자 정보가 등록되었습니다.";
		//msg += "\n발신자번호: " + dat.USER_NO;
		
		jex.alert(msg);
		//페이지 이동
		location.href = dat.REDIRECT_URL;
		
		/*
		//사용자가 존재하면
		if(!jex.isNull(dat.REDIRECT_URL)) {
			//페이지 이동
			 location.href = dat.REDIRECT_URL;
		}
		//사용자가 존재하지 않으면
		else {
			//사용자 정보 등록
			var jexAjax2 = jex.createAjaxUtil("pc_org_c001");
			jexAjax2.set(jex.getAllData("#submitForm"));
			jexAjax2.execute(function(dat) {
				var msg = $("#ORG_NM").val() + "의 발신자 정보가 등록되었습니다.";
				msg += "\n발신자번호: " + dat.USER_NO;
				
				jex.alert(msg);
				
				//페이지 이동
				location.href = "/gbox_pc_1000.act";
			});
		}
		*/
		
	});
};


//사업장 combo
pop_gbox_pc_0000.setBusinessCombo = function(target, json) {
	
	gbox.ui.createProgressBar();
	
	$(target).find("option[data-generated]").remove();
	
	if(!json) json = {};
	
	var jexAjax = jex.createAjaxUtil("pop_gbox_pc_r1000");
	jexAjax.execute(function(dat) {
	
		var valueField = "BSNN_NO";
		var labelField = "BSNN_NM";
		
		$.each(dat.REC, function(i, v) {				
			$(target).append("<option data-generated=\"option\" value='"+v[labelField]+"' data-saup_no='"+v[valueField]+"'>"+v[labelField]+"</option>");			
		});
		
		pop_gbox_pc_0000.setUiComponent($(target).closest("div.gbox_combo"), {
			component:"select"
		});

		if(json.callback) {
			var callbackFn = json.callback;
			callbackFn();
		}
		
		gbox.ui.destroyProgressBar();

	});
};

pop_gbox_pc_0000.setUiComponent = function(target, json) {
	
	if(!json) json = {};
	
	if(json.component == "select") {
		var _target = $(target);
		var _select = _target.find("select");
		var _selected = _target.find("a:first");
		
		_target.find("[data-generated='li']").remove();
		
		//fill option html
		var optionHtml = "";
		
		$.each(_target.find("select > option"), function(i, v) {
			optionHtml += "<li data-generated=\"li\"><a href=\"javascript:\" data-url_link = \""+$(this).data("url_link")+"\" data-value=\""+$(this).val()+"\" data-index=\""+i+"\">"+$(this).text()+"</a></li>";
		});
		
		_selected.text(_select.find("option:selected").text());
//		else {
//			if(i == 0) {
//				_selected.text($(this).text());
//			}
//		}
		
		var _thisUl = _target.find("ul");
		
		_thisUl.append(optionHtml);
		
		//이미 초기화된 컴포넌트이면
		if(_target.attr("data-generated") == "component") {
		}
		else {
			_target.attr("data-generated", "component");
			
			//toggle select ui
			_selected.click(function() {
				$(this).focus();
				_thisUl.parent().toggle();
				
			});
			
			
			/*
			_target.find("a.field_style:first").blur(function() {
				
				
			//	_thisUl.toggle();
				
				
				_thisUl.slideUp();
				//alert(1);
				
			});
			*/
			
			//blur comboBox
//		_target.find("a.field_style:first").blur(function() {
//			_thisUl.hide();
//			
//		});
//
//
//		_this.find("*").blur(function() {
//		});
//		
//		$("body").focus(function() {
//			_thisUl.slideUp("fast");
//		});
//							
			//select event
			_target.find("ul > li[data-generated]").click(function() {
				_target.find("select > option:eq("+$(this).find("a").data("index")+")").prop("selected", true);
				_selected.text($(this).text());
				_select.trigger("change");
				$(this).focus();
				_thisUl.parent().toggle();
			});	
			
//			if(json.defaultValue) {
//				_target.find("li > a[data-value='"+json.defaultValue+"']").trigger("click");
				
//			}
		}
		
	}
};