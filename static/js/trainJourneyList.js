function showTrainJourneyList(trainList){
	var output = "";
	for (i = 0; i < trainList.length; i++) { 
		var trainTotalDetails = trainList[i][0].full[0];
        var trainTotaljourney = trainList[i][0].parts[0].carrierName;
		var details = "";
		for (j = 0; j < trainList[i][0].parts.length;j++ ){
			var trainDetails = trainList[i][0].parts[j];
			if(j!=0){
				trainTotaljourney = trainTotaljourney + "&nbsp;&#8594;&nbsp" + trainDetails.carrierName;
				details = details + "&nbsp;<hr>&nbsp;";
			}
			var travelSpecificWid = travelSpecificsWidget(trainDetails.source,trainDetails.destination,trainDetails.arrival,trainDetails.departure,trainDetails.duration);
			details = details + "<div class=\"row-eq-height\"><div class=\"col-sm-9 col-height col-middle\"><font color = \"grey\"><table width = \"100%\" style =\"text-align:center\"><tr><td width=\"30%\" style =\"text-align:left\"><b>"+trainDetails.carrierName+"</b></td><td width=\"70%\">"+travelSpecificWid+"</td></tr></table></font></div><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td><button type=\"button\" class=\"btn btn-success btn-arrow-right\">"+trainDetails.price+"/-</button></td></tr></table></div></div>";
		}
			var travelSpecificWid = travelSpecificsWidget(trainTotalDetails.source,trainTotalDetails.destination,trainTotalDetails.arrival,trainTotalDetails.departure,trainTotalDetails.duration);
			
			if(trainList[i][0].parts.length == 1){
				output = output + "<div class=\"trainMain\" id = \""+trainTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-body\">"+details+"</div></div></div>";
			} else {
				output = output + "<div class=\"trainDetails\" id = \"details"+trainTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><table width=\"100%\"><tr><td style =\"text-align:left\"><h4><font color=\"CornflowerBlue\">&nbsp;&nbsp;"+trainTotalDetails.duration+" Hr</font></h4></td><td style =\"text-align:right\"><h4><font color=\"green\">Rs "+trainTotalDetails.price+"/-&nbsp;</font></h4></td></tr></table></div><div class=\"panel-body\">"+details+"</div></div></div>";
				var numberOfChanges = trainList[i][0].parts.length-1
				if (numberOfChanges == 1){
					var numberOfChangesView = numberOfChanges + " Stop"
				} else {
					var numberOfChangesView = numberOfChanges + " Stops"
				}
				output = output + "<div class=\"trainMain\" id = \"main"+trainTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row-eq-height\"><table width = \"100%\"><tr><td style =\"text-align:left\"><font color = \"grey\"><b>"+trainTotaljourney+"</b></font></td><td width = \"25%\" style =\"text-align:right\"><button type=\"button\" class=\"btn btn-warning\" id = \""+trainTotalDetails.id+"\">Details</button></td></tr></table></div><hr><div class=\"row-eq-height\"><div class=\"col-sm-9 col-height col-middle\"><font color = \"grey\"><table width = \"100%\" style =\"text-align:center\"><tr><td width=\"30%\" style =\"text-align:left\">"+numberOfChangesView+"</td><td width=\"70%\">"+travelSpecificWid+"</td></tr></table></font></div><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td><h4><font color=\"green\">"+trainTotalDetails.price+"/-</font><h4></td></tr></table></div></div></div></div></div>";
			}
	}
	
	document.getElementById("trainData").innerHTML = output;	
	$(".trainDetails").hide();
	
	for (i = 0; i < trainList.length; i++){
		
		var trainMainId = trainList[i][0].full[0].id;
		$( "#"+trainMainId ).click(function() {
				var thisId = this.id;
				var mainId = "main"+thisId;
				var detailsId = "details"+thisId;
				$(".trainDetails").hide();
				$(".trainMain").show();
				$("#"+mainId).hide();
				$("#"+detailsId).show();
		});
	}	
}