function SortListByPrice(list){
				function SortByPrice(a,b){
					var aPrice = a.full[0].price;
					var bPrice = b.full[0].price;
					return ((aPrice<bPrice)?-1:((aPrice>bPrice)?1:0));
				}
				list.sort(SortByPrice);
}
function SortListByDuration(list){
				function SortByDuration(a,b){
					var aDuration = a.full[0].duration;
					var bDuration = b.full[0].duration;
					var aHrs = aDuration.split(":")[0];
					var aMins = aDuration.split(":")[1];
					var bHrs = bDuration.split(":")[0];
					var bMins = bDuration.split(":")[1];
					var HrsRel = ((aHrs<bHrs)?-1:((aHrs>bHrs)?1:0));
					var MinsRel = ((aMins<bMins)?-1:((aMins>bMins)?1:0));
					if(HrsRel != 0){
						return HrsRel;
					} else {
						return MinsRel;
					}
				}
				list.sort(SortByDuration);
}