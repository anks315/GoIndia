var bus = [{"full":[{"id":"bus1","mode":"bus","price":"1000","duration":"12:35","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}],"parts":[{"id":"bus11","mode":"bus","price":"1000","duration":"12:35","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}]}]
var bus2 = [{"full":[{"id":"bus1","mode":"bus","price":"1000","duration":"12:35","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}],"parts":[{"id":"bus11","mode":"bus","price":"1000","duration":"12:35","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}]}]
var bus3 = [{"full":[{"id":"bus1","mode":"bus","price":"1000","duration":"12:35","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}],"parts":[{"id":"bus11","mode":"bus","price":"1000","duration":"12:35","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}]}]
var train = [{"full":[{"id":"train1","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}],"parts":[{"id":"train11","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Sampark Kranti"},{"id":"train12","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Rajdhani"}]}]
var train2 = [{"full":[{"id":"train2","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}],"parts":[{"id":"train21","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Sampark Kranti"}]}]
var train3 = [{"full":[{"id":"train3","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}],"parts":[{"id":"train31","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Sampark Kranti"},{"id":"train32","mode":"train","price":"1200","duration":"10:35","site":"irctc","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Rajdhani"}]}]
var flight = [{"full":[{"id":"flight1","mode":"flight","price":"5000","duration":"10:00","site":"","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Spice jet"}],"parts":[{"id":"flight11","mode":"train","price":"300","duration":"2:30","site":"","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Sampark Kranti"},{"id":"flight12","mode":"flight","price":"4500","duration":"2:00","site":"makemytrip","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Spice Jet","flightId":"GT-108"},{"id":"flight13","mode":"bus","price":"200","duration":"2:30","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}]}]
var flight2 = [{"full":[{"id":"flight2","mode":"flight","price":"5000","duration":"10:00","site":"","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Spice jet"}],"parts":[{"id":"flight21","mode":"flight","price":"4500","duration":"2:00","site":"makemytrip","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Spice Jet","flightId":"GT-108"}]}]
var flight3 = [{"full":[{"id":"flight3","mode":"flight","price":"5000","duration":"10:00","site":"","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Spice jet"}],"parts":[{"id":"flight31","mode":"train","price":"300","duration":"2:30","site":"","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Sampark Kranti"},{"id":"flight32","mode":"flight","price":"4500","duration":"2:00","site":"makemytrip","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Spice Jet","flightId":"GT-108"},{"id":"flight33","mode":"bus","price":"200","duration":"2:30","site":"travelyaari","source":"Delhi","destination":"Mumbai","departure":"00:12","arrival":"13:12","carrierName":"Vishal Travels"}]}]
var options = new Array();
options[0]=bus;
options[1]=train;
options[2]=flight;

var busList = new Array();
busList[0]=bus;
busList[1]=bus2;
busList[2]=bus3;

var trainList = new Array();
trainList[0]=train;
trainList[1]=train2;
trainList[2]=train3;

var flightList = new Array();
flightList[0]=flight;
flightList[1]=flight2;
flightList[2]=flight3;

function showSummary(options){
		
	var leastPrice = options[0][0].full[0].price;
	var leastDuration = options[0][0].full[0].duration;
	for (i = 1; i < options.length; i++) { 
		var price = options[i][0].full[0].price;
		if(price < leastPrice){
			leastPrice = price;
		}
	}
	for (i = 1; i < options.length; i++) { 
		var duration = options[i][0].full[0].duration;
		var durArr = duration.split(":");
		var leastDurArr = leastDuration.split(":");
		if(durArr[0] < leastDurArr[0]){
			leastDuration = duration;
		}
		if(durArr[0] == leastDurArr[0]){
			if(durArr[1] < leastDurArr[1]){
				leastDuration = duration;
			}
		}
		
	}
	var widlist = "";
	for (i = 0; i < options.length; i++) { 

		var wid = "";
		var division = 100/options[i][0].parts.length;
		for(j=0; j < options[i][0].parts.length; j++){
			wid = wid+"<td width = \""+division+"%\"><table width = \"100%\"><tr><td width = \"10%\"><img src=\"/images/"+options[i][0].parts[j].mode+".png\"/></td><td width = \"90%\">&nbsp<hr width=\"100%\" style='margin-top:0em;margin-bottom:0em'/>&nbsp</td><tr></table></td>"
		}
		if(options[i][0].full[0].price == leastPrice){
			var priceColor = "green";
		} else {
			var priceColor = "red";
		}
		
		if(options[i][0].full[0].duration == leastDuration){
			var durationColor = "green";
		} else {
			var durationColor = "red";
		}
		widlist = widlist + "<tr><td   style = \"text-align: center;white-space: nowrap\"><font color=\""+priceColor+"\">Rs "+options[i][0].full[0].price+"/-&nbsp;&nbsp</font></td><td><table width = \"100%\"><tr>"+wid+"</tr></table></td><td  style = \"text-align: center;white-space: nowrap\"><font color=\""+durationColor+"\">&nbsp;&nbsp"+options[i][0].full[0].duration+" Hr</font></td></tr>";
	}
	
	 var output = "<br/><div class=\"panel panel-default\"><div class=\"panel-body\"><table width = \"100%\"><tr><th  style = \"text-align: center\"><font color=\"grey\">Price</font></th><th></th><th  style = \"text-align: center\"><font color=\"grey\">Duration</font></th></tr>"+widlist+"</table></div></div>";
	 
	 document.getElementById("summary").innerHTML = output;
	
}

