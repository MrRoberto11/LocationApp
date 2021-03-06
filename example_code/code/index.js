//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button click
	$('#getLocationButton').on('click', getPosition);
	
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	$('#clearGraphicLocation').on('click',stop);
	
	
});


//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	//navigator.geolocation.getCurrentPosition(successPosition, failPosition);
	watchID = navigator.geolocation.watchPosition(successPosition, failPosition,geolocationOptions);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var unixtime = new Date (position.timestamp);
	var time = unixtime.toGMTString();
	var latitude = position.coords.latitude;
	var latText = latitude.toString();
	var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#lattext').val(latText);
	$('#longtext').val(longitude.toString());
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

var geolocationOptions = {
 maximumAge: 10000,
 timeout: 6000,
 enableHighAccuracy: true
};

function stop (){
console.log ("hit the stop function");

navigator.geolocation.clearWatch(watchID);



}

