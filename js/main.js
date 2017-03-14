$( document ).ready(function() {
    base.getCoordinates().then(function(coordinates){
        base.getWeather(coordinates.coords).then(function(weather){

            var date = base.formatDate(weather.currently.time);
            var temperature = Math.round(weather.currently.temperature);
            var weatherIcons = weather.currently.icon;
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
            var badWeather = [
                "Don't flex your AF1's today.",
                "I wouldn't go out with your OG's today.",
                "Get your beaters"
            ]
            var goodWeather = [
                "Your shoes are fine today.",
                "Flex your OG's today.",
                "Suns out, grails out",
            ]
            var nightTime = [
                "Night, but kicks should be fine though.",
                "Bedtime player",
                "Hope you got your kicks tucked in",
                "Sneakers has to rest too"
            ]
            var randomGoodTip = goodWeather[Math.floor(Math.random()*goodWeather.length)];
            var randomBadTip = badWeather[Math.floor(Math.random()*badWeather.length)];
            var randomNightTip = nightTime[Math.floor(Math.random()*nightTime.length)];

            if(icons.indexOf(weatherIcons) > -1){    
                $(".output").addClass(weatherIcons);
            }else{
                $(".output").text("Sorry, we could not find any weather :()");
            }

            if(weatherIcons.includes("night")){
                $(".tips").text(randomNightTip);
            }else if(weatherIcons.includes("rain sleet snow")){
                $(".tips").text(randomBadTip);
            }else{
                $(".tips").text(randomGoodTip);
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

