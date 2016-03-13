function showFlightJourneyList(flightList){
	var output = "";
	for (i = 0; i < flightList.length; i++) { 
		var flightTotalDetails = flightList[i][0].full[0];
        var flightTotaljourney = ""
		var first = 1;
		var details = "";
		for (j = 0; j < flightList[i][0].parts.length;j++ ){
			var flightDetails = flightList[i][0].parts[j];
			if(j!=0){
				details = details + "&nbsp;<hr>&nbsp;";
			}
			if(first == 1 && flightDetails.mode == "flight"){
				flightTotaljourney = flightTotaljourney + flightDetails.carrierName;
			} else if (flightDetails.mode == "flight"){
				flightTotaljourney = flightTotaljourney + "&nbsp;&#8594;&nbsp" + flightDetails.carrierName;
			}
			if(flightDetails.mode == "flight"){
				var carrierDiv = "<img src=\"/images/"+flightDetails.carrierName+".png\" >&nbsp;&nbsp;&nbsp;<b class = \"journeySpecifics\" style = \"white-space: nowrap\">("+flightDetails.flightId+")</b>";
			} else {
				var carrierDiv = "<b>"+flightDetails.carrierName+"</b>";
			}
			var siteName = "";
			if(flightDetails.mode != "train"){
				siteName = flightDetails.site;
			}
			var travelSpecificWid = travelSpecificsWidget(flightDetails.source,flightDetails.destination,flightDetails.arrival,flightDetails.departure,flightDetails.duration);
			details = details + "<div class=\"row-eq-height\"><div class=\"col-sm-9 col-height col-middle\"><font color = \"grey\"><table width = \"100%\" ><tr><td width=\"34%\" style =\"text-align:left\">"+carrierDiv+"</td><td width=\"66%\">"+travelSpecificWid+"</td></tr></table></font></div><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td>"+siteName+"&nbsp;<button type=\"button\" class=\"btn btn-success btn-arrow-right\">"+flightDetails.price+"/-</button></td></tr></table></div></div>";
		}
			var travelSpecificWid = travelSpecificsWidget(flightTotalDetails.source,flightTotalDetails.destination,flightTotalDetails.arrival,flightTotalDetails.departure,flightTotalDetails.duration);
			
			if(flightList[i][0].parts.length == 1){
				output = output + "<div class=\"flightMain\" id = \""+flightTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-body\">"+details+"</div></div></div>";
			} else {
				output = output + "<div class=\"flightDetails\" id = \"details"+flightTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><table width=\"100%\"><tr><td style =\"text-align:left\"><h4><font color=\"CornflowerBlue\">&nbsp;&nbsp;"+flightTotalDetails.duration+" Hr</font></h4></td><td style =\"text-align:right\"><h4><font color=\"green\">Rs "+flightTotalDetails.price+"/-&nbsp;</font></h4></td></tr></table></div><div class=\"panel-body\">"+details+"</div></div></div>";
				
				var numberOfChanges = flightList[i][0].parts.length-1
				output = output + "<div class=\"flightMain\" id = \"main"+flightTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row-eq-height\"><table width = \"100%\"><tr><td style =\"text-align:left\"><font color = \"grey\"><b>"+flightTotaljourney+"</b></font></td><td width = \"25%\" style =\"text-align:right\"><button type=\"button\" class=\"btn btn-warning\" id = \""+flightTotalDetails.id+"\">Details</button></td></tr></table></div><hr><div class=\"row-eq-height\"><div class=\"col-sm-9 col-height col-middle\"><font color = \"grey\"><table width = \"100%\" style =\"text-align:center\"><tr><td width=\"34%\" style =\"text-align:left\">"+numberOfChanges+" stops</td><td width=\"66%\">"+travelSpecificWid+"</td></tr></table></font></div><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td><h4><font color=\"green\">"+flightTotalDetails.price+"/-</font><h4></td></tr></table></div></div></div></div></div>";
			}
	}
	
	document.getElementById("flightData").innerHTML = output;	
	$(".flightDetails").hide();
	
	for (i = 0; i < flightList.length; i++){
		
		var flightMainId = flightList[i][0].full[0].id;
		$( "#"+flightMainId ).click(function() {
				var thisId = this.id;
				var mainId = "main"+thisId;
				var detailsId = "details"+thisId;
				$(".flightDetails").hide();
				$(".flightMain").show();
				$("#"+mainId).hide();
				$("#"+detailsId).show();
		});
	}	
	
	
}