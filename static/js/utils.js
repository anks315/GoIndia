function travelSpecificsWidget(source,destination,arrival,departure,duration){
	var out = "<table class=\"journeySpecifics\" width = \"100%\" style =\"text-align:center\"><tr><td width=\"33%\">"+source+"</td><td class = \"journeySpecificsDuration\" width=\"34%\">"+duration+" Hr</td><td width=\"33%\">"+destination+"</td></tr><tr><td width=\"33%\">"+departure+"</td><td class = \"journeySpecificsArrow\" width=\"34%\" style =\"text-align:center\">&#8594;</td><td width=\"34%\">"+arrival+"</td></tr></table></td></tr></table>";
	return out;
}
