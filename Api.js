
$(document).ready(function() {
    //get latitude and longitude
    var lat;
    var lon;
    function success(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeather(lat, lon);
      getLocation(lat, lon);
    }
  
    function fail(error) {
      alert(`ERROR(${error.code}): ${error.message}`);
    //   response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict"); 
    }
  
    navigator.geolocation.getCurrentPosition(success, fail);
  
    
    
    function getWeather(lat, lon) {
      var url =
        "https://api.darksky.net/forecast/4775636b47feb23f807ab79384a01cf4/37.8267,-122.4233" +

        "?callback=?&exclude=minutely,hourly,daily,flags?&units=si";
      $.getJSON(url, function(data) {
        var temp = data.currently.temperature.toFixed(1);
        var summary = data.currently.summary;
        var icon = data.currently.icon;
        $("#result").html(temp);
        $("#tempChange").html("&#8451;");
        $("#summary").html(summary);
        skycons(icon);
  
        //celsius to fahrenheit or fahrenheit to celsius changer
        var clicks = 1;
        $("#tempChange").on("click", function() {
          if (clicks === 1) {
            $("#result").html((temp * 9 / 5 + 32).toFixed(1));
            $("#tempChange").html("&#8457;");
            clicks++;
          } else {
            $("#result").html(temp);
            $("#tempChange").html("&#8451;");
            clicks--;
          }
        });
      });
    }
  
    //get current city and country from fcc api as the dark sky does not support current city and country
    //no Access-Control-Allow-Origin header issue with FCC API
    function getLocation(lat, lon) {
      var url =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&" +
        "lon=" +
        lon;
      $.getJSON(url, function(data) {
        var city = data.name;
        var country = data.sys.country;
        $(".mdl-card__title").html(city + ", " + country);
      });
    }
  
    //animated icons
    function skycons(icon) {
      $("canvas").attr("id", icon);
      var icons = new Skycons({ color: "#282828" }),
        list = [
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
        ],
        i;
      for (i = list.length; i--; ) icons.set(list[i], list[i]);
      icons.play();
    }
  
    //today date
    var today = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var dd = today.getDate();
    var mm = months[today.getMonth()];
    var year = today.getFullYear();
    $("#today").html(mm + " " + dd + ", " + year);
  });
  
