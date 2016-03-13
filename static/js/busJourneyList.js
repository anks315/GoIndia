function showBusJourneyList(busList){
	var output = "";
	for (i = 0; i < busList.length; i++) { 
		var busDetails = busList[i][0].parts[0];
		var travelSpecificWid = travelSpecificsWidget(busDetails.source,busDetails.destination,busDetails.arrival,busDetails.departure,busDetails.duration);
		output = output + "<div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row-eq-height\"><table width = \"100%\"><tr><td width = \"75%\" style =\"text-align:left\"><img src=\"/images/"+busDetails.site+".png\" ></img></td><td width = \"25%\" style =\"text-align:right\"><button type=\"button\" class=\"btn btn-success btn-arrow-right\" id = \""+busDetails.id+"\">Book</button></td></tr></table></div><hr><div class=\"row-eq-height\"><div class=\"col-sm-9 col-height col-middle\"><font color = \"grey\"><table width = \"100%\" style =\"text-align:center\"><tr><td width=\"30%\" style =\"text-align:left\"><b>"+busDetails.carrierName+"</b></td><td width=\"70%\">"+travelSpecificWid+"</font></div><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td><h4><font color=\"green\">"+busDetails.price+"/-</font><h4></td></tr></table></div></div></div></div>"
	}
	
	document.getElementById("busData").innerHTML = output;	
}

