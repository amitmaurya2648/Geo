var amitLocation = '19.294088429312904, 72.85896503785236';
var arrAmitLocation =amitLocation.split(",");
$(document).ready(function() {
  getLocation();
  
});
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  return ShowDistance(latitude, longitude);  
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

// Call the function to get the location, for example, when a button is clicked or on page load

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // the earth's radius in miles
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad(); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  return d;
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}
function ShowDistance(latitude, longitude){

  var coords_1 = { 
    lat: arrAmitLocation[0],
    long: arrAmitLocation[1]
  };
  // var coords_2 = { 
  //   lat: "25.572702006541164",
  //   long:"82.16677017426899"
  // };
  var coords_2 = { 
    lat: latitude,
    long: longitude
  };
  var dist = calculateDistance(parseFloat(coords_1.lat), 
							 parseFloat(coords_1.long),
							 parseFloat(coords_2.lat), 
							 parseFloat(coords_2.long));
  var _dist =  (Math.floor(dist*10)/10);
  displayCalcDistance(_dist);
}
function displayCalcDistance(_dist){
  var barPercentage = (100*_dist)/1200;
  var _barPercentage = 100 - barPercentage;
  if(_barPercentage<10){
    _barPercentage = 10;
  }
  var lblPosition = ((_barPercentage + 100)/2)-10;
  if(lblPosition >75){
    lblPosition=75;
  }
  if(_dist <10){
    lblPosition = 80;
  }
  var malePosition = _barPercentage-20;
  if(malePosition>60){
    malePosition = 60
  }
  if(_dist <0.2){
    setTimeout(function(){
      $(".male").hide();
      $(".female").hide();
      $(".both").show();
    }, 2000);
  }
  $("#distanceLbl").text(_dist+" Km");
  $("#prog-status").width(_barPercentage+"%");
  $("#distanceLbl").css( { marginLeft : lblPosition+"%"});
  $(".male").css( { marginLeft : malePosition+"%" });

}


