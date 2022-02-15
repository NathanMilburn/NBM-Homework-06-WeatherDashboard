var myAPIKey = "830e2296d28e9adef700a0677aa768ed";
// var areaSearch = $('#area-search');
var searchBtn = $('#searchBtn');
var cityResults = $('#city-results');
var currentForecast = $("#city-name");
var currentTemp = $("#currentTemp");
var currentWind = $("#currentWind");
var currentHumidity = $("#currentHumidity");
var currentUVIndex = $("#currentUVIndex");
var dailyIcon = $(".dailyIcon");
// var city = 'Kirkland'

function pullWeatherData(data) {
    // Presenting current weather conditions
    currentTemp.text(`Temp: ${data.current.temp} ℉`);
    currentWind.text(`Wind: ${data.current.wind_speed} MPH`);
    currentHumidity.text(`Humidity: ${data.current.humidity} %`);
}

// `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myAPIKey}`
var pullLongLat = function(city) {
    var selectedPointAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${myAPIKey}`;
    
    fetch(selectedPointAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        retrieveWeatherData(data.coord.lat, data.coord.lon);
        var currentDate = new Date(data.dt * 1000).toLocaleDateString('en-US');
        currentForecast.text(`${city} (${currentDate})`);
        // check local storage and add new city to list
        var oldHistory = JSON.parse(localStorage.getItem("city-results")) || [];
        if (!oldHistory.includes(data[0].name)) {
        oldHistory.push(data[0].name)
        localStorage.setItem("city-results", JSON.stringify(oldHistory));
        }
    });
};

var retrieveWeatherData = function(lat, lon) {
    var latLonURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myAPIKey}`;
    // Error message for above URL: {"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."} //

    fetch(latLonURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        // creating daily forecast
        pullWeatherData(data);
        // add weather card details here
        for (var i = 1; i < 6; i++) {
            var findCard = ".day" + i;
            var parentElement = document.querySelector(findCard);
            var ulChildEl = parentElement.querySelector(".Stats");
            var h4ChildEl = parentElement.querySelector(".card-body");
            var temp = ulChildEl.querySelector(".Temp");
            var wind = ulChildEl.querySelector(".Wind");
            var humidity = ulChildEl.querySelector(".Humidity");
            var date = h4ChildEl.querySelector(".Date");
            var icon = h4ChildEl.querySelector(".cardImg");
            timeOffset = data.timezone_offset;
            temp.textContent = "Temp: " + data.daily[i].temp.day;
            humidity.textContent = "Humidity: " + data.daily[i].humidity;
            wind.textContent = "Wind: " + data.daily[1].wind_speed;
            date.textContent = new Date((data.daily[i] + timeOffset)*1000).toLocaleDateString();
            var weatherIcon = data.daily[i].weather[0].icon;
            icon.setAttribute("src", `https://openweathermap.org/img/w/${weatherIcon}.png`);
            // 404 error with above URL //
        };
 
    })
    .catch(function (error) {
        alert("Unable to find that city");
    });
};


var displayHistory = function(city) {
    var historyItem = document.createElement("li");
    historyItem.innerText=city;
    historyItem.addEventListener("click", function(event) {
        var city = event.target.innerText;
        pullLongLat(city);
    });
    cityResults.append(historyItem);
};

var pullStorage = function() {
    var history = JSON.parse(localStorage.getItem("city-results")) || [];
    for (var i = 0; i < history.length; i++) {
        printHistory(history[i]);
    }
};
pullStorage();

$('#searchBtn').on('click', function(event){
    event.preventDefault();
    var areaSearch = $('#area-search').val().trim();
    pullLongLat(areaSearch);
    displayHistory(areaSearch);
});

// Possible UV Info pull section //
// currentUVIndex.text(`UV: ${data.current.uvi}`);
//     var currentUV = function() {
//         if (data.current.uvi <= 2 ) {
//             currentUVIndex.classList.add("zeroRisk");
//         } else if (data.current.uvi <= 5) {
//             currentUVIndex.classList.add("lowRisk");
//         } else if (data.current.uvi <= 7) {
//             currentUVIndex.classList.add("mediumRisk");
//         } else if (data.current.uvi <= 10) {
//             currentUVIndex.classList.add("highRisk");
//         } else {
//             currentUVIndex.classList.add("veryHighRisk");
//         }
//         };
//         currentUV();