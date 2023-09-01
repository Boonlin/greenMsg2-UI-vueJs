var bizpoint;
var downcnt = 0;
if(!bizpoint) bizpoint={};
if(!bizpoint.file) bizpoint.file={};
$(function(){
	$("body").append('<iframe name="_fileIfrm" width="100%" height="0" frameborder="0" marginheight="0"></iframe>');
	$("body").append('<form method="post" id="_fileFrm" target="_fileIfrm" action="filedownload_0001.act"></form>');
	$("#_fileFrm").append("<input type='hidden' id='_fileNm'             name='_fileNm'       >");
	$("#_fileFrm").append("<input type='hidden' id='_orgfileNm'          name='_orgfileNm'    >");
	$("#_fileFrm").append("<input type='hidden' id='_saveFilePath'       name='_saveFilePath' >");
	$("#_fileFrm").append("<input type='hidden' id='_totalfile'          name='_totalfile' >");
});

bizpoint.file.multiFileDownloadLayer = function(fileJson , e , repository) {
	var top  = e.clientY+document.documentElement.scrollTop;
	var left = e.clientX-270;
	
	var layerHtml = "<div class='file_layer_pop' style='position: absolute;'>";
	layerHtml += "<ul>";
	$.each(fileJson , function(i,v){
		layerHtml += "<li class='"+(i%2==0?"tg_01":"")+"'><a style='cursor:pointer' onclick='bizpoint.file.fileDownload(\""+v.FILE_NM+"\",\""+repository+"\")' >"+v.FILE_NM+"</a></li>";
	});
	layerHtml += "<li class='tg_02'>&nbsp;";
	layerHtml += "<span class='btnclose'><img src='/img/comm/etc/btn_lpclose.gif' alt='close' onclick='bizpoint.file.layerClose()' style='cursor:pointer' /></span>";
	layerHtml += "</li>";
	layerHtml += "</ul>";
	layerHtml += "</div>";
	$("body").append(layerHtml);
	$(".file_layer_pop").css("top" ,top );
	$(".file_layer_pop").css("left",left);
};



bizpoint.file.multiFileDownloadLayer2 = function(fileJson , t , l , repository) {
	var top  = t;
	var left = l;
	
	var layerHtml = "<div class='file_layer_pop' style='position: absolute;'>";
	layerHtml += "<ul>";
	$.each(fileJson , function(i,v){
		layerHtml += "<li class='"+(i%2==0?"tg_01":"")+"'><a style='cursor:pointer' onclick='bizpoint.file.fileDownload(\""+v.FILE_NM+"\",\""+repository+"\")' >"+v.FILE_NM+"</a></li>";
	});
	layerHtml += "<li class='tg_02'>&nbsp;";
	layerHtml += "<span class='btnclose'><img src='/img/comm/etc/btn_lpclose.gif' alt='close' onclick='bizpoint.file.layerClose()' style='cursor:pointer' /></span>";
	layerHtml += "</li>";
	layerHtml += "</ul>";
	layerHtml += "</div>";
	$("body").append(layerHtml);
	$(".layer_pop").css("top" ,top );
	$(".layer_pop").css("left",left);
};


bizpoint.file.fileDownload = function(fileNm , saveFilePath, orgfileNm) {	
	$("#_fileFrm").find("#_orgfileNm"   ).val(orgfileNm   );
	$("#_fileFrm").find("#_fileNm"      ).val(fileNm      );
	$("#_fileFrm").find("#_saveFilePath").val(saveFilePath);	
	$("#_fileFrm").submit();
};

bizpoint.file.toltalfileDownload = function(totalfile) {	
	//totalfile = "[{'img','1409290458_1.jpg','1818.jpg'},{'img','20141121_081122.jpg','2828.jpg'},{'img','20141203201801.png','3838.jpg'}]";
	//totalfile = "{'img','1409290458_1.jpg','1818.jpg'}";
	totalfile = "img,1409290458_1.jpg,1818.jpg:img,20141121_081122.jpg,2828.jpg:img,20141203201801.png,3838.jpg";
	//$("#_fileFrm").find("#_totalfile").val(totalfile);	
	//$("#_fileFrm").submit();
	
	var fileArray = totalfile.split(':');
	var saveFilePath = "";
	var fileNm = "";
	var orgfileNm    = "";
	var startNum = downcnt;
	var endNum = fileArray.length;
	
	//alert(downcnt+1);
	//alert(fileArray.length+1);
	bizpoint.file.appendIframe(startNum,endNum);
	
	for(var i = 0 ; i<fileArray.length ; i++){
		
		var fileArray2 = fileArray[i].split(',');
		
		//for(var j = 1 ; j<fileArray2.length+1;j++){
			saveFilePath = fileArray2[0];
			fileNm = fileArray2[1];
			orgfileNm    = fileArray2[2];			
		//}
		$("#tmptxt").append(fileNm+"/"+orgfileNm+"/"+saveFilePath);	
		$("#_fileFrm"+i+"").find("#_orgfileNm"   ).val(orgfileNm   );
		$("#_fileFrm"+i+"").find("#_fileNm"      ).val(fileNm      );
		$("#_fileFrm"+i+"").find("#_saveFilePath").val(saveFilePath);	
		$("#_fileFrm"+i+"").submit();
		//alert(i+"/"+saveFilePath+"/"+fileNm+"/"+orgfileNm);
		//alert(saveFilePath+"/"+fileNm+"/"+orgfileNm)	;
			
	}

	bizpoint.file.removeIframe(startNum,endNum);	
};

bizpoint.file.appendIframe = function(startNum, endNum) {	

	for(var i = startNum ; i<endNum ; i++){

		downcnt = i;
		$("body").append('<iframe name="_fileIfrm'+downcnt+'" width="100%" height="0" frameborder="0" marginheight="0"></iframe>');
		$("body").append('<form method="post" id="_fileFrm'+downcnt+'" target="_fileIfrm'+downcnt+'" action="filedownload_0001.act"></form>');
		$("#_fileFrm"+downcnt+"").append("<input type='hidden' id='_fileNm'             name='_fileNm'       >");
		$("#_fileFrm"+downcnt+"").append("<input type='hidden' id='_orgfileNm'          name='_orgfileNm'    >");
		$("#_fileFrm"+downcnt+"").append("<input type='hidden' id='_saveFilePath'       name='_saveFilePath' >");
		$("#_fileFrm"+downcnt+"").append("<input type='hidden' id='_totalfile'          name='_totalfile' >");
	}
	
};

bizpoint.file.removeIframe = function(startNum, endNum) {	
	
	for(var i = startNum ; i<endNum ; i++){
		
		downcnt = i;
		$("#_fileFrm"+downcnt+"").remove();
	}
	
};

bizpoint.file.layerClose = function(){
	$(".file_layer_pop").remove();
};
