// use strict:
"use strict";

// Function gets the location of the user provided the user opts in
// Function for geolocation, success and error adapted from Sitepoint; 
// URL https://www.sitepoint.com/html5-geolocation
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(userPosition, showError);
} else {
        alert('Geolocation is not supported in your browser so cannot display your local weather');
}

// declare global variable to store our weather information after the ajax call 
var weather;

// Success callback function
// Determine's user location and builds in latitude and longitude into the DarkSky API url
function userPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

	// Next line builds the API url for DarkSky
	var darkSkyAPI = 'https://api.darksky.net/forecast/' + darkSkyToken + '/' + lat + ',' + lon;

	// start ajax
	$.ajax({
      url: darkSkyAPI,
      type: "GET",
      dataType: "jsonp",
      success: function (data) {
      	weather = data;
	}, 
	      xhrFields: {
	    withCredentials: false
	  } 
	    }) 
    // end ajax
}

// Error callback function
function showError(error) {
        switch(error.code) {
                case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        break;
        }
}

// if AJAX is successful triggers these actions
// displays weather icon
$(document).ajaxSuccess(function() {
	console.log(weather);
	// log weather json to the console
	$('#location').append(weather.timezone);

	var tempFah = Math.trunc(weather.currently.temperature);
	// store default temp in fahrenheit as var tempFah
	var tempCel = Math.trunc((tempFah - 32) * 0.5556);
	// convert temp into celsius and store as var tempCel
 
	$('#temperature').prepend(tempCel + " °C");
	// prepend temp in celsius to the temperature placeholder 

	var imagePNG = weather.currently.icon + '.png';
	console.log(imagePNG); // e.g. partly-cloudy-night.png

	$('#weather-load').hide();
	// removes load animation

	$('#weather-icon-placeholder').html('<img src="/images/' + imagePNG + ' "  alt="weather image">'); 
	// adds weather icon representing local weather
	// 	$('#weather-icon-placeholder').html('<img src="/images/' + imagePNG + ' " img style="max-width: 200px;" alt="weather image">'); 


	// toggles between Fah and Cel when user clicks on the temperature
	$('#temperature').click(function () {
	  if ($('#temperature').text().indexOf('C') > -1) {
	    $('#temperature').text(tempFah + '° F');
	  } else {
	    $('#temperature').text(tempCel + '° C');
	  }
	});
});
