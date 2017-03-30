//immediately invoked function base so that we can use the functions when document is ready.
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
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                },
                url:'https://api.darksky.net/forecast/7a8e4836a4e6c4de8c0f59e22b24ba9b/'+ coordinates.latitude + ',' + coordinates.longitude + '?units=si',
                error: function(error) {
                $(".output").text("Something unexpected happened while trying to retrieve the weather");
                console.log(error);
                }
            });
        },
        getWeatherFarenheit: function(coordinates){
           return $.ajax({
                method: 'GET',
                contentType: 'application/json; charset=UTF-8',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                },
                url:'https://api.darksky.net/forecast/7a8e4836a4e6c4de8c0f59e22b24ba9b/'+ coordinates.latitude + ',' + coordinates.longitude,
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
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                },
                url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ coordinates.latitude+', '+coordinates.longitude+'&key=AIzaSyA5dwgsUmb4x3b3DkVE92mrGWG72KCyHrg',
                error: function(error) {
                $(".location").text("Something unexpected happened while trying to retrieve your location");
                console.log(error);
                }
            });
        },
        //we get the time as a timestamp so we have to convert this.
        //http://stackoverflow.com/a/847196
        formatDate: function(timestamp){
            var date = new Date(timestamp*1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();

            var formattedTime = hours + ':' + minutes.substr(-2);

            return formattedTime;
        },
        addWeatherClass: function(weatherIcon){
             var icons = [
                "clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ]
              //checks which icon the weatherdata currently has and adds that to class
            if(icons.indexOf(weatherIcon) > -1){    
                $(".output").addClass(weatherIcon);
            }else{
                $(".output").text("Sorry, we could not find any weather :()");
            }
        },
        decideOutput: function(weatherIcon){
             var badWeather = [
                "Don't flex your AF1's today.",
                "I wouldn't go out with your OG's.",
                "Get your beaters.",
                "Your kicks will get dirty.",
                "Stay inside if you wanna flex.",
                "Stay inside."
            ]
            var goodWeather = [
                "Your shoes are fine.",
                "Flex your OG's.",
                "Suns out, grails out.",
                "Good condition for flexing."
            ]
            var nightTime = [
                "Night, but kicks should be fine though.",
                "Bedtime player.",
                "Hope you got your kicks tucked in.",
                "Sneakers has to rest too."
            ]
            var randomGoodTip = goodWeather[Math.floor(Math.random()*goodWeather.length)];
            var randomBadTip = badWeather[Math.floor(Math.random()*badWeather.length)];
            var randomNightTip = nightTime[Math.floor(Math.random()*nightTime.length)];

              //decides which output the app should have
            if(weatherIcon.includes("night")){
                $(".tips").text(randomNightTip);
            }else if(weatherIcon.includes("rain") || weatherIcon.includes("snow") || weatherIcon.includes("sleet")){
                $(".tips").text(randomBadTip);
            }else{
                $(".tips").text(randomGoodTip);
            }
        },
        appendTimeline: function(weather){
             //Creates the timeline for weather coming 7 hours.
            $.each(weather.hourly.data, function( key, value ) {
               if(key < 7){
                 $('.timeline').append('<li class="li hour"><div class="timestamp"><span class="time">'+base.formatDate(value.time) + '</span></div><div class="status"><span class="degree">'+ Math.round(value.temperature) +'&deg;C</span></div></li>');
               }
            });
        },
        loaderAndShowData: function(summary, temperature){
            $(".container").fadeIn("slow");
            $(".loader").fadeOut("fast");
            $('.temperature').html('<strong>' + temperature + '&deg;C</strong>, ');
            $('.summary').html(summary);
        },
        appendWeatherFarenheit: function(){
             $('.change').fadeOut();
             $('.sk-circle').fadeIn();
        
             base.getCoordinates().then(function(coordinates){
                base.getWeatherFarenheit(coordinates.coords).then(function(weatherFarenheit){
                $('.sk-circle').fadeOut();

                $('.temperature').fadeOut(1000, function(){
                $('.temperature').empty().append('<strong>' + Math.round(weatherFarenheit.currently.temperature) + '&deg;F, </strong>').fadeIn();
                })

                $.each(weatherFarenheit.hourly.data, function( key, value ) {
                            if(key < 7){
                            $('.degree').fadeOut(1000, function(){
                            $('.degree').eq(key).empty().append(Math.round(value.temperature) + '&deg;F').fadeIn();
                         });
                        }
                    });
                })
            })
        }
   }
})();
