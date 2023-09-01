var greenbox;
if(!greenbox) greenbox={};	

$.extend($.ui.dialog.prototype.options, {
	resizable: false,
	autoOpen: false,setSingleFileUploadesetSingleFileUploade
	modal: true,
	width: 600,
	height: 400
});

greenbox.ui.setSingleFileUploader = function(target, json) {
		
		var url = "/upload";
		
		if(json.allowedExts) {
			url += "?allowedExts=" + json.allowedExts;
		}
		
		$(target).attr("placeholder", window.lang.convert("파일을 선택하세요."));
		//$(target).attr("type", "file");
		$(target).attr("name", "files[]");
		$(target).attr("data-url", "/upload");
		
		//change 이벤트 설정
		$(json.keyTarget).bind("change", function() {
			$(target).parent().find(".generated").remove();
			
			if(jex.isNull($(json.keyTarget).val())) {
				$(target).show();
				$(target).prev("input").prev().remove();
				$(target).prev("input").remove();
			}
			else {
				$(target).before('<span class="input-group-btn generated"><button type="button" class="btn"><i class="glyphicon glyphicon-remove"></i></button></span><input class="form-control generated" type="text" value="'+$(json.keyTarget).val()+'" readonly />');
				$(target).hide();
				
				//초기화 설정
				$(target).parent().find("button:has(i.glyphicon-remove)").bind("click", function() {
					//$(target).show();
					//$(this).remove();
					$(json.keyTarget).val("");
					$(json.keyTarget).trigger('change');
				});
			}
		});
		
		
		$(target).fileupload({
			 
	        dataType: 'json',
	 
	        done: function (e, data) {
	        	$.getJSON("/upload?cmd=save", function(data) {
	        		
	        		if(jex.isError(data)) {
	        			jex.error(data);
	        			return;
	        		}
	        		
	        		if(json.onAfterUpload) {
	        			json.onAfterUpload(data);
	        		}
	        		else {
		        		if(json.keyTarget) {
			        		$(json.keyTarget).val(data[0].uid);
			        		$(json.keyTarget).attr("data-changed", "Y");
			        		$(json.keyTarget).trigger('change');
		        		}
		        		
		        		$(target).prev("input").remove();
		        		$(target).before('<input class="form-control generated" type="text" value="'+data[0].fileName+'" readonly />');
	        		}
	        	});
	        }
	        /*
	        progressall: function (e, data) {
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            $('#progress .bar').css(
	                'width',
	                progress + '%'
	            );
	        },
	 
	        dropZone: $('#dropzone')
	        */
	    }).bind('fileuploadsubmit', function (e, data) {
	        // The example input, doesn't have to be part of the upload form:
	        //var uploader = $('#uploader');
	        //data.formData = {uploader: uploader.val()};        
	    });
		
		//span 제거
		$(target).prev("span").remove();
	};
	