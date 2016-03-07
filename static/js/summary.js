var bus = [{"full":[{"id":"bus1","mode":"bus","price":"1000","duration":"12:35"}],"parts":[{"id":"bus11","mode":"bus","price":"1000","duration":"12:35"}]}]
var train = [{"full":[{"id":"train1","mode":"train","price":"1200","duration":"10:35"}],"parts":[{"id":"train11","mode":"train","price":"1200","duration":"10:35"}]}]
var flight = [{"full":[{"id":"flight1","mode":"flight","price":"5000","duration":"10:00"}],"parts":[{"id":"flight11","mode":"train","price":"300","duration":"2:30"},{"id":"flight12","mode":"flight","price":"4500","duration":"2:00"},{"id":"flight13","mode":"bus","price":"200","duration":"2:30"}]}]
var options = new Array();
options[0]=bus;
options[1]=train;
options[2]=flight;
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
		widlist = widlist + "<tr><td width = \"20%\"  style = \"text-align: center\"><font color=\""+priceColor+"\">Rs "+options[i][0].full[0].price+"/-</font></td><td width = \"60%\" ><table width = \"100%\"><tr>"+wid+"</tr></table></td><td width = \"20%\"  style = \"text-align: center\"><font color=\""+durationColor+"\">"+options[i][0].full[0].duration+" Hr</font></td></tr>";
	}
	
	 var output = "<br/><div class=\"panel panel-default\"><div class=\"panel-body\"><table width = \"100%\"><tr><th width = \"20%\"  style = \"text-align: center\"><font color=\"grey\">Price</font></th><th width = \"60%\" ></th><th width = \"20%\"  style = \"text-align: center\"><font color=\"grey\">Duration</font></th></tr>"+widlist+"</table></div></div>";
	 
	 document.getElementById("summary").innerHTML = output;
	
}

