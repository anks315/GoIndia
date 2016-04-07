var directionsService;
var directionsDisplay;

function showPlanner(plannerContainer){
		var out ="";
			 out = out + "<div ng-app='myApp' ng-controller='myCtrl'><div class='panel panel-default'><div class='panel-body'><ul class='nav nav-tabs'><li role='presentation' id='one-way' class='active'><a href='#'>One-way trip</a></li><li role='presentation' id='two-way'><a href='#'>Return trip</a></li></ul><div class='row'><div class='col-sm-6 col-height col-middle'></br><div class='input-group'><input class='form-control' id='from' placeholder='From:' type='text' autofocus autocomplete='off' ng-focus='disableTap()'><span class='input-group-addon'><span class='glyphicon glyphicon-home'></span></span></div></div><div class='col-sm-6 col-height col-middle'></br><div class='input-group'><input class='form-control' id='to' placeholder='To:' type='text' autofocus autocomplete='off'><span class='input-group-addon'><span class='glyphicon glyphicon-home'></span></span></div></div></div><div class='row'><div class='col-sm-6 col-height col-middle'></br><div class='input-group' id='departure'><input class='form-control' type='date' id='departureBox' class='form-control' placeholder= 'Departure'/><span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span></div></div><div class='col-sm-6 col-height col-middle'></br><div class='input-group date' id='return'><input class='form-control' type='date' id='returnBox' class='form-control' placeholder= 'Return'/><span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span></div></div></div><div class='row'><div class='col-sm-6 col-height col-middle'></br><input type='submit' id='search' class='btn btn-info' value='Search..'></div><div class='col-sm-6 col-height col-middle'></div></div></div></div></div>";

		document.getElementById("planner").innerHTML = out;
		//setting min date as today
		var dt= new Date();
		   var yyyy = dt.getFullYear().toString();
		   var mm = (dt.getMonth()+1).toString(); // getMonth() is zero-based
		   var dd  = dt.getDate().toString();
		   var min = yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
		$('#departureBox').prop('min',min);
		$('#returnBox').prop('min',min);
		$("#return").hide();
		
		
		
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
				/*$.getJSON('train', function(data, err) {
				  if (err != "success") {
				  } else {
					showtransportJourneyList(data.train,"train");
				  }
				});*/
				$("#planner").hide();
				$("#mainPanel").show();
				showSummary();
				showSortMenuMain();
				$("#summary").show();
				$("#sortMenuMain").show();
				
				$("#map").show();
				initMap();
				calculateAndDisplayRoute(directionsService, directionsDisplay);
		});
   }
 function initAutocomplete() {
	 
	  var options = {
  types: ['(cities)'],
  componentRestrictions: {country: "ind"}
 };

  // Create the search box and link it to the UI element.
  var fromInput = document.getElementById('from');
  var autocomplete = new google.maps.places.Autocomplete(fromInput,options);
      google.maps.event.addListener(autocomplete, 'place_changed', function(){
         var place = autocomplete.getPlace();
      })

  var toInput = document.getElementById('to');
  var autocomplete = new google.maps.places.Autocomplete(toInput,options);
      google.maps.event.addListener(autocomplete, 'place_changed', function(){
         var place = autocomplete.getPlace();
      });
	  
	 var app = angular.module('myApp', []);
		app.controller('MyCtrl', function($scope) {
		  $scope.disableTap = function(){
			container = document.getElementsByClassName('pac-container');
			// disable ionic data tab
			angular.element(container).attr('data-tap-disabled', 'true');
			// leave input field if google-address-entry is selected
			angular.element(container).on("click", function(){
				document.getElementById('from').blur();
			});
		  };
		})
} 

function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);
 

}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('from').value,
    destination: document.getElementById('to').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
 $(document).ready(function(){
	 
	$("#mainPanel").hide();
	showPlanner("planner");
	initAutocomplete();
	$("#ex1").slider({});
});