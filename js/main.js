$( document ).ready(function() {
    //First get coordinates and as promise and when we got that we run the getweather function which uses coordinates
    //latitude and longitude. We cannot use the getweather function without the coordinates, so its important we get those First
    //therefore we use a promise.
    base.getCoordinates().then(function(coordinates){
        base.getWeather(coordinates.coords).then(function(weather){

            var date = base.formatDate(weather.currently.time);
            var temperature = Math.round(weather.currently.temperature);
            var weatherIcons = weather.currently.icon;
            var summary = weather.currently.summary;
           
            base.addWeatherClass(weatherIcons);
            base.decideOutput(weatherIcons);
            base.appendTimeline(weather);
            base.loaderAndShowData(summary, temperature);
    
        })
        //gets location and prints out to html
        base.getLocation(coordinates.coords).then(function(location){
            var region = location.results[3].formatted_address;
            $('.location').text(region);
        })
        //button which makes a new request to get the weather-response in farenheit degrees instead of celcius.
         $('.change').bind("click", base.appendWeatherFarenheit);
    })
});

       