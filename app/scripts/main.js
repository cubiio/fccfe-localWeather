// use strict:
"use strict";

// Function gets the location of the user provided the user opts in
// function adapted from Sitepoint; https://www.sitepoint.com/html5-geolocation
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(userPosition, showError);
} else {
        alert('Geolocation is not supported in your browser so cannot display your local weather');
}

// Success callback function
function userPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
	console.log("User's latitude is " + lat + " User's longitude is " + lon);
    // return lat, lon; // how to return two vars?
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
