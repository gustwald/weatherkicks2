$( document ).ready(function() {
    base.getCoordinates().then(function(coordinates){
        base.getWeather(coordinates.coords).then(function(weather){

            var date = base.formatDate(weather.currently.time);
            var temperature = Math.round(weather.currently.temperature);
            var summary = weather.currently.summary;
            var icons = [
                "clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-clody-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ]
    
            if(icons.indexOf(weather.currently.icon) > -1);{    
                $(".output").addClass(weather.currently.icon);
            }
            
            $(".container").fadeIn("slow");
            $(".loader").fadeOut("fast");
            $('.temperature').html(temperature + '&#8451;, ' + summary);


            console.log(weather);
            console.log(date);
        })
        base.getLocation(coordinates.coords).then(function(location){
            console.log(location);
            var region = location.results[3].formatted_address;

            $('.location').text(region);
        })
    })
});

