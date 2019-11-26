window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude
            lat = position.coords.latitude
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/4775636b47feb23f807ab79384a01cf4/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();

                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    //I will set DOM elements from the APPI
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = data.timezon;
                    locationTimezone.textContent = data.timezone;
                    setIcons(icon, document.querySelector.icon)
                });
        });


    }
    function setIcon(icon, iconID) {
        const skycons = new Skycons( {color:"white"})
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

})