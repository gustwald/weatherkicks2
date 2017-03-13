$(document).ready(function() {
 navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude+','+position.coords.longitude);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
      $.ajax({
        method: 'GET',
        //Might need to set the contentType
        contentType: 'application/json; charset=UTF-8',
        url:'https://api.darksky.net/forecast/7a8e4836a4e6c4de8c0f59e22b24ba9b/'+ latitude + ',' + longitude + '?units=si',
        success: function(weather){
        console.log(weather);
        }
    });
  });
  
});


