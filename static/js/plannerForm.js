function showPlanner(plannerContainer){
		var out ="";
			 out = out + "</br><div class=\"panel panel-default\"><div class=\"panel-body\"><ul class=\"nav nav-tabs\"><li role=\"presentation\" id=\"one-way\" class=\"active\"><a href=\"#\">One-way trip</a></li><li role=\"presentation\" id=\"two-way\"><a href=\"#\">Return trip</a></li></ul><div class=\"row\"><div class=\"col-sm-6 col-height col-middle\"></br><div class=\"typeahead-container\"><div class=\"typeahead-field\"><div class=\"input-group\"><input class=\"form-control\" id=\"from\" name=\"queryStr\" placeholder=\"From:\" type=\"text\" autofocus autocomplete=\"off\"><span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-home\"></span></span></div></div></div></div><div class=\"col-sm-6 col-height col-middle\"></br><div class=\"typeahead-container\"><div class=\"typeahead-field\"><div class=\"input-group\"><input class=\"form-control\" id=\"to\" name=\"queryStr\" placeholder=\"To:\" type=\"text\" autofocus autocomplete=\"off\"><span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-home\"></span></span></div></div></div></div></div><div class=\"row\"><div class=\"col-sm-6 col-height col-middle\"></br><div class=\"form-group\"><div class='input-group date' id='departure'><input type='text' class=\"form-control\" placeholder= \"Departure\"/><span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span></span></div></div></div><div class=\"col-sm-6 col-height col-middle\"></br><div class=\"form-group\"><div class='input-group date' id='return'><input type='text' class=\"form-control\" placeholder= \"Return\"/><span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span></span></div></div></div></div><div class=\"row\"><div class=\"col-sm-6 col-height col-middle\"></br><input type=\"submit\" id=\"search\" class=\"btn btn-info\" value=\"Search..\"></div><div class=\"col-sm-6 col-height col-middle\"></div></div></br></div></div>";

		document.getElementById("planner").innerHTML = out;
		$("#return").hide();
		$(function(){
				$('#departure').datepicker();
		});
		$(function(){
				$('#return').datepicker();
		});
		var data = {
				countries: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
					"Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
					"Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
					"Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma",
					"Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad",
					"Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the",
					"Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
					"Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
					"Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
					"Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea",
					"Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
					"Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
					"Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos",
					"Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
					"Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
					"Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco",
					"Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
					"Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru",
					"Philippines", "Poland", "Portugal", "Romania", "Russia", "Rwanda", "Samoa", "San Marino",
					"Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone",
					"Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain",
					"Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan",
					"Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
					"Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
					"Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"],
				capitals: ["Abu Dhabi", "Abuja", "Accra", "Adamstown", "Addis Ababa", "Algiers", "Alofi", "Amman", "Amsterdam",
					"Andorra la Vella", "Ankara", "Antananarivo", "Apia", "Ashgabat", "Asmara", "Astana", "Asunción", "Athens",
					"Avarua", "Baghdad", "Baku", "Bamako", "Bandar Seri Begawan", "Bangkok", "Bangui", "Banjul", "Basseterre",
					"Beijing", "Beirut", "Belgrade", "Belmopan", "Berlin", "Bern", "Bishkek", "Bissau", "Bogotá", "Brasília",
					"Bratislava", "Brazzaville", "Bridgetown", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Bujumbura",
					"Cairo", "Canberra", "Caracas", "Castries", "Cayenne", "Charlotte Amalie", "Chisinau", "Cockburn Town",
					"Conakry", "Copenhagen", "Dakar", "Damascus", "Dhaka", "Dili", "Djibouti", "Dodoma", "Doha", "Douglas",
					"Dublin", "Dushanbe", "Edinburgh of the Seven Seas", "El Aaiún", "Episkopi Cantonment", "Flying Fish Cove",
					"Freetown", "Funafuti", "Gaborone", "George Town", "Georgetown", "Georgetown", "Gibraltar", "King Edward Point",
					"Guatemala City", "Gustavia", "Hagåtña", "Hamilton", "Hanga Roa", "Hanoi", "Harare", "Hargeisa", "Havana",
					"Helsinki", "Honiara", "Islamabad", "Jakarta", "Jamestown", "Jerusalem", "Juba", "Kabul", "Kampala",
					"Kathmandu", "Khartoum", "Kiev", "Kigali", "Kingston", "Kingston", "Kingstown", "Kinshasa", "Kuala Lumpur",
					"Kuwait City", "Libreville", "Lilongwe", "Lima", "Lisbon", "Ljubljana", "Lomé", "London", "Luanda", "Lusaka",
					"Luxembourg", "Madrid", "Majuro", "Malabo", "Malé", "Managua", "Manama", "Manila", "Maputo", "Marigot",
					"Maseru", "Mata-Utu", "Mbabane Lobamba", "Melekeok Ngerulmud", "Mexico City", "Minsk", "Mogadishu", "Monaco",
					"Monrovia", "Montevideo", "Moroni", "Moscow", "Muscat", "Nairobi", "Nassau", "Naypyidaw", "N'Djamena",
					"New Delhi", "Niamey", "Nicosia", "Nicosia", "Nouakchott", "Nouméa", "Nukuʻalofa", "Nuuk", "Oranjestad",
					"Oslo", "Ottawa", "Ouagadougou", "Pago Pago", "Palikir", "Panama City", "Papeete", "Paramaribo", "Paris",
					"Philipsburg", "Phnom Penh", "Plymouth Brades Estate", "Podgorica Cetinje", "Port Louis", "Port Moresby",
					"Port Vila", "Port-au-Prince", "Port of Spain", "Porto-Novo Cotonou", "Prague", "Praia", "Cape Town",
					"Pristina", "Pyongyang", "Quito", "Rabat", "Reykjavík", "Riga", "Riyadh", "Road Town", "Rome", "Roseau",
					"Saipan", "San José", "San Juan", "San Marino", "San Salvador", "Sana'a", "Santiago", "Santo Domingo",
					"São Tomé", "Sarajevo", "Seoul", "Singapore", "Skopje", "Sofia", "Sri Jayawardenepura Kotte", "St. George's",
					"St. Helier", "St. John's", "St. Peter Port", "St. Pierre", "Stanley", "Stepanakert", "Stockholm", "Sucre",
					"Sukhumi", "Suva", "Taipei", "Tallinn", "Tarawa Atoll", "Tashkent", "Tbilisi", "Tegucigalpa", "Tehran",
					"Thimphu", "Tirana", "Tiraspol", "Tokyo", "Tórshavn", "Tripoli", "Tskhinvali", "Tunis", "Ulan Bator", "Vaduz",
					"Valletta", "The Valley", "Vatican City", "Victoria", "Vienna", "Vientiane", "Vilnius", "Warsaw",
					"Washington, D.C.", "Wellington", "West Island", "Willemstad", "Windhoek", "Yamoussoukro", "Yaoundé", "Yaren",
					"Yerevan", "Zagreb"]
			};
			
		$('#from').typeahead({
			minLength: 1,
			order: "asc",
			group: true,
			maxItemPerGroup: 3,
			groupOrder: function () {

				var scope = this,
					sortGroup = [];

				for (var i in this.result) {
					sortGroup.push({
						group: i,
						length: this.result[i].length
					});
				}

				sortGroup.sort(
					scope.helper.sort(
						["length"],
						false, // false = desc, the most results on top
						function (a) {
							return a.toString().toUpperCase()
						}
					)
				);

				return $.map(sortGroup, function (val, i) {
					return val.group
				});
			},
			hint: true,
			href: "#",
			template: "{{display}}",
			source: {
				country: {
					data: data.countries
				},
				capital: {
					data: data.capitals
				}
			},
			callback: {
				onClickAfter: function (node, a, item, event) {

					getResultsAndDisplay(item.template);

					$('#result-container').text('');

				},
				onResult: function (node, query, obj, objCount) {

					console.log(objCount)

					var text = "";
					if (query !== "") {
						text = objCount + ' elements matching "' + query + '"';
					}
					$('#result-container').text(text);

				}
			},
			debug: true
		});
		$('#to').typeahead({
			minLength: 1,
			order: "asc",
			group: true,
			maxItemPerGroup: 3,
			groupOrder: function () {

				var scope = this,
					sortGroup = [];

				for (var i in this.result) {
					sortGroup.push({
						group: i,
						length: this.result[i].length
					});
				}

				sortGroup.sort(
					scope.helper.sort(
						["length"],
						false, // false = desc, the most results on top
						function (a) {
							return a.toString().toUpperCase()
						}
					)
				);

				return $.map(sortGroup, function (val, i) {
					return val.group
				});
			},
			hint: true,
			href: "#",
			template: "{{display}}",
			source: {
				country: {
					data: data.countries
				},
				capital: {
					data: data.capitals
				}
			},
			callback: {
				onClickAfter: function (node, a, item, event) {

					getResultsAndDisplay(item.template);

					$('#result-container').text('');

				},
				onResult: function (node, query, obj, objCount) {

					console.log(objCount)

					var text = "";
					if (query !== "") {
						text = objCount + ' elements matching "' + query + '"';
					}
					$('#result-container').text(text);

				}
			},
			debug: true
		});
		
		$( "#one-way" ).click(function() {
				$('#one-way').attr('class','active')
				$('#two-way').removeAttr('class','active')
				$("#return").hide();
				
		});
		$( "#two-way" ).click(function() {
				$('#two-way').attr('class','active')
				$('#one-way').removeAttr('class','active')
				$("#return").show();
				
		});
		$( "#search" ).click(function() {
				$("#planner").hide();
		});
   }
   
 $(document).ready(function(){
	showPlanner("planner");
});