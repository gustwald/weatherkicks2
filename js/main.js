function getCoordinates(callback) {
 navigator.geolocation.getCurrentPosition(function(position) {
  
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
         callback([latitude, longitude]);
  });

};

const weatherModule = {
    getWeather: function(){
        getCoordinates(function(cordinates){
            $.ajax({
            method: 'GET',
            contentType: 'application/json; charset=UTF-8',
            url:'https://api.darksky.net/forecast/7a8e4836a4e6c4de8c0f59e22b24ba9b/'+ cordinates[0] + ',' + cordinates[1] + '?units=si',
            success: function(weather){

            $.ajax({
                method: 'GET',
                contentType: 'application/json; charset=UTF-8',
                url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ cordinates[0]+', '+cordinates[1]+'&key=AIzaSyA5dwgsUmb4x3b3DkVE92mrGWG72KCyHrg',
                success: function(location){
                    $(".container").fadeIn("slow");
                    $(".loader").fadeOut("fast");

                    $('.location').text(location.results[3].formatted_address);
                    $('.temperature').html(weather.currently.temperature + '&#8451;');
                    }
                });
                console.log(weather);
                }
            });
        })  
    }
}

function convertIsoTime(timestamp){
    var date = new Date(timestamp*1000);
 
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime;
}

console.log(convertIsoTime(1489415877));

weatherModule.getWeather();
