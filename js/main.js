$( document ).ready(function() {

        $(".logobutton").click(function() {
        $('html, body').animate({
            scrollTop: $(".container").offset().top
        }, 1000);
    });
    $(".scrollbtn").click(function() {
        $('html, body').animate({
            scrollTop: $(".sections").offset().top
        }, 1000);
    });
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
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ]
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

            if(icons.indexOf(weatherIcons) > -1){    
                $(".output").addClass(weatherIcons);
            }else{
                $(".output").text("Sorry, we could not find any weather :()");
            }

            if(weatherIcons.includes("night")){
                $(".tips").text(randomNightTip);
            }else if(weatherIcons.includes("rain") || weatherIcons.includes("snow") || weatherIcons.includes("sleet")){
                $(".tips").text(randomBadTip);
            }else{
                $(".tips").text(randomGoodTip);
            }
            
            
            $(".container").fadeIn("slow");
            $(".loader").fadeOut("fast");
            $('.temperature').html('<strong>' + temperature + '&deg;C</strong>, ' + summary);

            $.each(weather.hourly.data, function( key, value ) {
               if(key < 7){
                 $('.timeline').append('<li class="li hour"><div class="timestamp"><span class="time">'+base.formatDate(value.time) + '</span></div><div class="status"><span class="degree">'+ Math.round(value.temperature) +'&deg;C</span></div>');
               }
            });

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

