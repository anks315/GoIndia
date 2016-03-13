function showtransportJourneyList(transportList, mode){
	var output = "<br/>";
	for (i = 0; i < transportList.length; i++) { 
		var transportTotalDetails = transportList[i][0].full[0];
        var transportTotaljourney = "";
		var details = "";
		var first = 1;
		var journeyDividerContent = "";
		for (j = 0; j < transportList[i][0].parts.length;j++ ){
			var transportDetails = transportList[i][0].parts[j];
			if(j!=0){
				details = details + "&nbsp;<hr>&nbsp;";
			}
			if(first == 1 && transportDetails.mode == mode){
				if(mode == "flight"){
					transportTotaljourney = transportTotaljourney + "<img src=\"/images/"+transportDetails.carrierName+".png\"></img>"
				}
				else {
					transportTotaljourney = transportDetails.carrierName;
				}
				first = 0;
			} else if (transportDetails.mode == mode){
				if(mode == "flight"){
					transportTotaljourney = transportTotaljourney + "&nbsp;&#8594;&nbsp" + "<img src=\"/images/"+transportDetails.carrierName+".png\"></img>";
				} else {
					transportTotaljourney = transportTotaljourney + "&nbsp;&#8594;&nbsp" + transportDetails.carrierName;
				}
			}
			var siteName = "";
			if(transportDetails.mode != "train"){
				siteName = transportDetails.site;
			}
			var travelSpecificWid = travelSpecificsWidget(transportDetails.source,transportDetails.destination,transportDetails.arrival,transportDetails.departure,transportDetails.duration);
			details = details + "<div class=\"row-eq-height\"><div class=\"col-sm-3 col-height col-middle\" style =\"text-align:left\"><font color = \"grey\"><b>"+transportDetails.carrierName+"</b><br/>&nbsp;</div><div class=\"col-sm-6 col-height col-middle\" style =\"text-align:center\">"+travelSpecificWid+"</div></font><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td>"+siteName+"&nbsp;<button type=\"button\" class=\"btn btn-success btn-arrow-right\">"+transportDetails.price+"/-</button></td></tr></table></div></div>";
			
			var journeyDividerContent = journeyDividerContent + "<td style =\"padding: 1px\"><img src=\"/images/"+transportDetails.mode+"2.png\"/></td>";
		}
			var travelSpecificWid = travelSpecificsWidget(transportTotalDetails.source,transportTotalDetails.destination,transportTotalDetails.arrival,transportTotalDetails.departure,transportTotalDetails.duration);
			
			var journeyDivider = "<br/><table class=\"table table-bordered\" style =\"text-align:center\"><tbody><tr>"+journeyDividerContent+"</tr></tbody></table>"

				output = output + "<div class=\""+mode+"Details\" id = \"details"+transportTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><table width=\"100%\"><tr><td style =\"text-align:left\"><h4><font color=\"CornflowerBlue\">&nbsp;&nbsp;"+transportTotalDetails.duration+" Hr</font></h4></td><td style =\"text-align:right\"><h4><font color=\"green\">Rs "+transportTotalDetails.price+"/-&nbsp;</font></h4></td></tr></table></div><div class=\"panel-body\">"+details+"</div></div></div>";
				var numberOfChanges = transportList[i][0].parts.length-1
				if (numberOfChanges == 1){
					var numberOfChangesView = numberOfChanges + " Stop"
				} else if (numberOfChanges == 0) {
					var numberOfChangesView = "Direct"
				} else {
					var numberOfChangesView = numberOfChanges + " Stops"
				}
				output = output + "<div class=\""+mode+"Main\" id = \"main"+transportTotalDetails.id+"\"><div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"row-eq-height\"><table width = \"100%\"><tr><td style =\"text-align:left\"><font color = \"grey\"><b>"+transportTotaljourney+"</b></font></td><td width = \"25%\" style =\"text-align:right\"><button type=\"button\" class=\"btn btn-warning\" id = \""+transportTotalDetails.id+"\">Select</button></td></tr></table></div><div class=\"row-eq-height\">"+journeyDivider+"</div><div class=\"row-eq-height\"><div class=\"col-sm-3 col-height col-middle\" style =\"text-align:left\"><font color = \"grey\">"+numberOfChangesView+"<br/>&nbsp;</div><div class=\"col-sm-6 col-height col-middle\" style =\"text-align:center\">"+travelSpecificWid+"</div></font><div class=\"col-sm-3 col-height col-middle\"><table width = \"100%\" style =\"text-align:right\"><tr><td><h4><font color=\"green\">"+transportTotalDetails.price+"/-</font><h4></td></tr></table></div></div></div></div></div>";

	}
	//binding data to flights tab
	if(mode == "flight"){
		document.getElementById("flightData").innerHTML = output;	
		for (i = 0; i < transportList.length; i++){
		
		var transportMainId = transportList[i][0].full[0].id;
		$( "#"+transportMainId ).click(function() {
				var thisId = this.id;
				var mainId = "main"+thisId;
				var detailsId = "details"+thisId;
				$(".flightDetails").hide();
				$(".flightMain").show();
				$("#"+mainId).hide();
				$("#"+detailsId).show();
		});
		}	
	} else { //binding data to trains tab
		document.getElementById("trainData").innerHTML = output;
		for (i = 0; i < transportList.length; i++){
		
		var transportMainId = transportList[i][0].full[0].id;
		$( "#"+transportMainId ).click(function() {
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
	$("."+mode+"Details").hide();
	
	
}