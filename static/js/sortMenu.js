function showSortMenuMain(){
	var sortMenuMain = "" + "<br/><div class=\"btn-group btn-group-justified\" role=\"group\" aria-label=\"...\"><div class=\"btn-group\" role=\"group\"><button type=\"button\" class=\"btn btn-default active\">Pocket Friendly</button></div><div class=\"btn-group\" role=\"group\"><button type=\"button\" class=\"btn btn-default\">Time is Money</button></div></div><br/>"
	
	var modeMenuMain = "" + "<ul class=\"nav nav-tabs\"><li class=\"active\"><a data-toggle=\"tab\"  href=\"#busData\">&nbsp;&nbsp<img src=\"/images/bus.png\"/>&nbsp;&nbsp</a></li><li><a data-toggle=\"tab\" href=\"#trainData\">&nbsp;&nbsp<img src=\"/images/train.png\"/>&nbsp;&nbsp</a></li><li><a data-toggle=\"tab\" href=\"#flightData\">&nbsp;&nbsp<img src=\"/images/flight.png\"/>&nbsp;&nbsp</a></li><li id=\"replan\"><a href=\"#\">Replan</a></li></ul><div class=\"tab-content\"><div class=\"tab-pane fade in active\" id=\"busData\"></div><div class=\"tab-pane fade\" id=\"flightData\"></div><div class=\"tab-pane fade\" id=\"trainData\" id=\"trainData\"></div>"
	
	document.getElementById("sortMenuMain").innerHTML = sortMenuMain;
	document.getElementById("modeMenuMain").innerHTML = modeMenuMain;
	
	showBusJourneyList(busList);
	showtransportJourneyList(trainList,"train");
	showtransportJourneyList(flightList,"flight");
	
	$( "#replan" ).click(function() {
				$("#summary").hide();
				$("#sortMenuMain").hide();
				$("#planner").show();
		});
	
}