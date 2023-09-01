$("document").ready(function(){
	$('.termsDate_history').toggleAccordion({
		wrapClass:".termsDate_history",
		clickClass:".termsDate_btNow",
		showClass:".termsDate_historyList",
		layer:true,
		multiShow:false,
		speed:300
	});

	$('.termsDate_history').selectText({
		wrapClass:".termsDate_history",
		clickOn:".termsDate_historyList ol li a",
		setTextToClass:".termsDate_btNow",
	});
});