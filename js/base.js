var base = {};
(function (){
    'use strict';
    
    base = {
        getCoordinates: function(){
            var def = $.Deferred(); 
            navigator.geolocation.getCurrentPosition(function (coordinates) { 
                return def.resolve(coordinates); 
            }); 
            return def.promise();
        },
        getWeather: function(coordinates){
           return $.ajax({
                method: 'GET',
                contentType: 'application/json; charset=UTF-8',
                url:'https://api.darksky.net/forecast/7a8e4836a4e6c4de8c0f59e22b24ba9b/'+ coordinates.latitude + ',' + coordinates.longitude + '?units=si',
                error: function(error) {
                $(".output").text("Something unexpected happened while trying to retrieve the weather");
                console.log(error);
                }
            });
        },
        getLocation: function(coordinates){
           return $.ajax({
                method: 'GET',
                contentType: 'application/json; charset=UTF-8',
                url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ coordinates.latitude+', '+coordinates.longitude+'&key=AIzaSyA5dwgsUmb4x3b3DkVE92mrGWG72KCyHrg',
                error: function(error) {
                $(".location").text("Something unexpected happened while trying to retrieve your location");
                console.log(error);
                }
            });
        },
        formatDate: function(timestamp){
            var date = new Date(timestamp*1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();

            var formattedTime = hours + ':' + minutes.substr(-2);

            return formattedTime;
        }
   }
})();
