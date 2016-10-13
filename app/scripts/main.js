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

// Success callback function
// Determine's user location and builds in latitude and longitude into the DarkSky API url
function userPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
	console.log("User's latitude is " + lat + " User's longitude is " + lon);

	// Next line builds the API url for DarkSky
	var darkSkyAPI = 'https://api.darksky.net/forecast/' + darkSkyToken + '/' + lat + ',' + lon;
    console.log(darkSkyAPI);
    return darkSkyAPI;
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


$.ajax({
      url: 'https://api.darksky.net/forecast/c9ef245f82717baa8be804cab471c6f2/51,0',
      type: "GET",
      dataType: "jsonp",
      success: function (weather) {
      	$('#temperature').prepend(weather.currently.temperature);
      	$('#weather-icon').append(weather.currently.icon);
  		// console.log(weather.currently.icon);

}, 
      xhrFields: {
    withCredentials: false
  } 
    }) // end ajax